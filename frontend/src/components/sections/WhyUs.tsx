import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export const WhyUs: React.FC = () => {
  const { setCursor, resetCursor } = useAppStore()

  const stats = [
    {
      value: '3.8x',
      label: 'OPERATIONAL VELOCITY GAIN',
      sublabel: 'Faster turnaround on customer requests, proposals, and pipeline closing.',
    },
    {
      value: '62%',
      label: 'BACK-OFFICE COST REDUCTION',
      sublabel: 'Eliminated manual copy-pasting, invoice errors, and administrative friction.',
    },
    {
      value: '100%',
      label: 'PRODUCTION SUCCESS RATE',
      sublabel: 'Every single system we engineer deploys to live revenue generation.',
    },
  ]

  const differentiators = [
    {
      number: '01',
      title: 'Direct Partner Access',
      tag: 'Senior Operators Only',
      icon: Zap,
      desc: 'You work directly with principal architects and company builders. Zero middle-managers, zero junior handoffs, and zero bureaucratic lag.',
    },
    {
      number: '02',
      title: 'P&L-Aligned Engineering',
      tag: 'Unit Economics First',
      icon: TrendingUp,
      desc: 'We do not build software for the sake of code. Every workflow, database, and interface is engineered to expand margins and maximize client lifetime value.',
    },
    {
      number: '03',
      title: '14-Day Working Prototypes',
      tag: 'Validate Before You Scale',
      icon: Target,
      desc: 'Interactive software running on test data delivered in your first two weeks. Feel the solution in real customer hands before committing large budgets.',
    },
  ]

  return (
    <section
      id="why-us"
      aria-label="Why Partner With BrandPulse"
      className="relative py-24 md:py-36 bg-[#080808] border-b border-[#141414]"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-[#1c1c1c]">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-widest text-[#caff00] uppercase block">
              [ 04 / THE ADVANTAGE ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight">
              WHY FOUNDERS CHOOSE US
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#888888] max-w-md mt-4 md:mt-0 leading-relaxed">
            Legacy consultancies bill by the hour and hide behind junior staffers. We operate as an elite engineering partner focused purely on commercial outcomes.
          </p>
        </div>

        {/* 3 Outcome Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onMouseEnter={() => setCursor('hover', stat.value)}
              onMouseLeave={resetCursor}
              className="p-8 bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl flex flex-col justify-between"
            >
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#caff00] tracking-tight drop-shadow-[0_0_20px_rgba(202,255,0,0.25)] mb-4">
                {stat.value}
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-white uppercase block">
                  {stat.label}
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Strategic Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon
            return (
              <motion.div
                key={diff.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => setCursor('hover', diff.number)}
                onMouseLeave={resetCursor}
                className="group relative p-8 bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#caff00]/50 rounded-2xl transition-[border-color] duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-3xl font-extrabold text-[#333333] group-hover:text-[#caff00] transition-colors">
                      [ {diff.number} ]
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#141414] text-[#caff00] border border-[#222]">
                      <Icon size={20} />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-[#caff00] tracking-wider uppercase block mb-1">
                    {diff.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#caff00] transition-colors mb-3">
                    {diff.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1a1a1a] flex items-center justify-between font-mono text-[10px] text-[#555555]">
                  <span>BUSINESS DISCIPLINE</span>
                  <span className="text-[#caff00]">✓ VERIFIED</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
