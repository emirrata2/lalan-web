'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

type EnvValue = 'heavy-industry' | 'assembly-general' | 'lab-precision' | 'food-kitchen' | 'cleaning-household';
type PropValue = 'chemical' | 'water-oil' | 'cut' | 'abrasion' | 'heat' | 'cold' | 'disposable' | 'precision';

const ENV_OPTS: { value: EnvValue; label: string; icon: React.ReactNode }[] = [
  {
    value: 'heavy-industry', label: 'Ağır Sanayi',
    icon: <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22 C5 10 27 10 27 22"/><line x1="2" y1="22" x2="30" y2="22" strokeWidth="2"/><path d="M7 22 L7 27 Q7 28 8 28 L24 28 Q25 28 25 27 L25 22"/></svg>,
  },
  {
    value: 'assembly-general', label: 'Montaj / Genel',
    icon: <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><rect x="18" y="18" width="10" height="10" rx="2"/></svg>,
  },
  {
    value: 'lab-precision', label: 'Lab & Hassas',
    icon: <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="20" y2="4"/><line x1="12" y1="4" x2="12" y2="13"/><line x1="20" y1="4" x2="20" y2="13"/><path d="M12 13 L5 24 Q4 28 8 28 L24 28 Q28 28 27 24 L20 13"/><circle cx="12" cy="25" r="1.4" fill="currentColor" stroke="none"/></svg>,
  },
  {
    value: 'food-kitchen', label: 'Gıda / Mutfak',
    icon: <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="11" y1="5" x2="11" y2="28"/><line x1="8" y1="5" x2="8" y2="14"/><line x1="14" y1="5" x2="14" y2="14"/><path d="M8 14 Q11 17 14 14"/><path d="M22 5 L22 12 Q22 16 19 17 L19 28"/><path d="M22 5 Q27 8 25 14 Q22 16 19 17"/></svg>,
  },
  {
    value: 'cleaning-household', label: 'Temizlik & Ev',
    icon: <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 16 L10 29 Q10 30 11 30 L21 30 Q22 30 22 29 L22 16 Z"/><rect x="13" y="11" width="5" height="5" rx="1"/><path d="M18 13 L24 13 Q26 13 26 15 L26 19 L22 19"/><line x1="26" y1="13" x2="29" y2="10"/><circle cx="28" cy="8" r="1.2" fill="currentColor" stroke="none"/></svg>,
  },
];

const PROP_OPTS: { value: PropValue; label: string }[] = [
  { value: 'chemical',  label: 'Kimyasal Dayanım' },
  { value: 'cut',       label: 'Kesme Direnci' },
  { value: 'abrasion',  label: 'Aşınma Direnci' },
  { value: 'heat',      label: 'Isı Direnci' },
  { value: 'cold',      label: 'Soğuk Direnci' },
  { value: 'water-oil', label: 'Su / Yağ Dayanımı' },
];

function filterProducts(envs: EnvValue[], props: PropValue[]) {
  return PRODUCTS.filter(p => {
    if (envs.length > 0 && !envs.some(e => (p.env as string[]).includes(e))) return false;
    if (props.length > 0 && !props.every(pr => (p.props as string[]).includes(pr))) return false;
    return true;
  });
}

type Step = 0 | 1 | 2;

export default function GloveFinderMini() {
  const [step, setStep]   = useState<Step>(0);
  const [envs, setEnvs]   = useState<EnvValue[]>([]);
  const [props, setProps] = useState<PropValue[]>([]);
  const [animKey, setAnimKey] = useState(0);

  function toggleEnv(v: EnvValue) {
    setEnvs(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  function toggleProp(v: PropValue) {
    setProps(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  function goToProps() {
    setProps([]);
    setStep(1);
    setAnimKey(k => k + 1);
  }

  function showResults() {
    setStep(2);
    setAnimKey(k => k + 1);
  }

  function reset() {
    setEnvs([]);
    setProps([]);
    setStep(0);
    setAnimKey(k => k + 1);
  }

  function goBackToProps() {
    setStep(1);
    setAnimKey(k => k + 1);
  }

  const results = step === 2 ? filterProducts(envs, props) : [];

  return (
    <div
      className="mt-8 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(142,198,63,0.2)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Başlık */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid rgba(172,199,255,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: '#8ec63f', fontFamily: 'var(--font-manrope)' }}>
            Eldiven Bulucu
          </span>
          <div className="flex items-center gap-1 ml-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 14 : 6,
                  height: 6,
                  background: i <= step ? '#8ec63f' : 'rgba(172,199,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
        {step > 0 && (
          <button
            onClick={reset}
            className="text-[10px] font-bold transition-opacity"
            style={{ color: 'rgba(172,199,255,0.45)' }}
          >
            ↺ Sıfırla
          </button>
        )}
      </div>

      <div
        key={animKey}
        className="p-5"
        style={{ animation: 'fadeUp 0.3s cubic-bezier(0.25,0.8,0.25,1) both' }}
      >
        {/* Adım 0: Ortam çoklu seçim */}
        {step === 0 && (
          <>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(172,199,255,0.45)' }}>
              Kullanım Ortamı Seçin
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ENV_OPTS.map(opt => {
                const sel = envs.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleEnv(opt.value)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 hover:-translate-y-px"
                    style={{
                      background: sel ? 'rgba(142,198,63,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${sel ? '#8ec63f' : 'rgba(172,199,255,0.12)'}`,
                      color: sel ? '#8ec63f' : 'rgba(200,212,232,0.75)',
                    }}
                  >
                    {sel && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5"/>
                      </svg>
                    )}
                    <span style={{ opacity: sel ? 1 : 0.65 }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={goToProps}
              disabled={envs.length === 0}
              className="w-full py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: envs.length > 0 ? 'linear-gradient(135deg,#003608,#005c14)' : 'rgba(255,255,255,0.04)',
                color: envs.length > 0 ? 'white' : 'rgba(172,199,255,0.25)',
                border: `1px solid ${envs.length > 0 ? 'rgba(142,198,63,0.35)' : 'rgba(172,199,255,0.08)'}`,
                cursor: envs.length > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              Devam →
            </button>
          </>
        )}

        {/* Adım 1: Dayanım seç */}
        {step === 1 && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex flex-wrap gap-1">
                {envs.map(e => {
                  const label = ENV_OPTS.find(o => o.value === e)?.label ?? e;
                  return (
                    <span key={e} className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}>
                      {label}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={() => { setStep(0); setAnimKey(k => k + 1); }}
                className="text-[10px] font-bold flex-shrink-0"
                style={{ color: 'rgba(172,199,255,0.4)' }}
              >
                değiştir
              </button>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(172,199,255,0.45)' }}>
              Dayanım <span style={{ color: 'rgba(172,199,255,0.3)', fontWeight: 400, textTransform: 'lowercase' }}>(isteğe bağlı)</span>
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {PROP_OPTS.map(opt => {
                const sel = props.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleProp(opt.value)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                    style={{
                      background: sel ? 'rgba(142,198,63,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${sel ? '#8ec63f' : 'rgba(172,199,255,0.12)'}`,
                      color: sel ? '#8ec63f' : 'rgba(200,212,232,0.7)',
                    }}
                  >
                    {sel && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5"/>
                      </svg>
                    )}
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={showResults}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg,#003608,#005c14)',
                color: 'white',
                border: '1px solid rgba(142,198,63,0.35)',
                boxShadow: '0 4px 16px rgba(0,79,17,0.35)',
              }}
            >
              Eldivenler Göster →
            </button>
          </>
        )}

        {/* Adım 2: Sonuçlar */}
        {step === 2 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {envs.map(e => {
                  const label = ENV_OPTS.find(o => o.value === e)?.label ?? e;
                  return (
                    <span key={e} className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}>
                      {label}
                    </span>
                  );
                })}
                {props.map(pr => {
                  const opt = PROP_OPTS.find(o => o.value === pr);
                  return opt ? (
                    <span key={pr} className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(92,147,214,0.1)', color: '#acc7ff', border: '1px solid rgba(92,147,214,0.2)' }}>
                      {opt.label}
                    </span>
                  ) : null;
                })}
              </div>
              <button onClick={goBackToProps} className="text-[10px] font-bold" style={{ color: 'rgba(172,199,255,0.4)', flexShrink: 0 }}>
                ← Değiştir
              </button>
            </div>

            {results.length > 0 ? (
              <>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(172,199,255,0.45)' }}>
                  {results.length} Ürün Bulundu
                </p>
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(172,199,255,0.15) transparent' }}>
                  {results.map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:-translate-y-px"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(172,199,255,0.08)' }}
                    >
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white text-xs truncate">{p.name}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: '#8ec63f' }}>{p.categoryLabel}</div>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.4)" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm font-bold text-white mb-1">Eşleşen ürün bulunamadı</p>
                <p className="text-xs mb-3" style={{ color: 'rgba(172,199,255,0.5)' }}>Daha az özellik seçin</p>
                <button onClick={goBackToProps} className="text-xs font-bold px-4 py-2 rounded-lg" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}>
                  ← Geri Dön
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
