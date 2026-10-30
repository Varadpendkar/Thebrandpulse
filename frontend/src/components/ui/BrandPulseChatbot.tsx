import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Calendar } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
}

export const BrandPulseChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am the BrandPulse assistant. How can we help grow your business? Ask about our AI Solutions, Digital Marketing, Product Building, ERP, CRM, or Strategic Consulting.",
      timestamp: 'Just now',
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
  ]

  const handleSendMessage = async (textToSend?: string) => {
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

    try {
      const apiEndpoint = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/chat` 
        : '/api/chat'

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      })

      if (!response.ok) {
        throw new Error('API server unreachable')
      }

      const data = await response.json()
      const botReply = data.response || data.reply || "We're here to help you scale. Would you like to book a call with our partners?"

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch {
      // Graceful offline fallback per Phase 7 specification
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "We're offline right now. Email us at hello@brandpulse.in or book a call directly with our partners.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button (56px circle, lime background, "BP" text or chat icon) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat with BrandPulse"
        className="w-14 h-14 rounded-full bg-[#CAFF00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(202,255,0,0.4)] border border-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF00]"
      >
        {isOpen ? (
          <X size={22} className="stroke-[2.5]" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono font-black text-sm tracking-tighter leading-none">BP</span>
            <span className="font-mono text-[8px] font-bold tracking-widest leading-none mt-0.5">CHAT</span>
          </div>
        )}
      </motion.button>

      {/* Slide-Up Chat Panel (350×500px, dark #0D0D0D, 1px lime border, rounded-top 8px) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-18 right-0 w-[350px] h-[500px] max-w-[calc(100vw-2rem)] bg-[#0D0D0D] border border-[#CAFF00]/40 rounded-t-lg rounded-b-md shadow-[0_12px_45px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-50"
          >
            {/* Panel Header */}
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
                className="p-1 text-[#888888] hover:text-[#CAFF00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CAFF00]"
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
                      className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                        isUser
                          ? 'bg-[#CAFF00] text-black font-medium'
                          : 'bg-[#161616] border border-[#242424] text-[#ededed]'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center space-x-1.5 mb-1 text-[10px] font-mono text-[#CAFF00]">
                          <Bot size={12} />
                          <span>BrandPulse</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
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
              <span className="font-mono text-[10px] text-[#777777]">Want to speak directly?</span>
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
    </div>
  )
}
