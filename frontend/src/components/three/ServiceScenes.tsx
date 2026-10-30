import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, Html, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface AnatomyPartConfig {
  position: [number, number, number]
  label: string
  sublabel: string
  geo: React.ReactNode
}

function AnatomyPart({
  position,
  label,
  sublabel,
  geo,
}: AnatomyPartConfig) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.9 : 0.25)
      meshRef.current.rotation.x += delta * (hovered ? 0.4 : 0.1)
    }
  })

  return (
    <Float
      speed={hovered ? 3.5 : 1.6}
      rotationIntensity={hovered ? 0.4 : 0.12}
      floatIntensity={hovered ? 1.5 : 0.6}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        {geo}
        <meshPhysicalMaterial
          color="#050505"
          emissive={hovered ? '#CAFF00' : '#1e3800'}
          emissiveIntensity={hovered ? 2.2 : 0.45}
          metalness={0.92}
          roughness={0.08}
          wireframe={false}
        />
      </mesh>

      {hovered && (
        <Html
          position={[0, 0.75, 0]}
          center
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          <div className="bg-[#050505]/95 border border-[#CAFF00] px-3 py-1.5 rounded shadow-[0_0_20px_rgba(202,255,0,0.4)] backdrop-blur-md">
            <p className="text-[#CAFF00] font-mono text-xs font-bold leading-none mb-1">
              {label}
            </p>
            <p className="text-[#888888] font-mono text-[9px] leading-none">
              {sublabel}
            </p>
          </div>
        </Html>
      )}
    </Float>
  )
}

function ConnectionLines({ points }: { points: [number, number, number][] }) {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(points.flat())
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.LineBasicMaterial({
      color: '#CAFF00',
      transparent: true,
      opacity: 0.45,
    })
    return new THREE.LineSegments(geometry, material)
  }, [points])

  useFrame((_, delta) => {
    if (lineObj) {
      lineObj.rotation.y += delta * 0.08
    }
  })

  return <primitive object={lineObj} />
}

// 1. AI Solutions — Decision Brain
export function AIBrainScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, 0, 0], label: 'Decision Engine', sublabel: 'Autonomous reasoning layer', geo: <sphereGeometry args={[0.55, 32, 32]} /> },
    { position: [-1.4, 0.5, 0], label: 'Data Ingestion', sublabel: 'Multi-source stream sync', geo: <boxGeometry args={[0.38, 0.38, 0.38]} /> },
    { position: [1.4, 0.5, 0], label: 'Feedback Loop', sublabel: 'Reinforcement & self-tuning', geo: <torusGeometry args={[0.28, 0.09, 16, 32]} /> },
    { position: [0, 1.35, 0], label: 'LLM Orchestrator', sublabel: 'Context & semantic routing', geo: <octahedronGeometry args={[0.38, 0]} /> },
    { position: [0, -1.2, 0], label: 'Execution Workers', sublabel: 'Autonomous 24/7 agents', geo: <cylinderGeometry args={[0.26, 0.26, 0.45, 8]} /> },
    { position: [-1.1, -0.75, 0], label: 'Vector Memory', sublabel: 'Sub-millisecond retrieval', geo: <coneGeometry args={[0.28, 0.55, 8]} /> },
    { position: [1.1, -0.75, 0], label: 'Audit Telemetry', sublabel: 'Traceability & compliance', geo: <dodecahedronGeometry args={[0.3, 0]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0, 0], [-1.4, 0.5, 0],
    [0, 0, 0], [1.4, 0.5, 0],
    [0, 0, 0], [0, 1.35, 0],
    [0, 0, 0], [0, -1.2, 0],
    [0, 0, 0], [-1.1, -0.75, 0],
    [0, 0, 0], [1.1, -0.75, 0],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

// 2. Digital Marketing — Signal Tower
export function MarketingScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, -0.2, 0], label: 'Signal Transmitter', sublabel: 'Omnichannel conversion tower', geo: <cylinderGeometry args={[0.35, 0.55, 1.2, 16]} /> },
    { position: [0, 1.1, 0], label: 'Radar Array', sublabel: 'Audience demand scanner', geo: <torusGeometry args={[0.42, 0.08, 16, 32]} /> },
    { position: [-1.4, 0.3, 0], label: 'Paid Acquisition', sublabel: 'Algorithmic ROAS bidding', geo: <boxGeometry args={[0.35, 0.35, 0.35]} /> },
    { position: [1.4, 0.3, 0], label: 'Organic Search', sublabel: 'Authority topic clusters', geo: <octahedronGeometry args={[0.35, 0]} /> },
    { position: [-1.1, -0.9, 0], label: 'Attribution Engine', sublabel: 'Multi-touch pipeline credit', geo: <sphereGeometry args={[0.26, 16, 16]} /> },
    { position: [1.1, -0.9, 0], label: 'Creative Testing', sublabel: 'Dynamic multivariate hooks', geo: <dodecahedronGeometry args={[0.28, 0]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0.5, 0], [0, 1.1, 0],
    [0, 0.2, 0], [-1.4, 0.3, 0],
    [0, 0.2, 0], [1.4, 0.3, 0],
    [0, -0.6, 0], [-1.1, -0.9, 0],
    [0, -0.6, 0], [1.1, -0.9, 0],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

// 3. Product Building — Application Engine
export function ProductScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, 0, 0], label: 'Core Interface', sublabel: 'Ultra-responsive client screen', geo: <boxGeometry args={[1.2, 0.75, 0.12]} /> },
    { position: [0, 0.9, -0.3], label: 'Distributed Backend', sublabel: 'Edge API & microservices', geo: <boxGeometry args={[0.9, 0.35, 0.2]} /> },
    { position: [-1.3, -0.4, 0], label: 'Design System', sublabel: 'Reusable tokenized components', geo: <cylinderGeometry args={[0.28, 0.28, 0.4, 6]} /> },
    { position: [1.3, -0.4, 0], label: 'Security Layer', sublabel: 'OWASP audited authentication', geo: <octahedronGeometry args={[0.35, 0]} /> },
    { position: [0, -1.1, 0.2], label: 'Cloud Pipeline', sublabel: 'Zero-downtime CI/CD deployment', geo: <torusGeometry args={[0.32, 0.08, 16, 32]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0.35, 0], [0, 0.9, -0.3],
    [-0.6, -0.2, 0], [-1.3, -0.4, 0],
    [0.6, -0.2, 0], [1.3, -0.4, 0],
    [0, -0.35, 0], [0, -1.1, 0.2],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

// 4. ERP — Enterprise Gear System
export function ERPScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, 0, 0], label: 'Central Cogwheel', sublabel: 'Master operational backbone', geo: <torusGeometry args={[0.65, 0.22, 16, 32]} /> },
    { position: [-1.3, 0.8, 0], label: 'Supply Chain', sublabel: 'Automated warehouse telemetry', geo: <boxGeometry args={[0.35, 0.35, 0.35]} /> },
    { position: [1.3, 0.8, 0], label: 'General Ledger', sublabel: 'Real-time financial reconcile', geo: <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} /> },
    { position: [-1.4, -0.7, 0], label: 'HR & Payroll', sublabel: 'Role-based access & payroll', geo: <octahedronGeometry args={[0.32, 0]} /> },
    { position: [1.4, -0.7, 0], label: 'Predictive BI', sublabel: 'Executive executive forecasting', geo: <sphereGeometry args={[0.3, 16, 16]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0, 0], [-1.3, 0.8, 0],
    [0, 0, 0], [1.3, 0.8, 0],
    [0, 0, 0], [-1.4, -0.7, 0],
    [0, 0, 0], [1.4, -0.7, 0],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

// 5. CRM — Pipeline Neural Mesh
export function CRMScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, 0, 0], label: 'Customer Mesh Node', sublabel: 'Unified client interaction graph', geo: <icosahedronGeometry args={[0.65, 0]} /> },
    { position: [-1.35, 0.6, 0.2], label: 'Deal Stages', sublabel: 'Automated pipeline progression', geo: <sphereGeometry args={[0.24, 16, 16]} /> },
    { position: [1.35, 0.6, -0.2], label: 'Omni Messaging', sublabel: 'WhatsApp, email & SMS hub', geo: <sphereGeometry args={[0.24, 16, 16]} /> },
    { position: [-0.9, -1.0, 0], label: 'Churn Guard', sublabel: 'Proactive retention alerts', geo: <sphereGeometry args={[0.22, 16, 16]} /> },
    { position: [0.9, -1.0, 0], label: 'Rep Telemetry', sublabel: 'Call velocity & conversion KPIs', geo: <sphereGeometry args={[0.22, 16, 16]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0, 0], [-1.35, 0.6, 0.2],
    [0, 0, 0], [1.35, 0.6, -0.2],
    [0, 0, 0], [-0.9, -1.0, 0],
    [0, 0, 0], [0.9, -1.0, 0],
    [-1.35, 0.6, 0.2], [-0.9, -1.0, 0],
    [1.35, 0.6, -0.2], [0.9, -1.0, 0],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

// 6. Strategic Consulting — Strategy Board Matrix
export function ConsultingScene() {
  const parts: AnatomyPartConfig[] = [
    { position: [0, -0.5, 0], label: 'Strategic Grid', sublabel: 'Market positioning foundation', geo: <cylinderGeometry args={[1.1, 1.1, 0.1, 8]} /> },
    { position: [0, 0.6, 0], label: 'Executive Kingpin', sublabel: 'P&L growth roadmap', geo: <cylinderGeometry args={[0.2, 0.35, 1.1, 8]} /> },
    { position: [-1.2, 0.2, 0.2], label: 'M&A Diagnostics', sublabel: 'Due diligence & tech audit', geo: <coneGeometry args={[0.3, 0.6, 6]} /> },
    { position: [1.2, 0.2, -0.2], label: 'Risk Model', sublabel: 'Regulatory & macro insulation', geo: <octahedronGeometry args={[0.32, 0]} /> },
    { position: [0, 1.4, 0], label: 'North Star KPI', sublabel: 'Valuation multiple optimization', geo: <torusGeometry args={[0.25, 0.07, 16, 32]} /> },
  ]

  const linePoints: [number, number, number][] = [
    [0, 0.1, 0], [0, 0.6, 0],
    [0, 0.6, 0], [0, 1.4, 0],
    [0, 0.2, 0], [-1.2, 0.2, 0.2],
    [0, 0.2, 0], [1.2, 0.2, -0.2],
  ]

  return <GenericScene parts={parts} linePoints={linePoints} />
}

function GenericScene({
  parts,
  linePoints,
}: {
  parts: AnatomyPartConfig[]
  linePoints: [number, number, number][]
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.8], fov: 48 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.12} />
      <pointLight color="#CAFF00" intensity={8} position={[0, 2, 2.5]} distance={12} />
      <pointLight color="#CAFF00" intensity={4} position={[0, -2, -2]} distance={10} />

      {parts.map((p, i) => (
        <AnatomyPart key={i} {...p} />
      ))}

      <ConnectionLines points={linePoints} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.25}
          intensity={0.9}
          radius={0.7}
          mipmapBlur
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}

export function ServiceInteractiveScene({ slug }: { slug: string }) {
  switch (slug) {
    case 'ai-solutions':
      return <AIBrainScene />
    case 'digital-marketing':
      return <MarketingScene />
    case 'product-building':
      return <ProductScene />
    case 'erp':
      return <ERPScene />
    case 'crm':
      return <CRMScene />
    case 'strategic-consulting':
      return <ConsultingScene />
    default:
      return <AIBrainScene />
  }
}
