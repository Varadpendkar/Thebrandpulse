import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface OrbitSphereConfig {
  a: number
  b: number
  c: number
  speed: number
  phase: number
  radius: number
}

function HeroInterpenetratingCore({
  isMobile,
  mousePos,
}: {
  isMobile: boolean
  mousePos: React.MutableRefObject<{ x: number; y: number }>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const innerTorusRef = useRef<THREE.Mesh>(null)
  const outerOctaRef = useRef<THREE.Mesh>(null)
  const spheresRef = useRef<THREE.Group>(null)

  // Spring smoothed cursor rotation
  const curRot = useRef({ x: 0, y: 0 })

  // 6 Orbiting sphere configs with varied elliptical axes, speeds, and phases
  const sphereConfigs = useMemo<OrbitSphereConfig[]>(
    () => [
      { a: 2.2, b: 2.0, c: 0.8, speed: 0.7, phase: 0.0, radius: 0.09 },
      { a: 2.4, b: 1.8, c: -0.6, speed: -0.55, phase: 1.1, radius: 0.07 },
      { a: 2.6, b: 2.2, c: 0.5, speed: 0.8, phase: 2.2, radius: 0.1 },
      { a: 2.1, b: 2.5, c: -0.7, speed: -0.65, phase: 3.3, radius: 0.08 },
      { a: 2.5, b: 1.9, c: 0.9, speed: 0.6, phase: 4.4, radius: 0.09 },
      { a: 2.3, b: 2.3, c: -0.5, speed: -0.75, phase: 5.5, radius: 0.07 },
    ],
    []
  )

  // MeshPhysicalMaterial — dark glass per masterplan
  // transmission: 0.6, roughness: 0.1, metalness: 0.9
  const darkGlassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0d0d0d'),
        emissive: new THREE.Color('#caff00'),
        emissiveIntensity: 0.15,
        transmission: 0.6,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.92,
        ior: 1.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      }),
    []
  )

  const octaWireMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141414'),
        emissive: new THREE.Color('#caff00'),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
      }),
    []
  )

  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#161616'),
        emissive: new THREE.Color('#caff00'),
        emissiveIntensity: 0.6,
        roughness: 0.15,
        metalness: 0.85,
      }),
    []
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Continuous slow rotation around yAxis: 0.003 per frame
      groupRef.current.rotation.y += 0.003

      // Cursor: rotation follows cursor with lerp 0.05
      const targetRotX = mousePos.current.y * 0.35
      const targetRotY = mousePos.current.x * 0.45
      curRot.current.x += (targetRotX - curRot.current.x) * 0.05
      curRot.current.y += (targetRotY - curRot.current.y) * 0.05

      groupRef.current.rotation.x = curRot.current.x + Math.sin(time * 0.4) * 0.05
      groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.04
    }

    // Counter-rotate the interpenetrating octahedron slightly
    if (outerOctaRef.current) {
      outerOctaRef.current.rotation.x = time * 0.15
      outerOctaRef.current.rotation.z = -time * 0.12
    }

    // Update orbiting spheres along elliptical paths
    if (spheresRef.current && !isMobile) {
      const children = spheresRef.current.children
      for (let i = 0; i < children.length; i++) {
        const conf = sphereConfigs[i]
        if (!conf) continue
        const child = children[i] as THREE.Mesh
        const angle = time * conf.speed + conf.phase
        child.position.x = Math.cos(angle) * conf.a
        child.position.z = Math.sin(angle) * conf.b
        child.position.y = Math.sin(angle * 1.3) * conf.c
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Core TorusKnotGeometry */}
      <mesh
        ref={innerTorusRef}
        material={darkGlassMaterial}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry
          args={[
            1.15, // radius
            0.32, // tube
            isMobile ? 64 : 128, // tubularSegments (halved on mobile)
            isMobile ? 16 : 32,  // radialSegments
            2,
            3,
          ]}
        />
      </mesh>

      {/* 2. Interpenetrating OctahedronGeometry */}
      <mesh
        ref={outerOctaRef}
        material={darkGlassMaterial}
      >
        <octahedronGeometry args={[1.9, isMobile ? 0 : 1]} />
      </mesh>

      {/* Subtle outer wireframe octahedron contour */}
      <mesh
        rotation={[Math.PI / 4, 0, Math.PI / 4]}
        material={octaWireMaterial}
      >
        <octahedronGeometry args={[2.05, 0]} />
      </mesh>

      {/* 3. Orbiting Spheres (removed on mobile) */}
      {!isMobile && (
        <group ref={spheresRef}>
          {sphereConfigs.map((conf, idx) => (
            <mesh key={idx} material={sphereMaterial}>
              <sphereGeometry args={[conf.radius, 16, 16]} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}

function PostprocessingBloom() {
  const { gl, scene, camera, size } = useThree()

  const composer = useMemo(() => {
    const comp = new EffectComposer(gl)
    const renderPass = new RenderPass(scene, camera)
    comp.addPass(renderPass)

    // UnrealBloomPass: threshold: 0.4, strength: 1.2, radius: 0.8 per masterplan
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.2, // strength
      0.8, // radius
      0.4  // threshold
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

export const BrandPulseHero3D: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const mousePos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Track window size for mobile simplification
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cursor tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      mousePos.current = { x: nx, y: ny }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Mobile or Reduced Motion Fallback: static fallback image from Images / public
  if (prefersReducedMotion || (isMobile && hasError)) {
    return (
      <div className="absolute right-0 top-0 w-full lg:w-[55vw] h-full pointer-events-none flex items-center justify-center p-6">
        <img
          src="/hero-fallback.png"
          alt="BrandPulse 3D Core"
          width={800}
          height={800}
          className="max-w-[420px] w-full object-contain filter drop-shadow-[0_0_35px_rgba(202,255,0,0.25)]"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 w-full lg:w-[55vw] h-full pointer-events-none z-0 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        onError={() => setHasError(true)}
      >
        {/* Lighting per Phase 2 spec:
            - One PointLight at position [2, 3, 2] color #CAFF00 intensity 8
            - One ambient light at 0.2
        */}
        <ambientLight color="#ffffff" intensity={0.2} />
        <pointLight position={[2, 3, 2]} color="#caff00" intensity={8} distance={15} />

        {/* Core Interpenetrating Sculpture */}
        <HeroInterpenetratingCore isMobile={isMobile} mousePos={mousePos} />

        {/* Postprocessing UnrealBloomPass */}
        <PostprocessingBloom />
      </Canvas>
    </div>
  )
}
