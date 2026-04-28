'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Landmark, Home, Hospital, FileText, Wallet, Shield } from 'lucide-react';

const CAMPAIGNS = [
  { id: 'banking',    label: 'Banking Sales',    Icon: Landmark, industry: 'banking'    },
  { id: 'realestate', label: 'Real Estate',       Icon: Home,     industry: 'realestate' },
  { id: 'hospital',   label: 'Hospital Booking',  Icon: Hospital, industry: 'health'     },
  { id: 'tax',        label: 'Tax Advisory',      Icon: FileText, industry: 'tax'        },
  { id: 'debt',       label: 'Debt Collection',   Icon: Wallet,   industry: 'banking'    },
  { id: 'insurance',  label: 'Insurance Quote',   Icon: Shield,   industry: 'banking'    },
];

const AGENTS = [
  { id: 'priya',  name: 'Priya',  initials: 'PR', bg: 'bg-emerald-50',  ring: 'ring-emerald-500',  text: 'text-emerald-800'  },
  { id: 'rahul',  name: 'Rahul',  initials: 'RA', bg: 'bg-blue-50',     ring: 'ring-blue-500',     text: 'text-blue-800'     },
  { id: 'anjali', name: 'Anjali', initials: 'AN', bg: 'bg-purple-50',   ring: 'ring-purple-500',   text: 'text-purple-800'   },
  { id: 'vikram', name: 'Vikram', initials: 'VI', bg: 'bg-amber-50',    ring: 'ring-amber-500',    text: 'text-amber-800'    },
];

const STATS = [
  { value: '< ₹2', label: 'per minute' },
  { value: '850ms', label: 'response time' },
  { value: '24/7', label: 'always on' },
  { value: '3 langs', label: 'Hindi · English · Hinglish' },
];

type CallState = 'idle' | 'connecting' | 'ringing' | 'initiated';

function ConnectingLines({ campaignRef, agentRef, btnRef }: {
  campaignRef: React.RefObject<HTMLDivElement | null>;
  agentRef: React.RefObject<HTMLDivElement | null>;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState({ left: '', right: '' });

  const compute = useCallback(() => {
    const svg = svgRef.current; const btn = btnRef.current;
    const camp = campaignRef.current; const agent = agentRef.current;
    if (!svg || !btn) return;
    const svgR = svg.getBoundingClientRect();
    const btnR = btn.getBoundingClientRect();
    const bx = btnR.left - svgR.left; const by = btnR.top - svgR.top;
    const bcy = by + btnR.height / 2;
    let left = '', right = '';
    if (camp) {
      const cr = camp.getBoundingClientRect();
      const cx = cr.right - svgR.left; const cy = cr.top - svgR.top + cr.height / 2;
      const mx = (cx + bx) / 2;
      left = `M${cx},${cy} C${mx},${cy} ${mx},${bcy} ${bx},${bcy}`;
    }
    if (agent) {
      const ar = agent.getBoundingClientRect();
      const ax = ar.left - svgR.left; const ay = ar.top - svgR.top + ar.height / 2;
      const bxr = bx + btnR.width; const mx = (bxr + ax) / 2;
      right = `M${bxr},${bcy} C${mx},${bcy} ${mx},${ay} ${ax},${ay}`;
    }
    setPaths({ left, right });
  }, [btnRef, campaignRef, agentRef]);

  useEffect(() => {
    const t = setTimeout(compute, 80);
    window.addEventListener('resize', compute);
    return () => { clearTimeout(t); window.removeEventListener('resize', compute); };
  }, [compute]);

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      {paths.left && (
        <motion.path key={`l-${paths.left}`} d={paths.left} fill="none" stroke="#22c55e"
          strokeWidth={1.5} strokeDasharray="5 4" opacity={0.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
      )}
      {paths.right && (
        <motion.path key={`r-${paths.right}`} d={paths.right} fill="none" stroke="#22c55e"
          strokeWidth={1.5} strokeDasharray="5 4" opacity={0.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
      )}
    </svg>
  );
}

export default function Hero() {
  const [industry, setIndustry] = useState('all');
  const [language, setLanguage] = useState('Hindi');
  const [selCampaign, setSelCampaign] = useState('banking');
  const [selAgent, setSelAgent] = useState('priya');
  const [scrollOffset, setScrollOffset] = useState(0);
  const [callState, setCallState] = useState<CallState>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  const activeCampRef = useRef<HTMLDivElement>(null);
  const activeAgentRef = useRef<HTMLDivElement>(null);

  const visible = industry === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.industry === industry);
  const shown = visible.slice(scrollOffset, scrollOffset + 5);

  const requestCall = () => {
    if (phone.length < 8) { setPhoneErr(true); setTimeout(() => setPhoneErr(false), 1500); return; }
    const agent = AGENTS.find(a => a.id === selAgent)!;
    const campaign = CAMPAIGNS.find(c => c.id === selCampaign)!;
    setCallState('connecting'); setStatusMsg('Connecting...');
    setTimeout(() => setStatusMsg('Ringing your number...'), 1200);
    setTimeout(() => { setCallState('ringing'); setStatusMsg(`${agent.name} (AI) is calling — ${campaign.label} · ${language}`); }, 2600);
    setTimeout(() => { setCallState('initiated'); setStatusMsg(`Demo simulated. ${name ? name + ', check' : 'Check'} your phone!`); }, 5000);
    setTimeout(() => { setCallState('idle'); setStatusMsg(''); }, 8000);
  };

  return (
    <section className="pt-32 pb-20 px-4 md:px-8" id="hero">
      <div className="max-w-6xl mx-auto">

        {/* Top headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Live AI Voice Demo
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black leading-[0.95] mb-5">
            Your business never<br />
            <span className="relative inline-block text-green-500">
              misses a call
              <svg className="absolute -bottom-1.5 left-0 w-full md:-bottom-2" height="8" viewBox="0 0 230 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span> again
          </h1>
          <p className="text-lg text-black/50 font-medium max-w-xl mx-auto leading-relaxed">
            Samvaad by Iotcom.io answers every customer call instantly — with human-like AI in Hindi, English, or Hinglish.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/8 shadow-sm">
              <span className="font-black text-sm text-black">{s.value}</span>
              <span className="text-xs text-black/40 font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Interactive demo card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white border border-green-100 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(34,197,94,0.08)]">

          {/* Card header */}
          <div className="flex flex-wrap justify-between items-center px-6 py-4 border-b border-black/6 gap-3 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-bold text-black/30 tracking-widest uppercase">Samvaad AI Console</span>
            </div>
            <div className="flex gap-2">
              <select value={industry} onChange={e => { setIndustry(e.target.value); setScrollOffset(0); }}
                className="text-xs font-semibold px-3 py-1.5 border border-black/10 rounded-lg bg-white text-black focus:outline-none focus:border-green-500">
                <option value="all">All industries</option>
                <option value="banking">Banking & Finance</option>
                <option value="realestate">Real Estate</option>
                <option value="health">Healthcare</option>
                <option value="tax">Taxation</option>
              </select>
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 border border-black/10 rounded-lg bg-white text-black focus:outline-none focus:border-green-500">
                <option>Hindi</option>
                <option>English</option>
                <option>Hinglish</option>
              </select>
            </div>
          </div>

          {/* 3-col body */}
          <div className="grid grid-cols-[180px_1fr_180px] relative min-h-[300px]">

            {/* LEFT — campaigns */}
            <div className="border-r border-black/6 py-3">
              <p className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 px-4 mb-1">Campaign</p>
              <button onClick={() => setScrollOffset(Math.max(0, scrollOffset - 1))}
                className="w-full py-1 text-black/25 hover:text-black/50 transition-colors text-xs">▲</button>
              {shown.map(c => (
                <div key={c.id} ref={c.id === selCampaign ? activeCampRef : undefined}
                  onClick={() => setSelCampaign(c.id)}
                  className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-xs transition-all border-l-2 ${
                    c.id === selCampaign
                      ? 'font-black text-black border-l-green-500 bg-green-50/70'
                      : 'text-black/45 border-l-transparent hover:bg-black/3 hover:text-black/70'
                  }`}>
                  <span>{c.label}</span>
                  <c.Icon size={13} className={c.id === selCampaign ? 'text-green-600' : 'text-black/30'} />
                </div>
              ))}
              <button onClick={() => setScrollOffset(Math.min(Math.max(0, visible.length - 5), scrollOffset + 1))}
                className="w-full py-1 text-black/25 hover:text-black/50 transition-colors text-xs">▼</button>
            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center justify-center gap-4 px-6 relative">
              <ConnectingLines campaignRef={activeCampRef} agentRef={activeAgentRef} btnRef={btnRef} />

              <motion.button ref={btnRef} onClick={requestCall} disabled={callState !== 'idle'}
                className="w-24 h-24 rounded-2xl bg-linear-to-br from-green-400 to-green-600 flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_32px_rgba(34,197,94,0.3)] z-10 disabled:opacity-70"
                whileHover={{ scale: 1.05 }}
                animate={callState === 'connecting' ? { scale: [1, 1.07, 1], transition: { repeat: Infinity, duration: 0.8 } } : { scale: 1 }}>
                <div className="grid grid-cols-4 gap-[3px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  ))}
                </div>
                <span className="text-[11px] font-black text-white tracking-wide">
                  {callState === 'idle' ? 'Try Call' : 'Calling...'}
                </span>
              </motion.button>

              <p className="text-xs font-medium text-black/35 text-center z-10 leading-relaxed">
                Enter your number below<br />to receive a live AI call
              </p>
            </div>

            {/* RIGHT — agents */}
            <div className="border-l border-black/6 py-3">
              <p className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 px-4 mb-1">AI Agent</p>
              {AGENTS.map(a => (
                <div key={a.id} ref={a.id === selAgent ? activeAgentRef : undefined}
                  onClick={() => setSelAgent(a.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all ${
                    a.id === selAgent ? 'bg-green-50/60' : 'hover:bg-black/3'
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${a.bg} ${a.text} ${a.id === selAgent ? `ring-2 ${a.ring}` : ''}`}>
                    {a.initials}
                  </div>
                  <span className={`text-xs transition-all ${a.id === selAgent ? 'font-black text-black' : 'text-black/45'}`}>
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <AnimatePresence>
            {statusMsg && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mx-5 mb-2 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-800">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  {statusMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input row */}
          <div className="flex gap-2 items-center px-5 py-4 border-t border-black/6 flex-wrap bg-gray-50/30">
            <select className="text-xs font-semibold px-2.5 py-2 border border-black/10 rounded-lg bg-white text-black w-16 focus:outline-none focus:border-green-500">
              <option>+91</option><option>+1</option><option>+44</option>
            </select>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number *" maxLength={10}
              className={`flex-1 min-w-[130px] text-xs px-3 py-2 border rounded-lg bg-white text-black placeholder:text-black/30 focus:outline-none transition-colors ${phoneErr ? 'border-red-400' : 'border-black/10 focus:border-green-500'}`} />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
              className="flex-1 min-w-[110px] text-xs px-3 py-2 border border-black/10 rounded-lg bg-white text-black placeholder:text-black/30 focus:outline-none focus:border-green-500 transition-colors" />
            <button onClick={requestCall} disabled={callState !== 'idle'}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-200 text-white font-black text-xs px-5 py-2 rounded-lg transition-colors whitespace-nowrap">
              Get a Call →
            </button>
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link href="/demo"
            className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-black/80 transition-colors">
            Book a Full Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="#features" className="text-sm font-semibold text-black/50 hover:text-black transition-colors">
            See all features ↓
          </a>
        </motion.div>

      </div>
    </section>
  );
}
