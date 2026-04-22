'use client';
import { motion } from 'framer-motion';
import { PRICING } from '../lib/constants';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#050508] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Bebas_Neue'] text-[56px] md:text-[72px] text-white leading-none">TRANSPARENT. BRUTAL. CHEAP.</h2>
          <p className="text-white/40 text-lg mt-2">No hidden fees. No per-seat nonsense.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-[#00FFD1]/50 bg-[#00FFD1]/5 shadow-[0_0_40px_rgba(0,255,209,0.1)]'
                  : 'border-[#1E1E2E] bg-[#0D0D14]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FFD1] text-black text-xs font-bold px-4 py-1 tracking-widest">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <p className="text-white/50 text-sm tracking-widest uppercase mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-['Bebas_Neue'] text-5xl text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-[#00FFD1]/60 text-xs mt-1">{plan.mins}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-[#00FFD1] text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`text-center py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
                  plan.popular
                    ? 'bg-[#00FFD1] text-black hover:shadow-[0_0_20px_rgba(0,255,209,0.4)]'
                    : 'border border-white/20 text-white hover:border-white/50'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-8"
        >
          Or pay as you go: <span className="text-white/60">₹2.00 / minute</span>. No contracts.
        </motion.p>
      </div>
    </section>
  );
}
