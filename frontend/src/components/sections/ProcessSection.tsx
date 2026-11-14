import { Check } from 'lucide-react'

const STEPS = [
  {
    title: 'Understand your goal',
    duration: 'Week 1',
    text: 'A free call to understand your idea or business, who it is for, and what success looks like for you.',
    points: ['Free first call, no obligation', 'Your goals, customers and budget', 'Honest advice on what you need'],
  },
  {
    title: 'Clear plan and quote',
    duration: 'Weeks 1–2',
    text: 'We turn the conversation into a written plan: what we will build or run, the timeline and the cost.',
    points: ['Written scope and timeline', 'Price agreed before work starts', 'Sketches or wireframes where useful'],
  },
  {
    title: 'Build in short steps',
    duration: 'Weeks 2–6',
    text: 'We build in small steps and show you working progress along the way, so you can give feedback early.',
    points: ['Early working version to try', 'Weekly updates and check-ins', 'Changes based on your feedback'],
  },
  {
    title: 'Launch and support',
    duration: 'Ongoing',
    text: 'We launch it, hand everything over and stay available to fix, improve and grow it with you.',
    points: ['Launch and full handover', 'Training for you or your team', 'Ongoing support and improvements'],
  },
]

export function ProcessSection() {
  return (
    <section id="process" aria-label="How we work" className="section">
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="section-title">A simple process, with no surprises</h2>
          <p className="lead mt-5">Every project follows the same four steps, whatever its size.</p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => (
            <li key={step.title} className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-accent">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-xs font-medium text-muted">{step.duration}</span>
              </div>
              <h3 className="mt-5 text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{step.text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {step.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-body">
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
