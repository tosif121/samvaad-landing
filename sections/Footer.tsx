'use client';
import Image from 'next/image';
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from '../lib/constants';

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={label}
    className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center text-black/40 hover:text-green-600 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300"
  >
    {children}
  </a>
);

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#F4F4F4] px-6 md:px-12 pt-24 pb-12 overflow-hidden border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="mb-8">
              <Image src="/images/logo.png" alt="Iotcom.io" width={180} height={54} className="object-contain" />
            </div>
            <p className="text-black/55 text-sm leading-relaxed mb-6 max-w-sm font-medium">
              Samvaad is a high-performance AI Voice Workforce built by Iotcom.io. We help businesses never miss a lead again with human-like, 24/7 automated calling.
            </p>
            
            <div className="flex flex-col gap-3 mb-8">
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-black font-bold hover:text-green-600 transition-colors">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {SITE.phone}
              </a>
              <a href={SITE.url} target="_blank" rel="noopener noreferrer" className="text-black/55 text-sm hover:text-black transition-colors">
                {SITE.url}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialIcon href={SOCIAL_LINKS.facebook} label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.whatsapp} label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).filter(([cat]) => cat !== 'Connect').map(([category, links]) => (
            <div key={category} className="col-span-1">
              <p className="text-black text-[10px] tracking-[0.2em] uppercase font-black mb-6">{category}</p>
              <ul className="flex flex-col gap-4">
                {(links as { label: string; href: string }[]).map(link => (
                  <li key={link.label}>
                    <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-black/55 text-sm font-medium hover:text-black transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-black/10 pt-10 gap-6">
          <p className="text-black/40 text-xs text-center sm:text-left font-medium">
            © 2026 Samvaad by <a href={SITE.url} className="text-orange-500 font-bold hover:underline">Iotcom.io</a> · Jaipur, India 🇮🇳
          </p>
          <button 
            onClick={scrollTop} 
            className="group flex items-center gap-3 text-black/55 text-xs font-bold uppercase tracking-widest hover:text-black transition-all duration-300"
          >
            <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-all">↑</span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
