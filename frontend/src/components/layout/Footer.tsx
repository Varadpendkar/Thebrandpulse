import React from 'react'
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { scrollToTop, scrollToId } from '../../lib/lenis'
import { SERVICES } from '../../data/services'

export const Footer: React.FC = () => {
  const { setCursor, resetCursor, openContactModal } = useAppStore()
  const navigate = useNavigate()

  return (
    <footer
      style={{ paddingBottom: 'calc(var(--sab, 0px) + 3rem)' }}
      className="relative pt-20 bg-[#050505] text-[#ededed] border-t border-[#141414]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#141414]">
          
          {/* Logo & Tagline (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-1 font-mono text-base font-bold text-white tracking-widest">
              <span className="text-[#caff00]">[</span>
              <span>BrandPulse</span>
              <span className="text-[#caff00]">]</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#777777] max-w-xs leading-relaxed">
              We turn your business vision into products, brands, and systems that work. Built with extreme engineering discipline.
            </p>
          </div>

          {/* Quick Nav (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-xs text-[#888888] tracking-widest uppercase block mb-4">
                NAVIGATION
              </span>
              <ul className="space-y-2.5 font-mono text-xs">
                <li>
                  <button
                    onClick={() => {
                      navigate('/')
                      setTimeout(() => scrollToId('hero'), 100)
                    }}
                    className="text-[#aaaaaa] hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                  >
                    HOME
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/')
                      setTimeout(() => scrollToId('services'), 100)
                    }}
                    className="text-[#aaaaaa] hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                  >
                    SERVICES
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/')
                      setTimeout(() => scrollToId('why-us'), 100)
                    }}
                    className="text-[#aaaaaa] hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                  >
                    WHY US
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/')
                      setTimeout(() => scrollToId('team'), 100)
                    }}
                    className="text-[#aaaaaa] hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                  >
                    TEAM
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs text-[#888888] tracking-widest uppercase block mb-4">
                SERVICES
              </span>
              <ul className="space-y-2.5 font-mono text-xs text-[#777777]">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Communications (4 cols) */}
          <div className="md:col-span-4 flex flex-col md:items-end justify-between space-y-6">
            <div className="space-y-2 md:text-right">
              <span className="font-mono text-xs text-[#888888] tracking-widest uppercase block">
                COMMUNICATIONS
              </span>
              <button
                onClick={openContactModal}
                className="font-mono text-sm text-[#caff00] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
              >
                hello@brandpulse.in
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-[#caff00] text-[#888888] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                aria-label="GitHub profile"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-[#caff00] text-[#888888] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                aria-label="LinkedIn page"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-[#caff00] text-[#888888] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                aria-label="Twitter X profile"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#666666] gap-4">
          <div>
            © {new Date().getFullYear()} BrandPulse · Crafted with precision in Pune
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('hover', 'TOP')}
            onMouseLeave={resetCursor}
            aria-label="Scroll back to top"
            className="flex items-center space-x-2 text-[#888888] hover:text-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
          >
            <span>[ BACK TO TOP ]</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  )
}
