'use client';
import { useState } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';

// ── Professional SVG Icons ────────────────────────────────────
function IconIndustrial() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="18" width="28" height="12" rx="1"/>
      <path d="M2 18 L8 10 L14 18"/>
      <path d="M14 18 L20 8 L26 18"/>
      <line x1="8" y1="18" x2="8" y2="30"/>
      <line x1="16" y1="18" x2="16" y2="30"/>
      <line x1="24" y1="18" x2="24" y2="30"/>
      <rect x="13" y="22" width="6" height="8"/>
    </svg>
  );
}
function IconChemical() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 L12 14 L4 26 Q3 28 5 28 L27 28 Q29 28 28 26 L20 14 L20 4"/>
      <line x1="10" y1="4" x2="22" y2="4"/>
      <circle cx="13" cy="21" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="24" r="1" fill="currentColor" stroke="none"/>
      <circle cx="17" cy="19" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconHousehold() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14 L16 3 L29 14"/>
      <path d="M6 12 L6 29 L26 29 L26 12"/>
      <rect x="13" y="19" width="6" height="10"/>
      <rect x="8" y="16" width="5" height="5" rx="0.5"/>
      <rect x="19" y="16" width="5" height="5" rx="0.5"/>
    </svg>
  );
}
function IconMedical() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="4"/>
      <line x1="16" y1="10" x2="16" y2="22"/>
      <line x1="10" y1="16" x2="22" y2="16"/>
    </svg>
  );
}
function IconESD() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3 L10 17 L16 17 L14 29 L22 15 L16 15 Z"/>
      <path d="M6 10 Q3 16 6 22" strokeDasharray="2 2"/>
      <path d="M26 10 Q29 16 26 22" strokeDasharray="2 2"/>
    </svg>
  );
}
function IconShieldLow() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L27 8 V17 C27 24 16 29 16 29 C16 29 5 24 5 17 V8 Z"/>
      <path d="M11 17 L14.5 20.5 L21 13"/>
    </svg>
  );
}
function IconShieldMid() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L27 8 V17 C27 24 16 29 16 29 C16 29 5 24 5 17 V8 Z" strokeWidth="2"/>
      <path d="M11 17 L14.5 20.5 L21 13"/>
      <line x1="16" y1="8" x2="16" y2="12" strokeDasharray="2 2" opacity="0.5"/>
    </svg>
  );
}
function IconShieldHigh() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L27 8 V17 C27 24 16 29 16 29 C16 29 5 24 5 17 V8 Z" fill="currentColor" fillOpacity="0.12" strokeWidth="2"/>
      <path d="M11 17 L14.5 20.5 L21 13" strokeWidth="2"/>
    </svg>
  );
}

const STEP_ICONS: Record<string, React.FC> = {
  industrial: IconIndustrial,
  chemical:   IconChemical,
  household:  IconHousehold,
  'medical-food': IconMedical,
  esd:        IconESD,
  low:        IconShieldLow,
  medium:     IconShieldMid,
  heavy:      IconShieldHigh,
};

// ── Steps (pazu uzunluğu adımı kaldırıldı) ───────────────────
const STEPS = [
  {
    id: 'usage' as const,
    title: 'Kullanım Alanı',
    subtitle: 'Eldivenin kullanılacağı ortamı seçin.',
    options: [
      { value: 'industrial',   label: 'Endüstriyel',     desc: 'Fabrika, inşaat, ağır sanayi' },
      { value: 'chemical',     label: 'Kimyasal',         desc: 'Kimyasal madde, solvent, asit' },
      { value: 'household',    label: 'Ev & Temizlik',    desc: 'Mutfak, temizlik, bulaşık' },
      { value: 'medical-food', label: 'Medikal & Gıda',   desc: 'Gıda işleme, tıbbi muayene' },
      { value: 'esd',          label: 'Elektronik / ESD', desc: 'Anti-statik, hassas elektronik' },
    ],
  },
  {
    id: 'risk' as const,
    title: 'Koruma Düzeyi',
    subtitle: 'İş ortamındaki risk ve koruma ihtiyacını belirleyin.',
    options: [
      { value: 'low',    label: 'Hafif Koruma', desc: 'Genel koruma, hafif iş' },
      { value: 'medium', label: 'Orta Koruma',  desc: 'Orta düzey kimyasal / mekanik' },
      { value: 'heavy',  label: 'Tam Koruma',   desc: 'Yüksek risk, agresif kimyasallar' },
    ],
  },
] as const;

type StepId = 'usage' | 'risk';
type Selections = Partial<Record<StepId, string>>;

function filterProducts(sel: Selections): Product[] {
  return PRODUCTS.filter(p => {
    if (sel.usage && !p.usage.includes(sel.usage as any)) return false;
    if (sel.risk  && !p.risk.includes(sel.risk as any))   return false;
    return true;
  });
}

export default function GloveFinder({ onProductClick }: { onProductClick: (p: Product) => void }) {
  const [step, setStep]               = useState(0);
  const [sel, setSel]                 = useState<Selections>({});
  const [showResults, setShowResults] = useState(false);
  const [animKey, setAnimKey]         = useState(0);

  const current = STEPS[step];

  function select(value: string) {
    setSel(prev => ({ ...prev, [current.id]: value }));
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      setAnimKey(k => k + 1);
    } else {
      setShowResults(true);
    }
  }

  function back() {
    if (showResults) { setShowResults(false); return; }
    setStep(s => Math.max(0, s - 1));
    setAnimKey(k => k + 1);
  }

  function reset() {
    setSel({});
    setStep(0);
    setShowResults(false);
    setAnimKey(k => k + 1);
  }

  const canNext = !!sel[current?.id];
  const results = showResults ? filterProducts(sel) : [];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(172,199,255,0.12)', backdropFilter: 'blur(12px)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(172,199,255,0.1)', background: 'rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(114,194,110,0.12)', border: '1px solid rgba(114,194,110,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="#72c26e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 28 L10 14 Q10 10 14 10 L14 6 Q14 3 16 3 Q18 3 18 6 L18 8 L20 8 L20 5 Q20 3 22 3 Q24 3 24 5 L24 10 Q27 10 28 14 L28 22 Q28 28 22 30 L18 30 Q10 30 10 28Z" strokeWidth="1.6"/>
            </svg>
          </div>
          <span className="font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1rem' }}>
            Eldiven Bulucu
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(114,194,110,0.15)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.3)' }}>
            2 Adım
          </span>
        </div>
        <button onClick={reset} className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors" style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}>
          ↺ Sıfırla
        </button>
      </div>

      <div className="p-6">
        {!showResults ? (
          <div key={animKey} style={{ animation: 'fadeUp 0.35s cubic-bezier(0.25,0.8,0.25,1) both' }}>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                    style={{
                      width: 28, height: 28,
                      background: i < step ? '#72c26e' : i === step ? 'rgba(114,194,110,0.1)' : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${i < step ? '#72c26e' : i === step ? '#72c26e' : 'rgba(172,199,255,0.12)'}`,
                      color: i < step ? 'white' : i === step ? '#72c26e' : 'rgba(172,199,255,0.4)',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="h-px" style={{ width: 32, background: i < step ? '#72c26e' : 'rgba(172,199,255,0.12)' }} />
                  )}
                </div>
              ))}
              <span className="ml-2 text-xs font-bold" style={{ color: 'rgba(172,199,255,0.5)' }}>
                {step + 1}/{STEPS.length}
              </span>
            </div>

            <h3 className="font-black text-white text-lg mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
              {current.title}
            </h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(172,199,255,0.6)' }}>{current.subtitle}</p>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
              {current.options.map((opt, i) => {
                const isSelected = sel[current.id] === opt.value;
                const Icon = STEP_ICONS[opt.value];
                return (
                  <button
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className="text-left p-4 rounded-xl transition-all duration-200"
                    style={{
                      background: isSelected ? 'rgba(114,194,110,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${isSelected ? '#72c26e' : 'rgba(172,199,255,0.1)'}`,
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                      boxShadow: isSelected ? '0 8px 24px rgba(114,194,110,0.2)' : 'none',
                      animation: `fadeUp 0.3s ${i * 0.05}s both`,
                      color: isSelected ? '#72c26e' : 'rgba(172,199,255,0.55)',
                    }}
                  >
                    {Icon && <div className="mb-3"><Icon /></div>}
                    <div className="font-bold text-sm text-white mb-1">{opt.label}</div>
                    <div className="text-xs leading-snug" style={{ color: 'rgba(172,199,255,0.5)' }}>{opt.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-6">
              {step > 0 ? (
                <button onClick={back} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}>
                  ← Geri
                </button>
              ) : <div />}
              <button
                onClick={next}
                disabled={!canNext}
                className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  background: canNext ? 'linear-gradient(135deg,#003608,#005c14)' : 'rgba(255,255,255,0.05)',
                  color: canNext ? 'white' : 'rgba(172,199,255,0.3)',
                  border: `1px solid ${canNext ? 'rgba(114,194,110,0.3)' : 'rgba(172,199,255,0.08)'}`,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  boxShadow: canNext ? '0 4px 16px rgba(0,79,17,0.4)' : 'none',
                }}
              >
                {step === STEPS.length - 1 ? 'Sonuçları Gör →' : 'Devam →'}
              </button>
            </div>
          </div>
        ) : (
          <div key={`results-${animKey}`} style={{ animation: 'fadeUp 0.35s cubic-bezier(0.25,0.8,0.25,1) both' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-white text-lg" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                  {results.length > 0 ? `${results.length} Ürün Bulundu` : 'Ürün Bulunamadı'}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(172,199,255,0.55)' }}>
                  Seçimlerinize göre önerilen modeller
                </p>
              </div>
              <button onClick={back} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}>
                ← Değiştir
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {Object.entries(sel).map(([k, v]) => {
                const s = STEPS.find(st => st.id === k);
                const o = s?.options.find(op => op.value === v);
                if (!o) return null;
                return (
                  <span key={k} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(114,194,110,0.1)', color: '#72c26e', border: '1px solid rgba(114,194,110,0.25)' }}>
                    {o.label}
                  </span>
                );
              })}
            </div>

            {results.length > 0 ? (
              <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => onProductClick(p)}
                    className="text-left p-4 rounded-xl transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(172,199,255,0.1)',
                      animation: `fadeUp 0.3s ${i * 0.04}s both`,
                    }}
                  >
                    <div className="h-28 mb-3 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={p.name} className="h-full w-full object-contain p-2" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#72c26e' }}>{p.categoryLabel}</div>
                    <div className="font-bold text-white text-sm mb-2 leading-tight">{p.name}</div>
                    <div className="text-xs font-bold" style={{ color: '#acc7ff' }}>Detayları Gör →</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="mb-3 opacity-30 flex justify-center">
                  <IconShieldLow />
                </div>
                <p className="text-sm font-bold text-white mb-1">Eşleşen ürün bulunamadı</p>
                <p className="text-xs mb-4" style={{ color: 'rgba(172,199,255,0.5)' }}>Farklı kombinasyon deneyin</p>
                <button onClick={reset} className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#003608,#005c14)', border: '1px solid rgba(114,194,110,0.3)' }}>
                  Yeniden Dene
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
