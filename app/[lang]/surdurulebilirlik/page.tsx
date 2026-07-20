import Image from 'next/image';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
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
    title: lang === 'en' ? 'Sustainability | Lalan MENA' : 'Sürdürülebilirlik | Lalan MENA',
    description: lang === 'en'
      ? 'Lalan Group\'s FSC-certified plantations, zero deforestation policy and environmental responsibility commitment.'
      : 'Lalan Group\'un FSC sertifikalı plantasyonları, sıfır orman kaybı politikası ve çevresel sorumluluk taahhüdü.',
    robots: robotsFor(lang),
    alternates: localizedAlternates(lang, '/surdurulebilirlik'),
  };
}

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

const PILLAR_ICONS = [
    (<svg key={0} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.5A1 1 0 003 21h1a10.97 10.97 0 0021-4.5C25 7 17 8 17 8z"/>
      </svg>),
    (<svg key={1} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>),
    (<svg key={2} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>),
    (<svg key={3} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>),
    (<svg key={4} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>),
    (<svg key={5} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>),
];

export default async function SurdurulebilirlikPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = (await getDictionary(lang)).sustainabilityPage;
  const PILLARS = t.pillars.map((pl, i) => ({ ...pl, icon: PILLAR_ICONS[i] }));
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main id="main-content" className="max-w-7xl mx-auto px-6 md:px-8 pt-36 pb-32">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <Image src="/logos/lalan-group-logo.png" alt="Lalan Group" width={120} height={40} className="object-contain" style={{ height: '30px', width: 'auto' }} />
            </div>
            <div className="h-5 w-px" style={{ background: 'rgba(172,199,255,0.15)' }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8ec63f' }}>
              {t.kicker}
            </p>
          </div>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            {t.titleLead}{' '}
            <span style={{ color: '#8ec63f' }}>{t.titleAccent}</span> {t.titleTail}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            {t.intro}
          </p>
        </div>

        {/* Hero stat banner */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
          style={{ background: 'rgba(0,40,12,0.6)', border: '1px solid rgba(142,198,63,0.2)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(142,198,63,0.08) 0%, transparent 70%)' }} />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.bannerStats.map(({ n, l }) => (
              <div key={l}>
                <div className="font-black text-white mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>{n}</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(142,198,63,0.8)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars grid */}
        <div className="mb-20">
          <h2
            className="font-black text-white mb-10 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            {t.pillarsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(142,198,63,0.1)' }}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 leading-snug" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.65)' }}>
                    {p.desc}
                  </p>
                </div>
                {p.stat && (
                  <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(172,199,255,0.08)' }}>
                    <span className="font-black text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif', color: '#8ec63f' }}>{p.stat}</span>
                    <span className="text-xs font-bold uppercase tracking-widest ml-2" style={{ color: 'rgba(172,199,255,0.45)' }}>{p.statLabel}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FSC deep dive */}
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{ background: 'rgba(0,8,28,0.6)', border: '1px solid rgba(172,199,255,0.08)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#8ec63f' }}>{t.fscKicker}</div>
              <h2
                className="font-black text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                {t.fscTitle}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
                <p>
                  {t.fscP1}
                </p>
                <p>
                  {t.fscP2}
                </p>
                <p>
                  {t.fscP3}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {t.fscFacts.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl"
                  style={{ background: 'rgba(142,198,63,0.06)', border: '1px solid rgba(142,198,63,0.15)' }}
                >
                  <div className="font-black text-white text-lg mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(172,199,255,0.5)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </GradientBackground>
  );
}
