import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { BrandPulseHero3D } from '../three/BrandPulseHero3D'
import { scrollToId } from '../../lib/lenis'

export const Hero: React.FC = () => {
  const { setCursor, resetCursor, openContactModal } = useAppStore()

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen pt-28 md:pt-36 pb-12 flex flex-col justify-between overflow-hidden bg-[#050505]"
      style={{ minHeight: '100vh' }}
    >
      {/* 3D Interpenetrating Torus Knot & Octahedron Scene on Right */}
      <BrandPulseHero3D />

      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" aria-hidden="true" />
      
      {/* Decorative Technical Crosshair Markers (+) */}
      <div className="absolute top-28 left-8 md:left-20 text-[#2a2a2a] font-mono text-sm select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute top-44 right-16 md:right-32 text-[#2a2a2a] font-mono text-sm select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute bottom-28 left-1/3 text-[#2a2a2a] font-mono text-sm select-none pointer-events-none" aria-hidden="true">+</div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top/Middle Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 md:pt-10">
          
          {/* Left Column: Typography & Headings (approx 7-8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center space-x-3"
            >
              <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#888888] uppercase">
                BRANDPULSE &nbsp;×&nbsp; VENTURE LABS &nbsp;×&nbsp; PRODUCTION
              </span>
            </motion.div>

            {/* Giant Display: BrandPulse */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-visible"
            >
              <h1
                onMouseEnter={() => setCursor('hover', 'BRANDPULSE')}
                onMouseLeave={resetCursor}
                className="font-display font-extrabold tracking-tight text-white leading-none select-none text-[14vw] sm:text-[13vw] md:text-[10vw] lg:text-[7.5rem] xl:text-[9rem]"
                style={{ letterSpacing: '-0.04em' }}
              >
                BrandPulse
              </h1>
            </motion.div>

            {/* Glowing Tagline & Subhead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 pt-1 max-w-2xl"
            >
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#caff00] drop-shadow-[0_0_20px_rgba(202,255,0,0.35)]">
                We Build Brands People Can't Ignore.
              </h2>
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#a0a0a0] leading-relaxed">
                We turn your business vision into products, brands, and systems that work.
              </p>
            </motion.div>

            {/* Dual CTAs: [ BOOK A CALL ] + [ SEE OUR WORK ] */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {/* Primary CTA */}
              <button
                onClick={openContactModal}
                onMouseEnter={() => setCursor('hover', 'CALL')}
                onMouseLeave={resetCursor}
                aria-label="Book a Call with BrandPulse"
                className="group relative inline-flex items-center space-x-2 font-mono text-xs md:text-sm font-bold tracking-wider text-black bg-[#caff00] hover:bg-white px-6 py-3.5 rounded-[3px] transition-colors duration-200 shadow-[0_0_25px_rgba(202,255,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
              >
                <span>[ BOOK A CALL ]</span>
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => scrollToId('services')}
                onMouseEnter={() => setCursor('hover', 'SERVICES')}
                onMouseLeave={resetCursor}
                aria-label="See Our Work and Services"
                className="group inline-flex items-center space-x-2 font-mono text-xs md:text-sm font-semibold tracking-wider text-white border border-[#333333] hover:border-[#caff00] bg-[#0c0c0c] hover:bg-[#151515] px-6 py-3.5 rounded-[3px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
              >
                <span>[ SEE OUR WORK ]</span>
                <ArrowDown size={15} className="text-[#caff00] transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Telemetry Specs HUD */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 pt-4 lg:pt-0 pointer-events-auto">
            <div className="hidden lg:flex flex-col space-y-2.5 p-4 rounded-xl border border-[#222222]/80 bg-[#090909]/80 backdrop-blur-md max-w-sm ml-auto">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span className="text-[#caff00] flex items-center gap-1.5 font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#caff00] animate-pulse" />
                  R3F HARDWARE ACCELERATED
                </span>
                <span>MESHPHYSICAL</span>
              </div>
              <div className="h-[1px] w-full bg-[#1c1c1c]" />
              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666]">
                <span>CORE GEOMETRY</span>
                <span className="text-[#ededed]">TORUS KNOT × OCTAHEDRON</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666]">
                <span>TRANSMISSION GLASS</span>
                <span className="text-[#ededed]">ROUGH 0.1 / METAL 0.9</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666]">
                <span>POSTPROCESSING</span>
                <span className="text-[#caff00]">BLOOM 1.2 / RAD 0.8</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-2 max-w-sm ml-auto hidden lg:block"
            >
              <div className="flex items-start justify-between">
                <p className="font-sans text-xs text-[#999999] leading-relaxed pr-6">
                  Transforming high-growth businesses into category-defining digital brands.
                </p>
                <span className="font-mono text-xs text-[#888888] shrink-0 tracking-wider">
                  [ 01 / HERO ]
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Hero Bar: [ SCROLL TO EXPLORE ] & OUTCOMES */}
        <div className="pt-16 md:pt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4">
            
            {/* Bottom Left: [ SCROLL TO EXPLORE ] */}
            <button
              onClick={() => scrollToId('problem-statement')}
              onMouseEnter={() => setCursor('hover', 'EXPLORE')}
              onMouseLeave={resetCursor}
              aria-label="Scroll to explore problem statement"
              className="group flex flex-col items-start space-y-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-[#888888] group-hover:text-[#caff00] transition-colors">
                [ SCROLL TO EXPLORE ]
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#888888] group-hover:text-[#caff00] transition-colors pl-1"
              >
                <ArrowDown size={15} />
              </motion.div>
            </button>

            {/* Bottom Right: VISION -> PRODUCTS -> GROWTH */}
            <div className="flex items-center space-x-3 font-mono text-xs md:text-sm tracking-widest text-[#ededed]">
              <span className="text-[#888888]">VISION</span>
              <span className="text-[#caff00]">→</span>
              <span className="text-white font-semibold">PRODUCTS</span>
              <span className="text-[#caff00]">→</span>
              <span className="text-[#caff00] font-semibold">GROWTH</span>
            </div>
          </div>

          {/* Luminous Full-Width Horizontal Lime Divider Line */}
          <div className="relative w-full h-[1px] bg-[#caff00] shadow-[0_0_12px_rgba(202,255,0,0.45)]" />
        </div>

      </div>
    </section>
  )
}
