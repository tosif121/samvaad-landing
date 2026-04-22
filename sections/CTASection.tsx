'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const VoiceSphere = dynamic(() => import('@/three/VoiceSphere'), { ssr: false });

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* Background sphere */}
      <div className="absolute inset-0 opacity-15 scale-[2.5] pointer-events-none">
        <VoiceSphere />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,209,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-['Bebas_Neue'] text-[72px] md:text-[120px] text-white leading-[0.9] mb-8"
        >
          YOUR CALL CENTER<br />IS OBSOLETE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-lg mb-10 max-w-xl mx-auto"
        >
          Deploy SamwadBot in 48 hours. No hardware. No training. Just results.
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(0,255,209,0.5)' }}
          className="inline-block bg-[#00FFD1] text-black font-bold text-lg px-12 py-5 tracking-wide transition-all duration-300"
        >
          GET STARTED FREE
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-white/20 text-xs mt-6 tracking-widest"
        >
          No credit card required · Cancel anytime · Indian servers
        </motion.p>
      </div>
    </section>
  );
}
