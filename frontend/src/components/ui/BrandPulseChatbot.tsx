import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Calendar, ArrowUpRight } from 'lucide-react'
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
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: 'bottom right',
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
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
    'How do AI Solutions help my business?',
    'What is your 14-day prototype guarantee?',
    'How do we book a discovery call?',
    'Tell me about your team',
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
    } else if (lower.includes('service') || lower.includes('product') || lower.includes('marketing') || lower.includes('erp') || lower.includes('crm')) {
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

    // Match intent from local JSON FAQ with realistic conversational delay
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
    }, 380)
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
            className="fixed bottom-24 right-4 sm:right-6 w-[360px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] bg-[#0D0D0D] border border-[#CAFF00]/40 rounded-t-xl rounded-b-md shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden z-50"
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#111111] border-b border-[#1f1f1f] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-[#CAFF00] animate-pulse" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  [ BRANDPULSE CHAT ]
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1 text-[#888888] hover:text-[#CAFF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00] rounded"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-xl leading-relaxed ${
                        isUser
                          ? 'bg-[#CAFF00] text-black font-medium'
                          : 'bg-[#161616] border border-[#242424] text-[#ededed]'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center space-x-1.5 mb-1.5 text-[10px] font-mono text-[#CAFF00]">
                          <Bot size={12} />
                          <span>BrandPulse</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {!isUser && msg.cta && (
                        <button
                          onClick={() => handleCtaClick(msg.cta)}
                          className="mt-2.5 inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#CAFF00] text-black font-mono font-bold text-[10px] rounded hover:bg-white transition-colors"
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
                <div className="flex items-center space-x-2 text-[#CAFF00] font-mono text-xs bg-[#161616] p-2.5 rounded-xl max-w-[70%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-[#888888] ml-1">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-1.5 bg-[#0a0a0a] border-t border-[#181818] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="font-mono text-[9px] text-[#888888] hover:text-[#CAFF00] bg-[#121212] border border-[#222222] px-2 py-1 rounded whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Bottom Quick Book a Call Bar */}
            <div className="px-3 py-1.5 bg-[#0e0e0e] border-t border-[#1a1a1a] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#777777]">Speak with leadership</span>
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

            {/* Input Form at Bottom */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="p-3 bg-[#111111] border-t border-[#222222] flex items-center space-x-2"
            >
              <label htmlFor="brandpulse-chat-input" className="sr-only">
                Type your question
              </label>
              <input
                id="brandpulse-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI, Web, CRM, ERP..."
                disabled={isLoading}
                className="flex-1 bg-[#161616] border border-[#262626] rounded-md px-3 py-2 text-xs text-white placeholder-[#555] focus-visible:outline-none focus-visible:border-[#CAFF00]"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="p-2 bg-[#CAFF00] hover:bg-white text-black rounded-md disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button (56px Circle, Bottom Right) ────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat with BrandPulse"}
          className="w-14 h-14 rounded-full bg-[#CAFF00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(202,255,0,0.4)] border border-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00]"
        >
          {isOpen ? (
            <X size={22} className="stroke-[2.5]" />
          ) : (
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono font-black text-sm tracking-tighter leading-none">BP</span>
              <span className="font-mono text-[8px] font-bold tracking-widest leading-none mt-0.5">CHAT</span>
            </div>
          )}
        </motion.button>
      </div>
    </>
  )
}
