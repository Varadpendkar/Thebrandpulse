import { Handshake, Wallet, Eye } from 'lucide-react'

const STATS = [
  { value: '4', label: 'Co-founders on every project', detail: 'Engineering, AI and data, business analysis and client growth.' },
  { value: '20+', label: 'Projects across the team', detail: 'AI, data, web, IoT and consulting work from our own portfolios.' },
  { value: '6', label: 'Services under one roof', detail: 'From your first website to AI, ERP and CRM systems.' },
]

const DIFFERENTIATORS = [
  {
    icon: Handshake,
    title: 'Work directly with the founders',
    text: 'The people you talk to are the people who build your project. No account managers, no handoffs, no lost details.',
  },
  {
    icon: Wallet,
    title: 'Built around your budget',
    text: 'Whether you are a student, a shop owner or a funded startup, we scope the work to what you need and can spend.',
  },
  {
    icon: Eye,
    title: 'See it working early',
    text: 'For most product projects we aim to show you a working first version within about two weeks, so you can give feedback early.',
  },
]

export const WhyUs = () => {
  return (
    <section id="why-us" aria-label="Why work with us" className="section border-y border-line bg-sand">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Why work with us</p>
            <h2 className="section-title">A small team that treats your project like its own</h2>
          </div>
          <p className="lead lg:col-span-7 lg:pt-10">
            We are a young team of four from Pune, taking on our first clients. That means you get our full attention, honest advice and people who care about your result.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-card p-7">
              <dt className="text-sm font-medium text-ink">{stat.label}</dt>
              <dd className="mt-3 font-serif text-5xl text-accent">{stat.value}</dd>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{stat.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {DIFFERENTIATORS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={24} aria-hidden="true" className="text-accent" />
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
