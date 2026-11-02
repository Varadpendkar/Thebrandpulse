import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, ArrowRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { matchIntent, getChatGreeting } from '../../hooks/useChatbot'

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
  cta?: string
}

const panelVariants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.18 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
}

export const BrandPulseChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: getChatGreeting(),
      timestamp: 'Just now',
      cta: 'Book a free call',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { openContactModal } = useAppStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen, messages])

  const quickQuestions = [
    'What services does BrandPulse offer?',
    'Who do you work with?',
    'How much do your services cost?',
    'Show me your work.',
  ]

  const handleCtaClick = (ctaText?: string) => {
    if (!ctaText) return
    const lower = ctaText.toLowerCase()
    if (lower.includes('call') || lower.includes('session') || lower.includes('free')) {
      setIsOpen(false)
      openContactModal()
    } else if (lower.includes('team')) {
      setIsOpen(false)
      const el = document.getElementById('team')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else if (lower.includes('service') || lower.includes('deliverable')) {
      setIsOpen(false)
      const el = document.getElementById('services')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setIsOpen(false)
      openContactModal()
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isLoading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Direct, confident response from knowledge base
    setTimeout(() => {
      const match = matchIntent(query)
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: match.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cta: match.cta,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsLoading(false)
    }, 320)
  }

  return (
    <>
      {/* ── Slide-Up Chat Panel (Above Button, Anchored Bottom-Right) ──── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[520px] max-h-[calc(100vh-7rem)] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-line bg-card shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">BrandPulse assistant</p>
                <p className="text-xs text-muted">Answers about services, pricing and the team</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-muted hover:bg-paper hover:text-ink transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-paper p-4 text-sm">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[88%] rounded-lg px-3.5 py-2.5 leading-relaxed ${
                        isUser ? 'bg-accent text-white' : 'border border-line bg-card text-body'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {!isUser && msg.cta && (
                        <button
                          onClick={() => handleCtaClick(msg.cta)}
                          className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                        >
                          {msg.cta}
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    <span className="mt-1 px-1 text-[11px] text-muted">{msg.timestamp}</span>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex w-fit items-center gap-1.5 rounded-lg border border-line bg-card px-3.5 py-3" aria-label="Typing">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-1.5 overflow-x-auto border-t border-line px-3 py-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap rounded-full border border-line-strong px-3 py-1 text-xs text-body hover:border-accent hover:text-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <label htmlFor="brandpulse-chat-input" className="sr-only">
                Ask the BrandPulse assistant
              </label>
              <input
                id="brandpulse-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, pricing, the team"
                disabled={isLoading}
                className="flex-1 rounded-md border border-line-strong px-3 py-2 text-sm text-ink placeholder:text-muted/70 outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="rounded-md bg-accent p-2.5 text-white hover:bg-accent-hover disabled:opacity-40 transition-colors"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close the BrandPulse assistant' : 'Open the BrandPulse assistant'}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover transition-colors"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </>
  )
}
