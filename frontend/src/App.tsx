import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { initLenis } from './lib/lenis'
import { initAnalytics } from './lib/analytics'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { BrandPulseChatbot } from './components/ui/BrandPulseChatbot'
import { ContactModal } from './components/sections/ContactModal'
import { HomePage } from './pages/HomePage'
import { ServiceSubPage } from './pages/ServiceSubPage'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis smooth scroll driven by GSAP ticker
    const cleanup = initLenis()
    initAnalytics()
    return cleanup
  }, [])

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans">
      {/* Vercel Web Analytics */}
      <Analytics />

      <Navbar />

      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServiceSubPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />

      <BrandPulseChatbot />

      <ContactModal />
    </div>
  )
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
