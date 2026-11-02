import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import { SERVICE_ICONS } from '../../data/serviceIcons'

export function AnatomyServiceCards() {
  return (
    <section id="services" aria-label="Services" className="section">
      <div className="page-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Services</p>
            <h2 className="section-title">Six services, one team that understands your business</h2>
          </div>
          <p className="lead max-w-md">
            Start with what you need today. Add more as you grow, without switching agencies.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id]
            return (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="card group flex flex-col p-7 transition-colors hover:border-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.4rem]">{service.name}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-body">{service.shortOutcome}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Learn more
                  <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
