'use client';

import AuroraContained from '@/components/ui/aurora-contained';

export default function SustainabilitySection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#011a08' }}>
      {/* Aurora shader fills the entire section */}
      <AuroraContained />

      {/* Deep overlay keeps text readable while aurora bleeds through */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(0,31,10,0.88) 0%, rgba(0,20,8,0.72) 100%)' }} />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#72c26e]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
                <path d="M7 17.5C5.07 16.08 4 13.87 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.87-1.07 4.08-3 5.5" stroke="#a3f69c" strokeWidth="0.5"/>
              </svg>
              <span className="text-[#a3f69c] font-bold tracking-[0.15em] text-xs uppercase">
                Sürdürülebilir Gelecek
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
            >
              Gezegene Adanmış,{' '}
              <span className="text-[#72c26e]">Doğa Tarafından</span> Onaylanmış.
            </h2>

            <p className="text-[#88d982] text-lg leading-relaxed mb-10 max-w-[52ch]">
              FSC (Orman Yönetim Konseyi) sertifikalı olmaktan gurur duyuyoruz. Sürdürülebilirlik
              çerçevemiz, kauçuk plantasyonlarımızın biyoçeşitliliği korumasını ve bu alanlara
              bağımlı toplulukları desteklemesini güvence altına alır.
            </p>

            <div className="flex flex-wrap items-center gap-8 mb-10">
              <div>
                <span className="block text-white font-black text-3xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>%100</span>
                <span className="text-[#88d982] text-xs uppercase font-bold tracking-wider">Biyobozunur Lateks</span>
              </div>
              <div className="h-8 w-px bg-[#a3f69c]/20 hidden sm:block" />
              <div>
                <span className="block text-white font-black text-3xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>Sıfır</span>
                <span className="text-[#88d982] text-xs uppercase font-bold tracking-wider">Ormansızlaşma Politikası</span>
              </div>
              <div className="h-8 w-px bg-[#a3f69c]/20 hidden sm:block" />
              <div>
                <span className="block text-white font-black text-3xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>FSC</span>
                <span className="text-[#88d982] text-xs uppercase font-bold tracking-wider">Sertifikalı</span>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#a3f69c] font-bold hover:gap-4 transition-all duration-200 text-sm"
            >
              Sürdürülebilirlik girişimlerimizi keşfedin
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Image with glow */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(114,194,110,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Sustainable rubber plantation"
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&w=800&q=85"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a08]/60 to-transparent" />
            </div>

            {/* FSC badge */}
            <div
              className="absolute -bottom-6 -left-6 p-5 rounded-xl shadow-2xl"
              style={{ background: 'rgba(0,79,17,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(163,246,156,0.2)' }}
            >
              <div className="text-[#a3f69c] font-black text-2xl" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>68.796.652 m²</div>
              <div className="text-[#88d982] text-xs uppercase font-bold tracking-widest leading-tight mt-1">Yönetilen Alan</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
