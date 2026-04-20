import LalanNav from '@/components/lalan/nav';
import SustainabilitySection from '@/components/lalan/sustainability';
import Counter from '@/components/lalan/counter';
import Reveal from '@/components/lalan/reveal';
import ContactForm from '@/components/lalan/contact-form';
import CelestialBloomContained from '@/components/ui/celestial-bloom-contained';
import { GradientBackground } from '@/components/ui/gradient-background';
import ProductsCatalog from '@/components/lalan/products-catalog';
import { GlobePulse } from '@/components/ui/cobe-globe-pulse';
import { LALAN_MARKERS } from '@/lib/lalan-markers';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const DARK_GRADIENTS = [
  'linear-gradient(160deg, #000f2e 0%, #002c62 50%, #001a08 100%)',
  'linear-gradient(160deg, #001a08 0%, #003885 50%, #000f2e 100%)',
  'linear-gradient(160deg, #000f2e 0%, #004f11 45%, #001233 100%)',
  'linear-gradient(160deg, #001233 0%, #002c62 50%, #001a08 100%)',
  'linear-gradient(160deg, #000f2e 0%, #002c62 50%, #001a08 100%)',
];


const globalStats = [
  { end: '75+', label: 'İhracat Ülkesi' },
  { end: '12', label: 'Üretim Tesisi' },
  { end: '5', label: 'Küresel Ofis' },
  { end: '1B+', label: 'Yıllık Eldiven' },
];

export default function Home() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={14}
      animationDelay={0}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Celestial Bloom shader over gradient */}
        <CelestialBloomContained className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(105deg, rgba(0,10,30,0.78) 0%, rgba(0,20,55,0.45) 55%, rgba(0,10,30,0.15) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-24 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Sol: Metin */}
            <div>
              <div style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-8"
                  style={{ background: 'rgba(0,79,17,0.85)', color: '#72c26e', border: '1px solid rgba(163,246,156,0.25)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72c26e] animate-pulse inline-block" />
                  1940'tan Bu Yana Öncülük
                </span>
              </div>

              <h1
                className="font-black text-white leading-[1.05] tracking-[-0.03em] mb-8"
                style={{
                  fontFamily: 'var(--font-manrope), sans-serif',
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  opacity: 0,
                  animation: 'fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
                }}
              >
                Endüstrinin{' '}
                <span style={{ color: '#72c26e' }}>Simyageri</span>
              </h1>

              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-[50ch]"
                style={{
                  color: '#c8d4e8',
                  opacity: 0,
                  animation: 'fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
                }}
              >
                Sürdürülebilir kauçuk çözümlerinde lider. Plantasyondan
                hassas mühendislik ürünlerine, küresel kauçuk tedarik zincirini
                yeniden tanımlıyoruz.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{ opacity: 0, animation: 'fadeUp 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) forwards' }}
              >
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)', boxShadow: '0 8px 24px rgba(0,79,17,0.45)', border: '1px solid rgba(114,194,110,0.3)' }}
                >
                  Ürünleri Keşfet
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-lg text-base text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  Hikayemiz
                </a>
              </div>
            </div>

            {/* Sağ: Ürün videosu */}
            <div
              style={{ opacity: 0, animation: 'fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
              className="hidden lg:flex items-center justify-center"
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  aspectRatio: '9/16',
                  maxHeight: '520px',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(114,194,110,0.15)',
                  background: '#000d1f',
                }}
              >
                <video
                  src="/videos/naturasl.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(0,15,46,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(172,199,255,0.15)' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,194,110,0.2)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#72c26e" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs">NaturaSL™ 300-11BF</div>
                      <div className="text-[10px]" style={{ color: '#72c26e' }}>Genel Kullanım Eldiveni</div>
                    </div>
                  </div>
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
                { n: '80+', l: 'Yıllık Yenilik' },
                { n: '75+', l: 'İhracat Ülkesi' },
                { n: '15k+', l: 'Küresel Çalışan' },
                { n: '1B+', l: 'Yıllık Eldiven' },
              ].map(({ n, l }, i) => (
                <div key={l} className="flex-1 min-w-[120px] px-6 py-4 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#acc7ff' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scroll Showcase ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
        <div className="relative z-10">
          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-6"
                  style={{ background: 'rgba(0,79,17,0.85)', color: '#72c26e', border: '1px solid rgba(163,246,156,0.25)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72c26e] animate-pulse inline-block" />
                  Üretimden Elinize
                </span>
                <h2
                  className="font-black text-white leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  Her Ortam İçin{' '}
                  <span style={{ color: '#72c26e' }}>Mükemmel Koruma</span>
                </h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
                  Kauçuk plantasyonlarından ileri üretim tesislerimize — 30'dan fazla model, her sektöre özel.
                </p>
              </div>
            }
          >
            {/* Product showcase grid */}
            <div className="h-full w-full flex flex-col gap-2 md:gap-3 p-2 md:p-3 overflow-hidden" style={{ background: '#000d1f' }}>

              {/* Top: use-case banner */}
              <div className="rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0" style={{ height: '38%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/kolaj.png"
                  alt="Lalan eldiven kullanım sahneleri"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom: 5 product cards */}
              <div className="grid grid-cols-5 gap-2 md:gap-3 flex-1 min-h-0">
                {[
                  { src: '/products/industrial/nitrofl-330-15sd.jpg',   label: 'NitroFL™',       sub: 'Endüstriyel' },
                  { src: '/products/neo/neo-armor-ultra.jpg',           label: 'NEO ARMOR',      sub: 'Neo Serisi'  },
                  { src: '/products/industrial/duonpfl-330-24sd.jpg',   label: 'DUONPFL™',       sub: 'Kimyasal'    },
                  { src: '/products/neo/neo-classic-044-f38.jpg',       label: 'NEO CLASSIC',    sub: 'Neo Serisi'  },
                  { src: '/products/industrial/naturafl-300-11bf.jpg',  label: 'NaturaFL™',      sub: 'Lateks'      },
                ].map(({ src, label, sub }) => (
                  <div
                    key={src}
                    className="rounded-xl md:rounded-2xl flex flex-col overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex-1 flex items-center justify-center p-1 md:p-2 min-h-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={label}
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: 'lighten' }}
                      />
                    </div>
                    <div className="px-1.5 pb-1.5 md:px-2 md:pb-2 hidden sm:block">
                      <div className="text-white font-black truncate" style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(7px, 1vw, 11px)' }}>
                        {label}
                      </div>
                      <div className="truncate font-medium" style={{ color: '#72c26e', fontSize: 'clamp(6px, 0.8vw, 9px)' }}>
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* ── Ürünler & Eldiven Bulucu ── */}
      <section id="products" className="py-28 md:py-36 relative">
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#72c26e' }}>Ürünlerimiz</div>
            <h2
              className="font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Tüm Ürün Kataloğu
            </h2>
            <p className="max-w-[56ch] mt-4 leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
              30'dan fazla eldiven modeli — endüstriyel, ev tipi ve tek kullanımlık kategorilerde. Eldiven Bulucu ile size özel modeli saniyeler içinde bulun.
            </p>
          </Reveal>
          <ProductsCatalog />
        </div>
      </section>

      {/* ── Sürdürülebilirlik (Aurora shader) ── */}
      <SustainabilitySection />

      {/* ── Küresel Varlık ── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Sol: Globe */}
            <Reveal direction="left">
              <div className="relative max-w-[540px] mx-auto lg:mx-0">
                {/* Glow halo */}
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(114,194,110,0.12) 0%, transparent 70%)', transform: 'scale(1.15)' }} />
                <GlobePulse
                  markers={LALAN_MARKERS}
                  speed={0.002}
                  className="w-full"
                />
              </div>
            </Reveal>

            {/* Sağ: Başlık + Stats + Lokasyonlar */}
            <Reveal direction="right">
              <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#72c26e' }}>
                Dünya Genelinde
              </div>
              <h2
                className="font-black text-white tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
              >
                Küresel Varlık
              </h2>
              <p className="leading-relaxed mb-10" style={{ color: 'rgba(172,199,255,0.7)' }}>
                Sri Lanka merkezimizden Avrupa, ABD ve Asya'daki ofislerimize kadar 75'ten fazla ülkeye ihracat yapıyoruz.
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
                {LALAN_MARKERS.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.07)' }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.id === 'lk' ? '#72c26e' : 'rgba(172,199,255,0.5)' }} />
                    <span className="text-sm font-medium" style={{ color: m.id === 'lk' ? 'white' : 'rgba(172,199,255,0.7)' }}>
                      {m.label}
                    </span>
                    {m.id === 'lk' && (
                      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(114,194,110,0.15)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.25)' }}>
                        Merkez
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Hakkımızda ── */}
      <section id="about" className="py-28 md:py-36 relative">
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <Reveal className="md:col-span-5 relative" direction="left">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.5)', border: '1px solid rgba(114,194,110,0.15)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kauçuk plantasyonu"
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&w=800&q=85"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-8 -right-4 md:-right-8 p-6 rounded-xl hidden sm:block"
                style={{ background: 'rgba(0,15,46,0.92)', backdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(172,199,255,0.12)' }}
              >
                <div className="font-black text-white text-3xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>25k+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest leading-snug mt-1 max-w-[120px]" style={{ color: '#72c26e' }}>Hektar Yönetilen Plantasyon</div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-7 md:pl-12 pt-4 md:pt-16" direction="right">
              <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#72c26e' }}>Hakkımızda</div>
              <h2 className="font-black text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                Yenilikçiliğe Köklü Bir Miras
              </h2>
              <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.85)' }}>
                <p>Lalan Group, kauçuk sektöründe temel uzmanlıkla çok sektörlü bir konglomerattır. Dikey entegre operasyonlarımız, geniş kauçuk plantasyonlarından dünya standartlarındaki üretim tesislerine uzanır.</p>
                <p>Beş kıtadaki varlığımızla, ham lateksi yüksek performanslı koruyucu ekipmana ve endüstriyel çözümlere dönüştürme sanatında uzmanlaştık.</p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-10 mt-10" style={{ borderTop: '1px solid rgba(172,199,255,0.12)' }}>
                {[{ n: '80+', l: 'Yıl' }, { n: '15k+', l: 'Çalışan' }, { n: '5', l: 'Kıta' }].map(({ n, l }) => (
                  <div key={l}>
                    <span className="block text-white font-black text-2xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</span>
                    <span className="block text-xs font-bold uppercase tracking-wider mt-1" style={{ color: '#72c26e' }}>{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── İletişim ── */}
      <section id="contact" className="py-28 md:py-36 relative">
        <div className="absolute inset-0" style={{ background: 'rgba(0,5,20,0.45)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal direction="left">
              <div className="text-xs font-bold uppercase tracking-[0.15em] mb-6" style={{ color: '#72c26e' }}>İletişime Geç</div>
              <h2
                className="font-black text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                Kauçuğun En İyisiyle Ortaklık Kurun
              </h2>
              <p className="text-lg leading-relaxed mb-10 max-w-[48ch]" style={{ color: 'rgba(172,199,255,0.8)' }}>
                İhtiyaçlarınızı görüşmeye hazır mısınız? Uzmanlarımız sektörünüze en uygun koruyucu çözümü bulmada size yardımcı olacaktır.
              </p>
              <div className="space-y-5">
                {[
                  { path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'info@lalanrubbers.com' },
                  { path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+94 11 462 0000' },
                ].map(({ path, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(114,194,110,0.12)', border: '1px solid rgba(114,194,110,0.2)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#72c26e" strokeWidth="1.8"><path d={path} /></svg>
                    </div>
                    <span className="text-white font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(172,199,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/lalanlogo.png" alt="Lalan" width={96} height={36} className="object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(172,199,255,0.6)' }}>
              Dikey kauçuk entegrasyonunda küresel otorite. Plantasyondan avucunuza kadar.
            </p>
            <div className="flex gap-3">
              {['linkedin', 'twitter', 'youtube'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="footer-icon-btn w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(172,199,255,0.1)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.7)" strokeWidth="2">
                    {s === 'linkedin' && <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
                    {s === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>}
                    {s === 'youtube' && <><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Hızlı Bağlantılar', links: ['Sri Lanka Merkez', 'Sürdürülebilirlik', 'Küresel Operasyonlar', 'Kariyer'] },
            { title: 'Ürünler', links: ['Kimyasal Direnç', 'Medikal Koruma', 'Genel Kullanım', 'Özel Çözümler'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-5 text-sm">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(172,199,255,0.6)' }} href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm">Bülten</h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(172,199,255,0.6)' }}>En son yeniliklerimizden haberdar olun.</p>
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(172,199,255,0.15)' }}>
              <input
                type="email"
                placeholder="e-posta@adresiniz.com"
                className="lalan-input flex-1 rounded-none"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderBottom: 'none' }}
              />
              <button type="button" className="px-4 text-white newsletter-btn transition-colors" style={{ background: '#003608' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(172,199,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(172,199,255,0.4)' }}>© 2024 Lalan Rubbers (Pvt) Ltd. Endüstrinin Simyageri.</p>
          <div className="flex gap-6">
            <a className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(172,199,255,0.4)' }} href="#">Gizlilik Politikası</a>
            <a className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(172,199,255,0.4)' }} href="#">Kullanım Koşulları</a>
          </div>
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
