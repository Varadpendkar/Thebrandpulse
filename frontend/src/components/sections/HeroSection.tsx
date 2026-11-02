import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { scrollToId } from '../../lib/lenis'
import { SERVICES } from '../../data/services'
import { SERVICE_ICONS } from '../../data/serviceIcons'

const PROOF_POINTS = [
  'Four co-founders, one team',
  'Experience across EY and Bajaj Finance',
  '20+ projects built across the team',
]

export function HeroSection() {
  const { openContactModal } = useAppStore()

  return (
    <section id="hero" aria-label="Introduction" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="page-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Technology and growth partner · Pune</p>
          <h1 className="text-[2.6rem] leading-[1.08] sm:text-5xl md:text-[3.75rem]">
            Websites, software and AI that help your business grow.
          </h1>
          <p className="lead mt-6 max-w-xl">
            We design and build the digital tools a business runs on, from your website and marketing to AI, ERP and CRM systems, and explain every step in plain language.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={openContactModal} className="btn-primary">
              Book a free call
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button onClick={() => scrollToId('services')} className="btn-secondary">
              Explore services
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 text-sm text-muted">
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="card p-6 sm:p-7">
            <p className="text-sm font-medium text-ink">How we can help</p>
            <ul className="mt-4 divide-y divide-line">
              {SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.id]
                return (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="group flex items-center gap-4 py-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-[0.95rem] text-ink group-hover:text-accent transition-colors">
                        {service.name}
                      </span>
                      <ArrowRight size={16} aria-hidden="true" className="text-muted group-hover:text-accent transition-colors" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export const Hero = HeroSection
