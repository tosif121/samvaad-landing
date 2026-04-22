'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '../sections/Hero';
import StatsMarquee from '@/sections/StatsMarquee';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import Pricing from '@/sections/Pricing';
import SocialProof from '@/sections/SocialProof';
import CTASection from '@/sections/CTASection';
import Footer from '@/sections/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && (
          <motion.main
            key="main"
            className="selection:bg-cyan-500/30 selection:text-cyan-400"
            initial={{ opacity: 0, scale: 0.98 }}

            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' as const }}
          >
            <Navbar />
            <Hero />
            <StatsMarquee />
            <Features />
            <HowItWorks />
            <Pricing />
            <SocialProof />
            <CTASection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
