import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Iotcom.io — 10+ Years of Voice & AI Innovation | Jaipur, India',
  description: 'Iotcom.io is a Jaipur-based technology company with 10+ years of experience delivering secure, scalable voice, video, messaging and AI solutions with 99.999% uptime.',
};

const TIMELINE = [
  { year: '2014', title: 'Founded in Jaipur', desc: 'Iotcom started as a voice technology company focused on call-based software solutions for Indian businesses.' },
  { year: '2016', title: 'Cloud Telephony Platform', desc: 'Launched our first cloud telephony platform — automated dialing, IVR, and call routing for SMEs.' },
  { year: '2018', title: 'CRM & CTI Integration', desc: 'Built deep CRM and CTI connectivity, enabling businesses to manage leads and calls from a single interface.' },
  { year: '2020', title: 'Omni-Channel Communication', desc: 'Expanded to WhatsApp, SMS, and social platform connectivity — true omni-channel for Indian businesses.' },
  { year: '2022', title: 'AI-Powered Features', desc: 'Introduced AI-powered lead capture, smart call routing, and automated reminders across the platform.' },
  { year: '2024', title: 'SamwadBot — AI Voice Bot', desc: 'Launched SamwadBot: a fully autonomous AI voice agent powered by Gemini Live, handling calls in Hindi, English & Hinglish.' },
];

const VALUES = [
  { title: 'Reliability', desc: '99.999% uptime. When your business depends on communication, downtime is not an option.' },
  { title: 'Innovation', desc: 'From IVR to AI voice bots — we stay 3 years ahead of what the market expects.' },
  { title: 'Made for India', desc: 'Built in Jaipur. Designed for Indian businesses. Hindi, English, Hinglish — natively.' },
  { title: 'Security First', desc: 'DPDP-compliant. Indian servers. Your customer data never leaves the country.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <p className="font-mono text-xs text-[#00FFD1]/60 tracking-[0.3em] uppercase mb-4">[ About Iotcom.io ]</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: 1 }}>
          10+ YEARS OF<br />
          <span style={{ color: '#FF6B2B' }}>VOICE</span> &{' '}
          <span style={{ color: '#00FFD1' }}>AI INNOVATION</span>
        </h1>
        <p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">
          Iotcom.io is a Jaipur-based technology company delivering secure, scalable voice, video, messaging and AI solutions — backed by 99.999% uptime and seamless integrations that boost team productivity.
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '10+', l: 'Years of experience' },
            { n: '99.999%', l: 'Platform uptime' },
            { n: '500+', l: 'Businesses served' },
            { n: 'Jaipur', l: 'Headquartered in India' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: i % 2 === 0 ? '#00FFD1' : '#FF6B2B', lineHeight: 1 }}>{s.n}</p>
              <p className="text-white/40 text-xs mt-1 tracking-wide">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 1 }} className="text-white mb-12">
          OUR <span style={{ color: '#FF6B2B' }}>JOURNEY</span>
        </h2>
        <div className="relative border-l border-white/10 pl-8 flex flex-col gap-10">
          {TIMELINE.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: i % 2 === 0 ? '#00FFD1' : '#FF6B2B', background: '#050508' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: i % 2 === 0 ? '#00FFD1' : '#FF6B2B' }} />
              </span>
              <p className="font-mono text-xs mb-1" style={{ color: i % 2 === 0 ? '#00FFD1' : '#FF6B2B' }}>{t.year}</p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 1 }} className="text-white mb-1">{t.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0D0D14] py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 1 }} className="text-white mb-12">
            WHAT WE <span style={{ color: '#00FFD1' }}>STAND FOR</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="border border-white/10 p-6 hover:border-[#00FFD1]/30 transition-colors">
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: i % 2 === 0 ? '#00FFD1' : '#FF6B2B', letterSpacing: 1 }}>{v.title}</h3>
                <p className="text-white/50 text-sm mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 text-center">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: 1 }} className="text-white mb-4">
          READY TO SEE <span style={{ color: '#00FFD1' }}>SAMWADBOT</span> IN ACTION?
        </h2>
        <p className="text-white/40 text-base mb-8">Book a free 30-minute demo. We'll call a real number, live, in front of you.</p>
        <Link href="/demo" className="inline-block bg-[#00FFD1] text-black font-bold px-10 py-4 text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,255,209,0.4)] transition-all">
          Book a Free Demo
        </Link>
      </section>

    </main>
  );
}
