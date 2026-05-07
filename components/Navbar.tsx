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

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── DESKTOP NAVBAR (unchanged) ── */}
      <motion.nav className="fixed z-50 top-0 left-0 right-0 transition-all duration-500">
        <div
          className="flex items-center justify-between w-full mx-auto px-6 md:px-12 py-4 transition-all duration-500 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-bold text-black/65 hover:text-green-600 transition-all duration-300 tracking-widest uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/demo"
              className="group relative text-xs bg-green-500 text-white font-black px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] uppercase tracking-widest"
            >
              <span className="relative z-10">Book Demo</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
            </a>
          </div>

          {/* Hamburger — mobile only */}
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

      {/* ── MOBILE DRAWER (slides from left) ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 z-[70] h-full w-[80vw] max-w-[320px] bg-white flex flex-col md:hidden shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/6">
                <Link href="/" onClick={() => setOpen(false)}>
                  <Image
                    src="/images/logo.png"
                    alt="Iotcom.io"
                    width={120}
                    height={40}
                    className="object-contain"
                    style={{ height: 'auto' }}
                  />
                </Link>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, ease: 'easeOut' }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-black/70 hover:text-green-600 hover:bg-green-50 active:bg-green-100 transition-all tracking-wide uppercase"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              {/* Footer CTA */}
              <div className="px-6 py-6 border-t border-black/6">
                <motion.a
                  href="/demo"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-black text-sm px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-green-500/25 uppercase tracking-widest"
                >
                  Book a Demo
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
                <p className="text-center text-[10px] text-black/30 font-medium mt-3 tracking-widest uppercase">
                  AI Voice Platform · India
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
