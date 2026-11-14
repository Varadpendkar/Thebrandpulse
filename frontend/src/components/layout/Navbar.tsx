import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { scrollToId } from '../../lib/lenis'

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Approach', id: 'problem-statement' },
  { label: 'Why us', id: 'why-us' },
  { label: 'Process', id: 'process' },
  { label: 'Team', id: 'team' },
]

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openContactModal } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      style={{ paddingTop: 'var(--sat, 0px)' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen ? 'bg-paper/95 backdrop-blur border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="page-container flex h-16 items-center justify-between">
        <button
          onClick={handleLogoClick}
          aria-label="BrandPulse home"
          className="flex items-center gap-2 rounded"
        >
          <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
            <span className="h-2.5 w-2.5 rounded-full bg-paper" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">BrandPulse</span>
        </button>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm text-body hover:text-ink transition-colors rounded"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button onClick={openContactModal} className="btn-primary py-2.5">
            Book a free call
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-ink rounded"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-paper">
          <div className="page-container flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="py-3 text-left text-base text-ink border-b border-line last:border-b-0"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openContactModal()
              }}
              className="btn-primary mt-4 w-full"
            >
              Book a free call
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
