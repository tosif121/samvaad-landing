import { BLOG_POSTS } from '@/lib/blog-posts';
import BlogPostClient from './BlogPostClient';
import Link from 'next/link';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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

  return <BlogPostClient post={post} />;
}
