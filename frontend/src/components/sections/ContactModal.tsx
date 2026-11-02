import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Send, Mail } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { SITE, gmailComposeUrl, mailtoUrl } from '../../data/site'

const DEFAULT_BUDGET = 'Not sure yet, help me scope it'

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

  const availableServices = [
    'AI Solutions',
    'Digital Marketing',
    'Product Building',
    'ERP Systems',
    'CRM Systems',
    'Strategic Consulting',
  ]

  const budgetOptions = [
    DEFAULT_BUDGET,
    'Under ₹25,000',
    '₹25,000 – ₹1,00,000',
    '₹1,00,000 – ₹5,00,000',
    '₹5,00,000+',
  ]

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
      setErrorMessage('Please provide both your name and email.')
      return
    }
    setErrorMessage('')
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.brief.trim()) {
      setErrorMessage('Please include a brief overview of your project.')
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContactModal}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#0d0d0d] border border-[#caff00] rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(202,255,0,0.18)] z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeContactModal}
            aria-label="Close contact modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-[#181818] text-[#888888] hover:text-[#caff00] hover:bg-[#222222] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
          >
            <X size={18} />
          </button>

          {isSuccess ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#172502] border border-[#caff00] flex items-center justify-center text-[#caff00]">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#caff00] tracking-widest uppercase">
                  [ ENQUIRY RECEIVED ]
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                  WE'LL GET BACK TO YOU SOON
                </h3>
                <p className="font-sans text-sm text-[#888888] max-w-md mx-auto">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. We have your project details and will reply to <span className="text-white">{formData.email}</span> to set up a call.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#caff00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors"
                >
                  DONE
                </button>
              </div>
            </div>
          ) : needsEmail ? (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#172502] border border-[#caff00] flex items-center justify-center text-[#caff00]">
                <Mail size={30} />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#caff00] tracking-widest uppercase">
                  [ ONE LAST STEP ]
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                  SEND US YOUR BRIEF
                </h3>
                <p className="font-sans text-sm text-[#888888] max-w-md mx-auto">
                  Your details are ready in an email. Choose how to send it and we will reply to <span className="text-white">{formData.email}</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3">
                <a
                  href={gmailComposeUrl(SITE.email, emailSubject, emailBody)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#caff00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
                >
                  <span>SEND WITH GMAIL</span>
                  <Send size={14} />
                </a>
                <a
                  href={mailtoUrl(SITE.email, emailSubject, emailBody)}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#181818] border border-[#262626] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:border-[#caff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                >
                  <span>OPEN EMAIL APP</span>
                  <Mail size={14} />
                </a>
              </div>

              <p className="font-mono text-xs text-[#666666]">
                Or write to us directly at <span className="text-[#caff00] select-all">{SITE.email}</span>
              </p>

              <button
                onClick={resetForm}
                className="font-mono text-xs text-[#888888] hover:text-white underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-[#caff00] font-semibold tracking-wider">
                    [ STEP {step} OF 2 ]
                  </span>
                  <span className="text-[#333333]">/</span>
                  <span className="font-mono text-xs text-[#888888]">
                    {step === 1 ? 'CONTACT DETAILS' : 'PROJECT SCOPE'}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                  START YOUR PROJECT
                </h3>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              {/* Step 1: Contact Details */}
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-xs text-[#888888] uppercase mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#141414] border border-[#262626] focus:border-[#caff00] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555555] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-xs text-[#888888] uppercase mb-1.5">
                      EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-[#141414] border border-[#262626] focus:border-[#caff00] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555555] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block font-mono text-xs text-[#888888] uppercase mb-1.5">
                      BUSINESS / COLLEGE / PROJECT (OPTIONAL)
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your startup, shop, college or idea"
                      className="w-full bg-[#141414] border border-[#262626] focus:border-[#caff00] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555555] outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#caff00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
                    >
                      <span>CONTINUE TO SCOPE</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Project Scope */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="block font-mono text-xs text-[#888888] uppercase mb-2">
                      SERVICES NEEDED
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {availableServices.map((svc) => {
                        const selected = formData.services.includes(svc)
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() => toggleService(svc)}
                            className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00] ${
                              selected
                                ? 'bg-[#182602] border-[#caff00] text-[#caff00]'
                                : 'bg-[#141414] border-[#262626] text-[#999999] hover:border-[#444444]'
                            }`}
                          >
                            {svc}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className="block font-mono text-xs text-[#888888] uppercase mb-1.5">
                      APPROXIMATE BUDGET
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] focus:border-[#caff00] rounded-lg px-4 py-3 text-sm text-white outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#141414] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-brief" className="block font-mono text-xs text-[#888888] uppercase mb-1.5">
                      PROJECT OVERVIEW / BRIEF *
                    </label>
                    <textarea
                      id="contact-brief"
                      required
                      rows={3}
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      placeholder="Tell us what you want to build or improve, who it is for, and any deadline..."
                      className="w-full bg-[#141414] border border-[#262626] focus:border-[#caff00] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555555] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#caff00]"
                    />
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 bg-[#181818] border border-[#262626] text-[#888888] hover:text-white rounded-[3px] font-mono text-xs flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#caff00]"
                    >
                      <ArrowLeft size={14} />
                      <span>BACK</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center space-x-2 py-3.5 bg-[#caff00] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] hover:bg-white transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#caff00]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT PROJECT BRIEF</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
