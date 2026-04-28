'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEXT = 'SAMWAD BOT';
const BARS = 40;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 600); }, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-9990 bg-white flex flex-col items-center justify-center gap-8"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' as const }}
        >
          {/* Letter-by-letter reveal */}
          <div className="flex gap-1">
            {TEXT.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-black font-sans font-extrabold text-5xl md:text-7xl tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Waveform */}
          <div className="flex items-center gap-[3px]">
            {Array.from({ length: BARS }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-green-600"
                animate={{ height: ['4px', `${8 + Math.sin(i * 0.4) * 20 + 10}px`, '4px'] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.03, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
