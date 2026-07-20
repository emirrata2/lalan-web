import Link from 'next/link';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';

const DARK_GRADIENTS = [
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
  'linear-gradient(160deg, #001a08 0%, #003885 50%, #000f2e 100%)',
  'linear-gradient(160deg, #000f2e 0%, #004f11 45%, #001233 100%)',
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
];

export const metadata = {
  title: 'Sayfa Bulunamadı | Lalan MENA',
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { label: 'Ürünler', href: '/products', desc: 'Tüm eldiven kataloğu' },
  { label: 'Eldiven Bulucu', href: '/eldiven-bulucu', desc: 'Kullanım alanınıza göre seçim' },
  { label: 'Sertifikalar', href: '/sertifikalar', desc: 'Standartlar ve belgeler' },
  { label: 'LALAN Hakkında', href: '/lalan-hakkinda', desc: 'Üretici ve kapasite bilgileri' },
];

export default function NotFound() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={14}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-24 text-center">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
          style={{ color: '#8ec63f' }}
        >
          Hata 404
        </p>

        <h1
          className="text-3xl md:text-4xl font-black mb-4"
          style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
        >
          Aradığınız sayfa bulunamadı
        </h1>

        <p
          className="text-base leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: 'rgba(172,199,255,0.75)' }}
        >
          Bağlantı taşınmış veya kaldırılmış olabilir. Aşağıdaki bölümlerden devam
          edebilir, dilerseniz doğrudan bize ulaşabilirsiniz.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left">
          {SUGGESTIONS.map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="block p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(172,199,255,0.08)',
              }}
            >
              <span className="block text-sm font-bold text-white mb-1">{label}</span>
              <span className="block text-xs" style={{ color: 'rgba(172,199,255,0.55)' }}>
                {desc}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)',
              border: '1px solid rgba(142,198,63,0.3)',
            }}
          >
            Ana Sayfaya Dön
          </Link>
          <a
            href="mailto:info@lalanmena.com"
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(172,199,255,0.12)',
              color: 'rgba(232,237,245,0.9)',
            }}
          >
            İletişime Geç
          </a>
        </div>
      </main>
    </GradientBackground>
  );
}
