import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SHARD_COUNT = 300

interface ShardData {
  id: number
  currentPos: THREE.Vector3
  targetPos: THREE.Vector3
  scale: number
  targetScale: number
  noiseOffset: number
  baseRadius: number
  floor: number
}

// Generate the 4 mathematical target shapes for 300 shards
function computeTargetPositions() {
  const discoverTargets: THREE.Vector3[] = []
  const planTargets: THREE.Vector3[] = []
  const buildTargets: THREE.Vector3[] = []
  const scaleTargets: THREE.Vector3[] = []
  const isIntersections: boolean[] = []
  const floors: number[] = []

  // Golden ratio angle
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < SHARD_COUNT; i++) {
    // 1. DISCOVER: Radar dish paraboloid pointing left/forward
    const r = Math.sqrt(i / (SHARD_COUNT - 1)) * 2.8 + 0.1
    const theta = i * goldenAngle
    const zCurve = -0.32 * (r * r)

    // Raw paraboloid point
    const dishP = new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), zCurve)
    // Rotate to face left (-X) and slightly towards camera
    dishP.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.7)
    dishP.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.25)
    discoverTargets.push(dishP)

    // 2. PLAN: 3D Isometric wireframe blueprint grid
    // 6x6x8 grid points
    const gx = ((i % 6) - 2.5) * 0.7
    const gy = ((Math.floor(i / 6) % 6) - 2.5) * 0.7
    const gz = ((Math.floor(i / 36) % 8) - 3.5) * 0.55
    const isNode = i % 5 === 0
    isIntersections.push(isNode)
    planTargets.push(new THREE.Vector3(gx, gy, gz))

    // 3. BUILD: Ascending shard tower (8 floors, ~38 shards per floor)
    const floor = Math.floor(i / 38)
    floors.push(floor)
    const floorAngle = (i % 38) * ((Math.PI * 2) / 38)
    const floorRadius = 1.45 * (1.0 - floor * 0.045)
    const bx = Math.cos(floorAngle) * floorRadius
    const bz = Math.sin(floorAngle) * floorRadius
    const by = (floor - 3.5) * 0.58
    buildTargets.push(new THREE.Vector3(bx, by, bz))

    // 4. SCALE: Fractal multiplication (9 towers in 3x3 array)
    const towerIdx = i % 9
    const col = (towerIdx % 3) - 1 // -1, 0, 1
    const row = Math.floor(towerIdx / 3) - 1 // -1, 0, 1
    const sx = bx * 0.55 + col * 2.4
    const sz = bz * 0.55 + row * 2.4
    const sy = by * 0.55
    scaleTargets.push(new THREE.Vector3(sx, sy, sz))
  }

  return { discoverTargets, planTargets, buildTargets, scaleTargets, isIntersections, floors }
}

function ShardInstancedMesh({
  scrollProgress,
}: {
  scrollProgress: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const planRotationRef = useRef(0)

  const targets = useMemo(() => computeTargetPositions(), [])

  // Initialize shards state
  const shards = useMemo<ShardData[]>(() => {
    return Array.from({ length: SHARD_COUNT }, (_, i) => ({
      id: i,
      currentPos: targets.discoverTargets[i].clone(),
      targetPos: targets.discoverTargets[i].clone(),
      scale: 1,
      targetScale: 1,
      noiseOffset: Math.random() * 100,
      baseRadius: targets.discoverTargets[i].length(),
      floor: targets.floors[i],
    }))
  }, [targets])

  const colorLime = useMemo(() => new THREE.Color('#caff00'), [])
  const colorDark = useMemo(() => new THREE.Color('#161815'), [])
  const colorPulse = useMemo(() => new THREE.Color('#e5ff80'), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Map scroll progress (0.0 to 1.0) across 4 steps:
    // 0.00 - 0.25: Step 0 (DISCOVER)
    // 0.25 - 0.50: Step 1 (PLAN)
    // 0.50 - 0.75: Step 2 (BUILD)
    // 0.75 - 1.00: Step 3 (SCALE)
    const stepProgress = Math.min(Math.max(scrollProgress, 0), 0.999) * 4
    const currentStep = Math.floor(stepProgress)
    const subProgress = stepProgress - currentStep

    // Step 0: Radar Pulse Wave calculation
    const pulseCycle = (time * 0.6) % 1.6
    const pulseRadius = pulseCycle * 2.2

    // Step 1: Continuous slow grid rotation
    planRotationRef.current += 0.002
    const rotEuler = new THREE.Euler(0.4, planRotationRef.current, 0.25)
    const rotMatrix = new THREE.Matrix4().makeRotationFromEuler(rotEuler)

    // Step 2: Completed floors sweep
    const activeBuildFloor = Math.floor(subProgress * 8)

    for (let i = 0; i < SHARD_COUNT; i++) {
      const shard = shards[i]
      let destPos = new THREE.Vector3()
      let destScale = 1.0
      let isLit = false

      if (currentStep === 0) {
        // Step 0: DISCOVER — Radar dish
        destPos.copy(targets.discoverTargets[i])

        // Circular pulse scatter wave
        const distFromCenter = targets.discoverTargets[i].length()
        const diff = Math.abs(distFromCenter - pulseRadius)
        if (diff < 0.45) {
          const force = (1.0 - diff / 0.45) * 0.45
          const scatterDir = targets.discoverTargets[i].clone().normalize()
          destPos.addScaledVector(scatterDir, force)
          isLit = true
        }
      } else if (currentStep === 1) {
        // Step 1: PLAN — 3D isometric blueprint grid
        const baseGridP = targets.planTargets[i].clone()
        baseGridP.applyMatrix4(rotMatrix)
        destPos.copy(baseGridP)

        if (targets.isIntersections[i]) {
          destScale = 1.45
          isLit = true
        } else {
          destScale = 0.85
        }
      } else if (currentStep === 2) {
        // Step 2: BUILD — Stacking tower
        const isBuilt = shard.floor <= activeBuildFloor
        if (isBuilt) {
          destPos.copy(targets.buildTargets[i])
          // Floor sweep flash
          if (shard.floor === activeBuildFloor) {
            isLit = true
          }
        } else {
          // Unbuilt floors hover scattered above, converging downward
          const scatter = targets.buildTargets[i].clone()
          scatter.y += 2.2 + Math.sin(time * 2 + shard.noiseOffset) * 0.3
          scatter.x *= 1.4
          scatter.z *= 1.4
          destPos.copy(scatter)
          destScale = 0.7
        }
      } else {
        // Step 3: SCALE — Fractal multiplication (1 -> 4 -> 9 towers)
        const centerPos = targets.buildTargets[i]
        const multiPos = targets.scaleTargets[i]
        // Interpolate between single center tower and 9 multiplied towers
        destPos.lerpVectors(centerPos, multiPos, Math.min(subProgress * 1.5, 1.0))

        const towerIdx = i % 9
        if (towerIdx === 4) {
          // Center primary tower
          destScale = 1.0
          isLit = true
        } else {
          // Outer clones scale down to 0.7
          destScale = 0.72
        }
      }

      // Idle breathing noise drift
      const idleX = Math.sin(time * 1.2 + shard.noiseOffset) * 0.03
      const idleY = Math.cos(time * 1.4 + shard.noiseOffset) * 0.03
      const idleZ = Math.sin(time * 0.8 + shard.noiseOffset) * 0.03
      destPos.x += idleX
      destPos.y += idleY
      destPos.z += idleZ

      // Lerp current position and scale toward target
      shard.currentPos.lerp(destPos, 0.09)
      shard.scale = THREE.MathUtils.lerp(shard.scale, destScale, 0.12)

      // Set matrix
      dummy.position.copy(shard.currentPos)
      dummy.rotation.set(
        time * 0.3 + shard.noiseOffset,
        time * 0.2 + shard.noiseOffset * 0.5,
        time * 0.15
      )
      dummy.scale.set(shard.scale, shard.scale, shard.scale)
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Dynamic color tint per instance
      if (isLit) {
        meshRef.current.setColorAt(i, colorPulse)
      } else if (i % 7 === 0) {
        meshRef.current.setColorAt(i, colorLime)
      } else {
        meshRef.current.setColorAt(i, colorDark)
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, SHARD_COUNT]}
      frustumCulled={false}
    >
      {/* Faceted glass tetrahedron shard geometry */}
      <tetrahedronGeometry args={[0.16, 0]} />
      <meshStandardMaterial
        color="#121212"
        roughness={0.22}
        metalness={0.88}
        emissive="#caff00"
        emissiveIntensity={0.28}
      />
    </instancedMesh>
  )
}

export const ProcessShardScene: React.FC<{
  scrollProgress: number
}> = ({ scrollProgress }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-[#caff00]/30 border-dashed animate-spin-slow flex items-center justify-center">
          <span className="font-mono text-xs text-[#caff00]">[ PROCESS ENGINE ACTIVE ]</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight color="#111111" intensity={0.9} />
        <directionalLight color="#ffffff" intensity={1.4} position={[4, 5, 3]} />
        <pointLight color="#caff00" intensity={0.6} position={[0, 0, 4]} distance={12} />
        <ShardInstancedMesh scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}

