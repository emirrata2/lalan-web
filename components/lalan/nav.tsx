'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n, useLocalePath } from './i18n-provider';
import { LOCALES, LOCALE_SHORT, LOCALE_LABELS, localizePath, stripLocale } from '@/lib/i18n';

export default function LalanNav() {
  const { lang, dict } = useI18n();
  const lp = useLocalePath();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

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

  // Escape ile kapat. Klavye kullanıcısı için tek çıkış yolu bu — dışarı tıklamak
  // fare gerektirir, dolayısıyla tek başına yeterli değil.
  // Kapanınca odak tetikleyiciye döner, yoksa odak sayfanın başına düşer.
  useEffect(() => {
    if (!dropdownOpen && !menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (dropdownOpen) {
        setDropdownOpen(false);
        dropdownTriggerRef.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dropdownOpen, menuOpen]);

  const LALAN_HAKKINDA = [
    { label: dict.nav.items.lalan, href: '/lalan-hakkinda' },
    { label: dict.nav.items.history, href: '/tarihce' },
    { label: dict.nav.items.sustainability, href: '/surdurulebilirlik' },
    { label: dict.nav.items.plantations, href: '/plantasyonlar' },
    { label: dict.nav.items.certificates, href: '/sertifikalar' },
    { label: dict.nav.items.presentations, href: '/sunumlar' },
  ];

  const topLinks = [
    { label: dict.nav.products, href: '/products' },
  ];

  // Dil değiştirici: kullanıcıyı ana sayfaya atmadan, bulunduğu sayfanın
  // diğer dildeki karşılığına götürür.
  const currentPathNoLocale = stripLocale(pathname);

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
          href={lp('/')}
          className="flex-shrink-0"
          onClick={(e) => {
            if (window.location.pathname === lp('/')) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Link
              key={label}
              href={lp(href)}
              className="text-sm font-semibold transition-all duration-200 relative group"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: '#8ec63f' }} />
            </Link>
          ))}

          {/* Eldiven Bulucu — doğrudan sayfaya git */}
          <Link
            href={lp('/eldiven-bulucu')}
            className="text-sm font-semibold transition-all duration-200 relative group"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            {dict.nav.gloveFinder}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: '#8ec63f' }} />
          </Link>

          {/* LALAN Hakkında dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={dropdownTriggerRef}
              onClick={() => setDropdownOpen(v => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-controls="lalan-hakkinda-menu"
              className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
              style={{ color: dropdownOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)' }}
            >
              {dict.nav.aboutLalan}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-200"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                id="lalan-hakkinda-menu"
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
                    key={href}
                    href={lp(href)}
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

          {/* İletişim */}
          <Link
            href={lp('/iletisim')}
            className="text-sm font-semibold transition-all duration-200 relative group"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            {dict.nav.contact}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: '#8ec63f' }} />
          </Link>

          {/* Dil değiştirici — bulunulan sayfanın diğer dildeki karşılığına gider */}
          <div className="flex items-center gap-1" role="group" aria-label={dict.nav.language}>
            {LOCALES.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-1" style={{ color: 'rgba(172,199,255,0.25)' }}>
                    /
                  </span>
                )}
                <Link
                  href={localizePath(currentPathNoLocale, l)}
                  hrefLang={l}
                  aria-current={l === lang ? 'true' : undefined}
                  aria-label={LOCALE_LABELS[l]}
                  className="text-xs font-bold transition-colors duration-200"
                  style={{
                    color: l === lang ? '#8ec63f' : 'rgba(255,255,255,0.5)',
                    cursor: l === lang ? 'default' : 'pointer',
                  }}
                >
                  {LOCALE_SHORT[l]}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center gap-4">
          {/* Mobile burger */}
          <button
            ref={menuTriggerRef}
            className="md:hidden p-2"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobil-menu"
          >
            <div className="w-5 space-y-1" aria-hidden="true">
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
          id="mobil-menu"
          className="md:hidden px-6 py-4 space-y-3"
          style={{ background: 'rgba(0,15,46,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(172,199,255,0.08)' }}
        >
          {topLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={lp(href)}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold py-2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href={lp('/eldiven-bulucu')}
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-semibold py-2 transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {dict.nav.gloveFinder}
          </Link>
          <div className="pt-1 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(172,199,255,0.4)' }}>
              {dict.nav.aboutLalan}
            </p>
            {LALAN_HAKKINDA.map(({ label, href }) => (
              <Link
                key={href}
                href={lp(href)}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold py-2 pl-3 transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Dil değiştirici (mobil) */}
          <div className="pt-2 pb-1 flex items-center gap-3" role="group" aria-label={dict.nav.language}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(172,199,255,0.4)' }}>
              {dict.nav.language}
            </span>
            {LOCALES.map(l => (
              <Link
                key={l}
                href={localizePath(currentPathNoLocale, l)}
                hrefLang={l}
                onClick={() => setMenuOpen(false)}
                aria-current={l === lang ? 'true' : undefined}
                aria-label={LOCALE_LABELS[l]}
                className="text-sm font-bold transition-colors"
                style={{ color: l === lang ? '#8ec63f' : 'rgba(255,255,255,0.55)' }}
              >
                {LOCALE_SHORT[l]}
              </Link>
            ))}
          </div>

          <Link
            href={lp('/iletisim')}
            onClick={() => setMenuOpen(false)}
            className="block text-center text-white text-sm font-bold px-5 py-3 rounded-lg mt-2"
            style={{ background: 'linear-gradient(135deg,#003608 0%,#004f11 100%)', border: '1px solid rgba(142,198,63,0.3)' }}
          >
            {dict.common.getInTouch}
          </Link>
        </div>
      )}
    </nav>
  );
}
