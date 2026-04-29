'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Lock, Heart } from 'lucide-react';

const TIMELINE = [
  {
    year: '2014',
    title: 'Founded in Jaipur',
    desc: 'Iotcom started as a voice technology company focused on call-based software solutions for Indian businesses.',
    color: '#22c55e',
  },
  {
    year: '2016',
    title: 'Cloud Telephony Platform',
    desc: 'Launched our first cloud telephony platform — automated dialing, IVR, and call routing for SMEs.',
    color: '#3b82f6',
  },
  {
    year: '2018',
    title: 'CRM & CTI Integration',
    desc: 'Built deep CRM and CTI connectivity, enabling businesses to manage leads and calls from a single interface.',
    color: '#06b6d4',
  },
  {
    year: '2020',
    title: 'Multilingual Support',
    desc: 'Expanded into 12+ Indian languages, ensuring voice bots could serve the diverse linguistic landscape of India.',
    color: '#10b981',
  },
  {
    year: '2022',
    title: 'AI Automation Suite',
    desc: 'Launched full automation for inbound, outbound, and feedback loops across multiple industries.',
    color: '#3b82f6',
  },
  {
    year: '2024',
    title: 'Gemini Live Integration',
    desc: 'First to integrate real-time multimodal AI for sub-850ms response latency on Indian phone networks.',
    color: '#f59e0b',
  },
  {
    year: '2026',
    title: 'The Future',
    desc: 'Continuously evolving to make business communication human-like, efficient, and accessible to every Indian enterprise.',
    color: '#06b6d4',
  },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Customer First',
    desc: 'Every feature we build starts with solving a real problem for our customers and their callers.',
    color: '#ef4444',
  },
  {
    icon: Shield,
    title: 'Data Privacy',
    desc: 'We treat customer data with extreme care, ensuring full encryption and strict access controls.',
    color: '#22c55e',
  },
  {
    icon: Zap,
    title: 'Instant ROI',
    desc: 'Our goal is to deliver measurable value from day one — reduced costs and improved contact rates.',
    color: '#3b82f6',
  },
  {
    icon: Lock,
    title: 'Security First',
    desc: 'DPDP-compliant. Indian servers. Your customer data never leaves the country.',
    color: '#14b8a6',
  },
];

const STATS = [
  { n: '12M+', l: 'Calls Automated', color: '#22c55e' },
  { n: '8k+', l: 'Happy Businesses', color: '#3b82f6' },
  { n: 'Jaipur', l: 'Headquartered', color: '#06b6d4' },
];

function StatCard({ n, l, color, i }: { n: string; l: string; color: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      className="glass-panel rounded-2xl p-6 text-center"
    >
      <p className="text-3xl font-['Bebas_Neue'] leading-none mb-1" style={{ color }}>
        {n}
      </p>
      <p className="text-black/50 text-xs font-medium">{l}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            About Iotcom.io
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-6">
            10+ years of
            <br />
            <span className="text-green-500">voice</span> & AI innovation
          </h1>
          <p className="text-black/55 text-lg max-w-2xl leading-relaxed font-medium">
            Iotcom.io is a Jaipur-based technology company delivering secure, scalable voice, video, messaging and AI
            solutions — backed by 99.999% uptime and seamless integrations that boost team productivity.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="md:py-10 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={i} {...s} i={i} />
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-12"
        >
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-6 py-6"
            >
              {/* Dot */}
              <div className="hidden md:flex flex-col items-center shrink-0 mt-1">
                <div className="w-3.5 h-3.5 rounded-full border-2 bg-white z-10" style={{ borderColor: t.color }} />
              </div>
              {/* Content */}
              <div className="flex-1 glass-panel rounded-2xl p-6">
                <span className="text-xs font-black tracking-widest font-mono" style={{ color: t.color }}>
                  {t.year}
                </span>
                <h3 className="font-['Bebas_Neue'] text-2xl text-black mt-1 mb-2 leading-none">{t.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 bg-white">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
              Our values
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-black tracking-tight leading-none">
              What we <span className="text-green-500">stand for</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-6 flex gap-4 hover:scale-[1.01] transition-transform duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${v.color}12`, border: `1px solid ${v.color}25` }}
                >
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
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-black tracking-tight leading-none mb-4">
            Ready to see <span className="text-green-500">Samvaad</span> in action?
          </h2>
          <p className="text-black/50 text-base mb-8">
            Book a free 30-minute demo. We&apos;ll call a real number, live, in front of you.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-green-600 hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)] transition-all duration-200"
          >
            Book a Free Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
