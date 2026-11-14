import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { getServiceBySlug, SERVICES } from '../data/services'
import { SERVICE_ICONS } from '../data/serviceIcons'
import { useAppStore } from '../store/useAppStore'

export const ServiceSubPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { openContactModal } = useAppStore()

  const service = slug ? getServiceBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!service) {
    return (
      <main className="page-container flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Service not found</h1>
        <p className="lead mt-4">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to home</Link>
      </main>
    )
  }

  const Icon = SERVICE_ICONS[service.id]
  const otherServices = SERVICES.filter((s) => s.id !== service.id)

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="page-container">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
            <ArrowLeft size={16} aria-hidden="true" />
            All services
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="eyebrow">{service.name}</p>
              </div>
              <h1 className="mt-6 text-[2.4rem] leading-[1.1] sm:text-5xl md:text-[3.25rem]">{service.headline}</h1>
              <p className="lead mt-6 max-w-xl">{service.subhead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={openContactModal} className="btn-primary">
                  Book a free call
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <a href="#deliverables" className="btn-secondary">What we deliver</a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6 sm:p-7">
                <p className="text-sm font-medium text-ink">What's included</p>
                <ul className="mt-4 divide-y divide-line">
                  {service.floatingParts.map((part) => (
                    <li key={part.name} className="flex gap-3 py-3.5">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-[0.95rem] text-ink">{part.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{part.spec}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it means for you */}
      <section className="section border-y border-line bg-card">
        <div className="page-container">
          <p className="eyebrow mb-4">What it means for you</p>
          <h2 className="section-title max-w-2xl">The difference you will notice</h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {service.businessOutcomes.map((outcome) => (
              <div key={outcome.title} className="border-t border-line-strong pt-6">
                <span className="tag">{outcome.highlight}</span>
                <h3 className="mt-4 text-xl">{outcome.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="section scroll-mt-20">
        <div className="page-container">
          <p className="eyebrow mb-4">What we deliver</p>
          <h2 className="section-title max-w-2xl">What you get at the end</h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {service.deliverables.map((item) => (
              <div key={item.title} className="card flex flex-col p-7">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{item.description}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-body">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section border-y border-line bg-sand">
        <div className="page-container">
          <p className="eyebrow mb-4">What to expect</p>
          <h2 className="section-title max-w-2xl">How we work with you</h2>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {service.expectations.map((item) => (
              <div key={item.label} className="bg-card p-7">
                <dt className="text-sm font-medium text-ink">{item.label}</dt>
                <dd className="mt-3 font-serif text-3xl text-accent">{item.value}</dd>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{item.subtext}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="page-container">
          <p className="eyebrow mb-4">The steps</p>
          <h2 className="section-title max-w-2xl">How we build this for you</h2>
          <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step) => (
              <li key={step.number} className="card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-accent">{step.number}</span>
                  <span className="text-xs font-medium text-muted">{step.duration}</span>
                </div>
                <h3 className="mt-5 text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team proof */}
      <section className="section border-y border-line bg-card">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">From our own work</p>
              <h2 className="section-title">What we have built</h2>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                BrandPulse is a new company taking on its first clients. This is a project from our team's own work that shows the skills behind this service.
              </p>
            </div>

            <article className="card bg-paper p-7 sm:p-9 lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{service.teamProof.context}</p>
              <h3 className="mt-3 text-2xl">{service.teamProof.project}</h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm font-medium text-ink">The problem</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-body">{service.teamProof.problem}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-ink">What was built</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-body">{service.teamProof.approach}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-ink">Why it matters for you</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-body">{service.teamProof.relevance}</dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <span className="text-sm text-muted">
                  Built by <span className="font-medium text-ink">{service.teamProof.builtBy}</span>
                </span>
                {service.teamProof.link && (
                  <a
                    href={service.teamProof.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {service.teamProof.link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="page-container">
          <div className="rounded-2xl bg-accent px-6 py-14 text-center sm:px-12 md:py-16">
            <h2 className="mx-auto max-w-2xl text-[2rem] leading-tight !text-white sm:text-[2.5rem]">{service.ctaHeadline}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-accent-soft">{service.ctaSubhead}</p>
            <button onClick={openContactModal} className="btn mt-8 bg-white text-accent-ink hover:bg-paper">
              Book a free call
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-16">
            <p className="text-sm font-medium text-ink">Other services</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="btn-secondary py-2">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
