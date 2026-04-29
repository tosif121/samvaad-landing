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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Samvaad',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Cloud',
                description: 'AI Voice Bot for Business — automate customer calls with human-like intelligence in Hindi, English & Hinglish.',
                offers: { 
                  '@type': 'Offer', 
                  price: '2', 
                  priceCurrency: 'INR', 
                  priceSpecification: { 
                    '@type': 'UnitPriceSpecification', 
                    price: '2', 
                    priceCurrency: 'INR', 
                    unitText: 'minute' 
                  } 
                },
                provider: { 
                  '@type': 'Organization', 
                  name: 'Iotcom.io', 
                  url: 'https://samwaad.iotcom.io',
                  telephone: '+919358535763' 
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Does Samvaad support Hindi and other Indian languages?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, Samvaad natively supports Hindi, English, and Hinglish (a natural mix of both). It automatically detects the language from the first word spoken.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'How much does Samvaad AI voice calling cost?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pricing starts at just ₹2 per minute. We offer flexible pay-as-you-go models and volume discounts for larger businesses.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Can Samvaad integrate with my existing CRM?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Absolutely. Samvaad seamlessly integrates with popular CRMs like Salesforce, HubSpot, and custom internal systems to log every call and update lead status automatically.'
                    }
                  }
                ]
              }
            ]),
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
