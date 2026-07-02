'use client';

import dynamic from 'next/dynamic';

// Heavy WebGL/canvas effects — code-split out of the main bundle since
// they're decorative and not needed for first paint. `ssr: false` requires
// a Client Component boundary, hence this wrapper.
export const CelestialBloomContained = dynamic(
  () => import('@/components/ui/celestial-bloom-contained'),
  { ssr: false }
);

export const GlobePulse = dynamic(
  () => import('@/components/ui/cobe-globe-pulse').then(m => m.GlobePulse),
  { ssr: false }
);
