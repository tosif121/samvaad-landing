import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — AI Voice, Telephony & Business Automation | Iotcom.io',
  description: 'Insights on AI voice bots, call automation, customer communication, and business productivity from the team at Iotcom.io.',
};

const POSTS = [
  {
    slug: 'never-miss-a-call-ai-voice-bot',
    category: 'AI Voice',
    title: 'What If Your Business Never Missed a Call Again?',
    excerpt: 'Every missed call is a missed opportunity. Here\'s how AI voice bots are changing the game for Indian businesses — answering every call, instantly, 24/7.',
    date: 'April 22, 2026',
    readTime: '4 min read',
    color: '#00FFD1',
  },
  {
    slug: 'hindi-ai-voice-bot-india',
    category: 'Product',
    title: 'Why Hindi-First AI Matters for Indian Businesses',
    excerpt: 'Most AI voice solutions are built for English. We built SamwadBot for India — Hindi, Hinglish, and English, auto-detected from the first word.',
    date: 'April 18, 2026',
    readTime: '5 min read',
    color: '#FF6B2B',
  },
  {
    slug: 'ivr-vs-ai-voice-bot',
    category: 'Comparison',
    title: 'IVR is Dead. Here\'s What Replaced It.',
    excerpt: 'Traditional IVR frustrates customers. AI voice bots have natural conversations. The difference in customer satisfaction is not small — it\'s massive.',
    date: 'April 14, 2026',
    readTime: '6 min read',
    color: '#00FFD1',
  },
  {
    slug: 'ai-calling-cost-breakdown',
    category: 'Pricing',
    title: '₹2 Per Minute: The Real Cost of AI Calling vs Human Agents',
    excerpt: 'A human agent costs ₹15,000–25,000/month. An AI agent costs ₹2/minute. We break down the full math — including hidden costs most people ignore.',
    date: 'April 10, 2026',
    readTime: '7 min read',
    color: '#FF6B2B',
  },
  {
    slug: 'gemini-live-voice-ai',
    category: 'Technology',
    title: 'How Gemini Live Powers Sub-850ms Voice Responses',
    excerpt: 'The technical story behind SamwadBot\'s response time — from AudioSocket to Gemini Live native audio, and why latency is everything in voice AI.',
    date: 'April 6, 2026',
    readTime: '8 min read',
    color: '#00FFD1',
  },
  {
    slug: 'voice-automation-collections',
    category: 'Use Case',
    title: 'How Collections Teams Are Using AI Voice Bots to Recover More',
    excerpt: 'Debt collection calls are repetitive, high-volume, and emotionally draining. AI voice bots handle the first 3 attempts — humans close the deal.',
    date: 'April 2, 2026',
    readTime: '5 min read',
    color: '#FF6B2B',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* Nav */}
      <nav className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Iotcom.io Logo" width={120} height={36} className="object-contain" />
        </Link>
        <Link href="/demo" className="text-sm bg-[#00FFD1] text-black font-bold px-5 py-2 hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] transition-all">
          Book a Demo
        </Link>
      </nav>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <p className="font-mono text-xs text-[#00FFD1]/60 tracking-[0.3em] uppercase mb-4">[ Iotcom.io Blog ]</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: 1 }}>
          INSIGHTS ON <span style={{ color: '#FF6B2B' }}>AI VOICE</span><br />
          & <span style={{ color: '#00FFD1' }}>COMMUNICATION</span>
        </h1>
        <p className="text-white/40 text-base mt-4">Practical guides, product updates, and industry thinking from the Iotcom.io team.</p>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        {/* Featured post */}
        <div className="border border-white/10 p-8 mb-6 hover:border-[#00FFD1]/30 transition-colors group cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono px-2 py-1 border" style={{ color: POSTS[0].color, borderColor: POSTS[0].color + '40' }}>
              {POSTS[0].category}
            </span>
            <span className="text-white/30 text-xs">{POSTS[0].date} · {POSTS[0].readTime}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: 1, color: '#fff', lineHeight: 1 }} className="mb-3 group-hover:text-[#00FFD1] transition-colors">
            {POSTS[0].title}
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl">{POSTS[0].excerpt}</p>
          <p className="text-[#00FFD1] text-sm mt-4 group-hover:translate-x-1 transition-transform inline-block">Read more →</p>
        </div>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POSTS.slice(1).map((post) => (
            <div key={post.slug} className="border border-white/10 p-6 hover:border-white/20 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: post.color, borderColor: post.color + '40' }}>
                  {post.category}
                </span>
                <span className="text-white/20 text-xs">{post.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1 }} className="text-white mb-2 group-hover:text-[#00FFD1] transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{post.excerpt}</p>
              <p className="text-white/30 text-xs mt-3">{post.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5 px-6 md:px-12 py-6 flex items-center justify-between">
        <p className="text-white/20 text-xs">© 2026 Iotcom.io · Jaipur, India 🇮🇳</p>
        <Link href="/" className="text-white/30 text-xs hover:text-white transition-colors">← Back to SamwadBot</Link>
      </div>
    </main>
  );
}
