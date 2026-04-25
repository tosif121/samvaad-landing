import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Iotcom.io — Build the Future of AI Voice | Jaipur',
  description: 'Join Iotcom.io in Jaipur. We build AI voice bots, cloud telephony, CRM integrations, and communication platforms used by 500+ businesses across India.',
};

const PRODUCTS = [
  {
    name: 'SamwadBot — AI Voice Bot',
    desc: 'Autonomous AI calling agent powered by Gemini Live. Handles inbound & outbound calls in Hindi, English & Hinglish. Sub-850ms response time.',
    tag: 'NEW',
    color: '#00FFD1',
  },
  {
    name: 'Cloud Telephony Platform',
    desc: 'Automated dialing system, mass voice broadcasting, one-click callback, smart call routing, and multi-tier IVR menu.',
    tag: 'CORE',
    color: '#FF6B2B',
  },
  {
    name: 'Omni-Channel Communication',
    desc: 'WhatsApp, SMS, social platform connectivity, and app & desktop calling — all from one unified platform.',
    tag: 'PLATFORM',
    color: '#00FFD1',
  },
  {
    name: 'CRM & CTI Integration',
    desc: 'Comprehensive lead tracking, automated lead capture, CRM & CTI connectivity, and mass lead import.',
    tag: 'INTEGRATION',
    color: '#FF6B2B',
  },
  {
    name: 'Business Communication Suite',
    desc: 'Built-in CRM, live metrics, two-way call handling, live call handover, automated reminders, and tailored form builder.',
    tag: 'SUITE',
    color: '#00FFD1',
  },
  {
    name: 'Voice API Solutions',
    desc: 'Secure, scalable voice APIs for developers. 99.999% uptime. Seamless integrations. Quick setup.',
    tag: 'API',
    color: '#FF6B2B',
  },
];

const OPENINGS = [
  { role: 'AI/ML Engineer', type: 'Full-time', location: 'Jaipur / Remote', desc: 'Build and fine-tune voice AI models. Work with Gemini, Whisper, and custom GLSL shaders for real-time audio processing.' },
  { role: 'Full Stack Developer', type: 'Full-time', location: 'Jaipur', desc: 'Node.js, React, MongoDB, Redis. Build the admin dashboard, campaign engine, and real-time call monitoring systems.' },
  { role: 'Asterisk / VoIP Engineer', type: 'Full-time', location: 'Jaipur', desc: 'Configure and maintain Asterisk PBX, SIP trunks, ARI, AudioSocket, and dialplan logic for high-volume calling.' },
  { role: 'Product Designer (UI/UX)', type: 'Full-time', location: 'Jaipur / Remote', desc: 'Design the future of AI communication interfaces. Dark-mode first, data-dense, cinematic.' },
  { role: 'Business Development Executive', type: 'Full-time', location: 'Jaipur', desc: 'Sell SamwadBot and our communication suite to SMEs, enterprises, and BPOs across India.' },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <p className="font-mono text-xs text-[#00FFD1]/60 tracking-[0.3em] uppercase mb-4">[ Careers at Iotcom.io ]</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: 1 }}>
          BUILD THE<br />
          <span style={{ color: '#FF6B2B' }}>FUTURE</span> OF<br />
          <span style={{ color: '#00FFD1' }}>AI VOICE</span>
        </h1>
        <p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">
          We're a small, focused team in Jaipur building communication technology used by hundreds of businesses across India. If you love hard problems and fast shipping — you'll fit right in.
        </p>
      </section>

      {/* Products & Services */}
      <section className="bg-[#0D0D14] py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 1 }} className="text-white mb-2">
            WHAT WE <span style={{ color: '#00FFD1' }}>BUILD</span>
          </h2>
          <p className="text-white/40 text-sm mb-10">Our products and services — from voice APIs to AI calling agents.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: p.color, borderColor: p.color + '40' }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, color: p.color }}>{p.name}</h3>
                <p className="text-white/40 text-sm mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 1 }} className="text-white mb-2">
          OPEN <span style={{ color: '#FF6B2B' }}>POSITIONS</span>
        </h2>
        <p className="text-white/40 text-sm mb-10">We hire for attitude and aptitude. Experience helps, but hunger matters more.</p>
        <div className="flex flex-col gap-3">
          {OPENINGS.map((o, i) => (
            <div key={i} className="border border-white/10 p-6 hover:border-[#00FFD1]/30 transition-colors group">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 1 }} className="text-white group-hover:text-[#00FFD1] transition-colors">
                    {o.role}
                  </h3>
                  <p className="text-white/40 text-sm mt-1 leading-relaxed">{o.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-[#00FFD1]/60 font-mono">{o.type}</span>
                  <span className="text-xs text-white/30">{o.location}</span>
                </div>
              </div>
              <a href={`mailto:contact@iotcom.io?subject=Application: ${o.role}`}
                className="inline-block mt-4 text-xs border border-white/20 text-white/50 hover:border-[#00FFD1]/50 hover:text-[#00FFD1] px-4 py-2 transition-all">
                Apply Now →
              </a>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-sm mt-8">
          Don't see your role? Email us at{' '}
          <a href="mailto:contact@iotcom.io?subject=Career Enquiry" className="text-[#00FFD1]/60 hover:text-[#00FFD1] transition-colors">contact@iotcom.io</a>
        </p>
      </section>

    </main>
  );
}
