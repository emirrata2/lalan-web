import Link from 'next/link';
import LalanNav from '@/components/lalan/nav';
import Reveal from '@/components/lalan/reveal';
import { GradientBackground } from '@/components/ui/gradient-background';

export const metadata = {
  title: 'Lalan Hakkında | Lalan MENA',
  description: '1940\'tan bu yana kauçuk sektöründe öncü olan Lalan Group hakkında tüm bilgiler: tarih, iş kolları, küresel varlık ve sürdürülebilirlik.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
  'linear-gradient(to bottom, #020a12, #3c6618)',
  'linear-gradient(to bottom, #010710, #346014)',
];

const SEGMENTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
        <path d="M2 12h20M12 2c-2.76 3.56-4 7.56-4 10s1.24 6.44 4 10M12 2c2.76 3.56 4 7.56 4 10s-1.24 6.44-4 10"/>
      </svg>
    ),
    title: 'Plantasyonlar & Tarım',
    desc: '68 milyondan fazla m² yönetilen alan üzerinde kauçuk, çay, hindistancevizi ve tarçın plantasyonları. FSC sertifikalı sürdürülebilir ormancılık uygulamaları.',
    stat: '68M+ m²',
    statLabel: 'Yönetilen Alan',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Kauçuk İmalatı',
    desc: 'Sri Lanka başta olmak üzere 9 üretim tesisinde doğal lateksin yüksek performanslı koruyucu eldivenlere ve endüstriyel ürünlere dönüştürüldüğü entegre üretim.',
    stat: '9',
    statLabel: 'Üretim Tesisi',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Mühendislik Ürünleri',
    desc: 'Otomotiv, inşaat ve savunma sanayii için yüksek performanslı kauçuk mühendislik ürünleri. Hassas toleranslar ve uluslararası standartlara tam uyumluluk.',
    stat: '500+',
    statLabel: 'Ürün Çeşidi',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
        <path d="M5 12h14M12 5l7 7-7 7"/>
        <circle cx="5" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
      </svg>
    ),
    title: 'Ticaret & Dağıtım',
    desc: '50\'den fazla ülkede yetkili distribütörler aracılığıyla küresel satış ve lojistik ağı. Türkiye ve MENA bölgesinin yetkili distribütörü olarak hizmet veriyoruz.',
    stat: '50+',
    statLabel: 'İhracat Ülkesi',
  },
];

const FACTS = [
  { n: '1940',    l: 'Kuruluş Yılı' },
  { n: '80+',     l: 'Yıllık Deneyim' },
  { n: '10.000+', l: 'Küresel Çalışan' },
  { n: '9',       l: 'Üretim Tesisi' },
  { n: '50+',     l: 'İhracat Ülkesi' },
  { n: '4',       l: 'Kıta' },
  { n: '2 milyar+', l: 'Yıllık Eldiven' },
  { n: '68M+ m²', l: 'Yönetilen Alan' },
];

const OFFICES = [
  { city: 'Colombo',      country: 'Sri Lanka', role: 'Genel Merkez',         primary: true },
  { city: 'İstanbul',     country: 'Türkiye',   role: 'Türkiye & MENA Distribütörü', primary: false },
  { city: 'Sohar',        country: 'Umman',     role: 'Orta Doğu Ofisi',      primary: false },
  { city: 'Tunus',        country: 'Tunus',     role: 'Kuzey Afrika Ofisi',   primary: false },
  { city: 'Londra',       country: 'İngiltere', role: 'Avrupa Ofisi',         primary: false },
  { city: 'Kuala Lumpur', country: 'Malezya',   role: 'Asya-Pasifik Ofisi',   primary: false },
  { city: 'São Paulo',    country: 'Brezilya',  role: 'Güney Amerika Ofisi',  primary: false },
];

export default function LalanHakkindaPage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      animationDelay={0}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(142,198,63,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#8ec63f' }}>
              1940&apos;tan Bu Yana
            </div>
            <h1
              className="font-black text-white leading-[1.05] tracking-[-0.03em] mb-4"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Lalan
            </h1>
            <p
              className="text-lg md:text-xl font-bold uppercase tracking-[0.1em] mb-8"
              style={{ color: '#8ec63f' }}
            >
              Lalan Hakkında
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'rgba(200,212,232,0.8)' }}>
              Kauçuk sektöründe dikey entegre yapısıyla faaliyet gösteren çok sektörlü bir konglomerat.
              Plantasyondan ürüne, Sri Lanka&apos;dan dünyaya — 80 yılı aşkın uzmanlık.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Ana Bilgi (2 kolon) ── */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

            {/* Fotoğraf */}
            <Reveal className="md:col-span-5 relative" direction="left">
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.5)', border: '1px solid rgba(142,198,63,0.15)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Lalan kauçuk plantasyonu"
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&w=800&q=85"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-8 -right-4 md:-right-8 p-6 rounded-xl hidden sm:block"
                style={{ background: 'rgba(0,15,46,0.92)', backdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(172,199,255,0.12)' }}
              >
                <div className="font-black text-white text-2xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>68.796.559 m²</div>
                <div className="text-[10px] font-bold uppercase tracking-widest leading-snug mt-1 max-w-[120px]" style={{ color: '#8ec63f' }}>Yönetilen Alan</div>
              </div>
            </Reveal>

            {/* Metin */}
            <Reveal className="md:col-span-7 md:pl-12 pt-4 md:pt-10" direction="right">
              <div className="space-y-5 text-base md:text-lg leading-relaxed mb-10" style={{ color: 'rgba(200,212,232,0.85)' }}>
                <p>
                  Lalan Group, kauçuk sektöründe dikey entegre yapısıyla faaliyet gösteren çok sektörlü bir konglomerattır.
                  Geniş kauçuk plantasyonlarından dünya standartlarındaki üretim tesislerine uzanan operasyonlarıyla sektörde öncü konumdadır.
                </p>
                <p>
                  Dört kıtada kurumsal varlığını sürdüren Lalan, ham lateksi yüksek performanslı koruyucu ekipmana ve
                  endüstriyel çözümlere dönüştürme konusunda küresel otorite olarak tanınmaktadır.
                </p>
                <p>
                  1940 yılında Sri Lanka&apos;da kurulan şirket, bugün tarım, imalat, mühendislik ve ticaret alanlarında
                  faaliyet göstermektedir. Sürdürülebilir kauçuk tedariki ve üretiminde küresel standartları belirleyen
                  Lalan, FSC sertifikalı plantasyonları ve ISO onaylı tesisleriyle sektöre öncülük etmektedir.
                </p>
              </div>

              {/* Temel istatistikler */}
              <div className="grid grid-cols-3 gap-6 pt-10" style={{ borderTop: '1px solid rgba(172,199,255,0.12)' }}>
                {[{ n: '80+', l: 'Yıl' }, { n: '10.000+', l: 'Çalışan' }, { n: '4', l: 'Kıta' }].map(({ n, l }) => (
                  <div key={l}>
                    <span className="block text-white font-black text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</span>
                    <span className="block text-xs font-bold uppercase tracking-wider mt-1" style={{ color: '#8ec63f' }}>{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Tüm Rakamlar ── */}
      <section className="py-20 relative" style={{ background: 'rgba(0,5,15,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-10 text-center" style={{ color: '#8ec63f' }}>
              Rakamlarla Lalan
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FACTS.map(({ n, l }) => (
                <div
                  key={l}
                  className="flex flex-col items-center text-center p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.09)' }}
                >
                  <span className="block font-black text-white text-2xl md:text-3xl mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{n}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(172,199,255,0.6)' }}>{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── İş Kolları ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>Faaliyet Alanları</div>
            <h2
              className="font-black text-white tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Lalan&apos;ın İş Kolları
            </h2>
            <p className="leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
              Tarımdan ticarete dört ana faaliyet alanında dikey entegre yapı ile değer zincirinin tamamını kapsayan operasyonlar.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEGMENTS.map(({ icon, title, desc, stat, statLabel }) => (
              <Reveal key={title}>
                <div
                  className="p-8 rounded-2xl h-full flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.09)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ background: 'rgba(142,198,63,0.1)', border: '1px solid rgba(142,198,63,0.2)' }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-black text-white text-lg mb-3" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(172,199,255,0.7)' }}>
                    {desc}
                  </p>
                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(172,199,255,0.08)' }}>
                    <span className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{stat}</span>
                    <span className="ml-2 text-xs font-bold uppercase tracking-wider" style={{ color: '#8ec63f' }}>{statLabel}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Küresel Ofisler ── */}
      <section className="py-20 md:py-28 relative" style={{ background: 'rgba(0,5,15,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>Dünya Genelinde</div>
            <h2
              className="font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Küresel Ofisler & Varlık
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFICES.map(({ city, country, role, primary }) => (
                <div
                  key={city}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: primary ? 'rgba(142,198,63,0.07)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${primary ? 'rgba(142,198,63,0.25)' : 'rgba(172,199,255,0.09)'}`,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: primary ? '#8ec63f' : 'rgba(172,199,255,0.4)' }}
                  />
                  <div>
                    <div className="font-bold text-white text-base" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                      {city}
                      <span className="text-sm font-normal ml-1.5" style={{ color: 'rgba(172,199,255,0.55)' }}>{country}</span>
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mt-0.5" style={{ color: primary ? '#8ec63f' : 'rgba(172,199,255,0.5)' }}>
                      {role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Tarihçe: Önemli Dönüm Noktaları ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>1940&apos;tan Bugüne</div>
            <h2
              className="font-black text-white tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Seksen Yıllık Yolculuk
            </h2>
            <p className="leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
              Sri Lanka&apos;da küçük bir ticaret masasından başlayıp küresel kauçuk devine dönüşen Lalan&apos;ın hikâyesi.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: 'rgba(142,198,63,0.2)' }} />
            <div className="space-y-10">
              {[
                { year: '1940', title: 'Kuruluş', desc: 'Peter Hapangama ve oğlu David, Sri Lanka\'nın verimli topraklarında kauçuk ticareti operasyonlarını başlatır.' },
                { year: '1956', title: 'İlk Uluslararası İhracat', desc: 'Yurt içi ticaretten uluslararası pazarlara açılım — küresel büyümenin ilk adımı.' },
                { year: '1987', title: 'Lalan Rubbers Doğuyor', desc: 'Warakapola\'da ilk kauçuk eldiven üretim tesisi faaliyete geçer; eldiven üretimi grubun temel faaliyet alanına dönüşür.' },
                { year: '1988–1998', title: 'Hızlı Genişleme', desc: '1 tesisten 6 tesise ulaşılır; ihracat ağı derinleşir ve kapasite Sri Lanka genelinde hızla büyür.' },
                { year: '2000\'ler', title: 'Küresel Ofisler', desc: 'Londra, İstanbul, Umman, Malezya ve Brezilya\'da uluslararası ofisler açılır; 50\'den fazla ülkeye doğrudan ihracat başlar.' },
                { year: 'Bugün', title: 'Dünya Lideri', desc: 'Yılda 2 milyar\'ı aşkın eldiven üretim kapasitesi, 10.000+ çalışan ve 4 kıtada sürdürülebilir kauçuk çözümleri.' },
              ].map(({ year, title, desc }) => (
                <Reveal key={year}>
                  <div className="flex gap-6 items-start">
                    <div className="relative flex-shrink-0">
                      <span
                        className="flex items-center justify-center w-9 h-9 rounded-full text-[10px] font-black"
                        style={{ background: 'rgba(142,198,63,0.12)', border: '1.5px solid rgba(142,198,63,0.4)', color: '#8ec63f' }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: '#8ec63f' }} />
                      </span>
                    </div>
                    <div className="pb-2">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-1" style={{ color: '#8ec63f' }}>{year}</div>
                      <div className="font-black text-white text-base mb-1.5" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(172,199,255,0.65)' }}>{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-10">
            <Link
              href="/tarihce"
              className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-200 hover:gap-3"
              style={{ color: '#8ec63f' }}
            >
              Tam Tarihçeyi Gör
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Daha Fazla Keşfet ── */}
      <section className="py-20 relative" style={{ background: 'rgba(0,5,15,0.35)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>Konuya Göre Gez</div>
            <h2
              className="font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              Daha Fazla Keşfet
            </h2>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Tarihçe', sub: '1940\'tan bugüne zaman çizelgesi', href: '/tarihce' },
                { label: 'Sürdürülebilirlik', sub: 'FSC sertifikaları ve çevre taahhütleri', href: '/surdurulebilirlik' },
                { label: 'Plantasyonlar', sub: '68M+ m² yönetilen alan ve kauçuk tarımı', href: '/plantasyonlar' },
                { label: 'Sertifikalar', sub: 'ISO, CE ve sektörel uyumluluk belgeleri', href: '/sertifikalar' },
                { label: 'Sunumlar & Kataloglar', sub: 'Ürün teknik veri sayfaları ve broşürler', href: '/sunumlar' },
                { label: 'Ürün Kataloğu', sub: '30\'dan fazla eldiven modeli', href: '/products' },
              ].map(({ label, sub, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.08)' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-white text-sm mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{label}</div>
                    <div className="text-xs leading-snug" style={{ color: 'rgba(172,199,255,0.5)' }}>{sub}</div>
                  </div>
                  <svg className="flex-shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.8)" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <Reveal>
            <h2
              className="font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Lalan Ürünlerini Keşfedin
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(172,199,255,0.75)' }}>
              Türkiye ve MENA bölgesinin yetkili distribütörü olarak Lalan&apos;ın dünya standardı koruyucu
              eldiven çözümlerini sizinle buluşturuyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)', boxShadow: '0 8px 24px rgba(0,79,17,0.45)', border: '1px solid rgba(142,198,63,0.3)' }}
              >
                Ürün Kataloğu
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(172,199,255,0.2)' }}
              >
                İletişime Geç
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </GradientBackground>
  );
}
