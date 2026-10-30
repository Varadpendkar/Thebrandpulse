import faq from '../data/chatbot-faq.json'

export interface ChatResponse {
  response: string
  cta?: string
}

export function matchIntent(input: string): ChatResponse {
  const lower = input.toLowerCase()

  for (const intent of faq.intents) {
    if (intent.keywords.some((k) => lower.includes(k))) {
      return { response: intent.response, cta: intent.cta }
    }
  }

  return { response: faq.fallback, cta: 'Book a Free Call' }
}

export function getChatGreeting(): string {
  return faq.greeting
}

