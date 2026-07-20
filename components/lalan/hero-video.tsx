'use client';

import Link from 'next/link';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { useI18n, useLocalePath } from './i18n-provider';
import { CERTIFICATES } from '@/lib/certificates';

export default function HeroVideo() {
  const lp = useLocalePath();
  const { dict } = useI18n();
  const t = dict.home.hero;
  return (
    <section className="relative overflow-hidden">
      {/* ── Arka plan video ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#01060f',
          backgroundImage: 'url(/videos/lalan-our-people-poster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* preload="auto" DEĞİL: tarayıcıyı videoyu baştan sona indirmeye zorluyordu ve
            sayfanın geri kalanıyla bant genişliği yarışına giriyordu. "metadata" ile poster
            anında görünür, video akış hâlinde gelir. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/lalan-our-people-poster.jpg"
          className="h-full w-full object-cover"
          src="/videos/lalan-our-people.mp4"
        />
        {/* Kurumsal koyu degrade — metnin okunurluğu için */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,10,30,0.92) 0%, rgba(0,15,46,0.72) 45%, rgba(0,20,55,0.35) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(1,8,16,0.95) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* ── Hero içeriği ── */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pb-40 pt-32 md:px-8 lg:pt-40">
        <div className="max-w-2xl">
          <h1
            className="font-black leading-[1.05] tracking-[-0.03em] text-white"
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: 'clamp(2.8rem, 6vw, 5.25rem)',
              opacity: 0,
              animation: 'fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {t.titleLead} <span style={{ color: '#8ec63f' }}>{t.titleAccent}</span>
          </h1>

          <p
            className="mt-8 max-w-[52ch] text-lg leading-relaxed md:text-xl"
            style={{
              color: '#c8d4e8',
              opacity: 0,
              animation: 'fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {t.body}
          </p>

          <div
            className="mt-12 flex flex-wrap gap-4"
            style={{
              opacity: 0,
              animation: 'fadeUp 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            <Link
              href={lp("/products")}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)',
                boxShadow: '0 8px 24px rgba(0,79,17,0.45)',
                border: '1px solid rgba(142,198,63,0.3)',
              }}
            >
              {t.exploreProducts}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={lp("/eldiven-bulucu")}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'white',
                border: '1px solid rgba(172,199,255,0.2)',
              }}
            >
              {dict.nav.gloveFinder}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Kayan sertifika şeridi ── */}
      <div className="absolute bottom-0 left-0 z-10 w-full pb-8">
        <div className="group relative mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-center gap-4">
            <p
              className="text-center text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: 'rgba(172,199,255,0.6)' }}
            >
              {t.certsKicker}
            </p>
            <div className="relative w-full py-2">
              <InfiniteSlider duration={35} durationOnHover={70} gap={20}>
                {/* Liste BİR kez verilir: InfiniteSlider içeride {children}{children}
                    render edip yarı genişlik kadar kaydırarak döngüyü kendisi kuruyor.
                    Elle tekrarlamak yalnızca gereksiz DOM üretir.
                    Tam liste (12 sertifika) kullanılıyor — 6 logoyla geniş ekranda aynı
                    logo aynı anda iki kez görünüyordu. */}
                {CERTIFICATES.map((cert, i) => (
                  <div
                    key={`${cert.name}-${i}`}
                    className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5"
                    title={cert.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.img}
                      alt={cert.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </InfiniteSlider>

              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
