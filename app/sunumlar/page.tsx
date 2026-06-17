import Link from 'next/link';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';

export const metadata = {
  title: 'Sunumlar & Kataloglar | Lalan MENA',
  description: 'Lalan Rubbers ürün teknik sunumları, genel katalog ve belgeleri — PDF formatında indirin veya talep edin.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

const TEKLI_SUNUMLAR = [
  {
    name: 'NaturaFL™ 300-15BF',
    subtitle: 'Kobalt Mavi · Gıdaya Uygun',
    file: '/documents/naturafl-300-15bf.pdf',
    category: 'Gıdaya Uygun',
    color: '#1255a8',
    accent: 'rgba(18,85,168,0.15)',
    border: 'rgba(18,85,168,0.25)',
  },
  {
    name: 'NitroFL™ 330-15SD',
    subtitle: 'Yeşil Kimyasal · Kimyasal Direnç',
    file: '/documents/nitrofl-330-15sd.pdf',
    category: 'Kimyasal',
    color: '#8ec63f',
    accent: 'rgba(142,198,63,0.12)',
    border: 'rgba(142,198,63,0.25)',
  },
  {
    name: 'Lalan™ 2.8',
    subtitle: 'Ekonomik · Tek Kullanımlık Nitril',
    file: '/documents/lalan-2-8.pdf',
    category: 'Tek Kullanımlık',
    color: '#5c93d6',
    accent: 'rgba(92,147,214,0.1)',
    border: 'rgba(92,147,214,0.2)',
  },
  {
    name: 'Lalan Lite™ 3.2',
    subtitle: 'Medikal · Pudrasız Nitril',
    file: '/documents/lalan-lite-3-2.pdf',
    category: 'Tek Kullanımlık',
    color: '#5c93d6',
    accent: 'rgba(92,147,214,0.1)',
    border: 'rgba(92,147,214,0.2)',
  },
  {
    name: 'Lalan Strong F™',
    subtitle: 'Güçlü · 5g Nitril',
    file: '/documents/lalan-strong-f.pdf',
    category: 'Tek Kullanımlık',
    color: '#5c93d6',
    accent: 'rgba(92,147,214,0.1)',
    border: 'rgba(92,147,214,0.2)',
  },
  {
    name: 'Lalan Strong X™',
    subtitle: 'Extra Güçlü · 6.3g Nitril',
    file: '/documents/lalan-strong-x.pdf',
    category: 'Tek Kullanımlık',
    color: '#3a73bc',
    accent: 'rgba(58,115,188,0.1)',
    border: 'rgba(58,115,188,0.2)',
  },
  {
    name: 'Lalan Strong X ESD™',
    subtitle: 'Anti-statik · Elektronik Sektör',
    file: '/documents/lalan-strong-x-esd.pdf',
    category: 'Tek Kullanımlık',
    color: '#888',
    accent: 'rgba(136,136,136,0.1)',
    border: 'rgba(136,136,136,0.15)',
  },
];

const GENEL_SUNUMLAR = [
  {
    name: 'Lalan Rubbers — Genel Sunum',
    subtitle: 'Şirket profili, ürün yelpazesi ve sertifikalar',
    lang: 'TR',
    langFull: 'Türkçe',
    color: '#8ec63f',
  },
  {
    name: 'Lalan Rubbers — Corporate Overview',
    subtitle: 'Company profile, product range and certifications',
    lang: 'EN',
    langFull: 'English',
    color: '#5c93d6',
  },
];

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function PdfIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

export default function SunumlarPage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-36 pb-32">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8ec63f' }}>
            Dokümanlar
          </p>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            Sunumlar &{' '}
            <span style={{ color: '#8ec63f' }}>Kataloglar</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            Ürün teknik sunumlarını PDF olarak indirin; genel şirket sunumu ve katalog için iletişime geçin.
          </p>
        </div>

        {/* Genel Sunumlar */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ background: '#5c93d6' }} />
            <h2
              className="font-bold uppercase tracking-wider text-sm"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(200,212,232,0.85)' }}
            >
              Genel Sunum & Katalog
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(172,199,255,0.07)' }} />
          </div>

          <div
            className="rounded-3xl p-8 md:p-10"
            style={{ background: 'rgba(0,20,60,0.55)', border: '1px solid rgba(92,147,214,0.18)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {GENEL_SUNUMLAR.map(s => (
                <div
                  key={s.lang}
                  className="rounded-2xl p-6 flex items-start gap-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.08)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm"
                    style={{
                      background: `rgba(${s.color === '#8ec63f' ? '142,198,63' : '92,147,214'},0.12)`,
                      color: s.color,
                      border: `1px solid ${s.color}33`,
                      fontFamily: 'var(--font-manrope), sans-serif',
                    }}
                  >
                    {s.lang}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1 leading-snug text-sm" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                      {s.name}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(172,199,255,0.5)' }}>
                      {s.subtitle}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-2" style={{ color: s.color }}>
                      {s.langFull}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(172,199,255,0.08)' }}>
              <div className="flex-1">
                <p className="font-bold text-white text-sm mb-1">Genel sunum talep etmek ister misiniz?</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(172,199,255,0.55)' }}>
                  Şirket profilimiz, kapasite bilgilerimiz ve tam ürün kataloğumuz içeren sunum dosyaları talep üzerine gönderilmektedir.
                </p>
              </div>
              <Link
                href="/#contact"
                className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-px"
                style={{ background: 'linear-gradient(135deg,#003608,#004f11)', color: 'white', border: '1px solid rgba(142,198,63,0.3)' }}
              >
                Sunum Talep Et
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Tekli Sunumlar */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ background: '#8ec63f' }} />
            <h2
              className="font-bold uppercase tracking-wider text-sm"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(200,212,232,0.85)' }}
            >
              Tekli Ürün Sunumları
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(172,199,255,0.07)' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f' }}>
              {TEKLI_SUNUMLAR.length} Belge
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEKLI_SUNUMLAR.map(s => (
              <a
                key={s.name}
                href={s.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: s.accent,
                  border: `1px solid ${s.border}`,
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <PdfIcon color={s.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-white mb-1 leading-snug text-sm truncate"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(172,199,255,0.5)' }}>
                    {s.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${s.color}20`, color: s.color }}
                    >
                      {s.category}
                    </span>
                    <span className="text-[10px] font-bold flex items-center gap-1 group-hover:opacity-100 opacity-50 transition-opacity" style={{ color: '#8ec63f' }}>
                      <DownloadIcon />
                      PDF İndir
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div
          className="mt-16 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: 'rgba(0,8,28,0.6)', border: '1px solid rgba(172,199,255,0.08)' }}
        >
          <div>
            <p className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
              Daha Fazla Ürün Bilgisi mi Gerekiyor?
            </p>
            <p className="text-xs" style={{ color: 'rgba(172,199,255,0.55)' }}>
              Katalogda yer almayan ürünler için teknik veri sayfası ve özel ürün sunumları talep üzerine hazırlanmaktadır.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px"
              style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}
            >
              Tüm Ürünler
            </Link>
            <Link
              href="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg,#003608,#004f11)', color: 'white', border: '1px solid rgba(142,198,63,0.3)' }}
            >
              İletişime Geç
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

      </main>
    </GradientBackground>
  );
}
