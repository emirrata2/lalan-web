import type { Product } from '@/lib/products';
import { CONTACT } from '@/lib/contact';

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6M9 15l3 3 3-3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

const BOX_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(172,199,255,0.08)',
} as const;

const ACTION_STYLE = {
  background: 'rgba(142,198,63,0.1)',
  border: '1px solid rgba(142,198,63,0.25)',
} as const;

export default function ProductCertsFiles({ product }: { product: Product }) {
  // Föyü olan ürün indirir; olmayanda blok gizlenmez, talep kanalına dönüşür —
  // "belge yok" sessiz boşluğu yerine alıcıya somut bir adım verilir.
  const quoteHref =
    `mailto:${CONTACT.email}` +
    `?subject=${encodeURIComponent(`Teklif Talebi — ${product.name}`)}` +
    `&body=${encodeURIComponent(
      `Ürün: ${product.name}\nÜrün kodu: ${product.id}\n\nTalep edilen adet:\nKullanım alanı:\n\nNotlar:\n`,
    )}`;

  const datasheetRequestHref =
    `mailto:${CONTACT.email}` +
    `?subject=${encodeURIComponent(`Teknik Föy Talebi — ${product.name}`)}` +
    `&body=${encodeURIComponent(
      `${product.name} (${product.id}) ürününün teknik föyünü ve sertifika belgelerini iletebilir misiniz?\n`,
    )}`;

  return (
    <div className="mt-4 mb-8 space-y-4">
      <div className="p-5 rounded-2xl" style={BOX_STYLE}>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'rgba(172,199,255,0.45)' }}>
          Ürün ile İlgili Dosyalar
        </p>

        {product.datasheet ? (
          <a
            href={product.datasheet}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={ACTION_STYLE}
          >
            <FileIcon />
            <span className="text-left">
              <span className="block text-sm font-bold text-white">Ürün Bilgi Föyü (PDF)</span>
              <span className="block text-[11px]" style={{ color: 'rgba(172,199,255,0.55)' }}>
                Tekli sunum &amp; teknik dosya — indir
              </span>
            </span>
          </a>
        ) : (
          <a
            href={datasheetRequestHref}
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={ACTION_STYLE}
          >
            <MailIcon />
            <span className="text-left">
              <span className="block text-sm font-bold text-white">Teknik Föy Talep Et</span>
              <span className="block text-[11px]" style={{ color: 'rgba(172,199,255,0.55)' }}>
                Bu ürünün föyünü ve belgelerini e-posta ile gönderelim
              </span>
            </span>
          </a>
        )}
      </div>

      {/* Teklif CTA — alıcının ürünü beğendiği anda atacağı adım */}
      <div className="p-5 rounded-2xl" style={BOX_STYLE}>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(172,199,255,0.45)' }}>
          Bu Ürün İçin Teklif
        </p>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(200,212,232,0.7)' }}>
          Adet ve kullanım alanınızı iletin, size özel fiyat ve tedarik planıyla dönüş yapalım.
        </p>
        <a
          href={quoteHref}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)',
            border: '1px solid rgba(142,198,63,0.3)',
          }}
        >
          Teklif İste
        </a>
      </div>
    </div>
  );
}
