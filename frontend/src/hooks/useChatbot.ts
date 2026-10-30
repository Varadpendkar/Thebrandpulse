import faq from '../data/chatbot-faq.json'

export interface ChatResponse {
  response: string
  cta?: string
}

export function matchIntent(input: string): ChatResponse {
  const cleanInput = input.trim().toLowerCase()

  if (!cleanInput) {
    return { response: faq.greeting }
  }

  // 1. Check small talk
  for (const item of faq.smallTalk) {
    if (item.triggers.some((trigger) => {
      const lowerTrigger = trigger.toLowerCase()
      return cleanInput === lowerTrigger || cleanInput.startsWith(lowerTrigger + ' ') || cleanInput.endsWith(' ' + lowerTrigger)
    })) {
      return { response: item.response }
    }
  }

  // 2. Score-based matching on FAQs
  let bestMatch: { faq: typeof faq.faqs[0]; score: number } | null = null

  for (const item of faq.faqs) {
    let score = 0

    // Exact question match
    if (cleanInput === item.question.toLowerCase()) {
      score += 100
    }

    // Trigger keyword match (weight longer keywords higher)
    for (const kw of item.triggerKeywords) {
      const lowerKw = kw.toLowerCase()
      if (cleanInput === lowerKw) {
        score += 50
      } else if (cleanInput.includes(lowerKw)) {
        score += 20 + lowerKw.length
      }
    }

    // Question substring match
    const questionWords = item.question.toLowerCase().split(/\s+/)
    for (const word of questionWords) {
      if (word.length > 3 && cleanInput.includes(word)) {
        score += 5
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { faq: item, score }
    }
  }

  if (bestMatch && bestMatch.score >= 15) {
    return {
      response: bestMatch.faq.answer,
      cta: bestMatch.faq.cta,
    }
  }

  return {
    response: faq.fallback,
    cta: 'Book a Free Call',
  }
}

export function getChatGreeting(): string {
  return faq.greeting
}
