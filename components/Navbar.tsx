'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS } from '../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* FIXED OUTER SHELL */}
      <div
        style={{ position: 'fixed', zIndex: 999 }}
        className={`left-0 right-0 w-full flex justify-center will-change-transform pointer-events-none transition-all duration-500 ${scrolled ? 'top-0 lg:top-[36px]' : 'top-0'}`}
      >
        {/* WIDTH CONSTRAINT */}
        <div className={`pointer-events-auto transition-all duration-500 ${scrolled ? 'w-full lg:max-w-7xl lg:mx-auto px-0 lg:px-8' : 'w-full'}`}>
          {/* GLASS BAR */}
          <div
            className={`relative h-16 lg:h-20 flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? 'px-4 lg:px-8 lg:rounded-2xl border border-white/10 bg-white/75 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.10)]'
                : 'px-6 lg:px-12 border-b border-black/5 bg-white/40 backdrop-blur-xl backdrop-saturate-100'
            }`}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Iotcom.io — Samvaad"
                width={180}
                height={80}
                className="object-contain w-[150px]"
                style={{ height: 'auto' }}
                priority
              />
              <span className="hidden sm:block text-xs font-black text-black/50 tracking-[0.22em] uppercase border-l border-black/15 pl-3">
                Samvaad
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[11px] font-black text-black/55 hover:text-green-600 transition-all duration-200 tracking-[0.18em] uppercase"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA + HAMBURGER */}
            <div className="flex items-center gap-3">
              <a
                href="/demo"
                className="hidden md:inline-flex group relative items-center text-[11px] bg-green-500 text-white font-black px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.40)] tracking-[0.18em] uppercase"
              >
                <span className="relative z-10">Book Demo</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
              </a>

              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-all active:scale-95"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <div className="w-5 flex flex-col gap-[5px]">
                  <span
                    className={`block h-[2px] bg-black rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
                  />
                  <span
                    className={`block h-[2px] bg-black rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`}
                  />
                  <span
                    className={`block h-[2px] bg-black rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center gap-8 px-8"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            {/* Close */}
            <button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" onClick={() => setOpen(false)} className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Iotcom.io"
                width={140}
                height={48}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </Link>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-1 w-full">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="w-full text-center py-4 font-black text-[28px] text-black tracking-tighter uppercase italic border-b border-black/5 active:bg-black/5 rounded-xl transition-all"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.08, ease: 'easeOut' }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/demo"
              className="mt-2 bg-green-500 text-white font-black px-10 py-4 text-lg rounded-2xl uppercase tracking-widest shadow-lg shadow-green-500/25 active:scale-95 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => setOpen(false)}
            >
              Book a Demo
            </motion.a>

            <motion.p
              className="text-[10px] text-black/30 tracking-[0.2em] uppercase font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI Voice Platform · India
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
