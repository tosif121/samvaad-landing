import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://samwaad.iotcom.io';

  // Core pages
  const routes = ['', '/about', '/blog', '/demo', '/careers'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
