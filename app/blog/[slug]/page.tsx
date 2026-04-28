'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Bebas_Neue'] text-6xl text-slate-950 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-green-500 font-bold hover:underline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Parse content into sections for rendering
  const sections = post.content.trim().split('\n').reduce<{ type: string; text: string }[]>((acc, line) => {
    if (line.startsWith('## ')) acc.push({ type: 'h2', text: line.replace('## ', '') });
    else if (line.startsWith('### ')) acc.push({ type: 'h3', text: line.replace('### ', '') });
    else if (line.startsWith('| ')) acc.push({ type: 'table-row', text: line });
    else if (line.startsWith('- ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) acc.push({ type: 'li', text: line.replace(/^[-\d]+\.\s/, '') });
    else if (line.startsWith('**') && line.endsWith('**')) acc.push({ type: 'bold-line', text: line.replace(/\*\*/g, '') });
    else if (line.trim() === '---') acc.push({ type: 'hr', text: '' });
    else if (line.trim() !== '') acc.push({ type: 'p', text: line });
    return acc;
  }, []);

  const toc = sections.filter((s) => s.type === 'h2').map((s) => s.text);

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-24">

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-green-500 transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
                style={{ color: post.color, borderColor: post.color + '40', background: post.color + '12' }}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>

            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-slate-950 tracking-tight leading-none mb-8">
              {post.title}
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mb-10 font-medium">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center font-['Bebas_Neue'] text-xl text-green-600">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950 leading-none mb-0.5">{post.author.name}</p>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium glass-panel px-4 py-2 rounded-full">
                <Calendar size={13} /> {post.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="pt-16 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-8 space-y-4"
          >
            {sections.map((s, i) => {
              if (s.type === 'h2') return (
                <h2 key={i} id={s.text.toLowerCase().replace(/\s+/g, '-')}
                  className="font-['Bebas_Neue'] text-3xl md:text-4xl text-slate-950 tracking-tight leading-none mt-12 mb-4 pt-4 border-t border-slate-100 first:border-0 first:mt-0">
                  {s.text}
                </h2>
              );
              if (s.type === 'h3') return (
                <h3 key={i} className="font-['Bebas_Neue'] text-2xl text-slate-800 tracking-tight leading-none mt-8 mb-3">
                  {s.text}
                </h3>
              );
              if (s.type === 'hr') return <hr key={i} className="border-slate-100 my-8" />;
              if (s.type === 'li') return (
                <div key={i} className="flex gap-3 items-start">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                </div>
              );
              if (s.type === 'table-row') {
                const cells = s.text.split('|').filter(Boolean).map((c) => c.trim());
                const isHeader = s.text.includes('---');
                if (isHeader) return null;
                return (
                  <div key={i} className="grid gap-px" style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}>
                    {cells.map((c, ci) => (
                      <div key={ci} className="glass-panel px-4 py-3 text-sm text-slate-700 font-medium"
                        dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                    ))}
                  </div>
                );
              }
              if (s.type === 'bold-line') return (
                <p key={i} className="font-bold text-slate-900">{s.text}</p>
              );
              return (
                <p key={i} className="text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-green-600 font-semibold hover:underline">$1</a>') }} />
              );
            })}

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-16 glass-panel rounded-3xl p-8 border-green-500/10"
            >
              <h3 className="font-['Bebas_Neue'] text-2xl text-slate-950 mb-2">Stay updated on Voice AI</h3>
              <p className="text-sm text-slate-500 mb-6">Join 1,200+ businesses receiving weekly insights on conversational AI.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors" />
                <button className="bg-green-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-green-600 transition-all uppercase tracking-wider">
                  Join
                </button>
              </div>
            </motion.div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="lg:col-span-4 space-y-10"
          >
            {toc.length > 0 && (
              <div className="glass-panel rounded-2xl p-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Contents</h4>
                <nav className="space-y-3">
                  {toc.map((heading, idx) => (
                    <a key={idx} href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm font-medium text-slate-600 hover:text-green-500 transition-colors leading-snug">
                      {heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Related Posts</h4>
              <div className="space-y-5">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block group glass-panel rounded-2xl p-5 hover:border-green-500/30 transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: p.color }}>{p.category}</span>
                    <h5 className="font-['Bebas_Neue'] text-lg text-slate-950 group-hover:text-green-500 transition-colors leading-tight mb-2">
                      {p.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="bg-slate-950 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block text-[10px] font-black tracking-[0.3em] uppercase bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
              See It Live
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white tracking-tight leading-none mb-4">
              Ready to hear <span className="text-green-500">Samvaad</span> in action?
            </h2>
            <p className="text-slate-400 text-base mb-8 max-w-md mx-auto font-medium">
              Book a free 30-minute demo. We&apos;ll call a real number, live, in front of you.
            </p>
            <Link href="/demo"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-green-600 hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)] transition-all duration-200">
              Book a Free Demo <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
