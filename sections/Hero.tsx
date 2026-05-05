'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';

const POINTS = [
  { label: 'Human-like voice in Hindi, English & Hinglish' },
  { label: 'Sub-second response — no awkward pauses' },
  { label: 'Auto-logs every call to your CRM' },
  { label: 'Inbound & outbound, 24 × 7' },
  { label: '< ₹2 per minute' },
  { label: '850ms response time' },
  { label: '24/7 always on' },
  { label: '3 languages — Hindi · English · Hinglish' },
];

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 bg-white" id="hero">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ── LEFT — CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 self-start text-xs font-bold tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Live AI Voice Demo
            </span>

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-[0.95] mb-4">
                Your business never
                <br />
                <span className="relative inline-block text-green-500">
                  misses a call
                  <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 230 8" fill="none">
                    <path
                      d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>{' '}
                again
              </h1>
              <p className="text-base text-black/50 font-medium leading-relaxed max-w-md">
                Samvaad by Iotcom.io answers every customer call instantly — with human-like AI in Hindi, English, or
                Hinglish.
              </p>
            </div>

            {/* Features + Stats combined */}
            <div className="flex flex-col gap-2.5">
              {POINTS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 text-sm font-semibold text-black/65"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  {p.label}
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
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
              <a href="#features" className="text-sm font-semibold text-black/50 hover:text-black transition-colors">
                See all features ↓
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT — AUDIO PLAYER ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/35">Live call example</span>
              <div className="flex-1 h-px bg-black/8" />
              <span className="text-[10px] font-black text-orange-500 tracking-widest uppercase">Hinglish</span>
            </div>

            <AudioPlayer />

            <p className="text-center text-[11px] text-black/30 font-medium">
              Real AI call · EMI collection · Priya (AI) × Durgesh (Customer)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
