import type { ProductPictograms } from '@/lib/products';

export default function ProductPictograms({ pictograms }: { pictograms: ProductPictograms }) {
  const { images } = pictograms;
  if (!images?.length) return null;

  return (
    <div className="mt-4">
      {/* Official pictogram images — equal size grid */}
      <div className="flex flex-wrap gap-4 justify-center">
        {images.map(({ src, label }) => (
          <div key={src} className="group relative flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#ffffff', padding: '5px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={label}
                title={label}
                width={70}
                height={70}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            {/* Tooltip on hover */}
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium
                         opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ color: 'rgba(172,199,255,0.55)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
