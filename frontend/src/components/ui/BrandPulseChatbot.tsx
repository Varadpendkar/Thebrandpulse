import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Calendar, ArrowUpRight, Terminal } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { matchIntent, getChatGreeting } from '../../hooks/useChatbot'

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
  cta?: string
}

export const BrandPulseChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [coords, setCoords] = useState({ x: '42.88', y: '19.04', z: '88.12' })
  const [isHovered, setIsHovered] = useState(false)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: getChatGreeting(),
      timestamp: 'SYS.INIT',
      cta: 'Book a Call',
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { openContactModal } = useAppStore()

  // 1. Dynamic HUD coordinates updating every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: (Math.random() * 80 + 10).toFixed(2),
        y: (Math.random() * 80 + 10).toFixed(2),
        z: (Math.random() * 80 + 10).toFixed(2),
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 250)
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
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
      }}
    >
      {/* ── EXPANDED HUD CHAT WINDOW ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="operator-window"
            initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0, transformOrigin: 'bottom right' }}
            exit={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: 'bottom right' }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
            }}
            className="w-[380px] h-[580px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vh-6rem)] rounded-xl border border-[#CAFF00] shadow-[0_0_35px_rgba(202,255,0,0.3)] flex flex-col overflow-hidden relative"
            style={{
              background: '#000000',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 30px rgba(202,255,0,0.25), 0 20px 60px rgba(0,0,0,0.95)',
            }}
          >
            {/* L-Shaped Corner Brackets */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#CAFF00] pointer-events-none z-20" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#CAFF00] pointer-events-none z-20" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#CAFF00] pointer-events-none z-20" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#CAFF00] pointer-events-none z-20" />

            {/* Window Header with HUD Metadata */}
            <div className="px-5 py-3.5 bg-[#050505] border-b border-[#1f1f1f] flex items-center justify-between relative z-10">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#CAFF00] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#CAFF00] tracking-wider">
                    BP.01 | SYSTEM OPERATOR | ONLINE
                  </span>
                </div>
                <div className="font-mono text-[9px] text-[#777777] tracking-widest uppercase flex items-center space-x-3">
                  <span>COORD X:{coords.x} Y:{coords.y} Z:{coords.z}</span>
                  <span className="text-[#CAFF00]/80">NEON MODE</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close System Operator"
                className="p-1.5 text-[#888888] hover:text-[#CAFF00] hover:bg-[#111111] transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-lg leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-[#CAFF00] text-black font-mono font-bold'
                          : 'bg-[#121212] border-l-2 border-[#CAFF00] text-[#ededed] font-mono'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center space-x-1.5 mb-1 text-[9px] text-[#CAFF00] tracking-wider uppercase font-bold">
                          <Terminal size={10} />
                          <span>SYS.OP // RESPONSE</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {!isUser && msg.cta && (
                        <button
                          onClick={() => handleCtaClick(msg.cta)}
                          className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 bg-[#CAFF00] text-black font-mono font-bold text-[10px] rounded hover:bg-white transition-colors"
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
                <div className="flex items-center space-x-2 text-[#CAFF00] font-mono text-xs bg-[#121212] border-l-2 border-[#CAFF00] p-3 rounded-lg max-w-[70%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CAFF00] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-[#888888] ml-1">PROCESSING QUERY...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3.5 py-2 bg-[#060606] border-t border-[#1a1a1a] flex items-center space-x-2 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="font-mono text-[9px] text-[#888888] hover:text-[#CAFF00] bg-[#0d0d0d] hover:bg-[#141414] border border-[#222222] hover:border-[#CAFF00]/40 px-2.5 py-1 rounded whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Bottom Quick Book Bar */}
            <div className="px-4 py-1.5 bg-[#080808] border-t border-[#1a1a1a] flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#666666]">DIRECT CONSULTATION</span>
              <button
                onClick={() => {
                  setIsOpen(false)
                  openContactModal()
                }}
                className="font-bold text-[#CAFF00] hover:underline flex items-center space-x-1"
              >
                <Calendar size={11} />
                <span>[ BOOK A CALL ]</span>
              </button>
            </div>

            {/* Input Field: A simple line at the bottom with blinking lime cursor */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="p-3.5 bg-[#050505] border-t border-[#222222] flex items-center space-x-2"
            >
              <span className="font-mono text-xs text-[#CAFF00] select-none">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type query or command..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 border-b border-[#CAFF00] text-xs font-mono text-white placeholder-[#555] px-1 py-1.5 focus:outline-none focus:border-white transition-colors"
              />
              <span className="text-[#CAFF00] font-mono text-xs animate-pulse select-none">_</span>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send query"
                className="p-2 bg-[#CAFF00] hover:bg-white text-black rounded disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SYSTEM OPERATOR AI INTERFACE TRIGGER ───────────────────── */}
      {!isOpen && (
        <div
          ref={triggerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open BP.01 System Operator"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
          className="relative cursor-pointer select-none group transform-gpu transition-all duration-300 max-sm:scale-[0.7] max-sm:origin-bottom-right"
        >
          {/* Metadata Top-Left */}
          <div
            className="absolute -top-6 left-0 font-mono text-[9px] text-[#CAFF00] font-bold tracking-wider whitespace-nowrap pointer-events-none transition-opacity duration-200"
            style={{
              textShadow: '0 0 8px rgba(202,255,0,0.6)',
              animation: 'flickerText 4s infinite ease-in-out',
            }}
          >
            BP.01 | SYSTEM OPERATOR | ONLINE
          </div>

          {/* Metadata Top-Right (Hidden on Mobile < 768px) */}
          <div
            className="hidden md:block absolute -top-6 right-0 font-mono text-[8px] text-[#CAFF00]/80 tracking-widest whitespace-nowrap pointer-events-none"
            style={{
              animation: 'flickerText 5s infinite ease-in-out',
            }}
          >
            X:{coords.x} Y:{coords.y} Z:{coords.z}
          </div>

          {/* Double Frame: Square Container with Rounded Corners & Corner L-Brackets */}
          <motion.div
            animate={{
              scale: isHovered ? 1.06 : [1.0, 1.04, 1.0],
            }}
            transition={{
              duration: isHovered ? 0.3 : 3.2,
              repeat: isHovered ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/90 p-2 flex items-center justify-center relative transition-all duration-300"
            style={{
              border: '1px solid #CAFF00',
              boxShadow: isHovered
                ? '0 0 30px rgba(202,255,0,0.85), inset 0 0 15px rgba(202,255,0,0.3)'
                : '0 0 16px rgba(202,255,0,0.4), inset 0 0 8px rgba(202,255,0,0.15)',
            }}
          >
            {/* Corner L-Brackets */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#CAFF00] pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#CAFF00] pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#CAFF00] pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#CAFF00] pointer-events-none" />

            {/* Inner Accents: Thin horizontal tick marks */}
            <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1.5 h-[1px] bg-[#CAFF00]/80" />
            <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1.5 h-[1px] bg-[#CAFF00]/80" />

            {/* Core Element: Centered Glowing Obsidian Sphere with Neon Lime Inner Glow */}
            <motion.div
              animate={{
                rotateY: isHovered ? 25 : 0,
                rotateX: isHovered ? -15 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center relative transition-transform duration-500"
              style={{
                background:
                  'radial-gradient(circle at 35% 35%, #CAFF00 0%, #1e3a00 32%, #080d00 68%, #000000 100%)',
                boxShadow:
                  '0 0 25px rgba(202,255,0,0.5), inset 0 0 16px rgba(202,255,0,0.7)',
              }}
            >
              {/* Inner Monogram Badge */}
              <div className="w-6 h-6 rounded-full bg-black/75 border border-[#CAFF00] flex items-center justify-center backdrop-blur-sm shadow-[0_0_8px_rgba(202,255,0,0.5)]">
                <span className="font-mono font-black text-[9px] text-[#CAFF00] tracking-tighter">
                  BP
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Metadata Bottom-Left */}
          <div
            className="absolute -bottom-6 left-0 font-mono text-[9px] text-[#CAFF00] font-bold tracking-wider whitespace-nowrap pointer-events-none"
            style={{
              textShadow: '0 0 8px rgba(202,255,0,0.6)',
              animation: 'flickerText 4.5s infinite ease-in-out',
            }}
          >
            INTELLIGENCE: ACTIVE<span className="animate-pulse">_</span>
          </div>

          {/* Metadata Bottom-Right (Hidden on Mobile < 768px) */}
          <div
            className="hidden md:block absolute -bottom-6 right-0 font-mono text-[8px] text-[#CAFF00]/80 tracking-widest whitespace-nowrap pointer-events-none"
            style={{
              animation: 'flickerText 6s infinite ease-in-out',
            }}
          >
            COLOR: #CAFF00 | NEON MODE
          </div>
        </div>
      )}

      {/* Screen flicker keyframe style */}
      <style>{`
        @keyframes flickerText {
          0%, 100% { opacity: 1; }
          40% { opacity: 0.95; }
          42% { opacity: 0.7; }
          44% { opacity: 1; }
          75% { opacity: 0.85; }
          78% { opacity: 0.65; }
          82% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
