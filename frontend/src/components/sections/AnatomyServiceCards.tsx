import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES, ServiceData } from '../../data/services'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAppStore } from '../../store/useAppStore'

interface ServiceCardItemProps {
  service: ServiceData
  index: number
  onNavigate: (slug: string) => void
}

function ServiceCardItem({ service, index, onNavigate }: ServiceCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const prefersReduced = useReducedMotion()
  const { setCursor, resetCursor } = useAppStore()

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    if (!card || !img || prefersReduced) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        boxShadow: '0 0 40px rgba(202, 255, 0, 0.2)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(img, {
        scale: 1.05,
        rotateY: 6,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1.0,
        boxShadow: '0 0 0px rgba(202, 255, 0, 0)',
        duration: 0.4,
        ease: 'power2.inOut',
      })
      gsap.to(img, {
        scale: 1.0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReduced])

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${service.name}`}
      onClick={() => onNavigate(service.slug)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigate(service.slug)
        }
      }}
      onMouseEnter={() => setCursor('hover', 'EXPLORE')}
      onMouseLeave={resetCursor}
      data-service-card
      className="group relative flex flex-col justify-between p-6 sm:p-8 bg-[#0D0D0D] border border-[#CAFF00]/30 hover:border-[#CAFF00] rounded-2xl transition-[border-color] duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00]"
      style={{ willChange: 'transform, box-shadow' }}
    >
      {/* Top Meta Line: Number + Spec */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-[#CAFF00] font-semibold tracking-wider">
            [ {service.number} ]
          </span>
          <span className="font-mono text-[10px] text-[#666666] tracking-widest uppercase">
            ANATOMY DIAGRAM
          </span>
        </div>

        {/* 3D Anatomy Render Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden flex items-center justify-center my-3 rounded-lg bg-[#080808]/60">
          <img
            ref={imgRef}
            src={service.image}
            alt={`${service.name} 3D Anatomy Architecture`}
            width={800}
            height={600}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(202,255,0,0.1)] transition-transform duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Service Name */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#CAFF00] transition-colors mt-4">
          {service.name}
        </h3>

        {/* One-Line Business Outcome in Gray */}
        <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed mt-2">
          {service.shortOutcome}
        </p>
      </div>

      {/* Bottom Action: "Explore →" in lime monospace */}
      <div className="pt-6 mt-4 border-t border-[#1a1a1a] flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-wider text-[#CAFF00] group-hover:underline flex items-center space-x-1">
          <span>Explore</span>
          <span className="text-[#CAFF00] transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
        <div className="p-1 rounded-full border border-[#222] group-hover:border-[#CAFF00] text-[#CAFF00] transition-colors">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  )
}

export const AnatomyServiceCards: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid || prefersReduced) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-service-card]'))
    gsap.set(cards, { opacity: 0, y: 60 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.15, // 0.15s stagger per spec
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [prefersReduced])

  const handleNavigate = (slug: string) => {
    navigate(`/services/${slug}`)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Capabilities and Services"
      className="relative py-24 md:py-36 bg-[#050505] border-b border-[#141414]"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1a1a1a]">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-widest text-[#caff00] uppercase block">
              [ 03 / WHAT WE BUILD ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl tracking-tight text-white">
              CORE CAPABILITIES
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#888888] max-w-md mt-4 md:mt-0 leading-relaxed">
            Six disciplined engineering practices designed to transform your business from manual complexity into scalable, automated dominance.
          </p>
        </div>

        {/* 2×3 Desktop Grid / Responsive Mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SERVICES.map((service, idx) => (
            <ServiceCardItem
              key={service.id}
              service={service}
              index={idx}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
