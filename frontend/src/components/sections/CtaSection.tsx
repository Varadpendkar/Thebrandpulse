import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { scrollToId } from '../../lib/lenis'

export const CtaSection: React.FC = () => {
  const { setCursor, resetCursor, openContactModal } = useAppStore()

  return (
    <section
      id="cta"
      aria-label="Call to Action"
      className="relative py-28 md:py-40 bg-[#050505] overflow-hidden border-b border-[#141414]"
      style={{ minHeight: '80vh' }}
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#caff00]/5 blur-[130px] pointer-events-none rounded-full"
      />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
        
        <div className="inline-block">
          <span className="font-mono text-xs tracking-[0.25em] text-[#caff00] uppercase bg-[#141d03] px-4 py-1.5 rounded-full border border-[#3b5305]">
            [ ACCEPTING SELECT CLIENTS ]
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => setCursor('hover', 'GROW')}
          onMouseLeave={resetCursor}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white"
        >
          Ready to grow <br />
          <span className="text-[#caff00] drop-shadow-[0_0_30px_rgba(202,255,0,0.35)]">
            your business?
          </span>
        </motion.h2>

        <p className="font-sans text-sm md:text-lg text-[#999999] max-w-xl mx-auto leading-relaxed">
          We turn your business vision into products, brands, and systems that work. Book a strategic consultation to discover how we can accelerate your bottom line.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={openContactModal}
            onMouseEnter={() => setCursor('hover', 'BOOK')}
            onMouseLeave={resetCursor}
            aria-label="Book a Call with BrandPulse"
            className="w-full sm:w-auto px-8 py-4 bg-[#caff00] text-black font-mono font-bold text-xs md:text-sm tracking-wider uppercase rounded-[3px] hover:bg-white transition-colors duration-200 shadow-[0_0_25px_rgba(202,255,0,0.3)] flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
          >
            <span>[ BOOK A CALL ]</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => scrollToId('services')}
            onMouseEnter={() => setCursor('hover', 'SERVICES')}
            onMouseLeave={resetCursor}
            aria-label="See Our Services and Capabilities"
            className="w-full sm:w-auto px-8 py-4 bg-[#0d0d0d] border border-[#333333] hover:border-[#caff00] text-white hover:text-[#caff00] font-mono font-semibold text-xs md:text-sm tracking-wider uppercase rounded-[3px] transition-colors duration-200 flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
          >
            <span>[ SEE OUR WORK ]</span>
            <ArrowDown size={14} className="text-[#caff00]" />
          </button>
        </div>

      </div>
    </section>
  )
}
