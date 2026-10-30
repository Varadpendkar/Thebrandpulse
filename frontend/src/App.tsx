import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { initLenis } from './lib/lenis'
import { initAnalytics } from './lib/analytics'
import { CustomCursor } from './components/ui/CustomCursor'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { LimeCurtainWipe } from './components/ui/LimeCurtainWipe'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { BrandPulseChatbot } from './components/ui/BrandPulseChatbot'
import { ContactModal } from './components/sections/ContactModal'
import { CaseStudyModal } from './components/sections/CaseStudyModal'
import { HomePage } from './pages/HomePage'
import { ServiceSubPage } from './pages/ServiceSubPage'

function AnimatedAppContent() {
  const location = useLocation()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scroll driven by GSAP ticker
    const cleanup = initLenis()
    initAnalytics()
    return cleanup
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-[#caff00] selection:text-black">
      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* BrandPulse Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Fixed Header Navbar */}
      <Navbar />

      {/* Route Transitions with Lime Curtain Wipe */}
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <LimeCurtainWipe />
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServiceSubPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Floating BrandPulse Chatbot */}
      <BrandPulseChatbot />

      {/* Interactive Contact & Discovery Booking Modal */}
      <ContactModal />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal />
    </div>
  )
}

export function App() {
  return (
    <Router>
      <AnimatedAppContent />
    </Router>
  )
}

export default App
