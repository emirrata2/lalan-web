'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, type Product } from '@/lib/products';
import { useI18n, useLocalePath } from './i18n-provider';

// ── Ortam ikonları ─────────────────────────────────────────────
function IconHeavyIndustry() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22 C5 10 27 10 27 22"/>
      <line x1="2" y1="22" x2="30" y2="22" strokeWidth="2"/>
      <path d="M7 22 L7 27 Q7 28 8 28 L24 28 Q25 28 25 27 L25 22"/>
      <line x1="16" y1="10" x2="16" y2="15" strokeWidth="1.2" opacity="0.55"/>
    </svg>
  );
}
function IconAssembly() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="10" height="10" rx="2"/>
      <rect x="18" y="4" width="10" height="10" rx="2"/>
      <rect x="4" y="18" width="10" height="10" rx="2"/>
      <rect x="18" y="18" width="10" height="10" rx="2"/>
      <line x1="9" y1="9" x2="9" y2="9" strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="9" x2="23" y2="9" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconLabPrecision() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="20" y2="4"/>
      <line x1="12" y1="4" x2="12" y2="13"/>
      <line x1="20" y1="4" x2="20" y2="13"/>
      <path d="M12 13 L5 24 Q4 28 8 28 L24 28 Q28 28 27 24 L20 13"/>
      <circle cx="12" cy="25" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="25.5" r="1.1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFoodKitchen() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="11" y1="5" x2="11" y2="28"/>
      <line x1="8" y1="5" x2="8" y2="14"/>
      <line x1="14" y1="5" x2="14" y2="14"/>
      <path d="M8 14 Q11 17 14 14"/>
      <path d="M22 5 L22 12 Q22 16 19 17 L19 28"/>
      <path d="M22 5 Q27 8 25 14 Q22 16 19 17"/>
    </svg>
  );
}
function IconCleaning() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16 L10 29 Q10 30 11 30 L21 30 Q22 30 22 29 L22 16 Z"/>
      <rect x="13" y="11" width="5" height="5" rx="1"/>
      <path d="M18 13 L24 13 Q26 13 26 15 L26 19 L22 19"/>
      <line x1="26" y1="13" x2="29" y2="10"/>
      <circle cx="28" cy="8" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="30" cy="11" r="0.9" fill="currentColor" stroke="none" opacity="0.65"/>
    </svg>
  );
}

// ── Dayanım ikonları ───────────────────────────────────────────
function IconChemical() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="8" r="3"/>
      <circle cx="8" cy="23" r="3"/>
      <circle cx="24" cy="23" r="3"/>
      <line x1="16" y1="11" x2="12" y2="20"/>
      <line x1="16" y1="11" x2="20" y2="20"/>
      <line x1="11" y1="23" x2="21" y2="23"/>
    </svg>
  );
}
function IconWaterOil() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 C16 4 6 14 6 20 A10 10 0 0 0 26 20 C26 14 16 4 16 4Z"/>
      <path d="M20 22 Q20 26 16 26" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  );
}
function IconCut() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6 L20 21"/>
      <path d="M20 21 L26 24 L23 27 Z" fill="currentColor" stroke="none"/>
      <path d="M27 6 L13 20"/>
      <line x1="6" y1="26" x2="12" y2="20"/>
    </svg>
  );
}
function IconAbrasion() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="22" width="24" height="5" rx="1.5"/>
      <path d="M4 19 L8 14 L12 19 L16 14 L20 19 L24 14 L28 19"/>
      <line x1="16" y1="4" x2="16" y2="11" strokeWidth="1.3" strokeDasharray="2 2" opacity="0.6"/>
      <path d="M12 7 L16 11 L20 7" strokeWidth="1.3" opacity="0.6"/>
    </svg>
  );
}
function IconHeat() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 C 20 10, 24 13, 24 19 a 8 8 0 0 1 -16 0 c 0 -4, 3 -6, 4 -9 c 2 3, 1 5, 4 6 c 1 -2, 0 -4, 0 -12 Z"/>
    </svg>
  );
}
function IconCold() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="3" x2="16" y2="29"/>
      <line x1="5" y1="9.5" x2="27" y2="22.5"/>
      <line x1="27" y1="9.5" x2="5" y2="22.5"/>
      <path d="M16 3 L13 6 M16 3 L19 6 M16 29 L13 26 M16 29 L19 26" strokeWidth="1.4"/>
    </svg>
  );
}

// ── Veri tanımları ─────────────────────────────────────────────
type EnvValue = 'heavy-industry' | 'assembly-general' | 'lab-precision' | 'food-kitchen' | 'cleaning-household';
type PropValue = 'chemical' | 'water-oil' | 'cut' | 'abrasion' | 'heat' | 'cold' | 'disposable' | 'precision';

// Yalnızca değer + ikon sabittir; label/desc dile göre sözlükten okunur
// (bkz. useOptions aşağıda). Sıra buradaki sıradır.
const ENV_ICONS: { value: EnvValue; Icon: React.FC }[] = [
  { value: 'heavy-industry',     Icon: IconHeavyIndustry },
  { value: 'assembly-general',   Icon: IconAssembly },
  { value: 'lab-precision',      Icon: IconLabPrecision },
  { value: 'food-kitchen',       Icon: IconFoodKitchen },
  { value: 'cleaning-household', Icon: IconCleaning },
];

const PROP_ICONS: { value: Exclude<PropValue, 'disposable' | 'precision'>; Icon: React.FC }[] = [
  { value: 'chemical',   Icon: IconChemical },
  { value: 'cut',        Icon: IconCut },
  { value: 'abrasion',   Icon: IconAbrasion },
  { value: 'heat',       Icon: IconHeat },
  { value: 'cold',       Icon: IconCold },
  { value: 'water-oil',  Icon: IconWaterOil },
];

function filterProducts(envs: EnvValue[], props: PropValue[]): Product[] {
  return PRODUCTS.filter(p => {
    if (envs.length > 0 && !envs.some(e => (p.env as string[]).includes(e))) return false;
    if (props.length > 0 && !props.every(pr => (p.props as string[]).includes(pr))) return false;
    return true;
  });
}

// ── Bileşen ─────────────────────────────────────────────────────
export default function GloveFinder() {
  const { dict } = useI18n();
  const lp = useLocalePath();
  const t = dict.gloveFinder;

  // İkon (sabit) + etiket (dile göre) birleştirilir.
  const ENV_OPTS = ENV_ICONS.map(o => ({ ...o, ...t.envs[o.value] }));
  const PROP_OPTS = PROP_ICONS.map(o => ({ ...o, ...t.props[o.value] }));

  const [step, setStep]               = useState<0 | 1>(0);
  const [envs, setEnvs]               = useState<EnvValue[]>([]);
  const [props, setProps]             = useState<PropValue[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [animKey, setAnimKey]         = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ env?: string; usage?: string }>).detail;
      const incoming = (detail.env || detail.usage || '') as EnvValue;
      if (incoming) {
        setEnvs([incoming]);
        setProps([]);
        setStep(0);
        setShowResults(false);
        setAnimKey(k => k + 1);
      }
    };
    window.addEventListener('glove-finder-prefill', handler);
    return () => window.removeEventListener('glove-finder-prefill', handler);
  }, []);

  function toggleEnv(v: EnvValue) {
    setEnvs(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  function toggleProp(v: PropValue) {
    setProps(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  function goNext() {
    if (step === 0 && envs.length > 0) {
      setStep(1);
      setAnimKey(k => k + 1);
    } else if (step === 1) {
      setShowResults(true);
    }
  }

  function goBack() {
    if (showResults) { setShowResults(false); return; }
    if (step === 1) { setStep(0); setAnimKey(k => k + 1); }
  }

  function reset() {
    setEnvs([]);
    setProps([]);
    setStep(0);
    setShowResults(false);
    setAnimKey(k => k + 1);
  }

  const results = showResults ? filterProducts(envs, props) : [];

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
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(142,198,63,0.12)', border: '1px solid rgba(142,198,63,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="#8ec63f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 28 L10 14 Q10 10 14 10 L14 6 Q14 3 16 3 Q18 3 18 6 L18 8 L20 8 L20 5 Q20 3 22 3 Q24 3 24 5 L24 10 Q27 10 28 14 L28 22 Q28 28 22 30 L18 30 Q10 30 10 28Z" strokeWidth="1.6"/>
            </svg>
          </div>
          <span className="font-black text-white tracking-wide" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1rem' }}>
            {t.title}
          </span>
        </div>
        <button
          onClick={reset}
          className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}
        >
          {t.reset}
        </button>
      </div>

      <div className="p-8">
        {!showResults ? (
          <div key={animKey} style={{ animation: 'fadeUp 0.35s cubic-bezier(0.25,0.8,0.25,1) both' }}>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {[0, 1].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                    style={{
                      width: 28, height: 28,
                      background: i < step ? '#8ec63f' : i === step ? 'rgba(142,198,63,0.1)' : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${i < step ? '#8ec63f' : i === step ? '#8ec63f' : 'rgba(172,199,255,0.12)'}`,
                      color: i < step ? 'white' : i === step ? '#8ec63f' : 'rgba(172,199,255,0.4)',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  {i === 0 && (
                    <div className="h-px" style={{ width: 32, background: step > 0 ? '#8ec63f' : 'rgba(172,199,255,0.12)' }} />
                  )}
                </div>
              ))}
              <span className="ml-2 text-xs font-bold" style={{ color: 'rgba(172,199,255,0.75)' }}>
                {step + 1} / 2
              </span>
            </div>

            {/* Step 1: Ortam — çoklu seçim */}
            {step === 0 && (
              <>
                <h3 className="font-black text-white text-xl mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                  {t.step1Title}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(172,199,255,0.6)' }}>
                  {t.step1Desc} <strong style={{ color: 'rgba(200,220,255,0.8)' }}>{t.step1DescStrong}</strong>
                </p>
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
                  {ENV_OPTS.map((opt, i) => {
                    const isSelected = envs.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleEnv(opt.value)}
                        aria-pressed={isSelected}
                        className="text-left p-5 rounded-xl transition-all duration-200 relative"
                        style={{
                          background: isSelected ? 'rgba(142,198,63,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1.5px solid ${isSelected ? '#8ec63f' : 'rgba(172,199,255,0.1)'}`,
                          transform: isSelected ? 'translateY(-2px)' : 'none',
                          boxShadow: isSelected ? '0 8px 24px rgba(142,198,63,0.2)' : 'none',
                          color: isSelected ? '#8ec63f' : 'rgba(172,199,255,0.55)',
                          animation: `fadeUp 0.3s ${i * 0.05}s both`,
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          className="absolute top-3 right-3 w-4 h-4 rounded flex items-center justify-center transition-all"
                          style={{
                            background: isSelected ? '#8ec63f' : 'transparent',
                            border: `2px solid ${isSelected ? '#8ec63f' : 'rgba(172,199,255,0.25)'}`,
                          }}
                        >
                          {isSelected && (
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 6l3 3 5-5"/>
                            </svg>
                          )}
                        </div>
                        <div className="mb-4"><opt.Icon /></div>
                        <div className="font-bold text-base text-white mb-1">{opt.label}</div>
                        <div className="text-xs leading-snug" style={{ color: 'rgba(172,199,255,0.75)' }}>{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {envs.length > 0 && (
                  <p className="text-xs mt-3" style={{ color: 'rgba(172,199,255,0.75)' }}>
                    {envs.length} {t.envSelected}
                  </p>
                )}
              </>
            )}

            {/* Step 2: Dayanım — çoklu seçim */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                    {t.step2Title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(172,199,255,0.1)', color: 'rgba(172,199,255,0.6)' }}>
                    {t.optional}
                  </span>
                </div>
                <p className="text-sm mb-1.5" style={{ color: 'rgba(172,199,255,0.6)' }}>
                  {t.step2Desc} <strong style={{ color: 'rgba(200,220,255,0.85)' }}>{t.step2DescStrong}</strong> {t.step2DescTail}
                </p>
                <p className="text-xs mb-5" style={{ color: 'rgba(172,199,255,0.75)' }}>
                  {t.envsLabel}{' '}
                  {envs.map((e, i) => {
                    const label = ENV_OPTS.find(o => o.value === e)?.label ?? e;
                    return <span key={e} style={{ color: '#8ec63f' }}>{i > 0 ? ', ' : ''}{label}</span>;
                  })}
                </p>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                  {PROP_OPTS.map((opt, i) => {
                    const isSelected = props.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleProp(opt.value)}
                        aria-pressed={isSelected}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left"
                        style={{
                          background: isSelected ? 'rgba(142,198,63,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1.5px solid ${isSelected ? '#8ec63f' : 'rgba(172,199,255,0.1)'}`,
                          animation: `fadeUp 0.3s ${i * 0.04}s both`,
                        }}
                      >
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all"
                          style={{
                            background: isSelected ? '#8ec63f' : 'transparent',
                            border: `2px solid ${isSelected ? '#8ec63f' : 'rgba(172,199,255,0.3)'}`,
                          }}
                        >
                          {isSelected && (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 6l3 3 5-5"/>
                            </svg>
                          )}
                        </div>
                        <div style={{ color: isSelected ? '#8ec63f' : 'rgba(172,199,255,0.55)' }}>
                          <opt.Icon />
                        </div>
                        <div>
                          <div className="font-bold text-base" style={{ color: isSelected ? 'white' : 'rgba(220,230,255,0.85)' }}>{opt.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'rgba(172,199,255,0.75)' }}>{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {props.length > 0 && (
                  <p className="text-xs mt-3" style={{ color: 'rgba(172,199,255,0.75)' }}>
                    {props.length} özellik seçili
                  </p>
                )}
              </>
            )}

            {/* Navigasyon */}
            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <button
                  onClick={goBack}
                  className="px-5 py-3 rounded-lg text-sm font-bold"
                  style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}
                >
                  {t.back}
                </button>
              ) : <div />}
              <button
                onClick={goNext}
                disabled={step === 0 && envs.length === 0}
                className="px-8 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  background: (step === 0 ? envs.length > 0 : true) ? 'linear-gradient(135deg,#003608,#005c14)' : 'rgba(255,255,255,0.05)',
                  color: (step === 0 ? envs.length > 0 : true) ? 'white' : 'rgba(172,199,255,0.3)',
                  border: `1px solid ${(step === 0 ? envs.length > 0 : true) ? 'rgba(142,198,63,0.3)' : 'rgba(172,199,255,0.08)'}`,
                  cursor: (step === 0 ? envs.length > 0 : true) ? 'pointer' : 'not-allowed',
                  boxShadow: (step === 0 ? envs.length > 0 : true) ? '0 4px 16px rgba(0,79,17,0.4)' : 'none',
                }}
              >
                {step === 1 ? t.seeResults : t.next}
              </button>
            </div>
          </div>
        ) : (
          /* Sonuçlar */
          <div key={`results-${animKey}`} style={{ animation: 'fadeUp 0.35s cubic-bezier(0.25,0.8,0.25,1) both' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                  {results.length > 0 ? `${results.length} ${t.found}` : t.notFoundTitle}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(172,199,255,0.75)' }}>
                  {t.resultsSubtitle}
                </p>
              </div>
              <button
                onClick={goBack}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ color: 'rgba(172,199,255,0.6)', border: '1px solid rgba(172,199,255,0.15)' }}
              >
                {t.change}
              </button>
            </div>

            {/* Seçim etiketleri */}
            <div className="flex flex-wrap gap-2 mb-5">
              {envs.map(e => {
                const label = ENV_OPTS.find(o => o.value === e)?.label ?? e;
                return (
                  <span key={e} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.25)' }}>
                    {label}
                  </span>
                );
              })}
              {props.map(pr => {
                const opt = PROP_OPTS.find(o => o.value === pr);
                return opt ? (
                  <span key={pr} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(92,147,214,0.1)', color: '#acc7ff', border: '1px solid rgba(92,147,214,0.25)' }}>
                    {opt.label}
                  </span>
                ) : null;
              })}
            </div>

            {results.length > 0 ? (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {results.map((p, i) => (
                  <Link
                    key={p.id}
                    href={lp(`/products/${p.id}`)}
                    className="block text-left p-5 rounded-xl transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(172,199,255,0.1)',
                      animation: `fadeUp 0.3s ${i * 0.04}s both`,
                    }}
                  >
                    <div className="relative h-40 mb-4 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 280px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#8ec63f' }}>{p.categoryLabel}</div>
                    <div className="font-bold text-white text-base mb-2 leading-tight">{p.name}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(p.props as string[]).filter(pr => pr !== 'disposable').map(pr => {
                        const opt = PROP_OPTS.find(o => o.value === pr);
                        return opt ? (
                          <span key={pr} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(172,199,255,0.08)', color: 'rgba(172,199,255,0.6)' }}>
                            {opt.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="text-xs font-bold" style={{ color: '#acc7ff' }}>{t.seeDetails}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm font-bold text-white mb-1">{t.noMatch}</p>
                <p className="text-xs mb-4" style={{ color: 'rgba(172,199,255,0.75)' }}>{t.noMatchHint}</p>
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#003608,#005c14)', border: '1px solid rgba(142,198,63,0.3)' }}
                >
                  {t.retry}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
