import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import ProductsCatalog from '@/components/lalan/products-catalog';
import GloveFinderSection from '@/components/lalan/glove-finder-section';

export const metadata = {
  title: 'Ürünler | Lalan MENA',
  description: 'Lalan Rubbers\'ın tam ürün kataloğu — endüstriyel, kimyasal, gıdaya uygun, ev tipi ve tek kullanımlık eldiven modelleri.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

export default function ProductsPage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main className="pt-32 pb-24">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>
            Ürün Kataloğu
          </div>
          <h1
            className="font-black text-white tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Tüm Ürünler
          </h1>
          <p className="max-w-[56ch] leading-relaxed" style={{ color: 'rgba(172,199,255,0.7)' }}>
            30&apos;dan fazla eldiven modeli — endüstriyel, ev tipi, kimyasal ve tek kullanımlık kategorilerde.
            Aşağıdaki Eldiven Bulucu ile size özel modeli saniyeler içinde bulun.
          </p>
        </div>

        {/* Katalog */}
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <ProductsCatalog />
        </div>

        {/* Eldiven Bulucu */}
        <div id="glove-finder" className="mt-24">
          <GloveFinderSection />
        </div>

      </main>
    </GradientBackground>
  );
}
