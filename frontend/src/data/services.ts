export interface ServiceOutcome {
  title: string
  description: string
  metric: string
}

export interface ServiceDeliverable {
  title: string
  description: string
  details: string[]
}

export interface ServiceProcessStep {
  number: string
  title: string
  duration: string
  description: string
}

export interface ServiceCaseStudy {
  clientType: string
  challenge: string
  solution: string
  result: string
  testimonial: string
  author: string
}

export interface ServiceData {
  id: string
  slug: string
  number: string
  name: string
  headline: string
  subhead: string
  shortOutcome: string
  image: string
  floatingParts: {
    name: string
    spec: string
    dir: 'left' | 'right'
  }[]
  businessOutcomes: ServiceOutcome[]
  deliverables: ServiceDeliverable[]
  impactMetrics: {
    value: string
    label: string
    subtext: string
  }[]
  processSteps: ServiceProcessStep[]
  caseStudy: ServiceCaseStudy
  ctaHeadline: string
  ctaSubhead: string
}

export const SERVICES: ServiceData[] = [
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    number: '01',
    name: 'AI Solutions',
    headline: 'Deploy Autonomous Intelligence That Works While You Sleep.',
    subhead: 'We design, integrate, and deploy custom artificial intelligence systems that automate heavy workflows, qualify high-value leads, and extract real profits from messy data.',
    shortOutcome: 'Automate manual workflows, qualify prospects instantly, and run intelligent operations 24/7.',
    image: '/services/service-ai.png',
    floatingParts: [
      { name: 'Semantic Routing Engine', spec: 'Sub-200ms intent classification', dir: 'left' },
      { name: 'Domain Vector Memory', spec: 'Private knowledge base retrieval', dir: 'right' },
      { name: 'Autonomous Agent Workers', spec: 'Multi-step business execution', dir: 'left' },
      { name: 'Output Verification Guard', spec: '100% deterministic accuracy audit', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Zero Latency Customer Qualification',
        description: 'Engage incoming enterprise prospects in real-time with context-aware AI agents that understand your pricing, contracts, and technical boundaries.',
        metric: '10x Faster First Response'
      },
      {
        title: '80% Reduction in Repetitive Back-Office Work',
        description: 'Free your key operators from copying data between spreadsheets, invoicing tools, and email threads by automating document extraction and entry.',
        metric: '25+ Hours Saved Per Employee'
      },
      {
        title: 'Predictive Business Insights',
        description: 'Transform customer support tickets, sales recordings, and pipeline conversations into executive dashboards showing exactly why deals win or stall.',
        metric: '94% Predictive Accuracy'
      }
    ],
    deliverables: [
      {
        title: 'Private Enterprise Knowledge Base (RAG)',
        description: 'Connect internal documentation, SOPs, past proposals, and inventory databases to a private, hermetic AI assistant your team can trust.',
        details: ['Hermetic cloud deployment', 'Role-based access controls', 'Automatic document syncing']
      },
      {
        title: 'Autonomous Operations & Lead-Gen Agents',
        description: 'Self-governing software agents that monitor lead inboxes, generate tailored outreach, run preliminary customer vetting, and schedule meetings.',
        details: ['Omnichannel messaging integration', 'CRM auto-synchronization', 'Human-in-the-loop escalation gates']
      },
      {
        title: 'Executive Intelligence & Decision Systems',
        description: 'Automated synthesis of weekly revenue numbers, churn trends, and operational bottlenecks delivered straight to executive Slack or inbox.',
        details: ['Daily digest generation', 'Anomaly & fraud alerts', 'Custom KPI forecasting']
      }
    ],
    impactMetrics: [
      { value: '3.8x', label: 'OPERATIONAL VELOCITY', subtext: 'Faster turnaround on customer requests' },
      { value: '62%', label: 'COST REDUCTION', subtext: 'Decreased back-office processing overhead' },
      { value: '24/7', label: 'CONTINUOUS UPTIME', subtext: 'Zero missed inbound sales opportunities' }
    ],
    processSteps: [
      { number: '01', title: 'Opportunity Discovery', duration: 'Week 1', description: 'We map every repetitive task across your business and calculate exact ROI potential before writing any code.' },
      { number: '02', title: 'Prototype & Benchmark', duration: 'Week 2', description: 'We build a working AI pilot tested against real historical edge cases to guarantee precision and safety.' },
      { number: '03', title: 'System Hardening', duration: 'Weeks 3-4', description: 'We integrate with your existing CRM, databases, and communication channels with enterprise encryption.' },
      { number: '04', title: 'Scale & Monitor', duration: 'Continuous', description: 'Continuous fine-tuning, latency optimization, and automated monitoring ensuring peak reliability.' }
    ],
    caseStudy: {
      clientType: 'B2B Logistics & Supply Provider',
      challenge: 'Sales representatives spent 4 hours each day manually quoting complex logistics routes from messy PDF freight tables, resulting in lost deals.',
      solution: 'BrandPulse deployed an intelligent AI quotation engine that parses requests, verifies tariff formulas, and outputs branded proposals in 45 seconds.',
      result: 'Quotation turnaround dropped from 24 hours to under 1 minute; sales conversion surged by 43% within the first 60 days.',
      testimonial: '"BrandPulse transformed our sales operations. We closed more deals in 8 weeks than in the entire preceding two quarters."',
      author: 'Managing Director, Horizon Freight'
    },
    ctaHeadline: 'Ready to Put Autonomous AI to Work for Your Business?',
    ctaSubhead: 'Book a strategic discovery session to see where AI delivers the highest immediate ROI for your organization.'
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    number: '02',
    name: 'Digital Marketing',
    headline: 'Acquisition Architecture That Turns Attention Into Compounding Revenue.',
    subhead: 'No vanity metrics. We construct performance-engineered growth funnels, high-status creative narratives, and multi-channel acquisition machines designed to scale your bottom line.',
    shortOutcome: 'Generate qualified pipeline, lower customer acquisition costs, and scale market presence.',
    image: '/services/service-marketing.png',
    floatingParts: [
      { name: 'Multi-Touch Attribution Lens', spec: 'Exact revenue tracking by channel', dir: 'left' },
      { name: 'Creative Testing Matrix', spec: 'Rapid asset experimentation loop', dir: 'right' },
      { name: 'High-Intent Search Funnel', spec: 'Commercial conversion landing stack', dir: 'left' },
      { name: 'Audience Retargeting Lattice', spec: 'Compounding brand frequency', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Consistent Inbound Pipeline',
        description: 'Build predictable acquisition channels that deliver qualified decision-makers directly to your sales calendar month after month.',
        metric: '4.2x Inbound Lead Growth'
      },
      {
        title: 'Radically Lower Customer Acquisition Cost',
        description: 'Eliminate wasted ad spend with conversion rate optimized landing pages and targeted search intent campaigns that actually convert.',
        metric: '-38% Average CAC'
      },
      {
        title: 'High-Status Market Positioning',
        description: 'Command premium pricing with cohesive cyber-brutalist brand aesthetics and compelling thought leadership that outshines legacy competitors.',
        metric: '2.5x Higher Average Deal Size'
      }
    ],
    deliverables: [
      {
        title: 'Conversion-Engineered Growth Funnels',
        description: 'High-speed landing pages engineered with frictionless form flows, persuasive product proof, and instantaneous lead routing.',
        details: ['Sub-second page speeds', 'A/B multivariate split testing', 'Direct calendar embedding']
      },
      {
        title: 'Paid Media Architecture (Meta, Google, LinkedIn)',
        description: 'Full-funnel campaign management focused strictly on qualified customer acquisition and return on ad spend (ROAS).',
        details: ['First-party conversion tracking', 'Exclusion list hygiene', 'Creative fatigue mitigation']
      },
      {
        title: 'Lifecycle Email & Retention Sequences',
        description: 'Automated nurture campaigns that warm cold prospects, reactivate dormant accounts, and drive customer lifetime value expansion.',
        details: ['Behavioral email triggers', 'Executive case study series', 'Automated churn prevention']
      }
    ],
    impactMetrics: [
      { value: '412%', label: 'PIPELINE GENERATION', subtext: 'Growth in qualified enterprise opportunities' },
      { value: '3.6x', label: 'ROAS MULTIPLIER', subtext: 'Return on invested advertising capital' },
      { value: '54%', label: 'DEMO CONVERSION RATE', subtext: 'Visitor to qualified consultation rate' }
    ],
    processSteps: [
      { number: '01', title: 'Audience & Positioning Audit', duration: 'Week 1', description: 'We identify your highest margin customer segment and craft an irresistible value proposition.' },
      { number: '02', title: 'Funnel Construction', duration: 'Week 2', description: 'We build high-converting landing pages, tracking infrastructure, and creative asset libraries.' },
      { number: '03', title: 'Controlled Media Launch', duration: 'Weeks 3-4', description: 'We launch targeted campaigns across Google and LinkedIn with daily attribution auditing.' },
      { number: '04', title: 'Aggressive Scaling', duration: 'Ongoing', description: 'We scale budget into winning ad sets while refining creative angles to lower customer acquisition cost.' }
    ],
    caseStudy: {
      clientType: 'Commercial Property Tech Firm',
      challenge: 'Spending over $18,000 monthly on generic agency ads with rising acquisition costs and zero pipeline visibility.',
      solution: 'BrandPulse overhauled the messaging, rebuilt the landing experience, and established a direct attribution pipeline tracking lead-to-close.',
      result: 'Acquisition cost fell by 46% while qualified sales demos tripled within the first 45 days.',
      testimonial: '"BrandPulse is the first growth partner that actually speaks P&L and net revenue rather than clicks and impressions."',
      author: 'Chief Growth Officer, UrbanLease'
    },
    ctaHeadline: 'Ready to Scale Your Inbound Customer Acquisition?',
    ctaSubhead: 'Let our team build a predictable growth engine tailored specifically for your target revenue milestones.'
  },
  {
    id: 'product-building',
    slug: 'product-building',
    number: '03',
    name: 'Product Building',
    headline: 'High-Performance Web & Digital Products Engineered to Dominate.',
    subhead: 'We turn conceptual ideas into magnetic digital products. Blistering fast web platforms, interactive applications, and scalable software built with modern engineering discipline.',
    shortOutcome: 'Launch bespoke web platforms and software products engineered for zero downtime and magnetic user delight.',
    image: '/services/service-product.png',
    floatingParts: [
      { name: 'Ultra-Fast React Client Layer', spec: 'Zero cumulative layout shift (CLS)', dir: 'left' },
      { name: 'Real-Time Synchronous State', spec: 'Sub-15ms client-server state sync', dir: 'right' },
      { name: 'Scalable Microservices Fabric', spec: 'Containerized elastic infrastructure', dir: 'left' },
      { name: 'Interactive 3D / WebGL Visuals', spec: '60 FPS cinematic visual experience', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Market-Leading User Engagement',
        description: 'Immersive micro-interactions, dark mode elegance, and tactile feedback keep users locked in and actively sharing your product.',
        metric: '+68% Time on Platform'
      },
      {
        title: 'Instantaneous Global Load Times',
        description: 'Every millisecond shaved increases revenue. We engineer sub-second initial loads across all continents and mobile devices.',
        metric: '<800ms Average Global LCP'
      },
      {
        title: 'Zero Tech Debt Foundation',
        description: 'Clean, type-safe codebases designed to be easily maintained, audited, and extended as your engineering team expands.',
        metric: '100% Type-Safe Architecture'
      }
    ],
    deliverables: [
      {
        title: 'Full-Stack Custom Web Applications',
        description: 'Bespoke web applications built from scratch with React, Vite, Next.js, and Python/Node APIs tailored to your business model.',
        details: ['Responsive mobile-first interfaces', 'Robust role-based authorization', 'Instant database reactivity']
      },
      {
        title: 'Immersive 3D & WebGL Experiences',
        description: 'Signature 3D visualizations, interactive shaders, and kinetic animations that make your brand memorable in saturated markets.',
        details: ['Three.js & R3F hardware acceleration', 'Custom GLSL shaders', 'Graceful mobile performance fallbacks']
      },
      {
        title: 'Production Design Systems & UI Kits',
        description: 'Modular tokenized component libraries in Figma and Tailwind CSS ensuring cohesive design across every user touchpoint.',
        details: ['Accessible WCAG AAA compliance', 'Consistent spacing & typography tokens', 'Dark/light mode themes']
      }
    ],
    impactMetrics: [
      { value: '99.8%', label: 'CORE WEB VITALS', subtext: 'Perfect performance and accessibility scores' },
      { value: '3.1x', label: 'USER RETENTION', subtext: 'Increase in 30-day recurring user retention' },
      { value: '14 DAYS', label: 'SPRINT TO PROTOTYPE', subtext: 'From napkin sketch to interactive working build' }
    ],
    processSteps: [
      { number: '01', title: 'User Flow Architecture', duration: 'Week 1', description: 'We define the emotional and functional user journey, wireframing key screens and locking data models.' },
      { number: '02', title: 'Interactive Prototype', duration: 'Weeks 2-3', description: 'We build an interactive frontend connected to test data so you can test and feel the product immediately.' },
      { number: '03', title: 'Production Engineering', duration: 'Weeks 4-6', description: 'We write hardened production code with comprehensive test suites, API caching, and error boundaries.' },
      { number: '04', title: 'Global Deployment', duration: 'Continuous', description: 'Zero-downtime deployment to global edge infrastructure with live telemetry and error tracking.' }
    ],
    caseStudy: {
      clientType: 'FinTech Wealth Management Portal',
      challenge: 'Their existing legacy client dashboard took 4.5 seconds to load financial charts, leading to high client drop-off and frustration.',
      solution: 'BrandPulse re-architected the application with modern React, lightweight WebGL visualizations, and real-time WebSocket state streaming.',
      result: 'Load time plunged to 480ms. Client onboarding completion jumped from 61% to 92% in 30 days.',
      testimonial: '"The level of craftsmanship and speed BrandPulse delivered blew our board away. Our users love using the platform every single day."',
      author: 'Head of Product, Apex Capital'
    },
    ctaHeadline: 'Have a High-Stakes Digital Product to Build?',
    ctaSubhead: 'Partner with engineers who care about speed, aesthetic dominance, and business results as much as you do.'
  },
  {
    id: 'erp-systems',
    slug: 'erp-systems',
    number: '04',
    name: 'ERP Systems',
    headline: 'Unified Operational Command Centers That Connect Every Moving Part.',
    subhead: 'Eliminate disconnected spreadsheets and siloed departments. We design and integrate modern Enterprise Resource Planning systems that synchronize inventory, finance, logistics, and staff in real time.',
    shortOutcome: 'Unify inventory, invoicing, supply chains, and workforce operations into a single real-time dashboard.',
    image: '/services/service-erp.png',
    floatingParts: [
      { name: 'Live Inventory Synapse', spec: 'Real-time multi-warehouse tracking', dir: 'left' },
      { name: 'Financial Ledger Reconciliation', spec: 'Automated double-entry bookkeeping', dir: 'right' },
      { name: 'Procurement Supply Line', spec: 'Automated purchase order dispatch', dir: 'left' },
      { name: 'Executive Operations Cockpit', spec: 'Single-pane business telemetry', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Single Source of Operational Truth',
        description: 'Know your exact inventory counts, pending accounts receivable, and operational burn at any second of the day across all locations.',
        metric: '100% Real-Time Visibility'
      },
      {
        title: 'Elimination of Human Data Errors',
        description: 'Automate manual cross-checks between sales orders, shipping manifests, and accounting ledgers with zero discrepancy.',
        metric: '99.9% Order Accuracy'
      },
      {
        title: 'Streamlined Regulatory Compliance',
        description: 'Automatic audit trails, tax reconciliation, and compliant documentation generated automatically with one click.',
        metric: '100% Audit-Ready Financials'
      }
    ],
    deliverables: [
      {
        title: 'Custom ERP Architecture & Migration',
        description: 'Tailored enterprise software replacing rigid off-the-shelf software with workflows built around how your company actually operates.',
        details: ['Zero-downtime data migration', 'Legacy system API bridges', 'Multi-tenant department permissions']
      },
      {
        title: 'Automated Supply Chain & Inventory Control',
        description: 'Smart stock level forecasting, automated re-ordering thresholds, and warehouse barcoding tracking modules.',
        details: ['Barcode / QR inventory scanning', 'Low-stock automated alerts', 'Supplier lead time forecasting']
      },
      {
        title: 'Financial & Payroll Consolidation',
        description: 'Unified billing, invoice reconciliation, automated payment gateways, and granular profit margin tracking by product line.',
        details: ['Multi-currency support', 'Automated GST/Tax reporting', 'Direct bank feed integrations']
      }
    ],
    impactMetrics: [
      { value: '72%', label: 'FASTER CLOSING', subtext: 'Reduction in end-of-month financial closing time' },
      { value: '0%', label: 'DATA DISCREPANCY', subtext: 'Eliminated stock mismatches between sales and warehouses' },
      { value: '4.5x', label: 'EFFICIENCY MULTIPLIER', subtext: 'Increase in order processing volume per staff member' }
    ],
    processSteps: [
      { number: '01', title: 'Workflow & Friction Mapping', duration: 'Weeks 1-2', description: 'We shadow your operations team to catalog every friction point, spreadsheet, and handoff gap.' },
      { number: '02', title: 'Database & Schema Architecture', duration: 'Weeks 3-4', description: 'We engineer a resilient relational database schema supporting concurrent reads, writes, and real-time locks.' },
      { number: '03', title: 'Department Pilots', duration: 'Weeks 5-7', description: 'We deploy modular interfaces for inventory and sales teams first, ensuring adoption and flawless accuracy.' },
      { number: '04', title: 'Company-Wide Cutover', duration: 'Week 8', description: 'Seamless migration with hands-on staff training and 24/7 dedicated engineering support during launch.' }
    ],
    caseStudy: {
      clientType: 'Multi-Location Industrial Manufacturer',
      challenge: 'Managing 1,800 SKUs across 4 warehouses using separate Excel sheets caused frequent stockouts, double-selling, and delayed shipments.',
      solution: 'BrandPulse deployed a centralized custom ERP platform syncing real-time inventory across manufacturing floors, dispatch bays, and the sales team.',
      result: 'Order fulfillment time dropped by 64%; stockout incidents were eliminated entirely within 90 days.',
      testimonial: '"The BrandPulse ERP gave us our weekends back. For the first time in 12 years, our physical stock matches our financial books to the penny."',
      author: 'Chief Operating Officer, Veloce Heavy Industries'
    },
    ctaHeadline: 'Tired of Outgrowing Clunky Off-The-Shelf Software?',
    ctaSubhead: 'Let us build a unified operational system tailored precisely to the way your business wins.'
  },
  {
    id: 'crm-systems',
    slug: 'crm-systems',
    number: '05',
    name: 'CRM Systems',
    headline: 'High-Velocity Customer Engines That Close Deals and Protect Retainers.',
    subhead: 'Stop letting warm opportunities slip through the cracks. We architect custom Customer Relationship Management platforms with automated pipelines, smart task routing, and deep client intelligence.',
    shortOutcome: 'Shorten sales cycles, automate outreach sequences, and retain top clients with smart relationship management.',
    image: '/services/service-crm.png',
    floatingParts: [
      { name: 'Lead Velocity Pipeline', spec: 'Automated deal stage transitions', dir: 'left' },
      { name: 'Omnichannel Conversation Thread', spec: 'Unified WhatsApp, Email, & Call logs', dir: 'right' },
      { name: 'Client Health Score Predictor', spec: 'Early retention risk detection', dir: 'left' },
      { name: 'Contract Lifecycle Module', spec: 'E-signature & renewal triggers', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Shorter Sales Cycles',
        description: 'Automate proposal triggers, meeting follow-ups, and calendar invitations so deals maintain momentum from first touch to signed contract.',
        metric: '35% Shorter Time-to-Close'
      },
      {
        title: 'Zero Lead Leakage',
        description: 'Every inbound inquiry is automatically assigned, enriched with company data, and routed to the optimal closer in under 60 seconds.',
        metric: '100% Inbound Capture'
      },
      {
        title: 'Maximizing Client Lifetime Value',
        description: 'Automated milestone check-ins, proactive renewal notifications, and upsell triggers that increase net revenue retention.',
        metric: '+28% Retainer Expansion'
      }
    ],
    deliverables: [
      {
        title: 'Custom Sales Pipeline Architecture',
        description: 'Bespoke CRM layouts customized to your specific sales stages, qualification criteria, and contract structures.',
        details: ['Visual drag-and-drop pipeline Kanban', 'Deal probability forecasting', 'Automated task sequences']
      },
      {
        title: 'Unified Communication Hub',
        description: 'Every WhatsApp message, email exchange, and call recording consolidated into one customer timeline visible to the entire team.',
        details: ['WhatsApp Business API integration', 'Two-way email synchronization', 'VoIP calling & transcription notes']
      },
      {
        title: 'Retention & Account Health Telemetry',
        description: 'Algorithmic client health scoring that flags drop-offs in usage or communication before clients consider churning.',
        details: ['Churn risk warning triggers', 'Automated quarterly review alerts', 'Customer NPS collection loops']
      }
    ],
    impactMetrics: [
      { value: '38%', label: 'HIGHER WIN RATE', subtext: 'Increase in deal close rate on qualified pipeline' },
      { value: '2.8x', label: 'MORE TOUCHPOINTS', subtext: 'Timely automated prospect follow-ups delivered' },
      { value: '96%', label: 'CLIENT RETENTION', subtext: 'Annual retainer renewal rate across accounts' }
    ],
    processSteps: [
      { number: '01', title: 'Sales Motion Teardown', duration: 'Week 1', description: 'We map how your best reps close deals and identify the exact moments where prospective clients get lost.' },
      { number: '02', title: 'Pipeline Customization', duration: 'Week 2', description: 'We configure deal stages, automated actions, and validation fields to match your sales process.' },
      { number: '03', title: 'Channels & Data Integration', duration: 'Week 3', description: 'We plug in email, WhatsApp, calendar booking, and payment processing for effortless workflows.' },
      { number: '04', title: 'Team Rollout & Training', duration: 'Week 4', description: 'Interactive training sessions ensuring 100% adoption and daily usage across your sales organization.' }
    ],
    caseStudy: {
      clientType: 'Private Wealth Advisory Practice',
      challenge: 'High-net-worth inquiries were being managed across personal WhatsApp chats and lost sticky notes, creating poor client experiences.',
      solution: 'BrandPulse built a private CRM unifying WhatsApp communications, automated NDA signatures, and secure document vaults.',
      result: 'Average deal cycle shortened from 45 days to 18 days; client referral volume grew by 52%.',
      testimonial: '"The BrandPulse CRM made our practice look like a Fortune 500 family office. Our clients constantly comment on how responsive we are."',
      author: 'Senior Partner, Sterling Advisory'
    },
    ctaHeadline: 'Ready to Turn Your Sales Pipeline Into an Unstoppable Machine?',
    ctaSubhead: 'Schedule a walkthrough to see how a purpose-built CRM can elevate your close rates and client retention.'
  },
  {
    id: 'strategic-consulting',
    slug: 'strategic-consulting',
    number: '06',
    name: 'Strategic Consulting',
    headline: 'Executive Technical & Strategic Leadership Without the Full-Time Overhead.',
    subhead: 'Make high-conviction decisions with seasoned operators who have built, scaled, and exited digital businesses. We audit architectures, validate unit economics, and formulate clear growth roadmaps.',
    shortOutcome: 'Audit technical infrastructure, eliminate costly mistakes, and craft high-conviction product roadmaps.',
    image: '/services/service-consulting.png',
    floatingParts: [
      { name: 'Strategic Technology Roadmap', spec: '12-month capital & hiring allocation', dir: 'left' },
      { name: 'Architecture & Security Audit', spec: 'Zero-trust enterprise vulnerability review', dir: 'right' },
      { name: 'Model & Toolchain Cost Optimizer', spec: '60% reduction in cloud / API waste', dir: 'left' },
      { name: 'Executive Due Diligence Deck', spec: 'Board & investor ready technical audit', dir: 'right' }
    ],
    businessOutcomes: [
      {
        title: 'Avoid Costly Technical Missteps',
        description: 'Save hundreds of thousands of dollars in wasted agency fees and failed rebuilds by validating architecture before spending capital.',
        metric: '$180k+ Average Capital Saved'
      },
      {
        title: 'Accelerate Time to Market',
        description: 'Focus your internal teams strictly on features that move business metrics rather than endless debate over frameworks and tools.',
        metric: '3x Faster Decision Cycles'
      },
      {
        title: 'Investor-Grade Technical Due Diligence',
        description: 'Confidently pass rigorous technical diligence from institutional venture and private equity investors during capital raises.',
        metric: '100% Diligence Clearance'
      }
    ],
    deliverables: [
      {
        title: 'Comprehensive Architecture Feasibility Audit',
        description: 'Thorough evaluation of your existing code, database bottlenecks, security practices, and infrastructure expenses with concrete fixes.',
        details: ['Cloud bill & token cost optimization', 'Database query latency profiling', 'Security & vulnerability assessment']
      },
      {
        title: 'Fractional CTO Advisory (Weekly Retainer)',
        description: 'Direct access to senior technology executives who participate in weekly roadmap planning, vendor reviews, and hiring interviews.',
        details: ['Weekly executive alignment syncs', 'Senior developer interview assessments', 'Vendor contract negotiations']
      },
      {
        title: 'Product Roadmap & Moat Formulation',
        description: 'Clear, phased development blueprints that prioritize defensible intellectual property, data flywheels, and market differentiation.',
        details: ['12-month milestone Gantt chart', 'Resource allocation budget models', 'Competitive moat analysis']
      }
    ],
    impactMetrics: [
      { value: '$1.4M', label: 'CLOUD & API SAVINGS', subtext: 'Identified and eliminated redundant tool spend' },
      { value: '45+', label: 'AUDITS DELIVERED', subtext: 'High-conviction technical evaluations executed' },
      { value: '100%', label: 'EXECUTIVE CLARITY', subtext: 'Direct roadmap alignment across board and engineering' }
    ],
    processSteps: [
      { number: '01', title: 'Deep Technical Discovery', duration: 'Week 1', description: 'We perform deep-dive interviews with your leadership and inspect all existing repositories, databases, and contracts.' },
      { number: '02', title: 'Diagnostic Scorecard', duration: 'Week 2', description: 'We deliver a brutal, honest report on architecture health, team velocity, security gaps, and hidden costs.' },
      { number: '03', title: 'Remediation Roadmap', duration: 'Week 3', description: 'We prioritize actionable sprints to fix critical bottlenecks and establish an efficient development cadence.' },
      { number: '04', title: 'Ongoing Strategic Partnership', duration: 'Monthly', description: 'Bi-weekly advisory calls and on-demand guidance as your company approaches high-stakes growth inflection points.' }
    ],
    caseStudy: {
      clientType: 'Growth-Stage B2B Platform',
      challenge: 'Their engineering team was stuck in a 9-month rewrite with mounting cloud bills and zero feature delivery to paying customers.',
      solution: 'BrandPulse conducted an architecture audit, halted unnecessary microservice fragmentation, and established clear milestone velocity.',
      result: 'Cloud spend dropped by 54%; the core product shipped to production in just 6 weeks.',
      testimonial: '"BrandPulse brought the exact balance of technical rigor and commercial reality our company needed to survive and scale."',
      author: 'Founder & CEO, CoreSync'
    },
    ctaHeadline: 'Need Strategic Guidance Before Making Your Next Big Tech Investment?',
    ctaSubhead: 'Book an executive consultation with our partners to audit your roadmap and protect your capital.'
  }
]

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return SERVICES.find((s) => s.slug === slug)
}

