import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { scrollToId } from '../../lib/lenis'
import { SERVICES } from '../../data/services'
import { TEAM } from '../../data/team'
import { SITE } from '../../data/site'

const COMPANY_LINKS = [
  { label: 'Approach', id: 'problem-statement' },
  { label: 'Why us', id: 'why-us' },
  { label: 'Process', id: 'process' },
  { label: 'Team', id: 'team' },
]

export const Footer: React.FC = () => {
  const { openContactModal } = useAppStore()
  const navigate = useNavigate()

  const goTo = (id: string) => {
    navigate('/')
    setTimeout(() => scrollToId(id), 100)
  }

  return (
    <footer
      style={{ paddingBottom: 'calc(var(--sab, 0px) + 2.5rem)' }}
      className="bg-ink pt-16 text-white/70"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif text-2xl font-semibold text-white">BrandPulse</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Websites, software, AI and marketing for startups, business owners, students and individuals.
            </p>
            <p className="mt-4 text-sm">{SITE.location}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-white">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => goTo(link.id)} className="hover:text-white transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-medium text-white">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-medium text-white">Contact</p>
            <a href={`mailto:${SITE.email}`} className="mt-4 block text-sm text-white hover:underline break-all">
              {SITE.email}
            </a>
            <button onClick={openContactModal} className="mt-2 text-sm hover:text-white transition-colors">
              Book a free call
            </button>
            <p className="mt-6 text-sm font-medium text-white">Founders</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {TEAM.map((member) => (
                <li key={member.id}>
                  <a href={member.links[0].href} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    {member.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="pt-8 text-xs text-white/50">
          © {new Date().getFullYear()} BrandPulse. Made in Pune.
        </p>
      </div>
    </footer>
  )
}
