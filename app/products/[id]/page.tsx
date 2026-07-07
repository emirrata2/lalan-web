import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import ProductMedia from '@/components/lalan/product-media';
import ProductCertsFiles from '@/components/lalan/product-certs-files';
import ProductPictograms from '@/components/lalan/product-pictograms';

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

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }));
}

const SITE_URL = 'https://lalanmena.com';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} | Lalan Rubbers`,
    description: product.desc,
    openGraph: {
      title: `${product.name} | Lalan Rubbers`,
      description: product.desc,
      images: [{ url: product.img, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) notFound();

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.desc,
    image: `${SITE_URL}${product.img}`,
    category: product.categoryLabel,
    material: MATERIAL_LABEL[product.material] ?? product.material,
    brand: { '@type': 'Brand', name: 'Lalan Rubbers' },
  };

  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={14}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <LalanNav />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-24">

        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 md:mb-12 transition-colors hover:text-white"
          style={{ color: 'rgba(172,199,255,0.55)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Tüm Ürünler
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">

          {/* Sol kolon: görsel + piktogramlar */}
          <div>
            <ProductMedia product={product} />
            {product.pictograms && (
              <ProductPictograms pictograms={product.pictograms} />
            )}
          </div>

          {/* Info */}
          <div>
            {/* Category + material */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(142,198,63,0.12)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.25)' }}
              >
                {product.categoryLabel}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(172,199,255,0.07)', color: 'rgba(172,199,255,0.7)' }}
              >
                {MATERIAL_LABEL[product.material] ?? product.material}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-black text-white leading-tight tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(200,212,232,0.8)' }}>
              {product.desc}
            </p>

            {/* Specs */}
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(172,199,255,0.45)' }}>
                Teknik Özellikler
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(172,199,255,0.45)' }}>{k}</div>
                    <div className="text-sm font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosyalar */}
            <ProductCertsFiles product={product} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-28">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-8" style={{ color: 'rgba(172,199,255,0.45)' }}>
              Aynı Kategoriden
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.08)' }}
                >
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} className="w-full h-full object-contain" style={{ mixBlendMode: 'lighten' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-white text-sm leading-tight truncate" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                      {p.name}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(172,199,255,0.5)' }}>
                      {MATERIAL_LABEL[p.material] ?? p.material}
                    </p>
                  </div>
                  <svg className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.6)" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </GradientBackground>
  );
}
