'use client';

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: string;
  label: string;
}

export default function Counter({ end, label }: CounterProps) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const match = end.match(/([\d.]+)(.*)/);
          if (!match) { setDisplay(end); return; }

          const target = parseFloat(match[1]);
          const suffix = match[2] ?? '';
          const duration = 1800;
          const startTime = performance.now();

          const tick = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            const val = target < 10 ? (target * eased).toFixed(0) : Math.round(target * eased).toString();
            setDisplay(val + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <span
        className="block text-white font-black text-4xl md:text-5xl tabular-nums"
        style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
      >
        {display}
      </span>
      <span className="block text-xs font-bold uppercase tracking-widest mt-2" style={{ color: '#72c26e' }}>
        {label}
      </span>
    </div>
  );
}
