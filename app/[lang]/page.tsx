import Image from 'next/image';
import Link from 'next/link';
import LalanNav from '@/components/lalan/nav';
import HeroVideo from '@/components/lalan/hero-video';
import GloveFinderSection from '@/components/lalan/glove-finder-section';
import JourneyTimeline from '@/components/lalan/journey-timeline';
import SustainabilitySection from '@/components/lalan/sustainability';
import Counter from '@/components/lalan/counter';
import Reveal from '@/components/lalan/reveal';
import MouseSpotlight from '@/components/ui/mouse-spotlight';
import { GradientBackground } from '@/components/ui/gradient-background';
import { CelestialBloomContained, GlobePulse } from '@/components/ui/lazy-effects';
import { LALAN_MARKERS } from '@/lib/lalan-markers';
import { CERTIFICATES } from '@/lib/certificates';
import { CONTACT, telHref } from '@/lib/contact';
import { isLocale, localizedAlternates, localizePath, robotsFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';

// Başlık/açıklama app/[lang]/layout.tsx'ten miras alınır; burada yalnızca
// dil önekli canonical + hreflang tanımlanır.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    robots: robotsFor(lang),
    alternates: localizedAlternates(lang, '/'),
  };
}

// Palet: üst = koyu lacivert → alt = açık yeşil. Animasyon bu yönü korur.
const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
  'linear-gradient(to bottom, #020a12, #3c6618)',
  'linear-gradient(to bottom, #010710, #346014)',
];



export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const lp = (path: string) => localizePath(path, lang);
  const dict = await getDictionary(lang);
  const t = dict.home;

  const globalStats = [
    { end: t.figures.countries50, label: t.stats.exportCountries },
    { end: t.figures.facilities, label: t.stats.facilities },
    { end: t.figures.offices, label: t.stats.offices },
    { end: t.figures.gloves, label: t.stats.annualGloves },
  ];

  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      animationDelay={0}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      {/* Full-page mouse spotlight — fixed, covers entire scroll */}
      <MouseSpotlight />

      <LalanNav />

      <main id="main-content">

      {/* ── Kurumsal Tanıtım Videosu (arka plan hero) ── */}
      <HeroVideo />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Celestial Bloom shader over gradient */}
        <CelestialBloomContained className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(105deg, rgba(0,10,30,0.78) 0%, rgba(0,20,55,0.45) 55%, rgba(0,10,30,0.15) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-24 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Sol: Ürün tanıtımı */}
            <div style={{ opacity: 0, animation: 'fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) forwards' }}>
              <h2
                className="font-black text-white leading-[1.1] tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)' }}
              >
                NaturaFL™ 300-15BF
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 max-w-[46ch]" style={{ color: 'rgba(200,212,232,0.85)' }}>
                {t.featured.body}
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {t.featured.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={lp("/products/naturafl-300-15bf")}
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(172,199,255,0.2)' }}
              >
                {t.featured.viewProduct}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Sağ: Ürün videosu */}
            <div
              style={{ opacity: 0, animation: 'fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
              className="flex items-center justify-center"
            >
              <div
                className="relative rounded-2xl overflow-hidden w-full aspect-video max-h-[220px] lg:aspect-[9/16] lg:max-h-[520px] lg:max-w-[480px]"
                style={{
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(142,198,63,0.15)',
                  background: '#000d1f',
                }}
              >
                <video
                  src="/videos/naturafl-300-15bf.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    href={lp("/products/naturafl-300-15bf")}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:border-[rgba(142,198,63,0.4)]"
                    style={{ background: 'rgba(0,15,46,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(172,199,255,0.15)' }}
                  >
                    <div>
                      <div className="text-white font-bold text-xs">NaturaFL™ 300-15BF</div>
                      <div className="text-[10px]" style={{ color: '#8ec63f' }}>{t.featured.badge}</div>
                    </div>
                    <svg className="ml-auto flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.5)" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hero stats strip */}
          <div
            className="mt-16"
            style={{ opacity: 0, animation: 'fadeUp 0.9s 0.8s cubic-bezier(0.16,1,0.3,1) forwards' }}
          >
            <div
              className="flex flex-wrap rounded-t-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(172,199,255,0.08)', borderBottom: 'none' }}
            >
              {[
                { n: t.figures.years80, l: t.stats.experience },
                { n: t.figures.countries50, l: t.stats.exportCountries },
                { n: t.figures.employees, l: t.stats.employees },
                { n: t.figures.gloves, l: t.stats.annualGloves },
              ].map(({ n, l }, i) => (
                <div key={l} className="flex-1 min-w-[120px] px-6 py-4 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#acc7ff' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Hero → sonraki section geçiş fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
      </section>

      {/* ── Eldiven Bulucu ── */}
      <section id="glove-finder" className="relative section-fade" style={{ scrollMarginTop: '80px' }}>
        <GloveFinderSection />
      </section>


      {/* ── Sürdürülebilirlik (Aurora shader) ── */}
      <SustainabilitySection />

      {/* ── Küresel Varlık ── */}
      <section className="py-28 md:py-36 relative overflow-hidden section-fade">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Sol: Globe */}
            <Reveal direction="left">
              <div className="relative max-w-[540px] mx-auto lg:mx-0">
                {/* Glow halo */}
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(142,198,63,0.12) 0%, transparent 70%)', transform: 'scale(1.15)' }} />
                <GlobePulse
                  markers={LALAN_MARKERS}
                  speed={0.002}
                  className="w-full"
                />
              </div>
            </Reveal>

            {/* Sağ: Başlık + Stats + Lokasyonlar */}
            <Reveal direction="right">
              <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>
                {t.global.kicker}
              </div>
              <h2
                className="font-black text-white tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
              >
                {t.global.title}
              </h2>
              <p className="leading-relaxed mb-10" style={{ color: 'rgba(172,199,255,0.7)' }}>
                {t.global.body}
              </p>

              {/* Sayaçlar */}
              <div className="grid grid-cols-2 gap-5 mb-10">
                {globalStats.map(({ end, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.1)' }}
                  >
                    <Counter end={end} label={label} />
                  </div>
                ))}
              </div>

              {/* Lokasyon listesi */}
              <div className="space-y-2">
                {LALAN_MARKERS.map(m => {
                  const isHQ = m.id === 'lk';
                  const isUs = m.id === 'tr';
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.07)' }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: isHQ ? '#8ec63f' : isUs ? '#5c93d6' : 'rgba(172,199,255,0.4)' }}
                      />
                      <span className="text-sm font-medium" style={{ color: isHQ || isUs ? 'white' : 'rgba(172,199,255,0.7)' }}>
                        {m.label}
                      </span>
                      {isHQ && (
                        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(142,198,63,0.15)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.25)' }}>
                          Merkez
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Hakkımızda ── */}
      <section id="about" className="py-28 md:py-36 relative section-fade" style={{ scrollMarginTop: '80px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <Reveal direction="right">
              <h2 className="font-black text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
                Lalan
              </h2>
              <div className="text-sm font-bold uppercase tracking-[0.15em] mb-8" style={{ color: '#8ec63f' }}>{t.about.kicker}</div>
              <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.85)' }}>
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-10 mt-10" style={{ borderTop: '1px solid rgba(172,199,255,0.12)' }}>
                {[{ n: t.figures.years80, l: t.stats.years }, { n: t.figures.employees, l: t.stats.employees }, { n: t.figures.continents, l: t.stats.continents }].map(({ n, l }) => (
                  <div key={l}>
                    <span className="block text-white font-black text-2xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</span>
                    <span className="block text-xs font-bold uppercase tracking-wider mt-1" style={{ color: '#8ec63f' }}>{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href={lp("/lalan-hakkinda")}
                  className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-200 hover:gap-3"
                  style={{ color: '#8ec63f' }}
                >
                  {t.about.more}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Keşfet — plantasyon / sürdürülebilirlik / kalite yönlendirmeleri */}
          <Reveal className="mt-16 md:mt-20">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { href: '/plantasyonlar',    img: '/images/tarihce/journey-2003.jpg',      fit: 'center',     kicker: t.cards.rawMaterial, title: t.cards.plantationsTitle, desc: t.cards.plantationsDesc },
                { href: '/surdurulebilirlik', img: '/images/tarihce/journey-2009-2014.jpg', fit: 'center',     kicker: t.cards.environment, title: t.cards.sustainabilityTitle, desc: t.cards.sustainabilityDesc },
                { href: '/sertifikalar',      img: '/glove-industrial.jpg',                 fit: 'center 38%', kicker: t.cards.quality, title: t.cards.certificatesTitle, desc: t.cards.certificatesDesc },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{ border: '1px solid rgba(142,198,63,0.15)', background: '#0a1a2b' }}
                >
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: c.fit }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(1,8,20,0.96) 0%, rgba(1,8,20,0.72) 20%, rgba(1,8,20,0.12) 50%, transparent 72%)' }} />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: '#8ec63f' }}>{c.kicker}</div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-black text-white" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.2rem' }}>{c.title}</h3>
                      <svg className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'rgba(200,212,232,0.72)' }}>{c.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Özet yolculuk timeline'ı (tarihçe varyasyonu) */}
          <Reveal>
            <JourneyTimeline />
          </Reveal>

        </div>
      </section>

      {/* ── Sertifikalar ── */}
      <section id="certificates" className="py-28 md:py-36 relative section-fade">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-16">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>
              Kalite & Uyumluluk
            </div>
            <h2
              className="font-black text-white tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Sertifikalar
            </h2>
            <p className="leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
              Lalan Rubbers&apos;ın uluslararası kalite, güvenlik ve sürdürülebilirlik standartlarına bağlılığı bağımsız kuruluşlar tarafından belgelenmiştir.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {CERTIFICATES.map(cert => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.1)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center p-2 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.92)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cert.img} alt={cert.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold leading-snug" style={{ color: 'rgba(200,212,232,0.85)' }}>
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── İletişim ── */}
      <section id="contact" className="py-28 md:py-36 relative section-fade">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 text-center">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-6" style={{ color: '#8ec63f' }}>{t.contactCta.kicker}</div>
            <h2
              className="font-black text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {t.contactCta.title}
            </h2>
            <p className="text-lg leading-relaxed mb-10 max-w-[52ch] mx-auto" style={{ color: 'rgba(172,199,255,0.8)' }}>
              {t.contactCta.body}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)', boxShadow: '0 8px 24px rgba(0,79,17,0.45)', border: '1px solid rgba(142,198,63,0.3)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {CONTACT.email}
              </a>
              <Link
                href={lp("/iletisim")}
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(172,199,255,0.14)', color: 'rgba(232,237,245,0.9)' }}
              >
                {t.contactCta.allContactInfo}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(172,199,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/lalanmenalogo.svg" alt="Lalan Mena" width={120} height={40} className="object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(172,199,255,0.6)' }}>
              {dict.footer.tagline}
            </p>
          </div>
          {[
            {
              title: dict.footer.quickLinks,
              links: [
                { label: dict.common.backToProducts, href: '/products' },
                { label: dict.nav.items.plantations, href: '/plantasyonlar' },
                { label: dict.nav.items.sustainability, href: '/surdurulebilirlik' },
                { label: dict.nav.items.history, href: '/tarihce' },
                { label: dict.nav.items.certificates, href: '/sertifikalar' },
                { label: dict.nav.items.presentations, href: '/sunumlar' },
                { label: dict.nav.contact, href: '/iletisim' },
              ],
            },
            {
              title: dict.footer.products,
              links: [
                { label: dict.footer.categories.chemical, href: '/products/category/chemical' },
                { label: dict.footer.categories.disposable, href: '/products/category/disposable' },
                { label: dict.footer.categories.foodSafe, href: '/products/category/food-safe' },
                { label: dict.footer.categories.industrial, href: '/products/category/industrial' },
                { label: dict.footer.categories.household, href: '/products/category/household' },
                { label: dict.footer.categories.seamless, href: '/products/category/seamless' },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-5 text-sm">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(172,199,255,0.6)' }} href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm">{dict.footer.contact}</h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(172,199,255,0.75)' }}>
              {dict.footer.contactBlurb}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block text-sm font-bold mb-3 transition-colors hover:text-white"
              style={{ color: '#8ec63f' }}
            >
              {CONTACT.email}
            </a>
            {CONTACT.phone && (
              <a
                href={telHref(CONTACT.phone)}
                className="block text-sm font-bold mb-3 transition-colors hover:text-white"
                style={{ color: '#8ec63f' }}
              >
                {CONTACT.phone}
              </a>
            )}
            <Link
              href={lp("/iletisim")}
              className="inline-block text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(172,199,255,0.6)' }}
            >
              {dict.footer.allContactInfo}
            </Link>
          </div>
        </div>
        <div
          className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(172,199,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(172,199,255,0.7)' }}>{dict.footer.rights}</p>
          <a className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(172,199,255,0.7)' }} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </GradientBackground>
  );
}
