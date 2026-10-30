import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, PenTool, Terminal, TrendingUp } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getLenis } from '../../lib/lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ProcessStepData {
  num: string
  code: string
  title: string
  duration: string
  icon: React.ElementType
  concept: string
  desc: string
  bullets: string[]
}

const stepsData: ProcessStepData[] = [
  {
    num: '01',
    code: 'DISCOVER',
    title: 'BOTTLENECK & ROI DISCOVERY',
    duration: 'WEEK 01',
    icon: Search,
    concept: 'SIGNAL DETECTOR',
    desc: 'We tear down assumptions and calculate exact financial ROI before writing a single line of code. We map operational frictions and prioritize what moves the P&L needle first.',
    bullets: [
      'Friction mapping & workflow audit',
      'Unit economics & ROI modeling',
      'Milestone specifications & SLA',
    ],
  },
  {
    num: '02',
    code: 'PLAN',
    title: 'STRATEGIC ARCHITECTURE BLUEPRINT',
    duration: 'WEEK 02',
    icon: PenTool,
    concept: 'SYSTEM BLUEPRINT',
    desc: 'We construct an airtight technical and functional blueprint. We select the highest performance toolchains to eliminate vendor lock-in and prevent future technical debt.',
    bullets: [
      'Data schema & security modeling',
      'Component design system specs',
      'Deliverable schedule with fixed pricing',
    ],
  },
  {
    num: '03',
    code: 'BUILD',
    title: '14-DAY PROTOTYPE TO PRODUCTION',
    duration: 'WEEKS 03 - 05',
    icon: Terminal,
    concept: 'HARDENED ASSEMBLY',
    desc: 'We deliver an interactive working prototype running on test data within 14 days. Once validated, we harden it with production security, automated testing, and sub-second speed.',
    bullets: [
      'Working prototype within 14 days',
      'Type-safe, audited codebases',
      'Comprehensive automated testing',
    ],
  },
  {
    num: '04',
    code: 'GROW',
    title: 'LAUNCH, TELEMETRY & COMPOUNDING SCALE',
    duration: 'CONTINUOUS',
    icon: TrendingUp,
    concept: 'EXPONENTIAL SCALE',
    desc: 'Zero-downtime deployment to production cloud infrastructure with live telemetry, automated monitoring, staff onboarding, and ongoing optimization to maximize bottom-line profit.',
    bullets: [
      'Zero-downtime production deployment',
      'Real-time telemetry & alerts',
      'Continuous conversion & velocity tuning',
    ],
  },
]

export const ProcessSection: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore()
  const prefersReduced = useReducedMotion()

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<SVGLineElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
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
    }, 4000)
    return () => clearInterval(timer)
  }, [isMobile])

  // Desktop horizontal pin and Living River scrub
  useEffect(() => {
    if (isMobile || prefersReduced) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8, // smooth but responsive
        start: 'top top',
        end: '+=400%', // 4 steps × 100vh each
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress
          setScrollProgress(prog)

          // 1. Drive the Living River SVG stream
          if (streamRef.current) {
            gsap.set(streamRef.current, {
              strokeDashoffset: 1000 - prog * 1000,
            })
          }

          // 2. Drive the Lenis counter-scrolling background parallax text
          if (parallaxRef.current) {
            gsap.set(parallaxRef.current, {
              x: prog * -380,
            })
          }

          // 3. Activate each step at 25% intervals
          const step = Math.min(Math.floor(prog * 4), 3)
          setActiveStep(step)
        },
      },
    })

    // Horizontal travel: slide the 400vw track by 75% so all 4 steps travel across viewport
    tl.to(track, { xPercent: -75, ease: 'none' })

    // Lenis scroll integration for subtle continuous parallax velocity
    const lenis = getLenis()
    const handleScroll = ({ scroll }: { scroll: number }) => {
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          x: `+=${scroll * -0.01}`,
          duration: 0.2,
          overwrite: 'auto',
        })
      }
    }
    lenis?.on('scroll', handleScroll)

    return () => {
      tl.kill()
      lenis?.off('scroll', handleScroll)
    }
  }, [isMobile, prefersReduced])

  // Step click navigation
  const handleStepJump = (idx: number) => {
    if (isMobile) {
      setActiveStep(idx)
      return
    }

    const section = sectionRef.current
    if (!section) return

    const lenis = getLenis()
    const rect = section.getBoundingClientRect()
    const scrollY = window.scrollY
    const triggerStart = scrollY + rect.top
    const stepTargetScroll = triggerStart + idx * window.innerHeight

    if (lenis) {
      lenis.scrollTo(stepTargetScroll, { duration: 1.2 })
    } else {
      window.scrollTo({ top: stepTargetScroll, behavior: 'smooth' })
    }
  }

  const activeData = stepsData[activeStep] || stepsData[0]

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="Delivery Process"
      className={`relative bg-[#050505] border-b border-[#141414] ${
        isMobile ? 'py-20 px-6' : 'h-screen overflow-hidden'
      }`}
    >
      {/* ── LENIS HAND EFFECT — Background parallax text moving counter to scroll ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div
          ref={parallaxRef}
          data-lenis-parallax
          className="absolute top-1/2 whitespace-nowrap font-mono text-[14vw] md:text-[200px] font-black opacity-[0.03] text-[#CAFF00] -translate-y-1/2 select-none"
          style={{ left: '-5%' }}
        >
          DISCOVER — PLAN — BUILD — GROW — DISCOVER — PLAN — BUILD — GROW
        </div>
      </div>

      {/* ── CONNECTING LIVING RIVER SVG LINE ── */}
      {!isMobile && (
        <svg
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none"
          height="4"
          viewBox="0 0 1400 4"
          preserveAspectRatio="none"
          style={{ zIndex: 10 }}
        >
          {/* Base inactive dim conduit */}
          <line
            x1="0"
            y1="2"
            x2="1400"
            y2="2"
            stroke="#1c1c1c"
            strokeWidth="1.5"
          />
          {/* Active energized lime particle stream */}
          <line
            ref={streamRef}
            x1="0"
            y1="2"
            x2="1400"
            y2="2"
            stroke="#CAFF00"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            opacity="0.75"
          />
        </svg>
      )}

      {/* ── TOP HUD HEADER (Pinned Top) ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-6 md:pt-10 flex items-start justify-between z-30 relative pointer-events-none">
        <div className="space-y-1">
          <span className="font-mono text-xs tracking-widest text-[#CAFF00] uppercase block">
            [ 05 / HOW WE DELIVER ]
          </span>
          <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight uppercase">
            THE 4-STAGE SPRINT
          </h2>
        </div>

        {/* Step Counter Indicator */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className="text-[#CAFF00] font-bold">
            [ {activeData.num} / 04 ]
          </span>
          <span className="hidden sm:inline text-[#888888] uppercase tracking-wider">
            {activeData.code}
          </span>
        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL TRACK (400vw) ── */}
      {!isMobile ? (
        <div
          ref={trackRef}
          className="process-track flex h-full absolute inset-0 z-20 pointer-events-auto"
          style={{ width: '400vw' }}
        >
          {stepsData.map((step, idx) => {
            const isActive = activeStep === idx

            return (
              <div
                key={step.num}
                className={`relative flex flex-col justify-center px-12 md:px-24 w-screen h-full transition-all duration-700 select-none ${
                  isActive ? 'opacity-100' : 'opacity-25 hover:opacity-50'
                }`}
              >
                {/* Huge dim background number */}
                <span
                  aria-hidden="true"
                  className="font-mono text-[22vw] font-black text-white/[0.04] absolute top-1/2 right-12 md:right-24 -translate-y-1/2 select-none pointer-events-none"
                >
                  {step.num}
                </span>

                <div className="max-w-3xl relative z-10">
                  {/* Active Step Meta Tag */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span
                      className={`font-mono text-xs tracking-widest ${
                        isActive ? 'text-[#CAFF00]' : 'text-white/40'
                      }`}
                    >
                      [ {step.num} / {step.code} ]
                    </span>
                    <span className="font-mono text-[10px] text-[#888888] bg-[#111111] px-2.5 py-0.5 rounded border border-[#222]">
                      {step.duration}
                    </span>
                    <span className="font-mono text-[9px] text-[#CAFF00]/80 tracking-wider uppercase border border-[#CAFF00]/25 px-2 py-0.5 rounded">
                      {step.concept}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight leading-tight uppercase">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm md:text-base text-[#999999] leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  {/* Details — Expand smoothly when active */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 bg-[#0a0a0a]/80 border border-[#1f1f1f] rounded-xl backdrop-blur-md space-y-2 max-w-xl">
                      <span className="font-mono text-[9px] text-[#666] tracking-widest uppercase block mb-1">
                        STAGE DELIVERABLES
                      </span>
                      {step.bullets.map((b, bIdx) => (
                        <p
                          key={bIdx}
                          className="text-[#cccccc] font-mono text-xs flex items-center space-x-2"
                        >
                          <span className="text-[#CAFF00]">→</span>
                          <span>{b}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connecting glowing lime node on the river line */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-12 md:left-24 -translate-y-1/2 w-4 h-4 rounded-full bg-[#CAFF00] shadow-[0_0_24px_6px_rgba(202,255,0,0.7)] animate-pulse pointer-events-none"
                  />
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* ── MOBILE ACCORDION / TAB FLOW ── */
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-mono text-sm font-bold text-[#CAFF00]">
                [ {activeData.num} / {activeData.code} ]
              </span>
              <span className="font-mono text-[10px] text-[#888] bg-[#141414] px-2 py-0.5 rounded">
                {activeData.duration}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-display font-bold text-xl text-white mb-2 uppercase">
                  {activeData.title}
                </h3>
                <p className="font-sans text-xs text-[#999] leading-relaxed mb-4">
                  {activeData.desc}
                </p>
                <div className="space-y-1.5 border-t border-[#1a1a1a] pt-3">
                  {activeData.bullets.map((b, i) => (
                    <div
                      key={i}
                      className="font-mono text-[11px] text-[#bbb] flex items-center space-x-2"
                    >
                      <span className="text-[#CAFF00]">›</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Step Selectors */}
          <div className="grid grid-cols-4 gap-2">
            {stepsData.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`py-2 px-1 text-center font-mono text-xs rounded border transition-colors ${
                  activeStep === idx
                    ? 'border-[#CAFF00] bg-[#12140a] text-[#CAFF00]'
                    : 'border-[#1f1f1f] bg-[#080808] text-[#666]'
                }`}
              >
                {step.num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── BOTTOM HUD CONTROLS & STREAM PROGRESS BAR ── */}
      <div className="absolute bottom-6 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-12 z-30 pointer-events-auto">
        {!isMobile && (
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Interactive Step Jump Buttons */}
            <div className="flex items-center space-x-2">
              {stepsData.map((step, idx) => {
                const isActive = activeStep === idx
                return (
                  <button
                    key={step.num}
                    onClick={() => handleStepJump(idx)}
                    onMouseEnter={() => setCursor('hover', step.code)}
                    onMouseLeave={resetCursor}
                    aria-label={`Jump to Stage ${step.num}: ${step.code}`}
                    className={`px-3 py-1.5 rounded-md border font-mono text-[11px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00] ${
                      isActive
                        ? 'border-[#CAFF00] bg-[#12140a] text-[#CAFF00] shadow-[0_0_15px_rgba(202,255,0,0.2)]'
                        : 'border-[#1f1f1f] bg-[#090909]/80 text-[#777] hover:border-[#333]'
                    }`}
                  >
                    [ {step.num} {step.code} ]
                  </button>
                )
              })}
            </div>

            <span className="font-mono text-[10px] text-[#666] tracking-widest uppercase hidden md:inline">
              SCROLL TO PROGRESS • LIVING RIVER
            </span>
          </div>
        )}

        {/* Dynamic Glowing River Progress Bar */}
        <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#CAFF00] shadow-[0_0_12px_#CAFF00] transition-[width] duration-150 ease-out"
            style={{
              width: isMobile
                ? `${((activeStep + 1) / stepsData.length) * 100}%`
                : `${scrollProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
