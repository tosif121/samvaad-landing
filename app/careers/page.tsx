'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Samvaad — AI Voice Bot',
    desc: 'Autonomous AI calling agent powered by Gemini Live. Handles inbound & outbound calls in Hindi, English & Hinglish. Sub-850ms response time.',
    tag: 'NEW',
    color: '#22c55e',
  },
  {
    name: 'Cloud Telephony Platform',
    desc: 'Automated dialing system, mass voice broadcasting, one-click callback, smart call routing, and multi-tier IVR menu.',
    tag: 'CORE',
    color: '#f97316',
  },
  {
    name: 'Omni-Channel Communication',
    desc: 'WhatsApp, SMS, social platform connectivity, and app & desktop calling — all from one unified platform.',
    tag: 'PLATFORM',
    color: '#22c55e',
  },
  {
    name: 'CRM & CTI Integration',
    desc: 'Comprehensive lead tracking, automated lead capture, CRM & CTI connectivity, and mass lead import.',
    tag: 'INTEGRATION',
    color: '#f97316',
  },
  {
    name: 'Business Communication Suite',
    desc: 'Built-in CRM, live metrics, two-way call handling, live call handover, automated reminders, and tailored form builder.',
    tag: 'SUITE',
    color: '#22c55e',
  },
  {
    name: 'Voice API Solutions',
    desc: 'Secure, scalable voice APIs for developers. 99.999% uptime. Seamless integrations. Quick setup.',
    tag: 'API',
    color: '#f97316',
  },
];

const OPENINGS = [
  { role: 'AI/ML Engineer', type: 'Full-time', location: 'Jaipur / Remote', desc: 'Build and fine-tune voice AI models. Work with Gemini, Whisper, and custom GLSL shaders for real-time audio processing.' },
  { role: 'Full Stack Developer', type: 'Full-time', location: 'Jaipur', desc: 'Node.js, React, MongoDB, Redis. Build the admin dashboard, campaign engine, and real-time call monitoring systems.' },
  { role: 'Asterisk / VoIP Engineer', type: 'Full-time', location: 'Jaipur', desc: 'Configure and maintain Asterisk PBX, SIP trunks, ARI, AudioSocket, and dialplan logic for high-volume calling.' },
  { role: 'Product Designer (UI/UX)', type: 'Full-time', location: 'Jaipur / Remote', desc: 'Design the future of AI communication interfaces. Light-mode first, data-dense, cinematic.' },
  { role: 'Business Development Executive', type: 'Full-time', location: 'Jaipur', desc: 'Sell Samvaad and our communication suite to SMEs, enterprises, and BPOs across India.' },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            Careers at Iotcom.io
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-8xl text-black tracking-tight leading-none mb-6">
            Build the <span className="text-green-500">future</span><br />
            of AI voice
          </h1>
          <p className="text-black/55 text-lg max-w-2xl leading-relaxed font-medium">
            We&apos;re a small, focused team in Jaipur building communication technology used by hundreds of businesses across India. If you love hard problems and fast shipping — you&apos;ll fit right in.
          </p>
        </motion.div>
      </section>

      {/* What We Build */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
              Our products
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-black tracking-tight leading-none">
              What we <span className="text-green-500">build</span>
            </h2>
            <p className="text-black/50 text-sm mt-2">From voice APIs to autonomous AI calling agents.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCTS.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="glass-panel rounded-2xl p-6 hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                    style={{ color: p.color, background: p.color + '15', border: `1px solid ${p.color}30` }}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-2xl leading-none mb-2" style={{ color: p.color }}>{p.name}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 md:px-12 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
              Join the team
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-black tracking-tight leading-none">
              Open <span className="text-green-500">positions</span>
            </h2>
            <p className="text-black/50 text-sm mt-2">We hire for attitude and aptitude. Experience helps, but hunger matters more.</p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {OPENINGS.map((o, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-green-500/30 transition-all group">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-['Bebas_Neue'] text-2xl md:text-3xl text-black leading-none group-hover:text-green-600 transition-colors">
                      {o.role}
                    </h3>
                    <span className="text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                      {o.type}
                    </span>
                  </div>
                  <p className="text-black/55 text-sm leading-relaxed mb-2">{o.desc}</p>
                  <span className="text-xs text-black/35 font-medium">{o.location}</span>
                </div>
                <a
                  href={`mailto:contact@iotcom.io?subject=Application: ${o.role}`}
                  className="shrink-0 inline-flex items-center gap-2 bg-slate-950 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-green-500 transition-all duration-200 uppercase tracking-wider"
                >
                  Apply Now <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-black/40 text-sm mt-8 text-center"
          >
            Don&apos;t see your role? Email us at{' '}
            <a href="mailto:contact@iotcom.io?subject=Career Enquiry" className="text-green-600 hover:underline font-medium">
              contact@iotcom.io
            </a>
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="glass-panel rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-green-500/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Zap size={22} className="text-green-500" />
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-black tracking-tight leading-none mb-4">
                Ready to build something <span className="text-green-500">great?</span>
              </h2>
              <p className="text-black/50 text-base mb-8 max-w-md mx-auto font-medium">
                See what we&apos;re building first. Book a demo and meet the product you&apos;d be working on.
              </p>
              <Link href="/demo"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-green-600 hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)] transition-all duration-200">
                See Samvaad Live <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
