'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { type BlogPost, BLOG_POSTS } from '@/lib/blog-posts';
import { ArrowLeft, Clock, Calendar, ArrowRight, Link2, Check } from 'lucide-react';

function ShareButton({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Share</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
        target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366]/30 transition-all"
        aria-label="Share on WhatsApp"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
        target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all"
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
      <button
        onClick={copy}
        className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500/30 transition-all"
        aria-label="Copy link"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Link2 size={14} />}
      </button>
    </div>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-green-500 z-50"
    />
  );
}

function ActiveToc({ toc }: { toc: string[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    toc.forEach((heading) => {
      const id = heading.toLowerCase().replace(/\s+/g, '-');
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(heading); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [toc]);

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      {toc.map((heading, idx) => {
        const isActive = active === heading;
        return (
          <a
            key={idx}
            href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
            className={`group flex items-center gap-2.5 py-1.5 text-sm transition-all duration-200 leading-snug ${
              isActive ? 'text-green-500 font-semibold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <span
              className={`shrink-0 w-0.5 h-4 rounded-full transition-all duration-200 ${
                isActive ? 'bg-green-500' : 'bg-slate-200 group-hover:bg-slate-400'
              }`}
            />
            {heading}
          </a>
        );
      })}
    </nav>
  );
}

function parseSections(content: string) {
  return content.trim().split('\n').reduce<{ type: string; text: string }[]>((acc, line) => {
    if (line.startsWith('## '))         acc.push({ type: 'h2', text: line.replace('## ', '') });
    else if (line.startsWith('### '))   acc.push({ type: 'h3', text: line.replace('### ', '') });
    else if (line.trim().startsWith('|')) acc.push({ type: 'table-row', text: line });
    else if (line.startsWith('- ') || /^\d+\.\s/.test(line))
                                        acc.push({ type: 'li', text: line.replace(/^[-\d]+\.\s/, '') });
    else if (line.startsWith('**') && line.endsWith('**'))
                                        acc.push({ type: 'bold-line', text: line.replace(/\*\*/g, '') });
    else if (line.trim() === '---')     acc.push({ type: 'hr', text: '' });
    else if (line.trim() !== '')        acc.push({ type: 'p', text: line });
    return acc;
  }, []);
}

function renderInline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-green-600 font-semibold underline underline-offset-2 hover:text-green-700 transition-colors">$1</a>');
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const router = useRouter();
  const articleRef = useRef<HTMLElement>(null);
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const sections = parseSections(post.content);
  const toc = sections.filter((s) => s.type === 'h2').map((s) => s.text);

  // Group consecutive items (lists and tables)
  const groupedSections = sections.reduce<{ type: string; text: string; items?: string[]; rows?: string[][] }[]>((acc, s) => {
    const last = acc[acc.length - 1];
    
    // Group Lists
    if (s.type === 'li' && last?.type === 'li-group') {
      last.items!.push(s.text);
    } else if (s.type === 'li') {
      acc.push({ type: 'li-group', text: '', items: [s.text] });
    } 
    // Group Tables
    else if (s.type === 'table-row') {
      if (s.text.includes('---')) return acc; // Skip separator
      const cells = s.text.split('|').filter(Boolean).map(c => c.trim());
      
      if (last?.type === 'table') {
        last.rows!.push(cells);
      } else {
        acc.push({ type: 'table', text: '', rows: [cells] });
      }
    }
    else {
      acc.push(s);
    }
    return acc;
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20 md:pb-32">
      <ReadingProgress />

      {/* ── Hero ── */}
      <section className="relative border-b border-slate-100 overflow-hidden">
        {/* Subtle gradient backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 60% 100%, ${post.color}, transparent)` }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-12 md:pb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            {/* Back link */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-green-500 transition-colors mb-8 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Blog
            </button>

            <div className="max-w-3xl">
              {/* Category + meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                  style={{ color: post.color, borderColor: post.color + '50', background: post.color + '10' }}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock size={12} /> {post.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-7xl text-slate-950 tracking-tight leading-[0.95] mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-normal max-w-2xl mb-8">
                {post.excerpt}
              </p>

              {/* Share row */}
              <ShareButton post={post} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 xl:gap-16 items-start">

          {/* Article body */}
          <motion.article
            ref={articleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="min-w-0 space-y-5"
          >
            {groupedSections.map((s, i) => {
              if (s.type === 'h2') return (
                <h2
                  key={i}
                  id={s.text.toLowerCase().replace(/\s+/g, '-')}
                  className="font-['Bebas_Neue'] text-3xl md:text-[2.6rem] text-slate-950 tracking-tight leading-none mt-14 mb-2 scroll-mt-8"
                >
                  <span
                    className="inline-block h-0.5 w-8 rounded-full mr-3 align-middle mb-1"
                    style={{ background: post.color }}
                  />
                  {s.text}
                </h2>
              );

              if (s.type === 'h3') return (
                <h3
                  key={i}
                  className="font-['Bebas_Neue'] text-2xl text-slate-800 tracking-tight leading-none mt-10 mb-2"
                >
                  {s.text}
                </h3>
              );

              if (s.type === 'hr') return (
                <hr key={i} className="border-slate-100 my-10" />
              );

              if (s.type === 'li-group') return (
                <ul key={i} className="space-y-3 my-6 pl-1">
                  {s.items!.map((item, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: post.color }}
                      />
                      <p
                        className="text-slate-600 leading-relaxed text-[15px]"
                        dangerouslySetInnerHTML={{ __html: renderInline(item) }}
                      />
                    </li>
                  ))}
                </ul>
              );

              if (s.type === 'table') {
                return (
                  <div key={i} className="my-8 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          {s.rows![0].map((cell, ci) => (
                            <th key={ci} className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {s.rows!.slice(1).map((row, ri) => (
                          <tr key={ri} className="group hover:bg-slate-50/30 transition-colors">
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap"
                                  dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (s.type === 'bold-line') return (
                <p key={i} className="font-semibold text-slate-900 text-base">{s.text}</p>
              );

              return (
                <p
                  key={i}
                  className="text-slate-600 leading-[1.85] text-[15px]"
                  dangerouslySetInnerHTML={{ __html: renderInline(s.text) }}
                />
              );
            })}

            {/* Newsletter card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 rounded-2xl border border-slate-100 bg-slate-50 p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: post.color + '18' }}
                >
                  <span className="text-lg" style={{ color: post.color }}>✉</span>
                </div>
                <div>
                  <h3 className="font-['Bebas_Neue'] text-2xl text-slate-950 leading-none mb-1">
                    Stay updated on Voice AI
                  </h3>
                  <p className="text-sm text-slate-500">
                    Join 1,200+ businesses receiving weekly insights on conversational AI.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all min-h-[48px] placeholder:text-slate-400"
                />
                <button className="bg-green-500 text-white font-bold text-xs px-7 py-3 rounded-xl hover:bg-green-600 active:scale-[0.98] transition-all uppercase tracking-widest min-h-[48px] whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>

            {/* Bottom share */}
            <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-green-500 transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Blog
              </button>
              <ShareButton post={post} />
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 lg:sticky lg:top-8 lg:self-start"
          >
            {/* TOC */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-slate-100 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-4">
                  In this article
                </p>
                <ActiveToc toc={toc} />
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-4">
                  Related posts
                </p>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group block rounded-2xl border border-slate-100 p-5 hover:border-green-500/25 hover:bg-green-50/30 transition-all duration-200"
                    >
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
                        style={{ color: p.color }}
                      >
                        {p.category}
                      </span>
                      <h5 className="font-['Bebas_Neue'] text-lg text-slate-950 group-hover:text-green-600 transition-colors leading-tight mb-1.5">
                        {p.title}
                      </h5>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight size={10} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mini CTA */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: `linear-gradient(135deg, ${post.color}15, ${post.color}05)`, border: `1px solid ${post.color}25` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: post.color }}>
                Live demo
              </p>
              <p className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
                Hear Samvaad in action
              </p>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Book 30 min. We'll call a real number, live.
              </p>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: post.color }}
              >
                Book a Demo <ArrowRight size={12} />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="bg-slate-950 rounded-[36px] px-10 py-14 md:px-16 md:py-20 text-center relative overflow-hidden"
        >
          {/* Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="inline-block text-[10px] font-black tracking-[0.25em] uppercase text-green-500/80 mb-4">
              Free 30-minute demo
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white tracking-tight leading-[0.95] mb-4">
              Ready to hear{' '}
              <span className="text-green-500">Samvaad</span>{' '}
              in action?
            </h2>
            <p className="text-slate-400 text-base mb-8 font-normal leading-relaxed">
              We&apos;ll call a real number, live, in front of you. No slides, no recordings — just the product.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-green-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-green-500/20"
            >
              Book a Free Demo <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}