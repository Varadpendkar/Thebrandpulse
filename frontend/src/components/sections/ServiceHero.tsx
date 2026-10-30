import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useAppStore } from '../../store/useAppStore'

export interface FloatingComponentCard {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  title: string
  subtitle: string
}

export interface ServiceHeroProps {
  number: string
  label?: string
  title: string
  tagline: string
  description: string
  image: string // path to anatomy PNG
  imageAlt: string
  components: FloatingComponentCard[]
}

export function ServiceHero({
  number,
  label = 'CAPABILITY',
  title,
  tagline,
  description,
  image,
  imageAlt,
  components,
}: ServiceHeroProps) {
  const { openContactModal } = useAppStore()
  const imageRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Float animation
  useEffect(() => {
    const img = imageRef.current
    const glow = glowRef.current
    const container = containerRef.current
    if (!img || !glow || !container) return

    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Main anatomy PNG vertical float
    gsap.to(img, {
      y: -16,
      duration: 3.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Component label cards float with slight offset phases
    const labels = container.querySelectorAll('[data-floating-label]')
    labels.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 2.8 + i * 0.4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      })
    })

    // Radial lime glow pulse
    gsap.to(glow, {
      opacity: 0.5,
      scale: 1.1,
      duration: 3.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      gsap.killTweensOf(img)
      gsap.killTweensOf(glow)
      labels.forEach((el) => gsap.killTweensOf(el))
    }
  }, [])

  const positionClasses: Record<FloatingComponentCard['position'], string> = {
    'top-left': 'top-4 sm:top-6 left-2 sm:left-0',
    'top-right': 'top-4 sm:top-6 right-2 sm:right-0',
    'bottom-left': 'bottom-4 sm:bottom-6 left-2 sm:left-0',
    'bottom-right': 'bottom-4 sm:bottom-6 right-2 sm:right-0',
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh] px-6 md:px-12 max-w-[1400px] mx-auto py-16 md:py-24"
    >
      {/* Left — text */}
      <div className="space-y-6">
        <p className="font-mono text-xs text-[#CAFF00] tracking-widest uppercase">
          [ {number} / {label} ] • ENTERPRISE GRADE
        </p>

        <h1 className="font-display font-black text-white leading-tight text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight">
          {title}
        </h1>

        <p className="text-[#CAFF00] font-display font-bold text-xl sm:text-2xl leading-snug drop-shadow-[0_0_15px_rgba(202,255,0,0.25)]">
          {tagline}
        </p>

        <p className="text-[#888] leading-relaxed max-w-lg text-sm sm:text-base font-sans">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={openContactModal}
            className="font-mono text-xs sm:text-sm px-6 py-3.5 bg-[#CAFF00] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200 rounded-[3px] shadow-[0_0_20px_rgba(202,255,0,0.3)] focus-visible:ring-2 focus-visible:ring-[#CAFF00] focus-visible:outline-none"
          >
            [ BOOK A DISCOVERY CALL ↗ ]
          </button>
          <a
            href="#deliverables"
            className="font-mono text-xs sm:text-sm px-6 py-3.5 border border-[#CAFF00]/40 text-[#CAFF00]/80 hover:border-[#CAFF00] hover:text-[#CAFF00] transition-colors duration-200 rounded-[3px] uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#CAFF00] focus-visible:outline-none"
          >
            [ VIEW DELIVERABLES ]
          </a>
        </div>
      </div>

      {/* Right — floating anatomy image + label cards */}
      <div className="relative flex items-center justify-center h-[380px] sm:h-[480px] md:h-[560px]">
        {/* Glow */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(202,255,0,0.22) 0%, transparent 70%)',
          }}
        />

        {/* Main anatomy PNG */}
        <img
          ref={imageRef}
          src={image}
          alt={imageAlt}
          width={600}
          height={600}
          loading="eager"
          style={{
            width: '85%',
            maxWidth: '520px',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 40px rgba(202,255,0,0.25))',
            willChange: 'transform',
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Floating component label cards */}
        {components.map((comp, i) => (
          <div
            key={i}
            data-floating-label
            aria-hidden="true"
            className={`absolute ${positionClasses[comp.position]} bg-[#0D0D0D]/90 backdrop-blur-md border border-[#CAFF00]/30 px-3 py-2 min-w-[130px] sm:min-w-[160px] max-w-[210px] z-10 shadow-[0_4px_24px_rgba(0,0,0,0.85)]`}
            style={{ borderRadius: '2px' }}
          >
            <p className="font-mono text-[11px] sm:text-xs text-[#CAFF00] font-bold leading-tight">
              {comp.title}
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] text-[#777] mt-0.5 leading-tight">
              {comp.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
