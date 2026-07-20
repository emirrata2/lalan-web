import Image from 'next/image';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import TimelineScrollLine from '@/components/lalan/timeline-scroll-line';
import { isLocale, localizedAlternates, robotsFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: lang === 'en' ? 'Our Journey | Lalan MENA' : 'Tarihçe | Lalan MENA',
    description: lang === 'en'
      ? 'Over eighty years in the rubber industry since 1940 — the Lalan Group timeline from founding to today.'
      : '1940\'tan bu yana kauçuk sektöründe seksen yılı aşkın bir yolculuk — Lalan Group\'un kuruluşundan bugüne zaman çizelgesi.',
    robots: robotsFor(lang),
    alternates: localizedAlternates(lang, '/tarihce'),
  };
}

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

// İstatistik renkleri (çeviri değil) — n/l dile göre sözlükten gelir, sıra korunur.
const STAT_COLORS = ['#8ec63f', '#5c93d6', '#8ec63f', '#5c93d6', '#8ec63f', '#5c93d6', '#8ec63f', '#5c93d6'];

// Kilometre taşı görselleri (çeviri değil) — sözlükteki milestones ile aynı sırada.
const MILESTONE_IMAGES = [
  '/images/tarihce/journey-1940.jpg',
  '/images/tarihce/journey-1956.jpg',
  'https://images.unsplash.com/photo-1670483109381-8bccb7d29383?auto=format&w=800&q=82',
  'https://images.unsplash.com/photo-1727517786578-ff2bb896b852?auto=format&w=800&q=82',
  '/images/tarihce/journey-1987.jpg',
  'https://images.unsplash.com/photo-1654703680007-d5d9699cddfd?auto=format&w=800&q=82',
  'https://images.unsplash.com/photo-1741183399189-642274083f48?auto=format&w=800&q=82',
  '/images/tarihce/journey-2003.jpg',
  '/images/tarihce/journey-2004-2009.jpg',
  '/images/tarihce/journey-2009-2014.jpg',
  '/images/tarihce/journey-2015-present.jpg',
];



export default async function TarihcePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = (await getDictionary(lang)).history;
  const KEY_STATS = t.stats.map((s, i) => ({ ...s, color: STAT_COLORS[i] }));
  const MILESTONES = t.milestones.map((m, i) => ({ ...m, highlight: true, img: MILESTONE_IMAGES[i] }));
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-36 pb-32">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <Image
                src="/logos/lalan-group-logo.png"
                alt="Lalan Group"
                width={120}
                height={40}
                className="object-contain"
                style={{ height: '30px', width: 'auto' }}
              />
            </div>
            <div className="h-5 w-px" style={{ background: 'rgba(172,199,255,0.15)' }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8ec63f' }}>
              {t.badge}
            </p>
          </div>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            {t.titleLead}<br />
            <span style={{ color: '#8ec63f' }}>{t.titleAccent}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            {t.intro}
          </p>
        </div>

        {/* Key stats */}
        <div
          className="rounded-3xl p-8 mb-24 relative overflow-hidden"
          style={{ background: 'rgba(0,20,50,0.75)', border: '1px solid rgba(92,147,214,0.15)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(142,198,63,0.07) 0%, transparent 70%)' }}
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-7 relative" style={{ color: 'rgba(172,199,255,0.4)' }}>
            {t.statsTitle}
          </p>
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-7">
            {KEY_STATS.map(({ n, l, color }) => (
              <div key={l}>
                <div
                  className="font-black mb-1.5 leading-none"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color }}
                >
                  {n}
                </div>
                <div
                  className="text-[10px] font-bold uppercase tracking-wider whitespace-pre-line leading-snug"
                  style={{ color: 'rgba(172,199,255,0.45)' }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2
            className="font-black text-white mb-14 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
          >
            {t.timelineTitle}
          </h2>

          <TimelineScrollLine>
          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              m.highlight && m.img ? (
                /* Visual card for highlighted milestones */
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(142,198,63,0.05)',
                    border: '1px solid rgba(142,198,63,0.18)',
                  }}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden md:[direction:ltr]" style={{ minHeight: '260px' }}>
                      <Image
                        src={m.img}
                        alt={m.imgAlt ?? m.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: i % 2 === 0
                            ? 'linear-gradient(to right, transparent 60%, rgba(0,15,46,0.85))'
                            : 'linear-gradient(to left, transparent 60%, rgba(0,15,46,0.85))',
                        }}
                      />
                      {/* Year badge on image */}
                      <div className="absolute top-5 left-5 md:[direction:ltr]">
                        <span
                          className="font-black text-2xl tabular-nums px-4 py-2 rounded-xl"
                          style={{
                            fontFamily: 'var(--font-manrope), sans-serif',
                            background: 'rgba(0,8,28,0.8)',
                            color: '#8ec63f',
                            border: '1px solid rgba(142,198,63,0.3)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {m.year}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="p-8 md:p-10 flex flex-col justify-center md:[direction:ltr]">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 block"
                        style={{ color: '#8ec63f' }}
                      >
                        {t.featured}
                      </span>
                      <h3
                        className="font-black text-white mb-4 leading-tight"
                        style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.75)' }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ) : m.highlight ? (
                /* Highlighted card without image */
                <div
                  key={i}
                  className="rounded-2xl p-6 sm:p-8"
                  style={{ background: 'rgba(142,198,63,0.06)', border: '1px solid rgba(142,198,63,0.2)' }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-black tabular-nums flex-shrink-0 mt-0.5"
                      style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.6rem', color: '#8ec63f' }}
                    >
                      {m.year}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular card */
                <div
                  key={i}
                  className="rounded-xl p-5 sm:p-6 flex items-start gap-5"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(172,199,255,0.07)' }}
                >
                  <span
                    className="font-black tabular-nums flex-shrink-0 mt-0.5 w-24 text-right hidden sm:block"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.1rem', color: 'rgba(172,199,255,0.4)' }}
                  >
                    {m.year}
                  </span>
                  <div className="sm:pl-2" style={{ borderLeft: '1px solid rgba(172,199,255,0.12)', paddingLeft: '1.25rem' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 sm:hidden" style={{ color: 'rgba(172,199,255,0.4)' }}>{m.year}</p>
                    <h3 className="font-bold text-white text-sm mb-1.5" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                      {m.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,212,232,0.6)' }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            ))}
          </div>
          </TimelineScrollLine>
        </div>

      </main>
    </GradientBackground>
  );
}
