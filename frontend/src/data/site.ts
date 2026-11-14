// Single source for contact details used across the site, the contact form fallback and the chatbot.
export const SITE = {
  name: 'BrandPulse',
  location: 'Pune, India',
  // Shared inbox until BrandPulse has its own domain email.
  // Do not use brandpulse.in: that domain belongs to an unrelated agency.
  email: 'varadpendkar@gmail.com',
} as const

export function gmailComposeUrl(to: string, subject = '', body = ''): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function mailtoUrl(to: string, subject = '', body = ''): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
