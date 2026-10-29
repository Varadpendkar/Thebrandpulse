import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface AnatomyPartDef {
  id: string
  name: string
  spec: string
  pos: [number, number, number]       // Resting position in isometric space
  implodePos: [number, number, number] // Position when collapsing toward center (0, 0, 0)
  explodePos: [number, number, number] // Position when flying in from off-screen
  geomType: 'box' | 'cylinder' | 'ring' | 'columns' | 'canopy'
  geomArgs: number[]
  rotation?: [number, number, number]
}

export interface ServiceModelDef {
  id: string
  title: string
  subtitle: string
  parts: AnatomyPartDef[]
}

export const SERVICE_ANATOMY_MODELS: Record<string, ServiceModelDef> = {
  'ai-agents': {
    id: 'ai-agents',
    title: 'NEURAL PROCESSOR DIE',
    subtitle: 'EXPLODED SILICON ARCHITECTURE',
    parts: [
      {
        id: 'silicon-die',
        name: 'LLM Silicon Die',
        spec: '4nm Heterogeneous Compute Die',
        pos: [0, -0.6, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'box',
        geomArgs: [2.6, 0.14, 2.6],
      },
      {
        id: 'vector-embeddings',
        name: 'Vector Embeddings Core',
        spec: '1536-dim High-Bandwidth Array',
        pos: [0, -0.15, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.2, 0, 2.0],
        geomType: 'columns',
        geomArgs: [2.2, 0.28, 2.2],
      },
      {
        id: 'rag-pipeline',
        name: 'RAG Memory Bus',
        spec: 'Sub-millisecond Retrieval Interconnect',
        pos: [0, 0.35, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.2, 0, -2.0],
        geomType: 'box',
        geomArgs: [2.1, 0.12, 2.1],
      },
      {
        id: 'heat-spreader',
        name: 'Thermal Canopy',
        spec: 'Vented Vapor-Chamber Heat Spreader',
        pos: [0, 0.85, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.4, 0.16, 2.4],
      },
      {
        id: 'output-gate',
        name: 'Output Guardrail Gate',
        spec: 'Latency-Budgeted Semantic Validator',
        pos: [1.35, -0.4, 0.9],
        implodePos: [0, 0, 0],
        explodePos: [3.5, -1.0, 3.5],
        geomType: 'box',
        geomArgs: [0.7, 0.25, 0.5],
      },
    ],
  },
  'web-platforms': {
    id: 'web-platforms',
    title: 'BROWSER VIEWPORT STACK',
    subtitle: 'DECONSTRUCTED CLIENT ARCHITECTURE',
    parts: [
      {
        id: 'dns-ssl',
        name: 'DNS & SSL Security Shield',
        spec: 'Anycast DNS + TLS 1.3 Termination',
        pos: [0, 0.95, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'box',
        geomArgs: [2.5, 0.1, 1.6],
      },
      {
        id: 'edge-cdn',
        name: 'Edge CDN Slab',
        spec: 'Global Micro-Cache Network',
        pos: [0, 0.5, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.2, 0.5, 0],
        geomType: 'box',
        geomArgs: [2.6, 0.12, 1.7],
      },
      {
        id: 'api-layer',
        name: 'Async API Data Bus',
        spec: 'Hydrated GraphQL / REST Mesh',
        pos: [0, 0.05, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.2, 0.05, 0],
        geomType: 'box',
        geomArgs: [2.6, 0.12, 1.7],
      },
      {
        id: 'react-tree',
        name: 'React 18 Component Tree',
        spec: 'Zero-CLS Concurrent Reconciliation',
        pos: [0, -0.4, 0],
        implodePos: [0, 0, 0],
        explodePos: [-2.5, -2.5, 0],
        geomType: 'columns',
        geomArgs: [2.4, 0.22, 1.5],
      },
      {
        id: 'ui-glass',
        name: 'Rendered Glass Surface',
        spec: 'WebGL 60FPS Presentation Plane',
        pos: [0, -0.85, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.8, 0.06, 1.8],
      },
    ],
  },
  'data-pipelines': {
    id: 'data-pipelines',
    title: 'PIPELINE CORE CYLINDER',
    subtitle: 'CROSS-SECTION DATA ENGINE',
    parts: [
      {
        id: 'ingest-nozzle',
        name: 'Raw Ingestion Funnel',
        spec: 'High-Throughput Streaming Ingress',
        pos: [0, 0.9, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'ring',
        geomArgs: [1.25, 0.9, 0.22, 32],
      },
      {
        id: 'transform-cog',
        name: 'Transformation ETL Core',
        spec: 'Vectorized Polars / DuckDB Compute',
        pos: [0, 0.4, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.2, 0.4, 0],
        geomType: 'cylinder',
        geomArgs: [1.1, 1.1, 0.25, 12],
      },
      {
        id: 'warehouse-disks',
        name: 'Lakehouse Storage Platters',
        spec: 'Partitioned Parquet Columnar Storage',
        pos: [0, -0.15, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.2, -0.15, 0],
        geomType: 'cylinder',
        geomArgs: [1.3, 1.3, 0.28, 32],
      },
      {
        id: 'query-engine',
        name: 'Radiating Query Core',
        spec: 'Sub-second OLAP Aggregation',
        pos: [0, -0.65, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'columns',
        geomArgs: [1.0, 0.35, 1.0],
      },
      {
        id: 'dashboard-pane',
        name: 'Real-time Telemetry Glass',
        spec: 'Executive Real-Time Intelligence',
        pos: [1.1, 0.2, 1.1],
        implodePos: [0, 0, 0],
        explodePos: [3.0, 1.5, 3.0],
        geomType: 'canopy',
        geomArgs: [1.3, 0.05, 0.9],
        rotation: [-0.3, 0.4, 0],
      },
    ],
  },
  'uiux-engineering': {
    id: 'uiux-engineering',
    title: 'DESIGN SYSTEM STACK',
    subtitle: 'DECONSTRUCTED PRODUCT SYSTEM',
    parts: [
      {
        id: 'screen-glass',
        name: 'Front Glass Screen',
        spec: 'Cyber-Brutalist Micro-Interactions',
        pos: [0, 0.9, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'canopy',
        geomArgs: [1.5, 0.05, 2.7],
      },
      {
        id: 'typography-system',
        name: 'Typography Hierarchy Layer',
        spec: 'Fluid Monospace & Display Type',
        pos: [0, 0.45, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.0, 0.45, 0],
        geomType: 'box',
        geomArgs: [1.4, 0.1, 2.5],
      },
      {
        id: 'color-palette',
        name: 'Spectral Color Tokens',
        spec: 'High-Contrast #CAFF00 & Noir Slabs',
        pos: [0, 0.0, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.0, 0.0, 0],
        geomType: 'columns',
        geomArgs: [1.4, 0.18, 2.4],
      },
      {
        id: 'component-library',
        name: 'Atomic UI Primitives',
        spec: 'Stateful Accessible Component Set',
        pos: [0, -0.45, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.0, -0.45, 0],
        geomType: 'box',
        geomArgs: [1.5, 0.14, 2.6],
      },
      {
        id: 'pcb-base',
        name: 'Code-Design Handoff PCB',
        spec: 'Direct Token-to-Tailwind Pipeline',
        pos: [0, -0.9, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'canopy',
        geomArgs: [1.6, 0.08, 2.8],
      },
    ],
  },
  'cloud-devops': {
    id: 'cloud-devops',
    title: 'KUBERNETES CLUSTER RACK',
    subtitle: 'ORCHESTRATED INFRASTRUCTURE',
    parts: [
      {
        id: 'cloud-canopy',
        name: 'Multi-Region Cloud Canopy',
        spec: 'AWS / Vercel Edge Global Topology',
        pos: [0, 0.95, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.5, 0.12, 2.0],
      },
      {
        id: 'pod-instances',
        name: 'Containerized Pods',
        spec: 'Auto-Healing Replicated Instances',
        pos: [0, 0.45, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.2, 0.45, 0],
        geomType: 'columns',
        geomArgs: [2.2, 0.35, 1.8],
      },
      {
        id: 'load-balancer',
        name: 'Ingress Load Balancer',
        spec: 'Zero-Downtime Traffic Shaping',
        pos: [0, -0.05, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.2, -0.05, 0],
        geomType: 'box',
        geomArgs: [2.4, 0.12, 1.9],
      },
      {
        id: 'db-cluster',
        name: 'Replicated Database Cluster',
        spec: 'Primary + Read Replicas with Auto-Failover',
        pos: [0, -0.55, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.0, -2.5, 0],
        geomType: 'cylinder',
        geomArgs: [0.9, 0.9, 0.35, 24],
      },
      {
        id: 'cicd-ribbon',
        name: 'CI/CD Automated Ribbon',
        spec: 'Hermetic Build -> Lint -> Deploy Pipeline',
        pos: [0, -0.95, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.6, 0.08, 2.1],
      },
    ],
  },
  'backend-apis': {
    id: 'backend-apis',
    title: 'MICROSERVICES & API MESH',
    subtitle: 'DISTRIBUTED LOW-LATENCY FABRIC',
    parts: [
      {
        id: 'api-gateway',
        name: 'FastAPI Ingress Gateway',
        spec: 'Sub-10ms Async Gateway & JWT Auth',
        pos: [0, 0.8, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'box',
        geomArgs: [2.4, 0.12, 2.0],
      },
      {
        id: 'queue-bus',
        name: 'Async Background Queue',
        spec: 'Celery / Redis Distributed Task Matrix',
        pos: [0, 0.3, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.0, 0.3, 0],
        geomType: 'columns',
        geomArgs: [2.1, 0.25, 1.7],
      },
      {
        id: 'cache-layer',
        name: 'Redis In-Memory Cache',
        spec: 'Low-Latency Cache-Aside Strategy',
        pos: [0, -0.2, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.0, -0.2, 0],
        geomType: 'box',
        geomArgs: [2.3, 0.14, 1.9],
      },
      {
        id: 'core-microservices',
        name: 'Stateless Service Slabs',
        spec: 'Dockerized Microservices with gRPC',
        pos: [0, -0.7, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.5, 0.14, 2.1],
      },
    ],
  },
  'advisory': {
    id: 'advisory',
    title: 'TECHNICAL ARCHITECTURE AUDIT',
    subtitle: 'FRACTIONAL CTO STRATEGY MATRIX',
    parts: [
      {
        id: 'strategy-lid',
        name: 'Executive Tech Roadmap',
        spec: 'Model Selection & Feasibility Plan',
        pos: [0, 0.8, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, 3.5, 0],
        geomType: 'canopy',
        geomArgs: [2.3, 0.1, 2.3],
      },
      {
        id: 'cost-modeling',
        name: 'Cost & Latency Optimizer',
        spec: 'Token-Cost Modeling & GPU Budgeting',
        pos: [0, 0.3, 0],
        implodePos: [0, 0, 0],
        explodePos: [3.0, 0.3, 0],
        geomType: 'columns',
        geomArgs: [2.0, 0.28, 2.0],
      },
      {
        id: 'security-audit',
        name: 'Zero-Trust Security Core',
        spec: 'Hermetic Secrets & OWASP LLM Defense',
        pos: [0, -0.25, 0],
        implodePos: [0, 0, 0],
        explodePos: [-3.0, -0.25, 0],
        geomType: 'box',
        geomArgs: [2.1, 0.14, 2.1],
      },
      {
        id: 'audit-pedestal',
        name: 'Production Ready Signoff',
        spec: 'High-Status Market Launch Readiness',
        pos: [0, -0.75, 0],
        implodePos: [0, 0, 0],
        explodePos: [0, -3.5, 0],
        geomType: 'cylinder',
        geomArgs: [1.2, 1.2, 0.22, 32],
      },
    ],
  },
}

interface AnatomyPartMeshProps {
  part: AnatomyPartDef
  currentPos: THREE.Vector3
  isHovered: boolean
  onHover: (id: string | null) => void
}

function AnatomyPartMesh({ part, currentPos, isHovered, onHover }: AnatomyPartMeshProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.position.lerp(currentPos, 0.12)
    const targetScale = isHovered ? 1.08 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)
  })

  // Geometry selector
  const geometry = useMemo(() => {
    switch (part.geomType) {
      case 'box':
        return <boxGeometry args={part.geomArgs as [number, number, number]} />
      case 'cylinder':
        return <cylinderGeometry args={part.geomArgs as [number, number, number, number]} />
      case 'ring':
        return (
          <ringGeometry
            args={[part.geomArgs[0] * 0.7, part.geomArgs[0], part.geomArgs[3] || 32]}
          />
        )
      case 'canopy':
        return <boxGeometry args={part.geomArgs as [number, number, number]} />
      case 'columns':
        return <boxGeometry args={part.geomArgs as [number, number, number]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }, [part])

  return (
    <group
      ref={meshRef}
      rotation={part.rotation || [0, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(part.id)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover(null)
      }}
    >
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={isHovered ? '#222222' : '#141414'}
          roughness={0.32}
          metalness={0.78}
          emissive={isHovered ? '#caff00' : '#caff00'}
          emissiveIntensity={isHovered ? 0.65 : 0.12}
        />
      </mesh>

      {/* Thin wireframe edge contour */}
      <lineSegments>
        <edgesGeometry
          args={[
            part.geomType === 'cylinder'
              ? new THREE.CylinderGeometry(
                  part.geomArgs[0],
                  part.geomArgs[1],
                  part.geomArgs[2],
                  part.geomArgs[3] || 16
                )
              : new THREE.BoxGeometry(
                  part.geomArgs[0],
                  part.geomArgs[1],
                  part.geomArgs[2]
                ),
          ]}
        />
        <lineBasicMaterial
          color={isHovered ? '#caff00' : '#44ff00'}
          linewidth={1.5}
          transparent={true}
          opacity={isHovered ? 0.95 : 0.35}
        />
      </lineSegments>
    </group>
  )
}

function AnatomySceneContent({
  modelDef,
  hoveredPartId,
  setHoveredPartId,
  onPositionsUpdate,
}: {
  modelDef: ServiceModelDef
  hoveredPartId: string | null
  setHoveredPartId: (id: string | null) => void
  onPositionsUpdate: (positions: Record<string, { x: number; y: number }>) => void
}) {
  const { camera, size } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const [animState, setAnimState] = useState<'assembled' | 'imploding' | 'exploding'>('exploding')
  const prevModelIdRef = useRef(modelDef.id)

  // Track part current positions
  const currentPositions = useRef<Record<string, THREE.Vector3>>({})

  // Initialize or transition
  useEffect(() => {
    if (prevModelIdRef.current !== modelDef.id) {
      // 1. Current object implodes toward center (0.35s)
      setAnimState('imploding')
      const implodeTimer = setTimeout(() => {
        prevModelIdRef.current = modelDef.id
        // 2. New object flies in from screen edges (0.7s)
        setAnimState('exploding')
        const explodeTimer = setTimeout(() => {
          setAnimState('assembled')
        }, 700)
        return () => clearTimeout(explodeTimer)
      }, 350)
      return () => clearTimeout(implodeTimer)
    } else {
      setAnimState('assembled')
    }
  }, [modelDef.id])

  // Setup initial positions
  useEffect(() => {
    modelDef.parts.forEach((p) => {
      if (!currentPositions.current[p.id]) {
        currentPositions.current[p.id] = new THREE.Vector3(...p.explodePos)
      }
    })
  }, [modelDef])

  // Frame loop: update positions & compute projected screen coordinates for HTML overlay
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Idle breathing on group scale ±1.8% on 4s sine
    if (groupRef.current) {
      const breath = 1.0 + Math.sin(time * 1.57) * 0.018
      groupRef.current.scale.set(breath, breath, breath)
      // Slow subtle orbit
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(35) + Math.sin(time * 0.4) * 0.06
      groupRef.current.rotation.x = THREE.MathUtils.degToRad(22) + Math.cos(time * 0.3) * 0.03
    }

    const screenPosMap: Record<string, { x: number; y: number }> = {}

    modelDef.parts.forEach((p) => {
      let target: [number, number, number]
      if (animState === 'imploding') {
        target = p.implodePos
      } else if (animState === 'exploding') {
        target = p.pos
      } else {
        target = p.pos
      }

      if (!currentPositions.current[p.id]) {
        currentPositions.current[p.id] = new THREE.Vector3(...target)
      } else {
        currentPositions.current[p.id].lerp(new THREE.Vector3(...target), 0.1)
      }

      // Project 3D coordinate to screen percentage
      const worldPos = currentPositions.current[p.id].clone()
      if (groupRef.current) {
        worldPos.applyMatrix4(groupRef.current.matrixWorld)
      }
      const proj = worldPos.project(camera)
      const px = (proj.x * 0.5 + 0.5) * size.width
      const py = (-(proj.y * 0.5) + 0.5) * size.height
      screenPosMap[p.id] = { x: px, y: py }
    })

    onPositionsUpdate(screenPosMap)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {modelDef.parts.map((part) => (
        <AnatomyPartMesh
          key={part.id}
          part={part}
          currentPos={currentPositions.current[part.id] || new THREE.Vector3(...part.pos)}
          isHovered={hoveredPartId === part.id}
          onHover={setHoveredPartId}
        />
      ))}
    </group>
  )
}

function CursorFollowingLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { mouse, viewport } = useThree()

  useFrame(() => {
    if (!lightRef.current) return
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    lightRef.current.position.set(x, y, 3.5)
  })

  return <pointLight ref={lightRef} color="#caff00" intensity={0.4} distance={8} />
}

export const ServicesAnatomyCanvas: React.FC<{
  activeServiceId: string
  onSelectPart?: (partName: string) => void
}> = ({ activeServiceId, onSelectPart }) => {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null)
  const [partScreenCoords, setPartScreenCoords] = useState<Record<string, { x: number; y: number }>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const activeModel = SERVICE_ANATOMY_MODELS[activeServiceId] || SERVICE_ANATOMY_MODELS['ai-agents']

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl text-center">
        <span className="font-mono text-xs text-[#caff00] tracking-widest uppercase mb-2">
          [ {activeModel.subtitle} ]
        </span>
        <h4 className="font-display font-bold text-xl text-white mb-6">{activeModel.title}</h4>
        <div className="space-y-3 w-full max-w-sm text-left">
          {activeModel.parts.map((p) => (
            <div key={p.id} className="p-3 bg-[#111111] border border-[#222222] rounded flex justify-between">
              <span className="font-mono text-xs text-white">{p.name}</span>
              <span className="font-mono text-[10px] text-[#caff00]">{p.spec}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] bg-[#070707] border border-[#1c1c1c] rounded-2xl overflow-hidden select-none"
    >
      {/* Top HUD bar with Model Specification */}
      <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div>
          <span className="font-mono text-[10px] text-[#caff00] tracking-widest uppercase block">
            [ 3D ANATOMY ENGINE ]
          </span>
          <span className="font-display font-bold text-sm tracking-tight text-white">
            {activeModel.title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#caff00] animate-pulse" />
          <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase">
            EXPLODED ISOMETRIC
          </span>
        </div>
      </div>

      {/* Persistent Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight color="#111111" intensity={0.8} />
        <directionalLight color="#ffffff" intensity={1.2} position={[3, 4, 2]} />
        <CursorFollowingLight />

        <AnatomySceneContent
          modelDef={activeModel}
          hoveredPartId={hoveredPartId}
          setHoveredPartId={setHoveredPartId}
          onPositionsUpdate={setPartScreenCoords}
        />
      </Canvas>

      {/* Floating 3D Connected Leader Badges (HTML Overlay) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {activeModel.parts.map((part, idx) => {
          const coords = partScreenCoords[part.id]
          if (!coords) return null

          const isHovered = hoveredPartId === part.id
          const isLeft = idx % 2 === 0
          const badgeX = isLeft ? 24 : undefined
          const badgeRight = !isLeft ? 24 : undefined
          const badgeY = 90 + idx * 75

          return (
            <div
              key={part.id}
              className="absolute pointer-events-auto transition-transform duration-200"
              style={{
                left: badgeX,
                right: badgeRight,
                top: badgeY,
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredPartId(part.id)}
              onMouseLeave={() => setHoveredPartId(null)}
              onClick={() => onSelectPart?.(part.name)}
            >
              <div
                className={`p-2.5 rounded-lg border backdrop-blur-md transition-all duration-300 max-w-[210px] cursor-pointer ${
                  isHovered
                    ? 'border-[#caff00] bg-[#12140a]/90 shadow-[0_0_20px_rgba(202,255,0,0.25)]'
                    : 'border-[#222222]/80 bg-[#0c0c0c]/80 hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-[11px] font-bold ${isHovered ? 'text-[#caff00]' : 'text-white'}`}>
                    {part.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#666666]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="font-sans text-[10px] text-[#999999] leading-snug">
                  {part.spec}
                </p>
              </div>

              {/* Connecting leader line indicator */}
              <div
                className={`h-[1px] w-8 transition-colors duration-200 ${
                  isHovered ? 'bg-[#caff00]' : 'bg-[#333333]'
                }`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  [isLeft ? 'left' : 'right']: '100%',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between text-[10px] font-mono text-[#666666] border-t border-[#1c1c1c] pt-2 pointer-events-none">
        <span>INTERACTION: HOVER / CLICK PARTS</span>
        <span className="text-[#888888]">{activeModel.parts.length} COMPONENTS EXPLODED</span>
      </div>
    </div>
  )
}
