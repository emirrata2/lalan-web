import type { Product } from '@/lib/products';

export default function ProductCertsFiles({ product }: { product: Product }) {
  return (
    <div className="mt-4 mb-8">
      {product.datasheet && (
        <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.08)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'rgba(172,199,255,0.45)' }}>
            Ürün ile İlgili Dosyalar
          </p>
          <a
            href={product.datasheet}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'rgba(142,198,63,0.1)', border: '1px solid rgba(142,198,63,0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6M9 15l3 3 3-3" />
            </svg>
            <span className="text-left">
              <span className="block text-sm font-bold text-white">Ürün Bilgi Föyü (PDF)</span>
              <span className="block text-[11px]" style={{ color: 'rgba(172,199,255,0.55)' }}>Tekli sunum &amp; teknik dosya — indir</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
