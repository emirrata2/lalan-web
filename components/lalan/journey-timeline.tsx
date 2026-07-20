'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useLocalePath } from './i18n-provider';

// Ana sayfa "Lalan Hakkında" için özet yolculuk — /tarihce'deki dikey
// animasyonlu timeline'ın yatay, kısaltılmış varyasyonu. Aynı yeşil→mavi
// çizgi motifi, scroll ile soldan sağa çizilerek beliriyor.
type Beat = { year: string; title: string; desc: string };

const BEATS: Beat[] = [
  { year: '1940',  title: 'Kuruluş',           desc: 'Sri Lanka\'da bir kauçuk ticaret masasıyla yolculuk başlar.' },
  { year: '1987',  title: 'Lalan Rubbers',     desc: 'Warakapola\'da ilk kauçuk eldiven üretim tesisi kurulur.' },
  { year: '2003',  title: 'Dikey Entegrasyon', desc: '17.000 dönümü aşan plantasyonlarla hammadde kontrol altına alınır.' },
  { year: 'Bugün', title: 'Küresel Lider',     desc: 'Dört kıtada, yılda 2 milyarı aşkın eldiven üretim kapasitesi.' },
];

export default function JourneyTimeline() {
  const lp = useLocalePath();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-24 md:mt-28 pt-14 md:pt-16" style={{ borderTop: '1px solid rgba(172,199,255,0.1)' }}>
      {/* Başlık satırı */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#8ec63f' }}>
            1940 — Günümüz
          </div>
          <h3
            className="font-black tracking-tight text-white"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
          >
            Köklerimizden Bugüne
          </h3>
        </div>
        <Link
          href={lp("/tarihce")}
          className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
          style={{ color: '#8ec63f' }}
        >
          Tüm Tarihçe
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Yolculuk */}
      <div className="relative">
        {/* Mobil: dikey ray */}
        <div
          className="absolute left-[9px] top-2 bottom-2 w-px md:hidden"
          style={{ background: 'linear-gradient(to bottom, #8ec63f, #72c26e 55%, #5c93d6)' }}
        />
        {/* Masaüstü: yatay ray (soluk zemin) */}
        <div
          className="absolute hidden h-[2px] md:block"
          style={{ left: '12.5%', right: '12.5%', top: '9px', background: 'rgba(172,199,255,0.1)' }}
        />
        {/* Masaüstü: soldan sağa çizilen renkli çizgi */}
        <div
          className="absolute hidden h-[2px] origin-left md:block"
          style={{
            left: '12.5%',
            right: '12.5%',
            top: '9px',
            background: 'linear-gradient(90deg, #8ec63f, #72c26e 55%, #5c93d6)',
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        />

        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {BEATS.map((b, i) => (
            <div
              key={b.year}
              className="relative pl-9 md:pl-0 md:pt-12 md:text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`,
              }}
            >
              {/* Düğüm noktası */}
              <span
                className="absolute left-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full md:left-1/2 md:-translate-x-1/2"
                style={{ background: '#02131f', border: '1px solid rgba(142,198,63,0.5)' }}
              >
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ background: '#8ec63f', boxShadow: '0 0 10px rgba(142,198,63,0.85)' }}
                />
              </span>

              <div
                className="font-black leading-none tabular-nums"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.5rem', color: '#8ec63f' }}
              >
                {b.year}
              </div>
              <div className="mt-2 text-sm font-bold text-white" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                {b.title}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed md:mx-auto md:max-w-[22ch]" style={{ color: 'rgba(200,212,232,0.6)' }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
