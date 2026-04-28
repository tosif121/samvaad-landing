'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Globe, Lock } from 'lucide-react';

const TIMELINE = [
  { year: '2014', title: 'Founded in Jaipur', desc: 'Iotcom started as a voice technology company focused on call-based software solutions for Indian businesses.', color: '#22c55e' },
  { year: '2016', title: 'Cloud Telephony Platform', desc: 'Launched our first cloud telephony platform — automated dialing, IVR, and call routing for SMEs.', color: '#3b82f6' },
  { year: '2018', title: 'CRM & CTI Integration', desc: 'Built deep CRM and CTI connectivity, enabling businesses to manage leads and calls from a single interface.', color: '#8b5cf6' },
  { year: '2020', title: 'Omni-Channel Communication', desc: 'Expanded to WhatsApp, SMS, and social platform connectivity — true omni-channel for Indian businesses.', color: '#f59e0b' },
  { year: '2022', title: 'AI-Powered Features', desc: 'Introduced AI-powered lead capture, smart call routing, and automated reminders across the platform.', color: '#ec4899' },
  { year: '2024', title: 'Samvaad — AI Voice Bot', desc: 'Launched Samvaad: a fully autonomous AI voice agent powered by Gemini Live, handling calls in Hindi, English & Hinglish.', color: '#22c55e' },
];

const VALUES = [
  { icon: Shield, title: 'Reliability', desc: '99.999% uptime. When your business depends on communication, downtime is not an option.', color: '#22c55e' },
  { icon: Zap,    title: 'Innovation', desc: 'From IVR to AI voice bots — we stay 3 years ahead of what the market expects.', color: '#f59e0b' },
  { icon: Globe,  title: 'Made for India', desc: 'Built in Jaipur. Designed for Indian businesses. Hindi, English, Hinglish — natively.', color: '#3b82f6' },
  { icon: Lock,   title: 'Security First', desc: 'DPDP-compliant. Indian servers. Your customer data never leaves the country.', color: '#8b5cf6' },
];

const STATS = [
  { n: '10+',     l: 'Years of experience', color: '#22c55e' },
  { n: '99.999%', l: 'Platform uptime',     color: '#3b82f6' },
  { n: '500+',    l: 'Businesses served',   color: '#f59e0b' },
  { n: 'Jaipur',  l: 'Headquartered',       color: '#8b5cf6' },
];

function StatCard({ n, l, color, i }: { n: string; l: string; color: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 }} className="glass-panel rounded-2xl p-6 text-center">
      <p className="text-3xl font-['Bebas_Neue'] leading-none mb-1" style={{ color }}>{n}</p>
      <p className="text-black/50 text-xs font-medium">{l}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            About Iotcom.io
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-6">
            10+ years of<br />
            <span className="text-green-500">voice</span> & AI innovation
          </h1>
          <p className="text-black/55 text-lg max-w-2xl leading-relaxed font-medium">
            Iotcom.io is a Jaipur-based technology company delivering secure, scalable voice, video, messaging and AI solutions — backed by 99.999% uptime and seamless integrations that boost team productivity.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={i} {...s} i={i} />)}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-12">
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
            Our journey
          </span>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-black tracking-tight leading-none">
            Built over a <span className="text-green-500">decade</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/8 hidden md:block" />

          {TIMELINE.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex gap-6 py-6">
              {/* Dot */}
              <div className="hidden md:flex flex-col items-center shrink-0 mt-1">
                <div className="w-3.5 h-3.5 rounded-full border-2 bg-white z-10" style={{ borderColor: t.color }} />
              </div>
              {/* Content */}
              <div className="flex-1 glass-panel rounded-2xl p-6">
                <span className="text-xs font-black tracking-widest font-mono" style={{ color: t.color }}>{t.year}</span>
                <h3 className="font-['Bebas_Neue'] text-2xl text-black mt-1 mb-2 leading-none">{t.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
              Our values
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-black tracking-tight leading-none">
              What we <span className="text-green-500">stand for</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-6 flex gap-4 hover:scale-[1.01] transition-transform duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${v.color}12`, border: `1px solid ${v.color}25` }}>
                  <v.icon size={18} style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="font-['Bebas_Neue'] text-2xl text-black leading-none mb-1">{v.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-black tracking-tight leading-none mb-4">
            Ready to see <span className="text-green-500">Samvaad</span> in action?
          </h2>
          <p className="text-black/50 text-base mb-8">Book a free 30-minute demo. We&apos;ll call a real number, live, in front of you.</p>
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-green-600 hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)] transition-all duration-200">
            Book a Free Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
