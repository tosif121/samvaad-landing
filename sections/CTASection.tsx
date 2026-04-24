'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

const VoiceSphere = dynamic(() => import('@/three/VoiceSphere'), { ssr: false });

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* Background sphere */}
      <div className="absolute inset-0 opacity-10 scale-[2.5] pointer-events-none">
        <VoiceSphere />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,209,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-[#00FFD1]/60 tracking-[0.3em] uppercase mb-6"
        >
          [ The Future of Communication Is Already Here ]
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 0.9, letterSpacing: 1 }}
          className="text-white mb-8"
        >
          YOUR BUSINESS<br />
          <span style={{ color: '#FF6B2B' }}>NEVER MISSES</span><br />
          <span style={{ color: '#00FFD1' }}>A CALL AGAIN.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Not because your team worked harder.<br />
          Because your system worked smarter.<br />
          <span className="text-white/70">Intelligent communication. Instant responses. Always on.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/demo"
            className="inline-block bg-[#00FFD1] text-black font-bold text-base px-10 py-4 tracking-widest uppercase hover:shadow-[0_0_40px_rgba(0,255,209,0.5)] transition-all duration-300"
          >
            Book a Free Demo
          </Link>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/50 px-8 py-4 text-sm tracking-wide transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-pulse" />
            {SITE.phone}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-white/20 text-xs mt-8 tracking-widest"
        >
          No credit card required · Deploy in 48 hours · Indian servers · DPDP compliant
        </motion.p>
      </div>
    </section>
  );
}
