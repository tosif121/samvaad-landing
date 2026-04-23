'use client';
import { FOOTER_LINKS, SITE } from '../lib/constants';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#050508] px-6 md:px-12 pt-16 pb-8">
      <div
        className="border-t mb-12"
        style={{ borderImage: 'linear-gradient(to right, rgba(0,255,209,0.3), transparent, rgba(0,255,209,0.3)) 1' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand & Contact */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#fff', letterSpacing: 2 }}>SAMWAD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1]" />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#fff', letterSpacing: 2 }}>BOT</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed">
                AI Voice Bot for Business.<br />Built by Iotcom.io — India.
              </p>
            </div>

            <div>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Get In Touch</p>
              <div className="flex flex-col gap-2">
                <p className="text-white/30 text-xs leading-relaxed max-w-[200px]">
                  {SITE.address}
                </p>
                <a href={`mailto:${SITE.email}`} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                  {SITE.email}
                </a>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-[#00FFD1]/60 text-xs hover:text-[#00FFD1] transition-colors font-mono">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-4">{category}</p>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-white/30 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 gap-4">
          <p className="text-white/20 text-xs text-center sm:text-left">
            © 2026 SamwadBot by Iotcom.io · Built in India 🇮🇳 · Powered by Gemini AI
          </p>
          <button onClick={scrollTop} className="text-white/30 text-xs hover:text-white transition-colors duration-200 flex items-center gap-2">
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
