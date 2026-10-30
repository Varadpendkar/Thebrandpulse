import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { scrollToId } from '../../lib/lenis'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setCursor, resetCursor, openContactModal } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'SERVICES', id: 'services' },
    { label: 'PHILOSOPHY', id: 'problem-statement' },
    { label: 'WHY US', id: 'why-us' },
    { label: 'PROCESS', id: 'process' },
    { label: 'TEAM', id: 'team' },
  ]

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => scrollToId(id), 120)
    } else {
      scrollToId(id)
    }
  }

  const handleLogoClick = () => {
    setMobileMenuOpen(false)
    if (!isHome) {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    } else {
      scrollToId('hero')
    }
  }

  return (
    <header
      style={{
        paddingTop: isScrolled
          ? 'calc(var(--sat, 0px) + 0.75rem)'
          : 'calc(var(--sat, 0px) + 1.25rem)',
        paddingBottom: isScrolled ? '0.75rem' : '1.25rem',
      }}
      className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,box-shadow,padding] duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#caff00]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo: [ BrandPulse ] */}
        <button
          onClick={handleLogoClick}
          onMouseEnter={() => setCursor('hover', 'HOME')}
          onMouseLeave={resetCursor}
          aria-label="BrandPulse Home"
          className="group flex items-center space-x-1 font-mono text-sm md:text-base font-bold tracking-widest text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00] p-1 rounded"
        >
          <span className="text-[#caff00] transition-transform duration-200 group-hover:-translate-x-0.5">[</span>
          <span className="px-1 tracking-wider text-white">BrandPulse</span>
          <span className="text-[#caff00] transition-transform duration-200 group-hover:translate-x-0.5">]</span>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              onMouseEnter={() => setCursor('hover', 'GO')}
              onMouseLeave={resetCursor}
              className="text-xs font-mono font-medium tracking-widest text-[#888888] hover:text-[#caff00] transition-colors relative py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00] rounded"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#caff00] transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right CTA Button: [ BOOK A CALL ] */}
        <div className="hidden md:flex items-center">
          <button
            onClick={openContactModal}
            onMouseEnter={() => setCursor('hover', 'CALL')}
            onMouseLeave={resetCursor}
            aria-label="Book a Call with BrandPulse"
            className="group relative px-4 py-2 font-mono text-xs font-semibold tracking-wider text-white border border-[#262626] hover:border-[#caff00] bg-[#0d0d0d] hover:bg-[#caff00] hover:text-black transition-colors duration-200 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
          >
            <span className="text-[#caff00] group-hover:text-black transition-colors">[ </span>
            <span className="px-1 tracking-wider">BOOK A CALL</span>
            <span className="text-[#caff00] group-hover:text-black transition-colors"> ]</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-[#ededed] hover:text-[#caff00] transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00] rounded"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 border-b border-[#222] backdrop-blur-xl px-6 py-6"
          >
            <div className="flex flex-col space-y-2 font-mono text-base">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="min-h-[44px] text-left py-2.5 text-[#888888] hover:text-[#caff00] border-b border-[#181818] transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:text-[#caff00]"
                >
                  <span className="font-sans font-medium text-[1rem] tracking-normal text-[#ededed] hover:text-[#caff00]">{link.label}</span>
                  <ArrowUpRight size={16} className="text-[#caff00]" />
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openContactModal()
                  }}
                  className="w-full h-12 flex items-center justify-center bg-[#caff00] text-black font-mono font-bold text-xs tracking-wider uppercase rounded-[3px] hover:bg-white transition-colors shadow-[0_0_20px_rgba(202,255,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
                >
                  [ BOOK A CALL ]
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
