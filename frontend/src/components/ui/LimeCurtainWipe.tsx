import React from 'react'
import { motion } from 'framer-motion'

export const LimeCurtainWipe: React.FC = () => {
  return (
    <>
      {/* Wipe In */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 1 }}
        className="fixed inset-0 z-[60] bg-[#CAFF00] pointer-events-none"
      />
      {/* Wipe Out */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-[60] bg-[#CAFF00] pointer-events-none"
      />
    </>
  )
}

