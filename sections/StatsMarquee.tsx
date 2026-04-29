'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { MARQUEE_ITEMS } from '../lib/constants';

const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function StatsMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-y border-black/10 bg-black py-5 text-white" id="stats">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,241,217,0.12),transparent,rgba(0,0,0,0.16))]" />
      <motion.div
        className="relative flex gap-14 whitespace-nowrap"
        animate={shouldReduceMotion ? {} : { x: ['0%', '-33.33%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-[10px] md:text-sm font-black uppercase tracking-[0.24em] text-white/90">
            {item}
            <span className={i % 2 === 0 ? 'text-green-600' : 'text-orange-500'}>+</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
