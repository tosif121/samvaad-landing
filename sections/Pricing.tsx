'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PRICING } from '../lib/constants';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16 text-center">
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PRICING.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col p-7 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'border border-green-500/40 bg-white shadow-[0_20px_50px_rgba(34,197,94,0.1)]'
                  : 'glass-panel'
              }`}>

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-black px-4 py-1 tracking-[0.2em] uppercase rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Plan name + price */}
              <div className="mb-6">
                <p className="text-xs font-black tracking-[0.2em] uppercase text-black/40 mb-3">{plan.name}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-['Bebas_Neue'] text-5xl text-black leading-none">{plan.price}</span>
                  <span className="text-black/40 text-sm font-medium">{plan.period}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  <p className="text-green-600 text-xs font-bold">{plan.mins}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-black/60 font-medium">
                    <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-green-600" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/demo"
                className={`text-center py-3 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-200 ${
                  plan.popular
                    ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-[0_8px_20px_rgba(34,197,94,0.3)]'
                    : 'border border-black/10 text-black hover:border-black/30 hover:bg-black/3'
                }`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pay as you go */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-sm text-black/40 font-medium">
          Or pay as you go:{' '}
          <span className="text-black font-bold relative inline-block">
            ₹2.00 / minute
            <svg className="absolute -bottom-1.5 left-0 w-full text-green-500" height="8" viewBox="0 0 230 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {' '}· No contracts · Cancel anytime
        </motion.p>

      </div>
    </section>
  );
}
