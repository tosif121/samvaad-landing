'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { STATS } from '../lib/constants';
import { motion } from 'framer-motion';

function StatItem({ stat, index }: { stat: { number: string; label: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const color = index % 2 === 0 ? '#00FFD1' : '#FF6B2B';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.span
        style={{ color }}
        className="font-['Bebas_Neue'] text-[72px] md:text-[96px] leading-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stat.number}
      </motion.span>
      <span className="text-white/40 text-sm tracking-widest uppercase">{stat.label}</span>
    </motion.div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative bg-[#050508] py-24 px-6 md:px-12 overflow-hidden">
      {/* Grid floor illusion */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,209,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(30deg)',
          transformOrigin: 'bottom center',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => <StatItem key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
