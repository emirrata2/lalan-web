'use client';
import { useState, useMemo } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';
import GloveFinder from './glove-finder';

const CAT_FILTERS = [
  { id: 'all',        label: 'Tüm Ürünler' },
  { id: 'industrial', label: 'Endüstriyel' },
  { id: 'neo',        label: 'Neo Serisi' },
  { id: 'household',  label: 'Genel Kullanım' },
  { id: 'disposable', label: 'Tek Kullanımlık' },
];

// ── Collapsible filter group ──────────────────────────────────
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderTop: '1px solid rgba(172,199,255,0.07)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(172,199,255,0.45)' }}>
          {title}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.35)" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ── Product Modal ─────────────────────────────────────────────
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,5,20,0.88)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #000f2e 0%, #001a40 100%)',
          border: '1px solid rgba(172,199,255,0.12)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(172,199,255,0.15)' }}
        >✕</button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex items-center justify-center p-8" style={{ background: 'rgba(255,255,255,0.03)', minHeight: '280px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.img} alt={product.name} className="max-h-56 w-full object-contain" />
          </div>
          <div className="p-7 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(114,194,110,0.12)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.25)' }}>
                {product.categoryLabel}
              </span>
              <h2 className="font-black text-white text-xl leading-tight mb-3" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                {product.name}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,212,232,0.75)' }}>
                {product.desc}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(172,199,255,0.5)' }}>{k}</div>
                    <div className="text-xs font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(114,194,110,0.1)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.2)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 text-center py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#1c6d24,#005c14)', boxShadow: '0 4px 16px rgba(28,109,36,0.4)' }}
              >
                Teklif İste
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-full text-sm font-bold transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(172,199,255,0.7)' }}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Card — editorial style ───────────────────────────
function ProductCard({ product, onOpen, featured }: { product: Product; onOpen: (p: Product) => void; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);

  const MATERIAL_LABEL: Record<string, string> = {
    natural: 'Doğal Lateks',
    nitrile: 'Nitril Kauçuk',
    nbr: 'NBR Kauçuk',
    'disposable-nitrile': 'Nitril / Tek Kullanımlık',
  };

  return (
    <div
      className={`cursor-pointer select-none${featured ? ' sm:col-span-2 xl:col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          aspectRatio: featured ? '16/9' : '4/5',
          background: 'rgba(255,255,255,0.04)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(0,8,28,0.62)',
            backdropFilter: 'blur(4px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s',
          }}
        >
          <span
            className="font-bold text-[#000f2e] text-xs uppercase tracking-widest px-8 py-3 rounded-full"
            style={{
              background: '#72c26e',
              transform: hovered ? 'translateY(0)' : 'translateY(14px)',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 8px 24px rgba(114,194,110,0.4)',
            }}
          >
            Detayları Gör
          </span>
        </div>
      </div>

      {/* Info below image */}
      <div className="mt-6 flex justify-between items-start gap-3">
        <div>
          <h3
            className="font-black text-white leading-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: featured ? '1.35rem' : '1.05rem' }}
          >
            {product.name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wider mt-1.5" style={{ color: 'rgba(172,199,255,0.45)' }}>
            {MATERIAL_LABEL[product.material] ?? product.material}
          </p>
        </div>
        <span
          className="text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0 mt-0.5"
          style={{ background: 'rgba(114,194,110,0.1)', color: '#72c26e' }}
        >
          {product.categoryLabel}
        </span>
      </div>
    </div>
  );
}

// ── Main Catalog ──────────────────────────────────────────────
const INITIAL_VISIBLE = 6; // 2 rows × 3 cols (xl)

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - INITIAL_VISIBLE;

  return (
    <>
      <div className="flex gap-10 xl:gap-14 items-start">

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 sticky top-24 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(0,8,28,0.65)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(172,199,255,0.08)',
          }}
        >
          {/* Sidebar header */}
          <div className="px-5 py-5">
            <p className="font-black text-white text-sm" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
              Filtrele
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5" style={{ color: 'rgba(172,199,255,0.4)' }}>
              Seçimi Daralt
            </p>
          </div>

          {/* Category filter */}
          <FilterGroup title="Kategori">
            <div className="space-y-0.5">
              {CAT_FILTERS.map(cat => {
                const count = cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: active ? 'rgba(114,194,110,0.12)' : 'transparent',
                      color: active ? '#72c26e' : 'rgba(172,199,255,0.6)',
                    }}
                  >
                    <span className="text-sm font-bold">{cat.label}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: active ? 'rgba(114,194,110,0.2)' : 'rgba(172,199,255,0.08)',
                        color: active ? '#72c26e' : 'rgba(172,199,255,0.4)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FilterGroup>

          {/* Eldiven Bulucu CTA */}
          <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(172,199,255,0.07)' }}>
            <button
              onClick={() => setFinderOpen(v => !v)}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: finderOpen ? 'rgba(114,194,110,0.12)' : 'linear-gradient(135deg,#1c6d24,#005c14)',
                color: finderOpen ? '#72c26e' : 'white',
                boxShadow: finderOpen ? 'none' : '0 4px 16px rgba(28,109,36,0.4)',
              }}
            >
              {finderOpen ? '✕ Kapat' : '🔍 Eldiven Bulucu'}
            </button>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Mobile category tabs */}
          <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
            {CAT_FILTERS.map(cat => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: active ? 'linear-gradient(135deg,#1c6d24,#005c14)' : 'rgba(255,255,255,0.05)',
                    color: active ? 'white' : 'rgba(172,199,255,0.65)',
                    border: `1px solid ${active ? 'rgba(114,194,110,0.3)' : 'rgba(172,199,255,0.1)'}`,
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Eldiven Bulucu button */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setFinderOpen(v => !v)}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: 'linear-gradient(135deg,#1c6d24,#005c14)', boxShadow: '0 4px 16px rgba(28,109,36,0.4)' }}
            >
              🔍 Eldiven Bulucu
            </button>
          </div>

          {/* Eldiven Bulucu panel */}
          {finderOpen && (
            <div
              className="mb-12 p-6 rounded-3xl"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(114,194,110,0.15)' }}
            >
              <GloveFinder onProductClick={p => { setSelectedProduct(p); setFinderOpen(false); }} />
            </div>
          )}

          {/* Sort / count bar */}
          <div
            className="flex items-center justify-between mb-12 pb-5"
            style={{ borderBottom: '1px solid rgba(172,199,255,0.07)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(172,199,255,0.4)' }}>
              {filtered.length} ürün listeleniyor
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest hidden sm:block" style={{ color: 'rgba(172,199,255,0.25)' }}>
              {CAT_FILTERS.find(c => c.id === activeCategory)?.label}
            </p>
          </div>

          {/* Product grid — editorial / asymmetric */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20">
            {visible.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelectedProduct}
                featured={i === 0 && activeCategory === 'all'}
              />
            ))}
          </div>

          {/* Show more / less */}
          {hiddenCount > 0 && (
            <div className="mt-20 flex flex-col items-center gap-4">
              <button
                onClick={() => setShowAll(v => !v)}
                className="group flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: showAll ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,#1c6d24,#005c14)',
                  color: 'white',
                  boxShadow: showAll ? 'none' : '0 8px 24px rgba(28,109,36,0.4)',
                }}
              >
                {showAll ? (
                  <>
                    Daha Az Göster
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </>
                ) : (
                  <>
                    {hiddenCount} Ürün Daha Gör
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </>
                )}
              </button>
              {!showAll && (
                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(filtered.length / INITIAL_VISIBLE) }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-full"
                      style={{
                        width: i === 0 ? 20 : 8,
                        height: 8,
                        background: i === 0 ? '#72c26e' : 'rgba(172,199,255,0.2)',
                        transition: 'all 0.3s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
