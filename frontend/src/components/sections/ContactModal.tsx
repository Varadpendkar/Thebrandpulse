import React, { useState } from 'react'
import { X, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Send, Mail } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { SITE, gmailComposeUrl, mailtoUrl } from '../../data/site'
import { SERVICES } from '../../data/services'

const DEFAULT_BUDGET = 'Not sure yet, help me scope it'

const BUDGET_OPTIONS = [
  DEFAULT_BUDGET,
  'Under ₹25,000',
  '₹25,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  '₹5,00,000+',
]

const inputClass =
  'w-full rounded-md border border-line-strong bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15'

const labelClass = 'mb-1.5 block text-sm font-medium text-ink'

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useAppStore()
  const [step, setStep] = useState<1 | 2>(1)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    services: [] as string[],
    budget: DEFAULT_BUDGET,
    brief: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  // Set when the brief could not be sent to the API, so the visitor sends it by email instead.
  const [needsEmail, setNeedsEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!isContactModalOpen) return null

  const emailSubject = `Project enquiry from ${formData.name}`
  const emailBody = [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Business / project: ${formData.company}` : null,
    `Services: ${formData.services.join(', ') || 'Not sure yet'}`,
    `Budget: ${formData.budget}`,
    '',
    formData.brief,
  ]
    .filter((line) => line !== null)
    .join('\n')

  const toggleService = (svc: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Add your name and email to continue.')
      return
    }
    setErrorMessage('')
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.brief.trim()) {
      setErrorMessage('Add a short description of your project.')
      return
    }

    setErrorMessage('')

    // Without a deployed backend there is nowhere to post the brief, so hand it to the visitor's email.
    const apiUrl = import.meta.env.VITE_API_URL as string | undefined
    if (!apiUrl) {
      setNeedsEmail(true)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsSuccess(true)
      } else {
        setNeedsEmail(true)
      }
    } catch {
      setNeedsEmail(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setIsSuccess(false)
    setNeedsEmail(false)
    setFormData({
      name: '',
      email: '',
      company: '',
      services: [],
      budget: DEFAULT_BUDGET,
      brief: '',
    })
    closeContactModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div onClick={closeContactModal} className="absolute inset-0 bg-ink/50" />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-line bg-card p-6 shadow-xl md:p-8">
        <button
          onClick={closeContactModal}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-2 text-muted hover:bg-paper hover:text-ink transition-colors"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={40} aria-hidden="true" className="mx-auto text-accent" />
            <h3 id="contact-title" className="mt-5 text-2xl">Thanks, {formData.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              We have your project details and will reply to <span className="font-medium text-ink">{formData.email}</span> to set up a call.
            </p>
            <button onClick={resetForm} className="btn-primary mt-7">Done</button>
          </div>
        ) : needsEmail ? (
          <div className="py-4 text-center">
            <Mail size={36} aria-hidden="true" className="mx-auto text-accent" />
            <h3 id="contact-title" className="mt-5 text-2xl">Send us your brief</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-body">
              Your details are ready in an email. Choose how to send it and we will reply to <span className="font-medium text-ink">{formData.email}</span>.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={gmailComposeUrl(SITE.email, emailSubject, emailBody)} target="_blank" rel="noreferrer" className="btn-primary">
                Send with Gmail
                <Send size={15} aria-hidden="true" />
              </a>
              <a href={mailtoUrl(SITE.email, emailSubject, emailBody)} className="btn-secondary">
                Open email app
              </a>
            </div>

            <p className="mt-6 text-sm text-muted">
              Or write to us at <span className="select-all font-medium text-ink">{SITE.email}</span>
            </p>
            <button onClick={resetForm} className="mt-4 text-sm text-muted underline hover:text-ink">
              Close
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-medium text-muted">
              Step {step} of 2 · {step === 1 ? 'Your details' : 'Your project'}
            </p>
            <h3 id="contact-title" className="mt-2 text-2xl">Book a free call</h3>
            <p className="mt-2 text-sm text-body">Tell us a little about you and what you want to build.</p>

            {errorMessage && (
              <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {errorMessage}
              </p>
            )}

            {step === 1 && (
              <form onSubmit={handleNext} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-company" className={labelClass}>
                    Business, college or project <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your startup, shop, college or idea"
                    className={inputClass}
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Continue
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <fieldset>
                  <legend className={labelClass}>Services you need</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map(({ name }) => {
                      const selected = formData.services.includes(name)
                      return (
                        <button
                          type="button"
                          key={name}
                          onClick={() => toggleService(name)}
                          aria-pressed={selected}
                          className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                            selected
                              ? 'border-accent bg-accent-soft text-accent-ink'
                              : 'border-line-strong bg-card text-body hover:border-ink'
                          }`}
                        >
                          {name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="contact-budget" className={labelClass}>Approximate budget</label>
                  <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={inputClass}
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-brief" className={labelClass}>About your project</label>
                  <textarea
                    id="contact-brief"
                    required
                    rows={4}
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    placeholder="What you want to build or improve, who it is for, and any deadline"
                    className={inputClass}
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 disabled:opacity-60">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} aria-hidden="true" className="animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send details
                        <Send size={15} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
