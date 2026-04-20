'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
  gradients?: string[];
  animationDuration?: number;
  animationDelay?: number;
  enableCenterContent?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
};

const Default_Gradients = [
  'linear-gradient(135deg, #000f2e 0%, #002c62 50%, #003608 100%)',
  'linear-gradient(135deg, #002c62 0%, #004f11 60%, #000f2e 100%)',
  'linear-gradient(135deg, #003608 0%, #00418c 50%, #000f2e 100%)',
  'linear-gradient(135deg, #00418c 0%, #003608 50%, #000f2e 100%)',
  'linear-gradient(135deg, #000f2e 0%, #002c62 50%, #003608 100%)',
];

export function GradientBackground({
  children,
  className = '',
  gradients = Default_Gradients,
  animationDuration = 8,
  animationDelay = 0.5,
  overlay = false,
  overlayOpacity = 0.3,
  ...rest
}: GradientBackgroundProps) {
  return (
    <div className={cn('w-full relative overflow-hidden', className)} {...rest}>
      <motion.div
        className="absolute inset-0"
        style={{ background: gradients[0] }}
        animate={{ background: gradients }}
        transition={{
          delay: animationDelay,
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
