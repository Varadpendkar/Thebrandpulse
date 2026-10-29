import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, PenTool, Terminal, Rocket, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { ProcessShardScene } from '../three/ProcessShardScene'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getLenis } from '../../lib/lenis'

interface ProcessStep {
  num: string
  code: string
  title: string
  duration: string
  icon: React.ElementType
  concept: string
  desc: string
  bullets: string[]
}

const stepsData: ProcessStep[] = [
  {
    num: '01',
    code: 'DISCOVER',
    title: 'RADAR PULSE SCAN & ARCHITECTURE',
    duration: 'SPRINT WEEK 01',
    icon: Search,
    concept: 'PARABOLOID SIGNAL DETECTOR',
    desc: '300 shards assemble into an outward-pointing radar dish. We tear down assumptions, evaluate AI model tradeoffs, define exact latency budgets, and lock system architecture specs.',
    bullets: ['Feasibility audit & token-cost modeling', 'Tech stack & schema finalization', 'Clear sprint milestones & latency SLA']
  },
  {
    num: '02',
    code: 'PLAN',
    title: 'ISOMETRIC BLUEPRINT MATRIX',
    duration: 'SPRINT WEEKS 02 - 03',
    icon: PenTool,
    concept: '3D COORDINATE BLUEPRINT',
    desc: 'Shards rearrange into a 3D isometric structural grid. We deliver an interactive working prototype running on test data within 14 days so you can validate real user flow immediately.',
    bullets: ['Interactive prototype with live test data', 'Benchmark AI model latency & tokens', 'Bi-weekly feedback iteration loop']
  },
  {
    num: '03',
    code: 'BUILD',
    title: 'ASCENDING PRODUCTION ASSEMBLY',
    duration: 'SPRINT WEEKS 04 - 06',
    icon: Terminal,
    concept: 'FLOOR-BY-FLOOR HARDENING',
    desc: 'Shards stack vertically floor-by-floor with a lime laser sweep. We write resilient, typed production code, integrate asynchronous task queues, implement security guardrails, and audit performance.',
    bullets: ['Type-safe FastAPI & React codebases', '100% test coverage for critical paths', 'Security guardrails & error boundary review']
  },
  {
    num: '04',
    code: 'SCALE',
    title: 'FRACTAL MULTIPLICATION & DEPLOY',
    duration: 'CONTINUOUS TELEMETRY',
    icon: Rocket,
    concept: '9X MULTI-REGION CLUSTER',
    desc: 'The completed shard tower fractally duplicates across space. Zero-downtime deployment to production cloud infrastructure with live telemetry, automated monitoring, and scale documentation.',
    bullets: ['Automated CI/CD multi-region deployment', 'Real-time telemetry & Sentry alerting', 'Complete architectural handoff & documentation']
  }
]

export const ProcessSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-advance on mobile
  useEffect(() => {
    if (!isMobile) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [isMobile])

  // ScrollTrigger desktop pinning & Lenis scrub
  useEffect(() => {
    if (isMobile) return

    const triggerElement = sectionRef.current
    const pinElement = pinContainerRef.current
    if (!triggerElement || !pinElement) return

    const trigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top top',
      end: '+=400%',
      pin: pinElement,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const prog = self.progress
        setScrollProgress(prog)
        const step = Math.min(Math.floor(prog * 4), 3)
        setActiveStep(step)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [isMobile])

  // Jump to specific step via smooth scroll
  const handleStepJump = (idx: number) => {
    if (isMobile) {
      setActiveStep(idx)
      return
    }

    const triggerElement = sectionRef.current
    if (!triggerElement) return

    const lenis = getLenis()
    const rect = triggerElement.getBoundingClientRect()
    const scrollY = window.scrollY
    const triggerStart = scrollY + rect.top
    const stepTargetScroll = triggerStart + idx * (window.innerHeight)

    if (lenis) {
      lenis.scrollTo(stepTargetScroll, { duration: 1.2 })
    } else {
      window.scrollTo({ top: stepTargetScroll, behavior: 'smooth' })
    }
  }

  // Current step within-step progress (0.0 to 1.0)
  const stepFraction = (scrollProgress * 4) % 1
  const activeData = stepsData[activeStep] || stepsData[0]

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`relative bg-[#050505] border-b border-[#1a1a1a] ${
        isMobile ? 'py-20 px-6' : 'h-[500vh]'
      }`}
    >
      {/* Pinned Viewport Container (Desktop 100vh) */}
      <div
        ref={pinContainerRef}
        className={`${
          isMobile
            ? 'w-full'
            : 'h-screen w-full flex flex-col justify-between overflow-hidden relative'
        }`}
      >
        {/* Top Header & HUD */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-6 md:pt-8 flex items-start justify-between z-20 pointer-events-none">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-widest text-[#caff00] uppercase block">
              [ 03 / PROCESS · SHARD METAPHOR ]
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-tight">
              CONSTRUCTION METAPHOR
            </h2>
          </div>

          {/* Step Counter Indicator */}
          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="text-[#caff00] font-bold">[ {activeData.num} / 04 ]</span>
            <span className="hidden sm:inline text-[#888888]">{activeData.code}</span>
          </div>
        </div>

        {/* Middle 65%: Instanced Shards Canvas (Desktop) or Animated SVG (Mobile) */}
        <div className={`relative w-full ${isMobile ? 'h-72 my-8' : 'flex-1 min-h-0'}`}>
          {!isMobile ? (
            <ProcessShardScene scrollProgress={scrollProgress} />
          ) : (
            // Mobile Clean Visual Representation
            <div className="w-full h-full bg-[#0a0a0a] border border-[#222222] rounded-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
              <div className="w-24 h-24 rounded-full border border-[#caff00]/50 border-dashed animate-spin-slow flex items-center justify-center mb-4">
                <span className="font-mono text-xl font-bold text-[#caff00]">
                  {activeData.num}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#caff00] tracking-widest uppercase">
                {activeData.concept}
              </span>
              <span className="font-display font-bold text-base text-white mt-1">
                {activeData.title}
              </span>
            </div>
          )}
        </div>

        {/* Lower 35%: Synchronized Step Controls & Telemetry Panel */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 pb-6 md:pb-8 z-20">
          
          {/* Active Step Details Card */}
          <div className="p-6 md:p-8 bg-[#090909]/90 border border-[#1f1f1f] rounded-2xl backdrop-blur-md mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Step info (left 7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xl font-bold text-[#caff00]">
                    [ {activeData.num} ]
                  </span>
                  <span className="font-mono text-[11px] text-[#888888] bg-[#141414] px-2.5 py-0.5 rounded border border-[#222]">
                    {activeData.duration}
                  </span>
                  <span className="font-mono text-[10px] text-[#caff00] tracking-wider uppercase border border-[#caff00]/30 px-2 py-0.5 rounded">
                    {activeData.concept}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.num}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display font-bold text-lg md:text-2xl text-white mb-2">
                      {activeData.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-[#999999] leading-relaxed">
                      {activeData.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bullets (right 5 cols) */}
              <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 lg:border-l border-[#1c1c1c] pt-4 lg:pt-0 lg:pl-6">
                <span className="font-mono text-[10px] text-[#666666] tracking-widest uppercase block">
                  DELIVERY HIGHLIGHTS
                </span>
                {activeData.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center space-x-2 text-xs font-mono text-[#cccccc]">
                    <span className="text-[#caff00]">›</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 4 Interactive Phase Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {stepsData.map((step, idx) => {
              const isActive = activeStep === idx

              return (
                <button
                  key={step.num}
                  onClick={() => handleStepJump(idx)}
                  onMouseEnter={() => setCursor('hover', step.code)}
                  onMouseLeave={resetCursor}
                  className={`p-3 md:p-4 rounded-xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#caff00] bg-[#12140a] shadow-[0_0_20px_rgba(202,255,0,0.15)]'
                      : 'border-[#1c1c1c] bg-[#080808] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#caff00]' : 'text-[#666666]'}`}>
                      [ {step.num} ]
                    </span>
                    <span className={`font-mono text-[9px] ${isActive ? 'text-white' : 'text-[#666666]'}`}>
                      {step.code}
                    </span>
                  </div>
                  <span className={`font-display font-semibold text-xs truncate block ${isActive ? 'text-white' : 'text-[#888888]'}`}>
                    {step.title.split('&')[0]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Horizontal Progress Bar Tracking Scroll Within Step */}
          <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#caff00] shadow-[0_0_10px_#caff00] transition-all duration-100 ease-out"
              style={{
                width: isMobile
                  ? `${((activeStep + 1) / stepsData.length) * 100}%`
                  : `${scrollProgress * 100}%`,
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
