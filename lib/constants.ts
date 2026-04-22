export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Docs', href: '#' },
];

export const HERO = {
  tag: 'AI VOICE BOT · 2026',
  headline: ['THE', 'VOICE', 'THAT', 'THINKS'],
  sub: 'SamwadBot replaces your call center with AI agents that speak Hindi, English, or Hinglish — and cost ₹2 per minute.',
  cta1: 'Deploy Your Agent',
  cta2: 'Watch Demo →',
  pills: [
    { stat: '< ₹2 / min', label: 'Cost per minute' },
    { stat: '< 1s latency', label: 'Mouth-to-ear' },
    { stat: '10,000+', label: 'Concurrent calls' },
  ],
};

export const MARQUEE_ITEMS = [
  '10,000 CONCURRENT CALLS',
  '₹1.80/MIN AVERAGE COST',
  '850ms MOUTH-TO-EAR',
  '92% AI ACCURACY',
  '4 LANGUAGES',
  'ZERO HUMAN AGENTS NEEDED',
  'GEMINI LIVE AI',
];

export const FEATURES = [
  {
    id: 'personas',
    large: true,
    title: 'AI PERSONAS',
    desc: 'Priya. Rahul. Your brand voice. Custom AI agents with distinct personalities, voices, and scripts — trained on your product.',
    icon: '◈',
  },
  {
    id: 'gemini',
    large: false,
    title: 'GEMINI LIVE',
    desc: 'Sub-second voice AI. Real conversation. Powered by Google Gemini native audio.',
    icon: '⬡',
  },
  {
    id: 'cost',
    large: false,
    title: '₹2/MIN COST',
    desc: '10x cheaper than human agents. No salaries, no training, no sick days.',
    icon: '₹',
  },
  {
    id: 'multilingual',
    large: false,
    title: 'MULTI-LINGUAL',
    desc: 'Hindi, English, Hinglish. Auto-detect language from the first "Hello."',
    icon: '語',
  },
  {
    id: 'campaign',
    large: false,
    title: 'CAMPAIGN ENGINE',
    desc: 'Power, Predictive, Manual dialing. CPS throttling. NDNC compliance built-in.',
    icon: '⚡',
  },
  {
    id: 'rag',
    large: false,
    title: 'RAG KNOWLEDGE',
    desc: 'Upload PDFs. Sync Google Sheets. Bot knows your product inside out.',
    icon: '◎',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'CALL INITIATED',
    desc: 'Asterisk PBX dials out. ARI channel opens. AUDIO_UUID assigned.',
  },
  {
    step: '02',
    title: 'VOICE CAPTURED',
    desc: 'VAD detects speech. Silence ignored. 8kHz PCM streams to Node.js.',
  },
  {
    step: '03',
    title: 'GEMINI THINKS',
    desc: '< 850ms to first word. Native audio in, native audio out. No STT/TTS overhead.',
  },
  {
    step: '04',
    title: 'RESPONSE DELIVERED',
    desc: 'Gap filler plays. Silence eliminated. Cost: ₹0.034 per turn.',
  },
];

export const PRICING = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    mins: '500 mins included',
    features: ['5 AI Personas', 'Inbound + Outbound', 'Basic Analytics', 'Email Support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹4,999',
    period: '/month',
    mins: '5,000 mins included',
    features: ['Unlimited Personas', 'Campaign Engine', 'RAG Knowledge Base', 'Priority Support', 'Custom Voices', 'API Access'],
    cta: 'Deploy Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    mins: 'Unlimited minutes',
    features: ['Everything in Pro', 'Dedicated Infrastructure', 'SLA Guarantee', 'White-label Option', 'On-premise Deploy', '24/7 Support'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const STATS = [
  { number: '2.4M+', label: 'Calls handled' },
  { number: '₹1.82', label: 'Avg cost per minute' },
  { number: '847ms', label: 'Avg response time' },
  { number: '94.2%', label: 'Customer satisfaction' },
];

export const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  Connect: ['Twitter', 'LinkedIn', 'GitHub', 'Discord'],
};
