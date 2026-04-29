'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS } from '../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed z-50 top-0 left-0 right-0 transition-all duration-500"
      >
        <div
          className={`flex items-center justify-between w-full mx-auto px-6 md:px-12 py-4 transition-all duration-500 ${
            scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Iotcom.io — Samvaad"
              width={180}
              height={80}
              className="object-contain"
              style={{ height: 'auto' }}
              priority
            />
            <span className="hidden sm:block text-sm font-bold text-black/70 tracking-widest uppercase border-l border-black/20 pl-3">
              Samvaad
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(l => (
              <a 
                key={l.label} 
                href={l.href} 
                className="text-sm font-bold text-black/65 hover:text-green-600 transition-all duration-300 tracking-widest uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="/demo" 
              className="group relative text-xs bg-green-500 text-white font-black px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] uppercase tracking-widest"
            >
              <span className="relative z-10">Book Demo</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
            </a>
          </div>

          {/* Hamburger */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-black/5 transition-all active:scale-95 hover:bg-black/10" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: '-100%' }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Background Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Close button inside mobile menu */}
            <button 
              className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center rounded-full bg-black/5 active:scale-95 transition-all"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <Link href="/" onClick={() => setOpen(false)}>
              <Image src="/images/logo.png" alt="Iotcom.io" width={160} height={48} className="object-contain mb-8" style={{ height: 'auto' }} />
            </Link>
            
            <div className="flex flex-col items-center gap-6 w-full px-10">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.label} 
                  href={l.href}
                  className="w-full text-center py-4 font-sans font-black text-3xl text-black tracking-tighter uppercase italic border-b border-black/5 active:bg-black/5 rounded-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <motion.a 
              href="/demo" 
              className="mt-4 bg-green-500 text-white font-black px-12 py-5 text-xl rounded-2xl uppercase tracking-widest shadow-xl shadow-green-500/30 active:scale-95 transition-all"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              onClick={() => setOpen(false)}
            >
              Book a Demo
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
