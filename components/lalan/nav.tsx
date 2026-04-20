'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LalanNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Ürünler', href: '#products' },
    { label: 'Sürdürülebilirlik', href: '#sustainability' },
    { label: 'Hakkımızda', href: '#about' },
    { label: 'İletişim', href: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0,15,46,0.96)'
          : 'rgba(0,10,30,0.35)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: scrolled
          ? '0 2px 32px rgba(0,0,0,0.4)'
          : 'none',
        borderBottom: scrolled ? '1px solid rgba(172,199,255,0.08)' : 'none',
        height: scrolled ? '64px' : '80px',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 md:px-8">

        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/logos/lalan-group-logo.png"
            alt="Lalan Group"
            width={scrolled ? 100 : 120}
            height={scrolled ? 36 : 44}
            className="object-contain transition-all duration-300"
            style={{ filter: 'brightness(0) invert(1)' }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-semibold transition-all duration-200 relative group"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: '#72c26e' }} />
            </a>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-px active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #003608 0%, #004f11 100%)',
              border: '1px solid rgba(114,194,110,0.3)',
              boxShadow: '0 4px 16px rgba(0,79,17,0.35)',
            }}
          >
            Teklif Al
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          {/* Mobile burger */}
          <button
            className="md:hidden p-2"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-3"
          style={{ background: 'rgba(0,15,46,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(172,199,255,0.08)' }}
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold py-2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="block text-center text-white text-sm font-bold px-5 py-3 rounded-lg mt-2"
            style={{ background: 'linear-gradient(135deg,#003608 0%,#004f11 100%)', border: '1px solid rgba(114,194,110,0.3)' }}
          >
            Teklif Al
          </a>
        </div>
      )}
    </nav>
  );
}
