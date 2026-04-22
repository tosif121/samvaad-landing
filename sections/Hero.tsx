'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { HERO } from '../lib/constants';

const VoiceSphere = dynamic(() => import('../three/VoiceSphere'), { ssr: false });

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeInOut' as const } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050508]" id="hero">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-32">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.span variants={item} className="font-mono text-xs text-[#00FFD1] tracking-[0.3em] uppercase">
            [ {HERO.tag} ]
          </motion.span>

          <motion.h1 className="flex flex-col gap-0 font-['Bebas_Neue'] text-[72px] md:text-[96px] leading-none text-white">
            {HERO.headline.map((word, i) => (
              <motion.span
                key={i}
                variants={item}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="text-lg text-white/50 max-w-md leading-relaxed">
            {HERO.sub}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="#" className="bg-[#00FFD1] text-black font-bold px-6 py-3 text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,255,209,0.4)] transition-all duration-300">
              {HERO.cta1}
            </a>
            <a href="#" className="border border-white/30 text-white px-6 py-3 text-sm tracking-wide hover:border-white/70 transition-all duration-300">
              {HERO.cta2}
            </a>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-4 mt-2">
            {HERO.pills.map((p) => (
              <div key={p.stat} className="flex items-center gap-2 border border-white/10 px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1]" />
                <span className="text-white font-semibold text-sm">{p.stat}</span>
                <span className="text-white/40 text-xs">{p.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' as const, delay: 0.3 }}
          className="relative h-[400px] md:h-[600px] w-full"
        >
          <VoiceSphere />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </section>
  );
}
