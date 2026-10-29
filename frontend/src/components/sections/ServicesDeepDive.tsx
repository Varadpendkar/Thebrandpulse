import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { ServicesAnatomyCanvas } from '../three/ServicesAnatomyCanvas'

interface ServiceItem {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
  technologies: string[]
}

const servicesData: ServiceItem[] = [
  {
    id: 'ai-agents',
    number: '01',
    title: 'GENERATIVE AI & AGENTIC SYSTEMS',
    tagline: 'Autonomous workflows that execute complex reasoning tasks',
    description: 'We architect and train agentic workflows, fine-tune domain LLMs, integrate vector databases, and deploy guardrailed production AI pipelines with sub-second latency.',
    deliverables: ['Custom LLM Pipelines & RAG', 'Multi-Agent Autonomous Workflows', 'Vector Embeddings & Semantic Search', 'Evaluation & Guardrails Benchmarking'],
    technologies: ['LangGraph', 'LlamaIndex', 'OpenAI / Claude APIs', 'Pinecone', 'Python / FastAPI']
  },
  {
    id: 'web-platforms',
    number: '02',
    title: 'HIGH-PERFORMANCE WEB APPLICATIONS',
    tagline: 'Sub-second page loads with sleek, immersive aesthetics',
    description: 'Bespoke web applications built with React, Vite, Next.js, and WebGL. Engineered for maximum frame rates, zero cumulative layout shifts, and magnetic user engagement.',
    deliverables: ['Full-Stack Web Applications', 'Interactive 3D / WebGL Experiences', 'Component Libraries & Design Systems', 'SEO & Core Web Vitals Optimization'],
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP']
  },
  {
    id: 'data-pipelines',
    number: '03',
    title: 'END-TO-END DATA PLATFORMS',
    tagline: 'Transform messy raw events into queryable intelligence',
    description: 'Scalable data architectures capable of ingesting millions of events daily. Automated ETL/ELT pipelines, real-time analytics streaming, and actionable executive dashboards.',
    deliverables: ['Real-Time Stream Processing', 'Data Lakehouse Architecture', 'Automated ETL / Airflow Pipelines', 'Custom Executive Analytics BI'],
    technologies: ['PostgreSQL', 'Supabase', 'DuckDB', 'Apache Kafka', 'Pandas / Polars']
  },
  {
    id: 'backend-apis',
    number: '04',
    title: 'DISTRIBUTED BACKENDS & MICROSERVICES',
    tagline: 'Robust, battle-tested API backends engineered to scale',
    description: 'Ultra-low latency microservices and REST / GraphQL / gRPC backends built with Python FastAPI and Node.js. High throughput with comprehensive automated test suites.',
    deliverables: ['FastAPI Microservices', 'Authentication & Role-Based Access Control', 'Async Background Queues & Celery', 'Database Indexing & Caching Layers'],
    technologies: ['FastAPI', 'Redis', 'Docker', 'PostgreSQL', 'SQLAlchemy']
  },
  {
    id: 'uiux-engineering',
    number: '05',
    title: 'NEON NOIR & CYBER-BRUTALIST DESIGN',
    tagline: 'Unforgettable digital identities that outshine generic SaaS templates',
    description: 'Design systems that wow users instantly. Dark mode mastery, micro-animations, custom cursor physics, and rich typography crafted to establish high-status market presence.',
    deliverables: ['Full Interactive Prototypes', 'Complete Figma Design Tokens', 'Motion & Micro-Interaction Guidelines', 'Responsive Design Audits'],
    technologies: ['Figma', 'Framer Motion', 'Tailwind CSS', 'Custom Shaders']
  },
  {
    id: 'cloud-devops',
    number: '06',
    title: 'CLOUD INFRASTRUCTURE & AUTOMATION',
    tagline: 'Zero-downtime CI/CD and self-healing cloud deployments',
    description: 'Infrastructure as Code (IaC) setup across AWS, Vercel, and Railway. Automated test runners, staging environments, secret management, and distributed monitoring.',
    deliverables: ['Containerized Docker Stacks', 'Automated GitHub Actions CI/CD', 'Serverless & Edge Deployment', 'Observability & Sentry Alerting'],
    technologies: ['AWS', 'Railway', 'Vercel', 'Docker', 'GitHub Actions']
  },
  {
    id: 'advisory',
    number: '07',
    title: 'FRACTIONAL CTO & AI STRATEGY',
    tagline: 'Strategic technical leadership without executive agency overhead',
    description: 'Direct partnership with founders to audit technical architecture, validate feasibility, select optimal toolchains, and build high-conviction product roadmaps.',
    deliverables: ['Architecture Feasibility Audits', 'Vendor & Model Cost Optimization', 'Tech Stack Roadmap Formulation', 'Security & Code Review Sprints'],
    technologies: ['Architecture Reviews', 'Sprint Planning', 'Cost Modeling', 'Due Diligence']
  }
]

export const ServicesDeepDive: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const { setCursor, resetCursor, openContactModal } = useAppStore()

  const activeService = servicesData[openIndex] || servicesData[0]

  const toggleAccordion = (index: number) => {
    setOpenIndex(index)
  }

  return (
    <section id="services" className="relative py-20 md:py-32 bg-[#050505] border-b border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f1f1f]">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-widest text-[#caff00] uppercase">
              [ 02 / CAPABILITIES & 3D ANATOMY ]
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-white">
              ENGINEERING SERVICES
            </h2>
          </div>
          <p className="font-sans text-sm text-[#888888] max-w-md mt-4 md:mt-0">
            From silicon neural processors to distributed Kubernetes clusters, explore the exploded 3D anatomy of our systems.
          </p>
        </div>

        {/* Split Screen Layout: Left Accordion + Right Persistent 3D Anatomy Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Accordion List (approx 5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {servicesData.map((service, idx) => {
              const isOpen = openIndex === idx

              return (
                <div
                  key={service.id}
                  className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                    isOpen 
                      ? 'border-[#caff00] bg-[#0c0c0c] shadow-[0_0_30px_rgba(202,255,0,0.06)]' 
                      : 'border-[#1a1a1a] bg-[#080808] hover:border-[#333333]'
                  }`}
                >
                  {/* Header Row */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    onMouseEnter={() => setCursor('hover', isOpen ? 'INSPECT' : 'EXPLODE')}
                    onMouseLeave={resetCursor}
                    className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#caff00]">
                        [ {service.number} ]
                      </span>
                      <span className="font-display font-bold text-base md:text-lg text-white group-hover:text-[#caff00] transition-colors">
                        {service.title}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-full border border-[#222] group-hover:border-[#caff00] text-[#caff00] transition-all duration-300 shrink-0">
                      {isOpen ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="px-5 pb-6 md:px-6 border-t border-[#1a1a1a] pt-4"
                      >
                        <div className="space-y-4">
                          
                          {/* Description & CTA */}
                          <div className="space-y-3">
                            <p className="font-mono text-xs text-[#caff00] font-medium tracking-wide">
                              {service.tagline}
                            </p>
                            <p className="font-sans text-xs md:text-sm text-[#999999] leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          {/* Deliverables */}
                          <div className="space-y-2 pt-1">
                            <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase block">
                              KEY DELIVERABLES
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {service.deliverables.map((item, dIdx) => (
                                <div key={dIdx} className="flex items-start space-x-2 text-xs text-[#cccccc]">
                                  <CheckCircle2 size={12} className="text-[#caff00] mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack Pills */}
                          <div className="space-y-2 pt-1">
                            <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase block">
                              CORE TECHNOLOGIES
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 font-mono text-[10px] text-[#ededed] bg-[#141414] border border-[#262626] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2">
                            <button
                              onClick={openContactModal}
                              className="inline-flex items-center space-x-2 font-mono text-xs font-semibold text-black bg-[#caff00] px-4 py-2 rounded-[2px] hover:bg-white transition-colors"
                            >
                              <span>START THIS PROJECT</span>
                              <ArrowUpRight size={13} />
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right Column: Sticky Persistent 3D Anatomy Canvas (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ServicesAnatomyCanvas
              activeServiceId={activeService.id}
              onSelectPart={(partName) => {
                setCursor('hover', partName.toUpperCase())
              }}
            />
          </div>

        </div>

      </div>
    </section>
  )
}
