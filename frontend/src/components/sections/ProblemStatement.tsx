import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const ProblemStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line3Ref = useRef<HTMLHeadingElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current

    if (!container || !l1 || !l2 || !l3 || prefersReduced) return

    // Set initial states
    gsap.set([l1, l2, l3], { opacity: 0.15, y: 30, filter: 'blur(8px)' })

    // Timeline pinned on scroll for cinematic, deliberate pace
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.8,
      },
    })

    tl.to(l1, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 })
      .to(l1, { opacity: 0.4, duration: 0.4 })
      .to(l2, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 })
      .to(l2, { opacity: 0.4, duration: 0.4 })
      .to(l3, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [prefersReduced])

  return (
    <section
      id="problem-statement"
      ref={containerRef}
      aria-label="Core Philosophy"
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden border-b border-[#141414]"
      style={{ minHeight: '100vh' }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute w-[500px] h-[500px] rounded-full bg-[#caff00]/5 filter blur-[140px] pointer-events-none"
      />

      <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col space-y-8 md:space-y-12">
        
        {/* Section Label */}
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs tracking-[0.3em] text-[#caff00] uppercase font-semibold">
            [ 02 / THE BOTTLENECK ]
          </span>
          <div className="h-[1px] w-12 bg-[#222]" />
        </div>

        {/* 3 Scroll-Revealed Lines */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          
          {/* Line 1 */}
          <h2
            ref={line1Ref}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#ededed] select-none"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            Most businesses have great ideas.
          </h2>

          {/* Line 2 */}
          <h2
            ref={line2Ref}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#888888] select-none"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            Few have tools to act on them.
          </h2>

          {/* Line 3: Punchline */}
          <h2
            ref={line3Ref}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#caff00] drop-shadow-[0_0_30px_rgba(202,255,0,0.4)] select-none"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            We build those tools.
          </h2>

        </div>

        {/* Supporting Context */}
        <div className="pt-6 md:pt-10 flex flex-col md:flex-row md:items-center justify-between border-t border-[#1a1a1a] text-xs font-mono text-[#666666] gap-4">
          <span>HIGH-CONVICTION EXECUTION</span>
          <span className="text-[#888888]">FROM VISION TO MEASURABLE REVENUE</span>
        </div>

      </div>
    </section>
  )
}
