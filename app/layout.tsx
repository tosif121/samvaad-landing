import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '../providers/LenisProvider';
import GrainOverlay from '../components/GrainOverlay';
import CustomCursor from '../components/CustomCursor';

export const metadata: Metadata = {
  title: 'SamwadBot — Enterprise AI Voice Platform',
  description: 'Replace your call center with AI agents that speak Hindi, English, or Hinglish at ₹2/min.',
  keywords: ['AI voice platform', 'AI call center', 'Hindi AI voice', 'Enterprise AI agents', 'SamwadBot'],
  authors: [{ name: 'SamwadBot' }],
  metadataBase: new URL('https://esamwad.iotcom.io'),
  openGraph: {
    type: 'website',
    url: 'https://esamwad.iotcom.io',
    title: 'SamwadBot — Enterprise AI Voice Platform',
    description: 'Replace your call center with AI agents that speak Hindi, English, or Hinglish at ₹2/min.',
    siteName: 'SamwadBot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SamwadBot — Enterprise AI Voice Platform',
    description: 'Replace your call center with AI agents that speak Hindi, English, or Hinglish at ₹2/min.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
