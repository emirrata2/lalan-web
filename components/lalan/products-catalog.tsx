'use client';
import { useState } from 'react';
import { PRODUCTS, CATEGORIES, type Product } from '@/lib/products';
import GloveFinder from './glove-finder';

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,5,20,0.85)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #000f2e 0%, #001a40 100%)',
          border: '1px solid rgba(172,199,255,0.15)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(172,199,255,0.15)' }}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center p-8" style={{ background: 'rgba(255,255,255,0.03)', minHeight: '280px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.img} alt={product.name} className="max-h-56 w-full object-contain" />
          </div>

          {/* Info */}
          <div className="p-7 flex flex-col justify-between">
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(114,194,110,0.12)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.25)' }}
              >
                {product.categoryLabel}
              </span>
              <h2 className="font-black text-white text-xl leading-tight mb-3" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                {product.name}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,212,232,0.75)' }}>
                {product.desc}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.08)' }}>
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(172,199,255,0.5)' }}>{k}</div>
                    <div className="text-xs font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(114,194,110,0.1)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.2)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 text-center py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#003608,#005c14)', border: '1px solid rgba(114,194,110,0.3)', boxShadow: '0 4px 16px rgba(0,79,17,0.35)' }}
              >
                Teklif İste
              </a>
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-sm font-bold transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(172,199,255,0.7)', border: '1px solid rgba(172,199,255,0.12)' }}
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

function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(114,194,110,0.3)' : 'rgba(172,199,255,0.1)'}`,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
    >
      <div className="h-52 flex items-center justify-center p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} className="h-full w-full object-contain transition-transform duration-500" style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(114,194,110,0.1)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.2)' }}
          >
            {product.categoryLabel}
          </span>
        </div>
        <h3 className="font-black text-white text-sm leading-tight mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
          {product.name}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(172,199,255,0.65)' }}>
          {product.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(172,199,255,0.06)', color: 'rgba(172,199,255,0.7)', border: '1px solid rgba(172,199,255,0.1)' }}>
              {t}
            </span>
          ))}
        </div>
        <button
          className="w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
          style={{
            background: hovered ? 'linear-gradient(135deg,#003608,#005c14)' : 'rgba(114,194,110,0.08)',
            color: '#72c26e',
            border: '1px solid rgba(114,194,110,0.25)',
          }}
        >
          Detayları Gör →
        </button>
      </div>
    </div>
  );
}

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [finderExpanded, setFinderExpanded] = useState(false);

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Eldiven Bulucu teaser */}
      <div
        id="eldiven-bulucu"
        className="mb-16 p-6 rounded-3xl cursor-pointer transition-all duration-300"
        style={{
          background: finderExpanded ? 'transparent' : 'rgba(0,0,0,0.25)',
          border: '1px solid rgba(114,194,110,0.2)',
        }}
      >
        {!finderExpanded ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🧤</div>
              <div>
                <h3 className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                  Eldiven Bulucu
                </h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(172,199,255,0.65)' }}>
                  3 adımda size en uygun eldiveni bulun — kullanım alanı, risk seviyesi ve uzunluğa göre filtreleyin.
                </p>
              </div>
            </div>
            <button
              onClick={() => setFinderExpanded(true)}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#003608,#005c14)', border: '1px solid rgba(114,194,110,0.3)', boxShadow: '0 4px 16px rgba(0,79,17,0.35)', whiteSpace: 'nowrap' }}
            >
              🔍 Başla
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span />
              <button onClick={() => setFinderExpanded(false)} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}>
                ✕ Kapat
              </button>
            </div>
            <GloveFinder onProductClick={p => { setSelectedProduct(p); setFinderExpanded(false); }} />
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              background: activeCategory === cat.id ? 'linear-gradient(135deg,#003608,#005c14)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat.id ? 'white' : 'rgba(172,199,255,0.65)',
              border: `1px solid ${activeCategory === cat.id ? 'rgba(114,194,110,0.3)' : 'rgba(172,199,255,0.1)'}`,
              boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(0,79,17,0.35)' : 'none',
            }}
          >
            {cat.label}
            <span className="ml-2 text-[10px] opacity-70">
              ({cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length})
            </span>
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
