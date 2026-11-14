const AUDIENCES = [
  { title: 'Startups', text: 'A first version of your product, a website that explains it, and a plan for what comes next.' },
  { title: 'Business owners', text: 'Fewer spreadsheets and missed leads, with systems that fit how your business already works.' },
  { title: 'Students and individuals', text: 'Portfolios, personal brands and project ideas turned into something real you can show.' },
]

export function ProblemStatement() {
  return (
    <section id="problem-statement" aria-label="Our approach" className="section border-y border-line bg-card">
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Our approach</p>
          <h2 className="section-title">
            Most businesses have good ideas. Few have the tools to act on them. <span className="text-accent">We build those tools.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {AUDIENCES.map((item) => (
            <div key={item.title} className="border-t border-line-strong pt-6">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
