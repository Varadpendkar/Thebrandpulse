import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const prefersReduced = useReducedMotion()

  const fullText = '[ BrandPulse ]'

  useEffect(() => {
    if (prefersReduced) {
      setIsDone(true)
      if (onComplete) onComplete()
      return
    }

    // Monospace typing effect for BrandPulse
    let charIndex = 0
    const textInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(textInterval)
      }
    }, 60)

    // Progress bar fill
    const start = performance.now()
    const duration = 1400

    const updateProgress = (now: number) => {
      const elapsed = now - start
      const p = Math.min(Math.round((elapsed / duration) * 100), 100)
      setProgress(p)

      if (p < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          setIsDone(true)
          if (onComplete) onComplete()
        }, 250)
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {
      clearInterval(textInterval)
    }
  }, [onComplete, prefersReduced])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="brandpulse-loader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#ededed]"
        >
          {/* Subtle Grid in Loader */}
          <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-white">
                {typedText}
              </span>
              <span className="h-6 w-2 bg-[#caff00] animate-pulse" />
            </div>

            {/* Subtext */}
            <p className="font-mono text-xs tracking-widest text-[#888888] uppercase">
              WE BUILD BRANDS PEOPLE CAN'T IGNORE
            </p>

            {/* Slim Lime Progress Bar */}
            <div className="w-56 h-[2px] bg-[#1a1a1a] overflow-hidden rounded-full relative">
              <motion.div
                className="h-full bg-[#caff00] shadow-[0_0_10px_#caff00]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="font-mono text-[11px] text-[#666666]">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
