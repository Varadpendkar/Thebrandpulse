import { ArrowUpRight } from 'lucide-react'
import { TEAM } from '../../data/team'

export function TeamSection() {
  return (
    <section id="team" aria-label="Team" className="section border-t border-line bg-card">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">The team</p>
            <h2 className="section-title">Meet the founders</h2>
          </div>
          <p className="lead lg:col-span-7 lg:pt-10">
            Four co-founders from Pune covering AI, engineering, data, business analysis and growth. Every project gets the whole team.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <li key={member.id} className="card flex flex-col p-6">
              <div
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft font-serif text-xl text-accent-ink"
              >
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-5 text-xl">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-body">{member.bio}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${member.name}'s skills`}>
                {member.skills.map((skill) => (
                  <li key={skill} className="rounded-md border border-line px-2 py-1 text-xs text-muted">
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4">
                {member.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on ${link.label}`}
                    className="inline-flex items-center gap-1 text-sm text-ink hover:text-accent transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
