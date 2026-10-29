import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const raymarchingVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const raymarchingFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform float uMorph;
  varying vec2 vUv;

  #define MAX_STEPS 80
  #define MAX_DIST 25.0
  #define SURF_DIST 0.001

  // Rotation helpers
  mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
  }
  mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
  }
  mat3 rotZ(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
  }

  // Polynomial smooth minimum
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  // Regular Icosahedron SDF
  float sdIcosahedron(vec3 p, float r) {
    const float phi = 1.618033988749895;
    vec3 n1 = normalize(vec3(phi, 1.0, 0.0));
    vec3 n2 = normalize(vec3(1.0, 0.0, phi));
    vec3 n3 = normalize(vec3(0.0, phi, 1.0));
    vec3 n4 = normalize(vec3(1.0, 1.0, 1.0));

    vec3 ap = abs(p);
    float d = dot(ap, n1);
    d = max(d, dot(ap, n2));
    d = max(d, dot(ap, n3));
    d = max(d, dot(ap, n4));
    return d - r;
  }

  // Torus Knot SDF (2, 3 trefoil knot approximation)
  float sdTorusKnot(vec3 p, float r1, float r2) {
    float a = atan(p.z, p.x);
    float r = length(p.xz);
    vec2 q = vec2(r - r1, p.y);
    float th = a * 1.5;
    mat2 rot = mat2(cos(th), -sin(th), sin(th), cos(th));
    vec2 qt = rot * q;
    return length(qt) - r2 * (1.0 + 0.15 * cos(3.0 * a));
  }

  // Torus ring SDF
  float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
  }

  // Scene distance function returning vec2(distance, matID)
  // matID: 1.0 = Main sculpture, 2.0 = Rings, 3.0 = Satellites
  vec2 sceneMap(vec3 p) {
    // Scroll collapse scaling
    float s = max(1.0 - uScroll * 0.6, 0.15);
    vec3 sp = p / s;

    // Continuous slow rotation for main object
    vec3 pObj = rotY(uTime * 0.35) * rotX(uTime * 0.22) * rotZ(uTime * 0.12) * sp;

    // 1. Morph between Icosahedron and Torus Knot
    float dIco = sdIcosahedron(pObj, 1.15);
    float dKnot = sdTorusKnot(pObj, 0.98, 0.30);
    float morphBlend = 0.42 * uMorph + 0.06;
    float dSculpt = smin(dIco, dKnot, morphBlend);

    // Gyroid surface modulation for State 3 (alien organic texture)
    float gyroid = abs(dot(sin(pObj * 3.4), cos(pObj.zxy * 3.4))) * 0.11 * smoothstep(0.25, 0.9, uMorph);
    dSculpt = (dSculpt - gyroid) * s;

    // 2. Orbit Ring 1 (tilted 30 deg)
    vec3 pR1 = rotZ(0.523) * rotY(uTime * 0.16) * p;
    float dRing1 = sdTorus(pR1, vec2(1.72, 0.009));

    // Orbit Ring 2 (tilted 60 deg)
    vec3 pR2 = rotX(1.047) * rotZ(-0.25) * rotY(-uTime * 0.14) * p;
    float dRing2 = sdTorus(pR2, vec2(2.05, 0.008));
    float dRings = min(dRing1, dRing2);

    // 3. Dark glass sphere satellites orbiting
    vec3 sat1Pos = vec3(cos(uTime * 0.55) * 1.72, sin(uTime * 0.35) * 0.35, sin(uTime * 0.55) * 1.72);
    float dSat1 = length(p - sat1Pos) - 0.085;

    vec3 sat2Pos = vec3(cos(-uTime * 0.42 + 2.2) * 2.05, sin(uTime * 0.48 + 1.2) * 0.45, sin(-uTime * 0.42 + 2.2) * 2.05);
    float dSat2 = length(p - sat2Pos) - 0.065;
    float dSats = min(dSat1, dSat2);

    // Select nearest object
    vec2 res = vec2(dSculpt, 1.0);
    if (dRings < res.x) {
      res = vec2(dRings, 2.0);
    }
    if (dSats < res.x) {
      res = vec2(dSats, 3.0);
    }
    return res;
  }

  // Normal estimation via central differences
  vec3 calcNormal(vec3 p) {
    const float e = 0.0015;
    return normalize(vec3(
      sceneMap(p + vec3(e, 0.0, 0.0)).x - sceneMap(p - vec3(e, 0.0, 0.0)).x,
      sceneMap(p + vec3(0.0, e, 0.0)).x - sceneMap(p - vec3(0.0, e, 0.0)).x,
      sceneMap(p + vec3(0.0, 0.0, e)).x - sceneMap(p - vec3(0.0, 0.0, e)).x
    ));
  }

  void main() {
    // Aspect ratio & centered coordinates
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    // Camera setup with mouse parallax yaw/pitch offsets (±15 degrees)
    float yaw = uMouse.x * 0.26 + sin(uTime * 0.12) * 0.1;
    float pitch = uMouse.y * 0.22 + 0.08;
    float camDist = 3.8;

    vec3 ro = vec3(
      camDist * sin(yaw) * cos(pitch),
      camDist * sin(pitch) + 0.12,
      camDist * cos(yaw) * cos(pitch)
    );
    vec3 target = vec3(0.0, 0.0, 0.0);

    vec3 forward = normalize(target - ro);
    vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, forward);
    vec3 rd = normalize(uv.x * right + uv.y * up + 1.85 * forward);

    // Raymarching loop with volumetric inner core glow accumulation
    float t = 0.0;
    vec2 hit = vec2(-1.0, 0.0);
    vec3 glow = vec3(0.0);
    vec3 limeColor = vec3(0.792, 1.0, 0.0); // #CAFF00

    float s = max(1.0 - uScroll * 0.6, 0.15);
    float coreRadius = 0.42 * s;

    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * t;
      vec2 res = sceneMap(p);

      // Accumulate inner reactor core glow along ray
      float dCore = length(p) - coreRadius;
      float corePulse = 0.85 + 0.15 * sin(uTime * 3.5);
      glow += (0.0038 / (0.025 + dCore * dCore)) * limeColor * corePulse;

      if (res.x < SURF_DIST) {
        hit = vec2(t, res.y);
        break;
      }
      t += res.x * 0.85; // conservative step for smooth convergence
      if (t > MAX_DIST) break;
    }

    // Background transparent/black with subtle atmospheric glow
    vec3 color = vec3(0.0);
    float alpha = 0.0;

    if (hit.x > 0.0) {
      vec3 p = ro + rd * hit.x;
      vec3 N = calcNormal(p);
      vec3 V = -rd;

      // Lime point light at (2, 3, 2)
      vec3 lightPos = vec3(2.0, 3.0, 2.0);
      vec3 L = normalize(lightPos - p);
      float diff = max(dot(N, L), 0.0);

      // Specular reflection (Phong)
      vec3 R = reflect(-L, N);
      float spec = pow(max(dot(R, V), 0.0), 36.0);

      // Fresnel grazing angle (edges near-perpendicular to ray)
      float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.2);

      if (hit.y == 1.0) {
        // Main dark glass mathematical sculpture
        vec3 darkGlass = vec3(0.035, 0.04, 0.038);
        vec3 diffuseColor = darkGlass * (0.06 + 0.18 * diff);

        // Thin electric lime emissive edge lines
        vec3 emissiveEdge = limeColor * fresnel * 2.2;

        // Specular highlight from lime light
        vec3 specularColor = limeColor * spec * 2.4 + vec3(1.0) * pow(max(dot(R, V), 0.0), 64.0) * 0.4;

        color = diffuseColor + emissiveEdge + specularColor + glow * 0.45;
        alpha = clamp(0.75 + fresnel * 0.25, 0.0, 1.0);
      } else if (hit.y == 2.0) {
        // Orbit rings: glowing thin lime loops
        color = limeColor * (0.8 + 0.2 * diff) * 1.5;
        alpha = 0.9;
      } else if (hit.y == 3.0) {
        // Satellites: dark glass spheres with lime rim
        vec3 darkGlass = vec3(0.05, 0.06, 0.05);
        color = darkGlass * (0.1 + 0.5 * diff) + limeColor * fresnel * 1.8 + limeColor * spec * 1.5;
        alpha = 0.85;
      }
    } else {
      // Ray missed surface: show inner core bleed & halo
      color = glow * 0.55;
      alpha = clamp(length(color) * 0.8, 0.0, 0.85);
    }

    gl_FragColor = vec4(color, alpha);
  }
`

function RaymarchedSculpture() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const mouseSmooth = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))
  const scrollRef = useRef(0)

  // Track window mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      targetMouse.current.set(nx, ny)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      scrollRef.current = Math.min(Math.max(scrollY / heroHeight, 0), 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMorph: { value: 0 },
    }),
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
  }, [size, uniforms])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial

    // Smooth mouse lerp
    mouseSmooth.current.lerp(targetMouse.current, 0.08)

    // Update uniforms
    mat.uniforms.uTime.value = state.clock.getElapsedTime()
    mat.uniforms.uMouse.value.copy(mouseSmooth.current)
    mat.uniforms.uScroll.value = scrollRef.current

    // Morph oscillates on sine wave: sin(uTime * 0.3) * 0.5 + 0.5
    const morphVal = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.5 + 0.5
    mat.uniforms.uMorph.value = morphVal
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={raymarchingVertexShader}
        fragmentShader={raymarchingFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

function BloomEffect() {
  const { gl, scene, camera, size } = useThree()

  const composer = useMemo(() => {
    const comp = new EffectComposer(gl)
    const renderPass = new RenderPass(scene, camera)
    comp.addPass(renderPass)

    // UnrealBloomPass with threshold: 0.6, strength: 1.2, radius: 0.4 per masterplan
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.2, // strength
      0.4, // radius
      0.6  // threshold
    )
    comp.addPass(bloomPass)
    return comp
  }, [gl, scene, camera, size])

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useFrame(() => {
    composer.render()
  }, 1)

  return null
}

export const HeroSdfCanvas: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [hasWebGlError, setHasWebGlError] = useState(false)

  // IntersectionObserver to pause rendering when hero is out of view
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  if (prefersReducedMotion || hasWebGlError) {
    // Accessible fallback: static sleek wireframe svg
    return (
      <div
        ref={containerRef}
        className="absolute right-0 top-0 w-full lg:w-[55vw] h-full pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-[#caff00]/25 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border border-[#caff00]/40 border-dashed animate-spin-slow" />
          <div className="w-48 h-48 rounded-full bg-[#caff00]/10 filter blur-2xl" />
          <span className="font-mono text-xs text-[#caff00]/60 tracking-widest">[ SDF ENGINE READY ]</span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 w-full lg:w-[55vw] h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.75 : [1, 1.75]}
        camera={{ position: [0, 0, 1], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        onError={() => setHasWebGlError(true)}
      >
        <RaymarchedSculpture />
        <BloomEffect />
      </Canvas>
    </div>
  )
}
