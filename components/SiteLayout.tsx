'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from '../sections/Footer';
import Preloader from './Preloader';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [loaded, setLoaded] = useState(!isHome); // non-home pages skip preloader

  useEffect(() => {
    if (isHome) {
      document.body.style.overflow = loaded ? 'unset' : 'hidden';
      if (!loaded) window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [loaded, isHome]);

  return (
    <>
      {/* Preloader — home page only */}
      {isHome && <Preloader onDone={() => setLoaded(true)} />}

      {/* Main site — hidden until preloader done */}
      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
