'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Hero from '../sections/Hero';
import StatsMarquee from '../sections/StatsMarquee';
import Metrics from '../sections/Metrics';
import HowItWorks from '../sections/HowItWorks';
import Pricing from '../sections/Pricing';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' as const }}
          >
            <Hero />
            <StatsMarquee />
            <HowItWorks />
            <Metrics />
            <Pricing />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
