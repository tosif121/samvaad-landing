'use client';
import { motion } from 'framer-motion';
import { MARQUEE_ITEMS } from '../lib/constants';

const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function StatsMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[#00FFD1]/10 py-4 bg-transparent backdrop-blur-sm">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="font-['Bebas_Neue'] text-2xl text-white tracking-widest flex items-center gap-4">
            {item}
            <span className="text-[#00FFD1]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
