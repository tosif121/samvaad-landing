'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-posts';
import { ArrowRight, Clock, Search, X } from 'lucide-react';

// ─── All unique categories ───────────────────────────────────────────────────
const ALL_CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

// ─── Featured post hero ───────────────────────────────────────────────────────
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[28px] overflow-hidden border border-slate-100 bg-slate-950 min-h-[420px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-12"
      >
        {/* Animated gradient blob */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 80% 20%, ${post.color}, transparent 70%)`,
          }}
        />
        {/* Fine grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Featured pill */}
        <div className="absolute top-8 left-8">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: post.color + '25', color: post.color, border: `1px solid ${post.color}40` }}
          >
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: post.color }} />
            Featured
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full"
              style={{ color: post.color, background: post.color + '20', border: `1px solid ${post.color}35` }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="text-xs text-slate-500 font-medium">{post.date}</span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.92] mb-5 max-w-2xl group-hover:text-slate-100 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl mb-8 font-normal">
            {post.excerpt}
          </p>

          <span
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 group-hover:gap-3"
            style={{ background: post.color, color: '#fff' }}
          >
            Read article <ArrowRight size={14} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Regular post card ────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
        {/* Color bar header */}
        <div
          className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
          style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}60)` }}
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
              style={{ color: post.color, background: post.color + '12', border: `1px solid ${post.color}25` }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-['Bebas_Neue'] text-2xl md:text-[1.65rem] text-slate-950 tracking-tight leading-[1.05] mb-3 group-hover:text-slate-700 transition-colors flex-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-xs text-slate-400 font-medium">{post.date}</span>
            <span
              className="flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200"
              style={{ color: post.color }}
            >
              Read <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Category filter pill ─────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-xs font-bold tracking-wide px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
        active
          ? 'text-white border-transparent shadow-sm'
          : 'text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800 bg-white'
      }`}
      style={active ? { background: color || '#22c55e', borderColor: color || '#22c55e' } : {}}
    >
      {label}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const featured = BLOG_POSTS.find((p) => p.featured);

  // Category colour map
  const categoryColor = (cat: string) =>
    BLOG_POSTS.find((p) => p.category === cat)?.color ?? '#22c55e';

  // Filter logic
  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // Don't show the featured post again in the grid
  const gridPosts = featured
    ? filtered.filter((p) => p.slug !== featured.slug || activeCategory !== 'All' || !!query)
    : filtered;

  const showFeatured = featured && activeCategory === 'All' && !query;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Page header ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-black tracking-[0.28em] uppercase text-green-500">Samvaad</span>
            <span className="w-6 h-px bg-green-500/40" />
            <span className="text-[10px] font-black tracking-[0.28em] uppercase text-slate-400">Blog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl text-slate-950 tracking-tight leading-none">
                Insights &amp;
                <br />
                <span className="text-green-500">Ideas</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-lg mt-4 leading-relaxed font-normal">
                Deep-dives on Voice AI, product updates, and the future of conversational technology in India.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center">
                <p className="font-['Bebas_Neue'] text-4xl text-slate-950">{BLOG_POSTS.length}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Articles</p>
              </div>
              <div className="w-px h-10 bg-slate-100" />
              <div className="text-center">
                <p className="font-['Bebas_Neue'] text-4xl text-slate-950">{ALL_CATEGORIES.length - 1}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Topics</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
            {/* Search */}
            <div className="relative shrink-0">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-full pl-8 pr-9 py-2 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20 transition-all w-36 md:w-48 placeholder:text-slate-400"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-5 bg-slate-200 shrink-0" />

            {/* Category pills */}
            {ALL_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                color={cat === 'All' ? '#22c55e' : categoryColor(cat)}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Content area ── */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {/* Featured hero — only on default view */}
          {showFeatured && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-10"
            >
              <FeaturedPost post={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count when filtering */}
        <AnimatePresence>
          {(activeCategory !== 'All' || query) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <p className="text-sm text-slate-500 font-medium">
                {filtered.length === 0
                  ? 'No articles found'
                  : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}${query ? ` matching "${query}"` : ''}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {gridPosts.length > 0 ? (
          <>
            {/* Section label */}
            {showFeatured && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black tracking-[0.22em] uppercase text-slate-400">More articles</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gridPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <p className="font-['Bebas_Neue'] text-4xl text-slate-200 mb-3">No results</p>
            <p className="text-slate-400 text-sm">
              Try a different search term or{' '}
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="text-green-500 font-semibold hover:underline"
              >
                reset filters
              </button>
            </p>
          </motion.div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="bg-slate-950 rounded-[32px] px-10 py-14 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/8 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-green-500/70 block mb-3">
              Free 30-min demo
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white tracking-tight leading-[0.95] max-w-sm">
              See Samvaad call a real number, live.
            </h2>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2.5 bg-green-500 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-green-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-green-500/20"
            >
              Book a Free Demo <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-slate-500 text-center mt-3">No credit card required</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
