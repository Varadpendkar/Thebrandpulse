import { ArrowRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { SITE } from '../../data/site'

export const CtaSection = () => {
  const { openContactModal } = useAppStore()

  return (
    <section aria-label="Get in touch" className="section">
      <div className="page-container">
        <div className="rounded-2xl bg-accent px-6 py-14 text-center sm:px-12 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-soft">Taking our first clients</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[2rem] leading-tight !text-white sm:text-[2.75rem]">
            Have an idea or a problem to solve? Let's talk.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-accent-soft">
            Whether it is a startup, a growing business, a student project or a personal brand, book a free call and tell us what you want to build.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={openContactModal} className="btn bg-white text-accent-ink hover:bg-paper">
              Book a free call
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a href={`mailto:${SITE.email}`} className="btn border border-white/40 text-white hover:border-white">
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
