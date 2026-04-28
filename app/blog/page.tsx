'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogPage() {
  const featured = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter(p => p.slug !== featured.slug);

  return (
    <main className="min-h-screen bg-white text-black">

      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            Iotcom.io Blog
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-4">
            Insights on <span className="text-green-500">AI voice</span><br />& call automation
          </h1>
          <p className="text-black/50 text-lg max-w-xl">
            Practical guides, product updates, and industry thinking from the Iotcom.io team.
          </p>
        </motion.div>
      </section>

      {/* Featured post */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-8">
        <Link href={`/blog/${featured.slug}`} className="block">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl p-8 md:p-10 group cursor-pointer hover:scale-[1.005] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                style={{ background: `${featured.color}12`, color: featured.color, border: `1px solid ${featured.color}25` }}>
                {featured.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-black/35 font-medium">
                <Clock size={11} /> {featured.readTime}
              </span>
              <span className="text-xs text-black/30">{featured.date}</span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-black leading-none tracking-tight mb-4 group-hover:text-green-600 transition-colors">
              {featured.title}
            </h2>
            <p className="text-black/55 text-base leading-relaxed max-w-2xl mb-6 font-medium">{featured.excerpt}</p>
            <div className="flex items-center gap-2 text-sm font-bold text-green-600 group-hover:gap-3 transition-all">
              Read article <ArrowRight size={15} />
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Rest of posts */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-6 group cursor-pointer hover:scale-[1.01] transition-transform duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${post.color}10`, color: post.color, border: `1px solid ${post.color}20` }}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-black/30">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-2xl md:text-3xl text-black leading-tight mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-black/50 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-black/30">{post.date}</span>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 glass-panel rounded-2xl p-8 text-center">
          <h3 className="font-['Bebas_Neue'] text-3xl text-black mb-2">
            Get new articles in your inbox
          </h3>
          <p className="text-black/50 text-sm mb-6">No spam. Just practical AI voice insights, once a week.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com"
              className="flex-1 text-sm px-4 py-2.5 border border-black/10 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-colors" />
            <button className="bg-green-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-green-600 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
