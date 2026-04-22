import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://acdpecqafaborzpipqkf.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sb_publishable_Gt8CHn2mN70W82jaUTIr0Q_42f8KBZV',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_...',
    STRIPE_SECRET_KEY: 'sk_test_...',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
