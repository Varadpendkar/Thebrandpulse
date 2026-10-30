import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Clock, ShieldCheck, Quote } from 'lucide-react'
import { getServiceBySlug, ServiceData, SERVICES } from '../data/services'
import { useAppStore } from '../store/useAppStore'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ServiceInteractiveScene } from '../components/three/ServiceScenes'

export const ServiceSubPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { openContactModal, setCursor, resetCursor } = useAppStore()
  const prefersReduced = useReducedMotion()

  const service: ServiceData | undefined = slug ? getServiceBySlug(slug) : undefined

  // Active accordion index in "What We Deliver"
  const [openDeliverable, setOpenDeliverable] = useState<number | null>(0)

  // Floating anatomy parts refs for GSAP animate-apart on scroll
  const anatomySectionRef = useRef<HTMLDivElement>(null)
  const leftPartsRef = useRef<HTMLDivElement>(null)
  const rightPartsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to top upon opening sub-page
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  // GSAP scroll trigger for exploded floating parts animation
  useEffect(() => {
    const triggerEl = anatomySectionRef.current
    const leftEl = leftPartsRef.current
    const rightEl = rightPartsRef.current

    if (!triggerEl || !leftEl || !rightEl || prefersReduced) return

    const leftBadges = Array.from(leftEl.children)
    const rightBadges = Array.from(rightEl.children)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 65%',
        end: 'bottom 20%',
        scrub: 0.6,
      },
    })

    tl.to(leftBadges, {
      x: -24,
      stagger: 0.1,
      ease: 'power2.out',
    }, 0)

    tl.to(rightBadges, {
      x: 24,
      stagger: 0.1,
      ease: 'power2.out',
    }, 0)

    return () => {
      tl.kill()
    }
  }, [service, prefersReduced])

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#ededed] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display font-bold text-3xl mb-4 text-white">Service Not Found</h1>
        <p className="font-sans text-sm text-[#888] mb-8">The capability you are looking for does not exist or has moved.</p>
        <Link
          to="/"
          className="font-mono text-xs text-black bg-[#CAFF00] px-6 py-3 rounded font-bold uppercase tracking-wider"
        >
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-[#CAFF00] selection:text-black pt-24">
      
      {/* ── SECTION 1: HERO ────────────────────────────────────────────── */}
      <section className="relative py-12 md:py-20 border-b border-[#141414] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" aria-hidden="true" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* Back Navigation Bar */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              onMouseEnter={() => setCursor('hover', 'BACK')}
              onMouseLeave={resetCursor}
              aria-label="Back to home"
              className="inline-flex items-center space-x-2 font-mono text-xs text-[#888888] hover:text-[#CAFF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00] p-1 rounded"
            >
              <ArrowLeft size={14} />
              <span>[ ALL SERVICES ]</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 6 cols: Title, headline, description, CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-[#CAFF00] tracking-wider">
                  [ {service.number} / CAPABILITY ]
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00]" />
                <span className="font-mono text-xs text-[#888888] uppercase tracking-wider">
                  ENTERPRISE GRADE
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="font-display font-semibold text-xl sm:text-2xl text-[#CAFF00] leading-snug drop-shadow-[0_0_15px_rgba(202,255,0,0.25)]">
                {service.headline}
              </p>

              <p className="font-sans text-sm sm:text-base text-[#a0a0a0] leading-relaxed">
                {service.subhead}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={openContactModal}
                  onMouseEnter={() => setCursor('hover', 'START')}
                  onMouseLeave={resetCursor}
                  aria-label="Book a call to discuss this service"
                  className="px-6 py-3.5 bg-[#CAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors duration-200 flex items-center space-x-2 shadow-[0_0_20px_rgba(202,255,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00]"
                >
                  <span>[ BOOK A DISCOVERY CALL ]</span>
                  <ArrowUpRight size={15} />
                </button>

                <a
                  href="#deliverables"
                  className="px-6 py-3.5 bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#CAFF00] text-white font-mono font-medium text-xs uppercase tracking-wider rounded-[3px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
                >
                  [ VIEW DELIVERABLES ]
                </a>
              </div>
            </div>

            {/* Right 6 cols: Large Anatomy Image with Floating Exploded Badges */}
            <div
              ref={anatomySectionRef}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] md:min-h-[500px] p-6 bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden"
            >
              {/* Background Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none"
              />

              {/* Left Floating Component Callouts */}
              <div
                ref={leftPartsRef}
                className="absolute left-4 top-10 bottom-10 flex flex-col justify-between z-20 pointer-events-none"
              >
                {service.floatingParts
                  .filter((p) => p.dir === 'left')
                  .map((part, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#111111]/90 border border-[#262626] backdrop-blur-md rounded-lg max-w-[180px] shadow-lg pointer-events-auto"
                    >
                      <span className="font-mono text-[10px] text-[#CAFF00] font-bold block mb-0.5">
                        {part.name}
                      </span>
                      <span className="font-sans text-[9px] text-[#888888] leading-tight block">
                        {part.spec}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Core Interactive 3D Anatomy Scene (with static PNG fallback) */}
              <div className="relative z-10 w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
                {prefersReduced ? (
                  <img
                    src={service.image}
                    alt={`${service.name} 3D Anatomy`}
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-[420px] object-contain filter drop-shadow-[0_0_35px_rgba(202,255,0,0.18)]"
                  />
                ) : (
                  <>
                    <ServiceInteractiveScene slug={service.slug} />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#CAFF00]/70 tracking-widest uppercase pointer-events-none bg-black/60 px-2 py-0.5 rounded border border-[#CAFF00]/20">
                      [ DRAG TO ROTATE • HOVER NODES ]
                    </div>
                  </>
                )}
              </div>

              {/* Right Floating Component Callouts */}
              <div
                ref={rightPartsRef}
                className="absolute right-4 top-10 bottom-10 flex flex-col justify-between z-20 pointer-events-none"
              >
                {service.floatingParts
                  .filter((p) => p.dir === 'right')
                  .map((part, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#111111]/90 border border-[#262626] backdrop-blur-md rounded-lg max-w-[180px] shadow-lg pointer-events-auto"
                    >
                      <span className="font-mono text-[10px] text-[#CAFF00] font-bold block mb-0.5">
                        {part.name}
                      </span>
                      <span className="font-sans text-[9px] text-[#888888] leading-tight block">
                        {part.spec}
                      </span>
                    </div>
                  ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT THIS MEANS FOR YOUR BUSINESS ───────────────── */}
      <section className="py-20 md:py-28 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-14 space-y-2">
            <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest block">
              [ 02 / COMMERCIAL VALUE ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              WHAT THIS MEANS FOR YOUR BUSINESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.businessOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between hover:border-[#CAFF00]/40 transition-[border-color] duration-300"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#CAFF00] bg-[#141d03] px-3 py-1 rounded-full border border-[#3b5305] inline-block mb-6">
                    {outcome.metric}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {outcome.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#181818] flex items-center justify-between font-mono text-[10px] text-[#555]">
                  <span>RETURN GUARANTEE</span>
                  <span className="text-[#CAFF00]">✓</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: WHAT WE DELIVER (ACCORDION) ──────────────────────── */}
      <section id="deliverables" className="py-20 md:py-28 bg-[#050505] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-14 space-y-2">
            <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest block">
              [ 03 / SYSTEM SCOPE ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              WHAT WE DELIVER
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#888888]">
              Concrete, production-hardened deliverables packaged for seamless handover and immediate business deployment.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {service.deliverables.map((item, idx) => {
              const isOpen = openDeliverable === idx

              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-[border-color] duration-300 overflow-hidden ${
                    isOpen ? 'border-[#CAFF00] bg-[#0c0c0c]' : 'border-[#1f1f1f] bg-[#080808] hover:border-[#333]'
                  }`}
                >
                  <button
                    onClick={() => setOpenDeliverable(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 text-left flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs font-bold text-[#CAFF00]">
                        [ 0{idx + 1} ]
                      </span>
                      <span className="font-display font-bold text-lg text-white group-hover:text-[#CAFF00] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="p-1 rounded-full border border-[#222] text-[#CAFF00] group-hover:border-[#CAFF00]">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2 border-t border-[#1a1a1a]"
                      >
                        <p className="font-sans text-xs sm:text-sm text-[#999999] leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] text-[#666666] tracking-widest uppercase block">
                            SPECIFICATIONS INCLUDED:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.details.map((detail, dIdx) => (
                              <div key={dIdx} className="flex items-center space-x-2 text-xs text-[#cccccc]">
                                <CheckCircle2 size={13} className="text-[#CAFF00] shrink-0" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: BUSINESS IMPACT ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-14 space-y-2">
            <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest block">
              [ 04 / PROVEN IMPACT ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              MEASURABLE BUSINESS IMPACT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.impactMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between"
              >
                <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#CAFF00] tracking-tight drop-shadow-[0_0_20px_rgba(202,255,0,0.3)] mb-4">
                  {metric.value}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white tracking-wider block mb-1">
                    {metric.label}
                  </span>
                  <p className="font-sans text-xs text-[#777777]">
                    {metric.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: HOW WE BUILD THIS FOR YOU (4-STEP PROCESS) ──────── */}
      <section className="py-20 md:py-28 bg-[#050505] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-14 space-y-2">
            <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest block">
              [ 05 / METHODOLOGY ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              HOW WE BUILD THIS FOR YOU
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl flex flex-col justify-between hover:border-[#CAFF00]/40 transition-[border-color]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-lg font-bold text-[#CAFF00]">
                      [ {step.number} ]
                    </span>
                    <span className="font-mono text-[10px] text-[#888] bg-[#141414] px-2 py-0.5 rounded border border-[#222]">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#888] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: CASE STUDY ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-12 space-y-2">
            <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest block">
              [ 06 / PROOF OF EXECUTION ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              CASE STUDY & RESULTS
            </h2>
          </div>

          <div className="p-8 md:p-12 bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-[#CAFF00] tracking-wider uppercase block mb-1">
                    CLIENT PROFILE
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {service.caseStudy.clientType}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs text-[#888] block mb-1">The Challenge:</span>
                    <p className="font-sans text-xs sm:text-sm text-[#ccc] leading-relaxed">
                      {service.caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-[#888] block mb-1">The Solution:</span>
                    <p className="font-sans text-xs sm:text-sm text-[#ccc] leading-relaxed">
                      {service.caseStudy.solution}
                    </p>
                  </div>

                  <div className="p-4 bg-[#12140a] border border-[#CAFF00]/30 rounded-lg">
                    <span className="font-mono text-xs text-[#CAFF00] font-bold block mb-1">Verified Result:</span>
                    <p className="font-sans text-xs sm:text-sm text-white font-medium leading-relaxed">
                      {service.caseStudy.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 bg-[#111111] border border-[#222] rounded-xl flex flex-col justify-between">
                <div>
                  <Quote size={28} className="text-[#CAFF00] mb-4 opacity-75" />
                  <p className="font-sans text-sm sm:text-base italic text-[#ededed] leading-relaxed mb-6">
                    {service.caseStudy.testimonial}
                  </p>
                </div>
                <div className="border-t border-[#222] pt-4">
                  <span className="font-mono text-xs text-[#CAFF00] font-bold block">
                    {service.caseStudy.author}
                  </span>
                  <span className="font-mono text-[10px] text-[#666]">Verified Executive Client</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 7: SERVICE CTA ─────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#050505] text-center border-b border-[#141414] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#CAFF00]/5 blur-[120px] pointer-events-none rounded-full"
        />

        <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 space-y-6">
          <span className="font-mono text-xs text-[#CAFF00] uppercase tracking-widest bg-[#141d03] px-4 py-1.5 rounded-full border border-[#3b5305]">
            [ SCHEDULE A DISCOVERY CALL ]
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            {service.ctaHeadline}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#999999] max-w-xl mx-auto leading-relaxed">
            {service.ctaSubhead}
          </p>

          <div className="pt-6">
            <button
              onClick={openContactModal}
              onMouseEnter={() => setCursor('hover', 'TALK')}
              onMouseLeave={resetCursor}
              aria-label="Book a call for this service"
              className="px-8 py-4 bg-[#CAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors duration-200 inline-flex items-center space-x-2 shadow-[0_0_25px_rgba(202,255,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00]"
            >
              <span>[ BOOK A CALL ]</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

