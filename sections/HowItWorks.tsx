'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HOW_IT_WORKS } from '../lib/constants';

const WAVEFORM_BARS = 40;

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section id="how-it-works" ref={containerRef} className="relative bg-[#050508]" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-12 mb-8">
          <h2 className="font-['Bebas_Neue'] text-[48px] md:text-[64px] text-white leading-none">HOW THE VOICE TRAVELS</h2>
        </div>

        <div className="overflow-hidden">
          <motion.div style={{ x }} className="flex" >
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="w-screen shrink-0 px-6 md:px-12 flex items-center">
                <div className="max-w-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-['Bebas_Neue'] text-6xl text-[#00FFD1]/20">{step.step}</span>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <div className="flex-1 h-px bg-linear-to-r from-[#00FFD1]/30 to-transparent" />
                    )}
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-[48px] md:text-[64px] text-white leading-none mb-4">{step.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed mb-8">{step.desc}</p>

                  {/* Panel-specific visual */}
                  {i === 1 && (
                    <div className="flex items-center gap-[3px] h-16">
                      {Array.from({ length: WAVEFORM_BARS }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-[3px] bg-[#00FFD1] rounded-full"
                          animate={{ height: [`${4 + Math.random() * 8}px`, `${20 + Math.sin(j * 0.5) * 20}px`, `${4 + Math.random() * 8}px`] }}
                          transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: j * 0.02 }}
                        />
                      ))}
                    </div>
                  )}

                  {i === 2 && (
                    <div className="font-mono text-xs text-[#00FFD1]/60 overflow-hidden h-6">
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ▶ Gemini processing... 847ms → response ready
                      </motion.span>
                    </div>
                  )}

                  {i === 3 && (
                    <div className="font-mono text-sm text-[#00FFD1]">
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ₹0.034 / turn
                      </motion.span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HOW_IT_WORKS.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{ backgroundColor: useTransform(scrollYProgress, [i / 4, (i + 1) / 4], ['rgba(255,255,255,0.2)', 'rgba(0,255,209,0.8)']) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
