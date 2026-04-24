import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/providers/LenisProvider';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'SamwadBot — AI Voice Bot for Business | Iotcom.io',
  description: 'Automate customer calls with human-like AI. SamwadBot by Iotcom.io handles inbound & outbound calls 24/7 in Hindi, English & Hinglish. Never miss a call again. Starting ₹2/min.',
  keywords: 'AI voice bot, automated call handling, AI calling software, voice automation India, Hindi AI bot, customer support automation, IVR replacement, Iotcom, SamwadBot, AI call center',
  authors: [{ name: 'Iotcom.io' }],
  creator: 'Iotcom.io',
  publisher: 'Iotcom.io',
  metadataBase: new URL('http://localhost:3000'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'http://localhost:3000',
    title: 'SamwadBot — AI Voice Bot for Business | Iotcom.io',
    description: 'Never miss a customer call again. SamwadBot answers every call instantly with human-like AI — in Hindi, English & Hinglish. 24/7. ₹2/min.',
    siteName: 'SamwadBot by Iotcom.io',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SamwadBot AI Voice Bot' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SamwadBot — AI Voice Bot for Business',
    description: 'Never miss a customer call again. Human-like AI calling in Hindi, English & Hinglish. 24/7. ₹2/min.',
    images: ['/og-image.png'],
    creator: '@iotcom_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'SamwadBot',
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
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
