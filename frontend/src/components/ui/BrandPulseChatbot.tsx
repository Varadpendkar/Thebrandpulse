import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Calendar, ArrowUpRight } from 'lucide-react'
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
  closed: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'bottom right',
    y: 20,
    transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: 'bottom right',
    y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
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
      cta: 'Book a Call',
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
    'What is your 14-day prototype guarantee?',
    'What services does BrandPulse offer?',
    'How does the 4-stage sprint work?',
    'Show me a case study',
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
            className="fixed bottom-24 right-4 sm:right-6 w-[370px] h-[540px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] border border-[#333333] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden z-50"
            style={{
              background: 'rgba(6, 6, 6, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Header: Stylized BP Monogram Avatar + "BrandPulse Intelligence" */}
            <div className="px-4 py-3.5 bg-[#090909]/90 border-b border-[#222222] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Circular Avatar: #000 bg, 2px solid #CAFF00 border, bold lime "BP" */}
                <div className="w-8 h-8 rounded-full bg-black border-2 border-[#CAFF00] flex items-center justify-center shadow-[0_0_12px_rgba(202,255,0,0.4)]">
                  <span className="font-mono font-black text-xs text-[#CAFF00] tracking-tighter">
                    BP
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-xs text-white tracking-wide">
                      BrandPulse Intelligence
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-pulse" />
                  </div>
                  <span className="font-mono text-[9px] text-[#777777] tracking-widest uppercase block">
                    AUTONOMOUS ADVISORY
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 text-[#888888] hover:text-[#CAFF00] hover:bg-[#141414] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-sans text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-[#CAFF00] text-black font-medium rounded-br-none'
                          : 'bg-[#141414] border border-[#262626] text-[#ededed] rounded-bl-none'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center space-x-1.5 mb-1.5 text-[10px] font-mono text-[#CAFF00] font-bold">
                          <span className="w-3.5 h-3.5 rounded-full bg-black border border-[#CAFF00] inline-flex items-center justify-center text-[7px] leading-none">
                            BP
                          </span>
                          <span>BrandPulse Intelligence</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {!isUser && msg.cta && (
                        <button
                          onClick={() => handleCtaClick(msg.cta)}
                          className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 bg-[#CAFF00] text-black font-mono font-bold text-[10px] rounded hover:bg-white transition-colors shadow-[0_0_10px_rgba(202,255,0,0.3)]"
                        >
                          <span>[ {msg.cta.toUpperCase()} ]</span>
                          <ArrowUpRight size={11} />
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-[#555555] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex items-center space-x-2 text-[#CAFF00] font-mono text-xs bg-[#141414] border border-[#222222] p-3 rounded-2xl rounded-bl-none max-w-[70%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-[#888888] ml-1">Evaluating...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-[#080808]/90 border-t border-[#1a1a1a] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="font-mono text-[9px] text-[#888888] hover:text-[#CAFF00] bg-[#111111] hover:bg-[#181818] border border-[#222222] hover:border-[#CAFF00]/40 px-2.5 py-1 rounded whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Bottom Quick Book a Call Bar */}
            <div className="px-3.5 py-1.5 bg-[#090909]/90 border-t border-[#1c1c1c] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#777777]">Need a tailored assessment?</span>
              <button
                onClick={() => {
                  setIsOpen(false)
                  openContactModal()
                }}
                className="font-mono text-[10px] font-bold text-[#CAFF00] hover:underline flex items-center space-x-1"
              >
                <Calendar size={11} />
                <span>[ BOOK A CALL ]</span>
              </button>
            </div>

            {/* Input Form at Bottom with Neon Lime Bottom-Border */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="p-3 bg-[#0a0a0a] border-t border-[#202020] flex items-center space-x-2"
            >
              <label htmlFor="brandpulse-chat-input" className="sr-only">
                Ask BrandPulse Intelligence
              </label>
              <input
                id="brandpulse-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI, audit scope, pricing..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 border-b-2 border-[#CAFF00] px-2 py-2 text-xs text-white placeholder-[#555] focus:outline-none focus:ring-0 focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="p-2 bg-[#CAFF00] hover:bg-white text-black rounded-lg disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button (Circular Avatar, Pulsing Lime Glow) ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open BrandPulse Intelligence"}
          className="relative w-14 h-14 rounded-full bg-black border-2 border-[#CAFF00] text-[#CAFF00] flex items-center justify-center shadow-[0_0_20px_rgba(202,255,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00] group"
        >
          {/* Subtle pulse ring animation */}
          <span className="absolute inset-0 rounded-full border border-[#CAFF00] animate-ping opacity-25 pointer-events-none" />

          {isOpen ? (
            <X size={20} className="stroke-[2.5] text-white" />
          ) : (
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono font-black text-sm tracking-tighter leading-none text-[#CAFF00] group-hover:text-white transition-colors">
                BP
              </span>
              <span className="font-mono text-[7px] font-bold tracking-widest leading-none mt-0.5 text-white/70">
                AI
              </span>
            </div>
          )}
        </motion.button>
      </div>
    </>
  )
}
