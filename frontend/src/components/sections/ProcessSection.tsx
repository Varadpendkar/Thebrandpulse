import React, { useRef, useState, useEffect } from 'react'
import { Search, PenTool, Terminal, TrendingUp, ArrowDown } from 'lucide-react'
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
    title: 'DEEP TECHNICAL DISCOVERY',
    duration: 'WEEK 01',
    icon: Search,
    concept: 'SIGNAL DETECTOR',
    desc: 'Deep-dive interviews with leadership, inspection of all repositories, databases, architecture schemas, and third-party vendor contracts.',
    bullets: [
      'Leadership & stakeholder deep-dive interviews',
      'Codebase & database architecture inspection',
      'Third-party toolchain & vendor contract review',
    ],
  },
  {
    num: '02',
    code: 'PLAN',
    title: 'DIAGNOSTIC SCORECARD',
    duration: 'WEEK 02',
    icon: PenTool,
    concept: 'SYSTEM BLUEPRINT',
    desc: 'Honest executive report on architecture health, engineering velocity, cybersecurity vulnerabilities, and hidden cloud expenses.',
    bullets: [
      'Architecture health & scalability report',
      'Security gaps & vulnerability assessment',
      'Cloud bill & token cost latency profiling',
    ],
  },
  {
    num: '03',
    code: 'BUILD',
    title: 'REMEDIATION ROADMAP',
    duration: 'WEEK 03',
    icon: Terminal,
    concept: 'HARDENED ASSEMBLY',
    desc: 'Prioritized actionable sprints to fix critical bottlenecks, eliminate technical debt, and establish high-velocity production cadence.',
    bullets: [
      'Prioritized remediation sprint schedule',
      '14-day working prototype delivery',
      'Automated testing & type-safe deployment',
    ],
  },
  {
    num: '04',
    code: 'GROW',
    title: 'ONGOING STRATEGIC PARTNERSHIP',
    duration: 'MONTHLY',
    icon: TrendingUp,
    concept: 'EXPONENTIAL SCALE',
    desc: 'Bi-weekly executive advisory calls and on-demand architecture guidance during high-stakes growth inflection points and investor diligence.',
    bullets: [
      'Bi-weekly partner advisory reviews',
      'On-demand architecture & hiring guidance',
      'Continuous conversion & cloud cost tuning',
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

  // Detect mobile screen (< 1024px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
        scrub: 0.8,
        start: 'top top',
        end: '+=400%',
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress
          setScrollProgress(prog)

          // 1. Living River SVG line stream progress
          if (streamRef.current) {
            gsap.set(streamRef.current, {
              strokeDashoffset: 1000 - prog * 1000,
            })
          }

          // 2. Lenis counter-scrolling background parallax text
          if (parallaxRef.current) {
            gsap.set(parallaxRef.current, {
              x: prog * -380,
            })
          }

          // 3. Activate step
          const step = Math.min(Math.floor(prog * 4), 3)
          setActiveStep(step)
        },
      },
    })

    tl.to(track, { xPercent: -75, ease: 'none' })

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

  // Step click navigation on desktop
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
      className={`relative bg-[#050505] border-b border-[#141414] overflow-hidden ${
        isMobile ? 'py-20 px-6 sm:px-8' : 'h-screen'
      }`}
    >
      {/* ── Background parallax text moving counter to scroll ── */}
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

      {/* ── CONNECTING LIVING RIVER SVG LINE (Desktop only) ── */}
      {!isMobile && (
        <svg
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none"
          height="4"
          viewBox="0 0 1400 4"
          preserveAspectRatio="none"
          style={{ zIndex: 10 }}
        >
          <line
            x1="0"
            y1="2"
            x2="1400"
            y2="2"
            stroke="#1c1c1c"
            strokeWidth="1.5"
          />
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

      {/* ── TOP HUD HEADER ── */}
      <div className="max-w-[1400px] w-full mx-auto md:px-12 pt-4 md:pt-10 flex items-start justify-between z-30 relative pointer-events-none mb-8 lg:mb-0">
        <div className="space-y-1">
          <span className="font-mono text-xs tracking-widest text-[#CAFF00] uppercase block">
            [ 05 / METHODOLOGY ]
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase">
            HOW WE BUILD THIS FOR YOU
          </h2>
        </div>

        {/* Step Counter Indicator */}
        <div className="hidden sm:flex items-center space-x-3 font-mono text-xs">
          <span className="text-[#CAFF00] font-bold">
            [ {activeData.num} / 04 ]
          </span>
          <span className="text-[#888888] uppercase tracking-wider">
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

                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight leading-tight uppercase">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-[#999999] leading-relaxed mb-6">
                    {step.desc}
                  </p>

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
        /* ── MOBILE VERTICAL STACK (Full Width, Vertical Continuity, Zero Overflow) ── */
        <div className="max-w-[700px] mx-auto w-full flex flex-col space-y-6 relative z-20">
          {stepsData.map((step, idx) => (
            <div key={step.num} className="relative">
              <div className="w-full bg-[#0a0a0a] border border-[#1f1f1f] border-l-2 border-l-[#CAFF00] rounded-xl p-6 pl-5 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                {/* Step Top Row: Number label at top-left + Duration badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-[#CAFF00] tracking-wider">
                      [ {step.num} ]
                    </span>
                    <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                      {step.code}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#CAFF00] bg-[#14180a] border border-[#CAFF00]/30 px-2.5 py-0.5 rounded font-semibold">
                    {step.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#999999] leading-relaxed">
                  {step.desc}
                </p>

                {/* Bullets */}
                <div className="pt-3 border-t border-[#1a1a1a] space-y-1.5">
                  <span className="font-mono text-[9px] text-[#666666] tracking-widest uppercase block mb-1">
                    KEY MILESTONES
                  </span>
                  {step.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2 text-xs font-mono text-[#cccccc]">
                      <span className="text-[#CAFF00] leading-tight">›</span>
                      <span className="leading-tight">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical connector arrow between cards */}
              {idx < stepsData.length - 1 && (
                <div className="flex items-center justify-center py-2 text-[#CAFF00]/50" aria-hidden="true">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── BOTTOM HUD CONTROLS & STREAM PROGRESS BAR (Desktop) ── */}
      {!isMobile && (
        <div className="absolute bottom-6 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-12 z-30 pointer-events-auto">
          <div className="flex items-center justify-between gap-4 mb-3">
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

          <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#CAFF00] shadow-[0_0_12px_#CAFF00] transition-[width] duration-150 ease-out"
              style={{
                width: `${scrollProgress * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
