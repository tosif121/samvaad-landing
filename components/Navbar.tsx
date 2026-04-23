'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300"
        animate={scrolled ? { backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderBottom: '1px solid rgba(255,255,255,0)' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">SAMWAD</span>
          <span className="w-2 h-2 rounded-full bg-[#00FFD1] mt-1" />
          <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">BOT</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/demo" className="text-sm bg-[#00FFD1] text-black font-semibold px-4 py-2 hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] transition-all duration-200">
            Book a Demo
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-px bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-px bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label} href={l.href}
                className="font-['Bebas_Neue'] text-6xl text-white tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a href="/demo" className="mt-4 bg-[#00FFD1] text-black font-bold px-8 py-3 text-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Book a Demo
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
