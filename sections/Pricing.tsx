'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRICING } from '../lib/constants';

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 bg-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-10 md:mb-16 text-center"
      >
        <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
          Pricing
        </span>
        <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-4">
          Scale calls without <span className="text-green-500">headcount</span>
        </h2>
        <p className="text-black/50 text-lg max-w-xl mx-auto">
          No hidden fees. No per-seat nonsense. Built for scale from day one.
        </p>
      </motion.div>

      {/* Cards — 2 plans, centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
        {PRICING.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`relative flex flex-col p-7 rounded-2xl transition-all duration-300 ${
              plan.popular
                ? 'border border-green-500/40 bg-white shadow-[0_20px_50px_rgba(34,197,94,0.10)]'
                : 'border border-black/8 bg-white shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-black px-4 py-1 tracking-[0.2em] uppercase rounded-full whitespace-nowrap">
                MOST POPULAR
              </div>
            )}

            {/* Plan name + desc */}
            <div className="mb-5">
              <p className="text-sm font-black text-black mb-1">{plan.name}</p>
              <p className="text-xs text-black/45 font-medium leading-relaxed">{plan.desc}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="font-['Bebas_Neue'] text-5xl text-black leading-none">{plan.price}</span>
              <span className="text-black/40 text-xs font-medium">{plan.period}</span>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1 mb-7">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-black/60 font-medium">
                  <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-green-600" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/demo"
              className={`text-center py-4 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-200 min-h-[48px] flex items-center justify-center ${
                plan.popular
                  ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-[0_8px_20px_rgba(34,197,94,0.3)] active:scale-[0.98]'
                  : 'border border-black/10 text-black hover:border-black/30 hover:bg-black/3 active:bg-black/5'
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-sm text-black/40 font-medium"
      >
        All plans include inbound + outbound · Hindi, English & Hinglish · No contracts · Cancel anytime
      </motion.p>

    </section>
  );
}
