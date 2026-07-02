import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import GloveFinderSection from '@/components/lalan/glove-finder-section';

export const metadata = {
  title: 'Eldiven Bulucu | Lalan MENA',
  description: 'Çalışma ortamınızı ve dayanım gereksinimlerinizi seçin — size en uygun Lalan eldiven modelini saniyeler içinde bulun.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
  'linear-gradient(to bottom, #020a12, #3c6618)',
  'linear-gradient(to bottom, #010710, #346014)',
];

export default function EldivenBulucuPage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />
      <div className="pt-24">
        <GloveFinderSection />
      </div>
    </GradientBackground>
  );
}
