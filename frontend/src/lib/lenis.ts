import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

export function initLenis() {
  if (typeof window === 'undefined') return () => {}

  // Single Lenis instance check
  if (lenis) {
    return () => {}
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Lenis config: lerp: 0.06 (slower, cinematic like roomandpillar.com)
  lenis = new Lenis({
    lerp: 0.06,
    duration: 1.4,
    smoothWheel: !reduceMotion,
    wheelMultiplier: 0.9,
  })

  // GSAP ticker is the ONE driver — properly bridged, single instance
  lenis.on('scroll', ScrollTrigger.update)
  
  const tick = (time: number) => {
    lenis?.raf(time * 1000)
  }
  
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export const getLenis = () => lenis

export const scrollToTop = () => {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export const scrollToId = (id: string) => {
  const target = document.getElementById(id)
  if (target) {
    if (lenis) {
      lenis.scrollTo(target, { offset: -70, duration: 1.3 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
