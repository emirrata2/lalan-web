import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';

const DARK_GRADIENTS = [
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
  'linear-gradient(160deg, #001a08 0%, #003885 50%, #000f2e 100%)',
  'linear-gradient(160deg, #000f2e 0%, #004f11 45%, #001233 100%)',
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
];

const MATERIAL_LABEL: Record<string, string> = {
  natural: 'Doğal Lateks',
  nitrile: 'Nitril Kauçuk',
  nbr: 'NBR Kauçuk',
};

const CATEGORIES: Record<string, { label: string; desc: string }> = {
  'food-safe':  { label: 'Gıdaya Uygun',          desc: 'Gıda sektörü ve hassas temas gerektiren ortamlar için güvenli, gıda onaylı lateks eldivenler.' },
  chemical:     { label: 'Kimyasal',               desc: 'Zorlu kimyasal maddelere karşı üstün koruma sağlayan nitril kauçuk eldivenler. Tarım, atık yönetimi ve laboratuvar kullanımı için.' },
  disposable:   { label: 'Tek Kullanımlık',        desc: 'Hijyen ve pratiklik öncelikli, tek kullanımlık nitril eldivenler. Medikal, gıda ve endüstriyel kullanım için.' },
  industrial:   { label: 'Endüstriyel',            desc: 'Ağır sanayi, petrokimya ve genel endüstriyel ortamlar için yüksek dayanımlı lateks ve NBR eldivenler.' },
  household:    { label: 'Ev Tipi',                desc: 'Ev temizliği ve mutfak kullanımı için tasarlanmış konforlu, dayanıklı lateks ve nitril eldivenler.' },
  seamless:     { label: 'Dikişsiz İş Eldiveni',  desc: 'Neo serisi dikişsiz iş eldivenleri — otomotiv, montaj ve ağır endüstri için kesme ve darbe koruması.' },
};

const ALL_CATS = [
  { slug: 'food-safe',  label: 'Gıdaya Uygun' },
  { slug: 'chemical',   label: 'Kimyasal' },
  { slug: 'disposable', label: 'Tek Kullanımlık' },
  { slug: 'industrial', label: 'Endüstriyel' },
  { slug: 'household',  label: 'Ev Tipi' },
  { slug: 'seamless',   label: 'Dikişsiz İş Eldiveni' },
];

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return {};
  return {
    title: `${cat.label} Eldivenler | Lalan Rubbers`,
    description: cat.desc,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) notFound();

  const products = PRODUCTS.filter(p => p.category === slug);

  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={14}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-24">

        {/* Geri */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold mb-12 transition-colors hover:text-white"
          style={{ color: 'rgba(172,199,255,0.55)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Tüm Ürünler
        </Link>

        {/* Başlık */}
        <div className="mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
            style={{ background: 'rgba(0,79,17,0.85)', color: '#8ec63f', border: '1px solid rgba(175,220,120,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ec63f] animate-pulse inline-block" />
            {products.length} Ürün
          </span>
          <h1
            className="font-black text-white leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {cat.label}
          </h1>
          <p className="mt-4 text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
            {cat.desc}
          </p>
        </div>

        {/* Diğer Kategoriler */}
        <div className="flex flex-wrap gap-2 mb-14">
          {ALL_CATS.filter(c => c.slug !== slug).map(c => (
            <Link
              key={c.slug}
              href={`/products/category/${c.slug}`}
              className="px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(172,199,255,0.65)',
                border: '1px solid rgba(172,199,255,0.1)',
              }}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div
                className="relative overflow-hidden rounded-3xl mb-6"
                style={{
                  aspectRatio: '1/1',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(172,199,255,0.07)',
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  style={{ mixBlendMode: 'lighten' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,8,28,0.6)', backdropFilter: 'blur(4px)' }}
                >
                  <span
                    className="font-bold text-[#000f2e] text-xs uppercase tracking-widest px-8 py-3 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: '#8ec63f', boxShadow: '0 8px 24px rgba(142,198,63,0.4)' }}
                  >
                    İncele
                  </span>
                </div>
              </div>

              <h3
                className="font-black text-white leading-tight mb-2"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.1rem' }}
              >
                {product.name}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(172,199,255,0.45)' }}>
                {MATERIAL_LABEL[product.material] ?? product.material}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.features.slice(0, 2).map(f => (
                  <span
                    key={f}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(142,198,63,0.08)', color: '#8ec63f' }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-lg font-bold text-white mb-2">Bu kategoride ürün bulunamadı.</p>
            <Link
              href="/products"
              className="inline-block mt-4 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(142,198,63,0.15)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.25)' }}
            >
              Tüm Ürünlere Dön
            </Link>
          </div>
        )}
      </main>
    </GradientBackground>
  );
}
