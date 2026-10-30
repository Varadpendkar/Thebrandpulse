import React from 'react'
import { Hero } from '../components/sections/Hero'
import { ProblemStatement } from '../components/sections/ProblemStatement'
import { AnatomyServiceCards } from '../components/sections/AnatomyServiceCards'
import { WhyUs } from '../components/sections/WhyUs'
import { ProcessSection } from '../components/sections/ProcessSection'
import { TeamSection } from '../components/sections/TeamSection'
import { CtaSection } from '../components/sections/CtaSection'

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. Hero: 3D Torus Knot x Octahedron on right, business text left, 2 CTAs */}
      <Hero />

      {/* 2. Problem Statement: 3 lines reveal on scroll */}
      <ProblemStatement />

      {/* 3. Services: 6 Anatomy Cards (AI, Marketing, Product, ERP, CRM, Consulting) */}
      <AnatomyServiceCards />

      {/* 4. Why Us: 3 stats + 3 differentiators in business outcome language */}
      <WhyUs />

      {/* 5. Process: 4 steps horizontal pinned scroll (Discover, Plan, Build, Grow) */}
      <ProcessSection />

      {/* 6. Team: 4 shattered glass cards (Varad, Abhijeet, Atharva, Yash) */}
      <TeamSection />

      {/* 7. CTA Section: "Ready to grow your business?" */}
      <CtaSection />
    </main>
  )
}

