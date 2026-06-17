'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LALAN_HAKKINDA = [
  { label: 'LALAN Grubu', href: '/lalan-hakkinda' },
  { label: 'Tarihçe', href: '/tarihce' },
  { label: 'Sürdürülebilirlik', href: '/surdurulebilirlik' },
  { label: 'Plantasyonlar', href: '/plantasyonlar' },
  { label: 'Sertifikalar', href: '/sertifikalar' },
  { label: 'Sunumlar & Kataloglar', href: '/sunumlar' },
];

export default function LalanNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const topLinks = [
    { label: 'Ürünler', href: '/products' },
    { label: 'Eldiven Bulucu', href: '/#glove-finder' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,15,46,0.96)' : 'rgba(0,10,30,0.35)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(172,199,255,0.08)' : 'none',
        height: scrolled ? '64px' : '80px',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.location.href = '/';
            }
          }}
        >
          <Image
            src="/logos/lalanmenalogo.svg"
            alt="Lalan Mena"
            width={scrolled ? 130 : 156}
            height={scrolled ? 44 : 52}
            className="object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {topLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-semibold transition-all duration-200 relative group"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: '#8ec63f' }} />
            </a>
          ))}

          {/* LALAN Hakkında dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
              style={{ color: dropdownOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)' }}
            >
              LALAN Hakkında
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-200"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 mt-3 py-2 rounded-2xl min-w-[200px]"
                style={{
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,15,46,0.97)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(172,199,255,0.1)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                }}
              >
                {LALAN_HAKKINDA.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-5 py-2.5 text-sm font-semibold transition-colors hover:text-white"
                    style={{ color: 'rgba(200,212,232,0.75)' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center gap-4">
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
          {topLinks.map(({ label, href }) => (
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
          <div className="pt-1 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(172,199,255,0.4)' }}>
              LALAN Hakkında
            </p>
            {LALAN_HAKKINDA.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold py-2 pl-3 transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center text-white text-sm font-bold px-5 py-3 rounded-lg mt-2"
            style={{ background: 'linear-gradient(135deg,#003608 0%,#004f11 100%)', border: '1px solid rgba(142,198,63,0.3)' }}
          >
            İletişime Geç
          </Link>
        </div>
      )}
    </nav>
  );
}
