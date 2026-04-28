import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/providers/LenisProvider';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';
import SiteLayout from '@/components/SiteLayout';

export const metadata: Metadata = {
  title: 'Samvaad — Human-Like AI Voice Bot for Business | Iotcom.io',
  description: 'Automate your business calls with Samvaad. 24/7 AI-powered inbound & outbound call handling in Hindi, English & Hinglish. Save 80% on support costs. Starting at ₹2/min.',
  keywords: 'AI voice bot, automated call handling, AI calling software India, voice automation, Hindi AI bot, Iotcom, Samvaad, AI call center, customer service automation',
  authors: [{ name: 'Iotcom.io', url: 'https://iotcom.io' }],
  creator: 'Iotcom.io',
  publisher: 'Iotcom.io',
  metadataBase: new URL('https://samwaad.iotcom.io'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://samwaad.iotcom.io',
    title: 'Samvaad — The Future of Business Communication',
    description: 'Human-like AI voice automation for your business. Never miss a customer call again.',
    siteName: 'Samvaad by Iotcom.io',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Samvaad AI Voice Bot' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samvaad — AI Voice Bot for Business',
    description: 'Automate your customer calls with human-like AI. 24/7 in Hindi, English & Hinglish.',
    images: ['/og-image.png'],
    creator: '@iotcom_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport = {
  themeColor: '#16A34A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Samvaad — Human-Like AI Voice Bot for Business | Iotcom.io</title>
        <meta name="description" content="Automate your business calls with Samvaad. 24/7 AI-powered inbound & outbound call handling in Hindi, English & Hinglish. Starting at ₹2/min." />
        <meta property="og:title" content="Samvaad — Human-Like AI Voice Bot for Business" />
        <meta property="og:description" content="Automate your business calls with Samvaad. 24/7 AI-powered inbound & outbound call handling." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Samvaad',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Cloud',
              description: 'AI Voice Bot for Business — automate customer calls with human-like intelligence in Hindi, English & Hinglish.',
              offers: { '@type': 'Offer', price: '2', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', price: '2', priceCurrency: 'INR', unitText: 'minute' } },
              provider: { '@type': 'Organization', name: 'Iotcom.io', telephone: '+919358535763' },
            }),
          }}
        />
      </head>
      <body>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          <SiteLayout>
            {children}
          </SiteLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
