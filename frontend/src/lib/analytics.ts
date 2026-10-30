import posthog from 'posthog-js'

export function initAnalytics() {
  if (typeof window === 'undefined') return

  const posthogKey = import.meta.env.VITE_POSTHOG_KEY
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com'

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage',
    })
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      posthog.capture(eventName, properties)
    } catch {
      // Graceful fallback
    }
  }
}
