'use client';
import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { PRODUCTS, type Product } from '@/lib/products';

// ── Filter definitions ────────────────────────────────────────

const CAT_OPTIONS = [
  { id: 'food-safe',  label: 'Gıdaya Uygun' },
  { id: 'chemical',   label: 'Kimyasal' },
  { id: 'disposable', label: 'Tek Kullanımlık' },
  { id: 'industrial', label: 'Endüstriyel' },
  { id: 'household',  label: 'Ev Tipi' },
  { id: 'seamless',   label: 'Dikişsiz İş Eldiveni' },
] as const;

const MAT_OPTIONS = [
  { id: 'natural',  label: 'Doğal Lateks' },
  { id: 'nitrile',  label: 'Nitril Kauçuk' },
  { id: 'nbr',      label: 'NBR Kauçuk' },
] as const;

const PROP_OPTIONS = [
  { id: 'chemical',  label: 'Kimyasal Direnç' },
  { id: 'water-oil', label: 'Su & Yağ Geçirmez' },
  { id: 'cut',       label: 'Kesme Dayanımı' },
  { id: 'abrasion',  label: 'Aşınma Direnci' },
  { id: 'precision', label: 'Hassas İş' },
] as const;

const ENV_OPTIONS = [
  { id: 'heavy-industry',    label: 'Ağır Sanayi' },
  { id: 'assembly-general',  label: 'Genel Montaj' },
  { id: 'lab-precision',     label: 'Lab & Hassas' },
  { id: 'food-kitchen',      label: 'Gıda & Mutfak' },
  { id: 'cleaning-household',label: 'Ev Temizliği' },
] as const;

const MATERIAL_LABEL: Record<string, string> = {
  natural:              'Doğal Lateks',
  nitrile:              'Nitril Kauçuk',
  nbr:                  'NBR Kauçuk',
};

// ── Generic helpers ───────────────────────────────────────────

function toggleSet<T>(prev: Set<T>, item: T): Set<T> {
  const next = new Set(prev);
  if (next.has(item)) {
    next.delete(item);
  } else {
    next.add(item);
  }
  return next;
}

// ── Collapsible filter section ────────────────────────────────
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: '1px solid rgba(172,199,255,0.07)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(172,199,255,0.45)' }}>
          {title}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="rgba(172,199,255,0.35)" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-4 pb-3 space-y-0.5">{children}</div>}
    </div>
  );
}

// ── Checkbox pill ─────────────────────────────────────────────
function CheckPill({
  active, onClick, count, children,
}: {
  active: boolean; onClick: () => void; count?: number; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-150"
      style={{ background: active ? 'rgba(142,198,63,0.1)' : 'transparent' }}
    >
      {/* Custom checkbox */}
      <span
        className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all duration-150"
        style={{
          background: active ? '#8ec63f' : 'transparent',
          border: `1.5px solid ${active ? '#8ec63f' : 'rgba(172,199,255,0.25)'}`,
        }}
      >
        {active && (
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#000f2e" strokeWidth="2.5">
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
      <span
        className="flex-1 text-sm font-semibold leading-tight"
        style={{ color: active ? '#8ec63f' : 'rgba(172,199,255,0.65)' }}
      >
        {children}
      </span>
      {count !== undefined && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: active ? 'rgba(142,198,63,0.2)' : 'rgba(172,199,255,0.07)',
            color: active ? '#8ec63f' : 'rgba(172,199,255,0.35)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ── Product card ──────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/products/${product.id}`}
      className="block select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          aspectRatio: '1/1',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? 'rgba(142,198,63,0.22)' : 'rgba(172,199,255,0.07)'}`,
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1), border-color 0.25s',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-6"
          style={{
            mixBlendMode: 'lighten',
            transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(0,8,28,0.82)',
              color: 'rgba(172,199,255,0.7)',
              border: '1px solid rgba(172,199,255,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {product.categoryLabel}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(0,8,28,0.62)',
            backdropFilter: 'blur(4px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s',
          }}
        >
          <span
            className="font-bold text-[#000f2e] text-xs uppercase tracking-widest px-8 py-3 rounded-full"
            style={{
              background: '#8ec63f',
              boxShadow: '0 8px 24px rgba(142,198,63,0.4)',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            İncele
          </span>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className="font-black text-white leading-tight"
          style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.05rem' }}
        >
          {product.name}
        </h3>
        <p className="text-xs font-medium uppercase tracking-wider mt-1.5" style={{ color: 'rgba(172,199,255,0.4)' }}>
          {MATERIAL_LABEL[product.material] ?? product.material}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
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
      </div>
    </Link>
  );
}

// ── Active filter chip (shown above grid) ─────────────────────
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: 'rgba(142,198,63,0.12)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity leading-none" style={{ fontSize: '0.75rem' }}>×</button>
    </span>
  );
}

// ── Main Catalog ──────────────────────────────────────────────
const PAGE_SIZE = 9;

export default function ProductsCatalog() {
  const [selCats,  setSelCats]  = useState<Set<string>>(new Set());
  const [selMats,  setSelMats]  = useState<Set<string>>(new Set());
  const [selProps, setSelProps] = useState<Set<string>>(new Set());
  const [selEnvs,  setSelEnvs]  = useState<Set<string>>(new Set());
  const [showAll, setShowAll]   = useState(false);

  const toggleCat  = useCallback((id: string) => { setSelCats(p  => toggleSet(p, id)); setShowAll(false); }, []);
  const toggleMat  = useCallback((id: string) => { setSelMats(p  => toggleSet(p, id)); setShowAll(false); }, []);
  const toggleProp = useCallback((id: string) => { setSelProps(p => toggleSet(p, id)); setShowAll(false); }, []);
  const toggleEnv  = useCallback((id: string) => { setSelEnvs(p  => toggleSet(p, id)); setShowAll(false); }, []);

  const resetAll = useCallback(() => {
    setSelCats(new Set()); setSelMats(new Set());
    setSelProps(new Set()); setSelEnvs(new Set());
    setShowAll(false);
  }, []);

  const hasFilters = selCats.size > 0 || selMats.size > 0 || selProps.size > 0 || selEnvs.size > 0;

  // OR within group, AND between groups
  const filtered = useMemo(() => PRODUCTS.filter(p => {
    if (selCats.size  > 0 && !selCats.has(p.category))                         return false;
    if (selMats.size  > 0 && !selMats.has(p.material))                         return false;
    if (selProps.size > 0 && !p.props.some(x => selProps.has(x)))              return false;
    if (selEnvs.size  > 0 && !p.env.some(x => selEnvs.has(x)))                return false;
    return true;
  }), [selCats, selMats, selProps, selEnvs]);

  const visible     = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hiddenCount = filtered.length - PAGE_SIZE;

  // Count helpers — how many products remain if we toggle an option on
  const catCount  = (id: string) => PRODUCTS.filter(p => p.category === id).length;
  const matCount  = (id: string) => PRODUCTS.filter(p => p.material  === id).length;
  const propCount = (id: string) => PRODUCTS.filter(p => p.props.includes(id as Product['props'][number])).length;
  const envCount  = (id: string) => PRODUCTS.filter(p => p.env.includes(id as Product['env'][number])).length;

  // Build active chip labels for the summary bar
  const activeChips = [
    ...Array.from(selCats).map(id => ({
      label: CAT_OPTIONS.find(o => o.id === id)?.label ?? id,
      remove: () => toggleCat(id),
    })),
    ...Array.from(selMats).map(id => ({
      label: MAT_OPTIONS.find(o => o.id === id)?.label ?? id,
      remove: () => toggleMat(id),
    })),
    ...Array.from(selProps).map(id => ({
      label: PROP_OPTIONS.find(o => o.id === id)?.label ?? id,
      remove: () => toggleProp(id),
    })),
    ...Array.from(selEnvs).map(id => ({
      label: ENV_OPTIONS.find(o => o.id === id)?.label ?? id,
      remove: () => toggleEnv(id),
    })),
  ];

  return (
    <div className="flex gap-10 xl:gap-14 items-start">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-60 xl:w-68 flex-shrink-0 sticky top-24 self-start rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(0,8,28,0.65)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(172,199,255,0.08)',
        }}
      >
        {/* Header */}
        <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(172,199,255,0.07)' }}>
          <div>
            <p className="font-black text-white text-sm" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
              Filtrele
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5" style={{ color: 'rgba(172,199,255,0.4)' }}>
              {filtered.length} / {PRODUCTS.length} ürün
            </p>
          </div>
          {hasFilters && (
            <button
              onClick={resetAll}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-opacity hover:opacity-70"
              style={{ background: 'rgba(255,80,80,0.12)', color: 'rgba(255,130,130,0.9)', border: '1px solid rgba(255,80,80,0.2)' }}
            >
              Sıfırla
            </button>
          )}
        </div>

        {/* Kategori */}
        <Section title="Kategori">
          {CAT_OPTIONS.map(o => (
            <CheckPill key={o.id} active={selCats.has(o.id)} onClick={() => toggleCat(o.id)} count={catCount(o.id)}>
              {o.label}
            </CheckPill>
          ))}
        </Section>

        {/* Malzeme */}
        <Section title="Malzeme">
          {MAT_OPTIONS.map(o => (
            <CheckPill key={o.id} active={selMats.has(o.id)} onClick={() => toggleMat(o.id)} count={matCount(o.id)}>
              {o.label}
            </CheckPill>
          ))}
        </Section>

        {/* Koruma Özellikleri */}
        <Section title="Koruma Özellikleri">
          {PROP_OPTIONS.map(o => (
            <CheckPill key={o.id} active={selProps.has(o.id)} onClick={() => toggleProp(o.id)} count={propCount(o.id)}>
              {o.label}
            </CheckPill>
          ))}
        </Section>

        {/* Kullanım Ortamı */}
        <Section title="Kullanım Ortamı">
          {ENV_OPTIONS.map(o => (
            <CheckPill key={o.id} active={selEnvs.has(o.id)} onClick={() => toggleEnv(o.id)} count={envCount(o.id)}>
              {o.label}
            </CheckPill>
          ))}
        </Section>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Mobile filter chips */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {CAT_OPTIONS.map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => toggleCat(o.id)}
                aria-pressed={selCats.has(o.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{
                  background: selCats.has(o.id) ? 'rgba(142,198,63,0.18)' : 'rgba(255,255,255,0.05)',
                  color: selCats.has(o.id) ? '#8ec63f' : 'rgba(172,199,255,0.65)',
                  border: `1px solid ${selCats.has(o.id) ? 'rgba(142,198,63,0.3)' : 'rgba(172,199,255,0.1)'}`,
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button onClick={resetAll} className="text-xs font-bold" style={{ color: 'rgba(255,130,130,0.8)' }}>
              Filtreleri temizle ×
            </button>
          )}
        </div>

        {/* Active filter summary bar */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-7">
            {activeChips.map((chip, i) => (
              <ActiveChip key={i} label={chip.label} onRemove={chip.remove} />
            ))}
          </div>
        )}

        {/* Count bar */}
        <div
          className="flex items-center justify-between mb-10 pb-5"
          style={{ borderBottom: '1px solid rgba(172,199,255,0.07)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(172,199,255,0.4)' }}>
            {filtered.length} ürün listeleniyor
          </p>
          {hasFilters && (
            <button
              onClick={resetAll}
              className="hidden lg:block text-[10px] font-bold uppercase tracking-wider transition-colors hover:text-white"
              style={{ color: 'rgba(172,199,255,0.35)' }}
            >
              Tüm filtreleri kaldır ×
            </button>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-4">
            <div className="text-4xl mb-2" style={{ opacity: 0.3 }}>◈</div>
            <p className="text-lg font-bold text-white">Bu kombinasyona uygun ürün yok</p>
            <p className="text-sm" style={{ color: 'rgba(172,199,255,0.5)' }}>
              Seçili filtreler çok kısıtlayıcı olabilir. Bazı seçimleri kaldırın.
            </p>
            <button
              onClick={resetAll}
              className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(142,198,63,0.15)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.25)' }}
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
          {visible.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Pagination — show more */}
        {filtered.length > PAGE_SIZE && (
          <div className="mt-16 flex flex-col items-center gap-3">
            <button
              onClick={() => setShowAll(v => !v)}
              className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1"
              style={{
                background: showAll ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,#1c6d24,#005c14)',
                color: 'white',
                boxShadow: showAll ? 'none' : '0 8px 24px rgba(28,109,36,0.4)',
              }}
            >
              {showAll ? (
                <>
                  Daha Az Göster
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" /></svg>
                </>
              ) : (
                <>
                  {hiddenCount} Ürün Daha Göster
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </>
              )}
            </button>
            {!showAll && (
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(172,199,255,0.3)' }}>
                {visible.length} / {filtered.length} gösteriliyor
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
