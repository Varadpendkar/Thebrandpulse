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
      {/* 1. Hero: headline, CTAs and the service list */}
      <Hero />

      {/* 2. Approach: one-line philosophy and who we work with */}
      <ProblemStatement />

      {/* 3. Services: six service cards linking to their pages */}
      <AnatomyServiceCards />

      {/* 4. Why us: team facts and three differentiators */}
      <WhyUs />

      {/* 5. Process: four steps from first call to launch */}
      <ProcessSection />

      {/* 6. Team: the four founders with bios and links */}
      <TeamSection />

      {/* 7. Call to action */}
      <CtaSection />
    </main>
  )
}
