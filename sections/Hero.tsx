'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';
import { HERO_SLIDES } from '@/lib/constants';

const SLIDES = HERO_SLIDES;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const slide = SLIDES[active];

  const goTo = (idx: number) => {
    if (playing) return;
    setActive(idx);
  };

  // Auto-slide every 6s — pauses while audio is playing
  useEffect(() => {
    if (playing) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 bg-white relative" id="hero">
      {/* Background texture */}
      <div
        className="absolute top-0 left-0 z-0 bg-repeat-y bg-cover bg-center opacity-20 w-full h-full pointer-events-none"
        style={{ backgroundImage: "url('/images/image.png')" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ── LEFT — CONTENT ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                {slide.badge}
              </span>

              {/* Headline */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-[0.95] mb-4">
                  {slide.headline.split('\n')[0]}
                  <br />
                  <span className="relative inline-block text-green-500">
                    {slide.headline.split('\n')[1]}
                    <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 230 8" fill="none">
                      <path
                        d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="text-base text-black/50 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                  {slide.sub}
                </p>
              </div>

              {/* Points */}
              <div className="flex flex-col gap-2.5 w-full">
                {slide.points.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3 text-sm font-semibold text-black/65 justify-center lg:justify-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    {p}
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-green-500/25"
                >
                  Book a Free Demo
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── RIGHT — AUDIO PLAYER ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/35">{slide.label}</span>
                <div className="flex-1 h-px bg-black/8" />
                <span className="text-[10px] font-black text-orange-500 tracking-widest uppercase">
                  {slide.language}
                </span>
              </div>

              <AudioPlayer {...slide.player} onPlayingChange={setPlaying} />

              <p className="text-center text-[11px] text-black/30 font-medium">{slide.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── SLIDE DOTS — centered below both columns ── */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              disabled={playing}
              title={playing ? 'Pause audio to switch' : ''}
              className={`transition-all duration-300 rounded-full ${
                i === active ? 'w-8 h-2.5 bg-green-500' : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
              } ${playing ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
            />
          ))}
          {playing && <span className="text-[10px] text-black/35 font-medium ml-2">Pause to switch</span>}
        </div>
      </div>
    </section>
  );
}
