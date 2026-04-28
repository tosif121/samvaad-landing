'use client';
import { motion } from 'framer-motion';
import {
  PhoneIncoming,
  Mic2,
  Brain,
  MessageCircle,
  PhoneCall,
  Globe,
  BarChart3,
  Zap,
  MessageSquare,
  Layers,
} from 'lucide-react';

const FEATURES = [
  {
    icon: PhoneIncoming,
    color: '#22c55e',
    tag: 'Always On',
    title: 'Call Initiated',
    desc: 'Customer calls your number — or your campaign dials out. Samvaad picks up instantly. Zero wait time, zero missed calls.',
    visual: (
      <div
        className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl w-fit"
        style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        Live · Instant pickup · 0ms wait
      </div>
    ),
  },
  {
    icon: Mic2,
    color: '#3b82f6',
    tag: 'Voice AI',
    title: 'Voice Captured',
    desc: 'AI detects speech in real-time. Silence is ignored. Every word is processed with sub-second precision — in Hindi, English, or Hinglish.',
    visual: (
      <div className="flex items-end gap-[3px] h-10">
        {Array.from({ length: 32 }).map((_, j) => (
          <motion.div
            key={j}
            className="rounded-full w-[3px]"
            style={{ background: '#3b82f6', opacity: 0.7 }}
            animate={{
              height: [`${4 + Math.random() * 6}px`, `${16 + Math.sin(j * 0.5) * 14}px`, `${4 + Math.random() * 6}px`],
            }}
            transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: j * 0.025 }}
          />
        ))}
      </div>
    ),
  },
  {
    icon: Brain,
    color: '#8b5cf6',
    tag: 'Gemini Live',
    title: 'AI Understands',
    desc: 'Gemini Live AI processes the conversation. Context-aware, handles objections, remembers the full call — feels completely natural.',
    visual: (
      <div
        className="font-mono text-xs px-4 py-2.5 rounded-xl border w-fit"
        style={{ background: 'rgba(139,92,246,0.06)', color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.2)' }}
      >
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
          ▶ Gemini processing... 120ms → response streaming
        </motion.span>
      </div>
    ),
  },
  {
    icon: MessageCircle,
    color: '#f59e0b',
    tag: 'Response',
    title: 'Response Delivered',
    desc: 'Human-like reply in under 850ms. No robotic delays. Customer feels heard — instantly. Cost: ₹0.02 per call.',
    visual: (
      <div
        className="font-mono text-xs px-4 py-2.5 rounded-xl border w-fit"
        style={{ background: 'rgba(245,158,11,0.06)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.2)' }}
      >
        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
          EST. COST: ₹0.02 / CALL · 850ms avg
        </motion.span>
      </div>
    ),
  },
  {
    icon: PhoneCall,
    color: '#ec4899',
    tag: 'Campaigns',
    title: 'Outbound Campaigns',
    desc: 'Power, Predictive, and Manual dialing modes. CPS throttling, NDNC compliance, and automatic CLI rotation to prevent spam labeling.',
    visual: (
      <div className="flex gap-2 flex-wrap">
        {['Power Dial', 'Predictive', 'Manual', 'NDNC Safe'].map((t) => (
          <span
            key={t}
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(236,72,153,0.08)', color: '#ec4899', border: '1px solid rgba(236,72,153,0.2)' }}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Globe,
    color: '#06b6d4',
    tag: 'Languages',
    title: 'Multi-Language Support',
    desc: 'Auto-detects language from the first "Hello." Switches seamlessly between Hindi, English, and Hinglish mid-conversation.',
    visual: (
      <div className="flex gap-2">
        {['Hindi', 'English', 'Hinglish'].map((l, i) => (
          <span
            key={l}
            className="text-xs font-bold px-3 py-1.5 rounded-lg"
            style={{
              background: `rgba(6,182,212,${0.06 + i * 0.04})`,
              color: '#06b6d4',
              border: '1px solid rgba(6,182,212,0.2)',
            }}
          >
            {l}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: BarChart3,
    color: '#10b981',
    tag: 'Analytics',
    title: 'Real-Time Monitoring',
    desc: '50+ analytics on consumption, goals, AI usage, and success metrics. Live dashboards showing every active call, sentiment, and outcome.',
    visual: (
      <div className="flex items-end gap-2 h-10">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <motion.div
            key={i}
            className="w-4 rounded-t-sm"
            style={{ background: '#10b981', opacity: 0.6 + i * 0.05 }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          />
        ))}
      </div>
    ),
  },
  {
    icon: Zap,
    color: '#f97316',
    tag: 'Handoff',
    title: 'Warm Human Handoff',
    desc: 'When the AI detects frustration or complexity, it transfers the call to a human agent — with full context, transcript, and sentiment intact.',
    visual: (
      <div className="flex items-center gap-3 text-xs font-semibold">
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(249,115,22,0.08)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          AI Agent
        </div>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ color: '#f97316' }}
        >
          →
        </motion.span>
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(249,115,22,0.08)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          Human Agent
        </div>
        <span className="text-black/30">· Full context retained</span>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    color: '#6366f1',
    tag: 'Multi-Modal',
    title: 'Omni-Channel Communication',
    desc: 'Uninterrupted multi-modal communication across Voice, SMS, Chat, and Email — all from one unified AI platform.',
    visual: (
      <div className="flex gap-2 flex-wrap">
        {['Voice', 'SMS', 'Chat', 'Email'].map((t) => (
          <span
            key={t}
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Layers,
    color: '#0ea5e9',
    tag: 'AI Frameworks',
    title: 'Advanced AI Frameworks',
    desc: 'Agentic Flow, Agent M (MultiAgent), and Fixed Flow — choose the right AI architecture for your use case.',
    visual: (
      <div className="flex gap-2 flex-wrap">
        {['Agentic Flow', 'Agent M', 'Fixed Flow'].map((t) => (
          <span
            key={t}
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(14,165,233,0.08)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)' }}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
            Features
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-4">
            Everything you <span className="text-green-500">need</span>
          </h2>
          <p className="text-black/50 text-lg max-w-xl mx-auto">
            Built for real Indian business conversations — from first ring to final resolution.
          </p>
        </motion.div>

        {/* Alternating rows */}
        <div className="flex flex-col relative">
          {/* Continuous vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-black/8 hidden md:block" />

          {FEATURES.map((f, i) => {
            const isEven = i % 2 === 0;
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`flex flex-col md:flex-row items-center gap-8 py-10 ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Left/Right — title side */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${f.color}12`, border: `1px solid ${f.color}25` }}
                    >
                      <Icon size={15} style={{ color: f.color }} />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: f.color }}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-black leading-none tracking-tight">
                    {f.title}
                  </h3>
                </div>

                {/* Divider dot */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className="w-3 h-3 rounded-full border-2 bg-white z-10" style={{ borderColor: f.color }} />
                </div>

                {/* Right/Left — desc + visual side */}
                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-black/55 text-sm leading-relaxed font-medium">{f.desc}</p>
                  {f.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
