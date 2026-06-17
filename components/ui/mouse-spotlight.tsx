'use client';
import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1000, y: 400 });
  const tar = useRef({ x: -1000, y: 400 });

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tar.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const l = 0.20;
      pos.current.x += (tar.current.x - pos.current.x) * l;
      pos.current.y += (tar.current.y - pos.current.y) * l;

      if (ref.current) {
        const { x, y } = pos.current;

        // Scroll-based opacity fade: 1.0 at top → ~0.15 at 2 viewports down.
        // Radius stays fixed at 360px throughout — only brightness changes.
        const fade = Math.max(0.15, 1 / (1 + window.scrollY / window.innerHeight));

        ref.current.style.backgroundImage =
          `radial-gradient(220px circle at ${x}px ${y}px, ` +
          `rgba(210,245,150,${(0.45 * fade).toFixed(3)}) 0%, ` +
          `rgba(142,198,63,${(0.30 * fade).toFixed(3)}) 35%, ` +
          `rgba(92,147,214,${(0.12 * fade).toFixed(3)}) 65%, ` +
          `transparent 100%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 2, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
