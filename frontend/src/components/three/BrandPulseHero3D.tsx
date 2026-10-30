import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function HeroObject({
  isMobile,
  mousePos,
}: {
  isMobile: boolean
  mousePos: React.MutableRefObject<{ x: number; y: number }>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  // Cursor rotation interpolation state (stored in ref to prevent re-renders)
  const curRot = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    // 1. Direct ref mutation with frame-delta for silky smooth 60/120fps rotation
    if (torusRef.current) {
      torusRef.current.rotation.y += delta * 0.25
      torusRef.current.rotation.z += delta * 0.08
    }

    if (octaRef.current) {
      octaRef.current.rotation.x += delta * 0.15
      octaRef.current.rotation.y -= delta * 0.2
    }

    // 2. Cursor follow with gentle lerp
    if (groupRef.current) {
      const targetX = mousePos.current.y * 0.35
      const targetY = mousePos.current.x * 0.45
      curRot.current.x += (targetX - curRot.current.x) * 0.05
      curRot.current.y += (targetY - curRot.current.y) * 0.05

      groupRef.current.rotation.x = curRot.current.x
      groupRef.current.rotation.y += delta * 0.08 + (curRot.current.y - groupRef.current.rotation.y) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Torus knot — the energy ring ─────────────────────────── */}
      <mesh ref={torusRef}>
        <torusKnotGeometry
          args={[
            1.2,
            0.35,
            isMobile ? 80 : 180,
            isMobile ? 16 : 32,
            2,
            3,
          ]}
        />
        <MeshTransmissionMaterial
          backside
          samples={isMobile ? 2 : 4}
          thickness={0.5}
          roughness={0.05}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.06}
          color="#000000"
          emissive="#CAFF00"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* ── Octahedron star — crystal points ──────────────────────── */}
      <mesh ref={octaRef} scale={1.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#050505"
          emissive="#CAFF00"
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.05}
          wireframe={true}
        />
      </mesh>

      {/* ── Center Point Light — intense lime core glow ──────────── */}
      <pointLight color="#CAFF00" intensity={12} distance={8} />

      {/* ── Orbiting Spheres — glass orbs around the core ────────── */}
      {!isMobile && <OrbitingSpheres />}
    </group>
  )
}

function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.2
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.3
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const r = 2.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + i) * r,
              Math.sin(i * 1.3) * 0.8,
              Math.sin(angle + i) * r,
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <MeshTransmissionMaterial
              transmission={0.95}
              roughness={0.0}
              thickness={0.3}
              color="#CAFF00"
              emissive="#CAFF00"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
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

  // Normalized cursor tracker (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      mousePos.current = { x: nx, y: ny }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Static fallback for reduced motion or WebGL error
  if (prefersReducedMotion || hasError) {
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
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
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
        <ambientLight intensity={0.15} />
        <pointLight position={[2, 3, 2]} color="#CAFF00" intensity={8} distance={15} />

        {/* Hero Object with Torus Knot + Octahedron + Orbiting Spheres */}
        <HeroObject isMobile={isMobile} mousePos={mousePos} />

        {/* Postprocessing Bloom */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            intensity={1.4}
            radius={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
