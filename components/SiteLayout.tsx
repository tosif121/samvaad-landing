'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from '../sections/Footer';
import Preloader from './Preloader';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const isHome    = pathname === '/';
  const hasLoaded = useRef(false); // tracks if preloader has ever completed

  // loaded = true immediately for non-home pages, or once preloader finishes
  const [loaded, setLoaded] = useState(!isHome);

  const handleDone = () => {
    hasLoaded.current = true;
    setLoaded(true);
  };

  // When navigating back to home after preloader already ran — show content immediately
  useEffect(() => {
    if (isHome && hasLoaded.current) {
      setLoaded(true);
    }
    if (!isHome) {
      setLoaded(true);
    }
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = (!loaded && isHome) ? 'hidden' : 'unset';
    if (!loaded && isHome) window.scrollTo(0, 0);
    return () => { document.body.style.overflow = 'unset'; };
  }, [loaded, isHome]);

  return (
    <>
      {/* Preloader — only on first home visit */}
      {isHome && !hasLoaded.current && !loaded && (
        <Preloader onDone={handleDone} />
      )}

      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
