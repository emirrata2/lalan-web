import Image from 'next/image';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import TimelineScrollLine from '@/components/lalan/timeline-scroll-line';

export const metadata = {
  title: 'Tarihçe | Lalan MENA',
  description: '1940\'tan bu yana kauçuk sektöründe seksen yılı aşkın bir yolculuk — Lalan Group\'un kuruluşundan bugüne zaman çizelgesi.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

const KEY_STATS = [
  { n: '1 Milyar+',  l: 'Yıllık Eldiven\nÜretim Kapasitesi', color: '#8ec63f' },
  { n: '12.000+',    l: 'Küresel Çalışan',                    color: '#5c93d6' },
  { n: '7',          l: 'Modern Üretim\nTesisi',               color: '#8ec63f' },
  { n: '75+',        l: 'İhracat Ülkesi',                     color: '#5c93d6' },
  { n: '500.000+',   l: 'Yıllık Fidan\nÜretimi',              color: '#8ec63f' },
  { n: '68.8M m²',   l: 'FSC® Sertifikalı\nAlan',             color: '#5c93d6' },
  { n: '13',         l: 'FSC® Plantasyon\nBölgesi',            color: '#8ec63f' },
  { n: '80+',        l: 'Yıllık Deneyim',                     color: '#5c93d6' },
];

type Milestone = {
  year: string;
  title: string;
  desc: string;
  highlight: boolean;
  img?: string;
  imgAlt?: string;
};

const MILESTONES: Milestone[] = [
  {
    year: '1940',
    title: 'Bir Ticaret Masasından Başlayan Yolculuk',
    desc: 'Peter Hapangama ve oğlu David Hapangama, Sri Lanka\'nın verimli topraklarında kauçuk ticareti operasyonlarını başlatır. Küçük bir ticaret masasından filizlenen bu girişim, Lalan Group\'un temelini atar.',
    highlight: true,
    img: '/images/tarihce/journey-1940.jpg',
    imgAlt: '1940 — Lalan kauçuk ticareti',
  },
  {
    year: '1956',
    title: 'İlk Uluslararası İhracat',
    desc: 'Lalan, yurt içi kauçuk ticaretinin sınırlarını aşarak ilk kez uluslararası pazarlara açılır. Küresel bir oyuncu haline gelecek grubun dışa açılım yolculuğu başlar.',
    highlight: true,
    img: '/images/tarihce/journey-1956.jpg',
    imgAlt: '1956 — İlk uluslararası ihracat',
  },
  {
    year: '1983',
    title: 'Üçüncü Nesil, Yeni Vizyon',
    desc: 'David Hapangama\'nın oğlu Lalith Hapangama aile işine katılır. Katma değerli üretim konseptlerini şirkete taşıyan Lalith, Lalan\'ın sanayi devine dönüşmesinin baş mimarı olur.',
    highlight: true,
    img: 'https://images.unsplash.com/photo-1670483109381-8bccb7d29383?auto=format&w=800&q=82',
    imgAlt: '1983 — Endüstriyel tesis, üçüncü nesil yönetim',
  },
  {
    year: '1984',
    title: 'İlk Çeşitlendirme: Baskı & Ambalaj',
    desc: 'İlk Lalan Baskı ve Ambalaj fabrikası devreye girer. Şirket, çekirdek kauçuk ticaretinin ötesine ilk kez geçerek çok sektörlü yapısının temelini atar.',
    highlight: true,
    img: 'https://images.unsplash.com/photo-1727517786578-ff2bb896b852?auto=format&w=800&q=82',
    imgAlt: '1984 — Baskı ve ambalaj fabrikası makineleri',
  },
  {
    year: '1987',
    title: 'Lalan Rubbers Doğuyor',
    desc: 'İkinci nesil aileye dahil olurken katma değerli üretime geçilir. Sri Lanka\'nın Warakapola şehrinde ilk kauçuk eldiven üretim tesisi faaliyete geçer. Zamanla eldiven üretimi, kauçuk ticaretini geride bırakarak grubun ana faaliyet alanı haline gelir.',
    highlight: true,
    img: '/images/tarihce/journey-1987.jpg',
    imgAlt: '1987 — İlk eldiven üretim tesisi, Warakapola',
  },
  {
    year: '1988–1998',
    title: 'Birinci Genişleme: 1\'den 6 Tesise',
    desc: 'Lalan Rubbers\'ın birinci üretim genişleme dönemi: tek tesisten altı üretim tesisine ulaşılır. Sri Lanka genelinde kapasite hızla büyür, ihracat ağı derinleşir.',
    highlight: true,
    img: 'https://images.unsplash.com/photo-1654703680007-d5d9699cddfd?auto=format&w=800&q=82',
    imgAlt: '1988–1998 — Fabrika genişlemesi, üretim hattı',
  },
  {
    year: '1998–2000',
    title: 'Süregelen Büyüme',
    desc: 'Lalan Rubbers ve Lalan Baskı & Ambalaj\'ın kapasiteleri genişlemeye devam eder. Ürün çeşitliliği ve ihracat pazarları derinleşir; grup Sri Lanka\'nın önde gelen sanayi kuruluşları arasındaki yerini pekiştirir.',
    highlight: true,
    img: 'https://images.unsplash.com/photo-1741183399189-642274083f48?auto=format&w=800&q=82',
    imgAlt: '1998–2000 — Eldiven üretimi, süregelen büyüme',
  },
  {
    year: '2003',
    title: 'Toprakla Gelen Güç: Plantasyonlar',
    desc: 'Bölgesel bir plantasyon şirketinin satın alınmasıyla Lalan tarım sektörüne adım atar. 17.000 dönümü aşan kauçuk, çay, hindistancevizi ve tarçın plantasyonlarıyla hammaddeden son ürüne dikey entegrasyon sağlanır.',
    highlight: true,
    img: '/images/tarihce/journey-2003.jpg',
    imgAlt: '2003 — Lalan plantasyon varlıkları',
  },
  {
    year: '2004–2009',
    title: 'Birinci Uluslararası Açılım',
    desc: 'Birleşik Krallık merkezli çeşitli şirketlerin satın alınmasıyla Sri Lanka dışında ilk ticari operasyonlar kurulur. Mühendislik ve turizm sektörlerine çeşitlendirme yapılır; uluslararası kurumsal yapı güçlenir.',
    highlight: true,
    img: '/images/tarihce/journey-2004-2009.jpg',
    imgAlt: '2004–2009 — Uluslararası açılım',
  },
  {
    year: '2009–2014',
    title: 'İkinci Genişleme & Yenilenebilir Enerji',
    desc: 'İkinci üretim genişleme dönemi: altı tesisten dokuza ulaşılır, ürün portföyü dikişsiz iş eldivenlerinden tek kullanımlık nitril eldivenlerine kadar genişler. Yenilenebilir enerji sektörüne ilk yatırımlar yapılır. 2010\'da FSC® orman sertifikası alınır.',
    highlight: true,
    img: '/images/tarihce/journey-2009-2014.jpg',
    imgAlt: '2009–2014 — Üretim genişlemesi',
  },
  {
    year: '2015–Günümüz',
    title: 'Üçüncü Genişleme & Dört Kıtada Ticaret',
    desc: 'Üçüncü üretim genişleme programı, tesis sayısını dokuza çıkarır. Ailenin dördüncü nesli işe katılır; Lalan Malaysia, Lalan Brazil, Lalan Turkey ve Lalan Middle East ofisleriyle uluslararası operasyonlar dört kıtaya yayılır. 12.000\'den fazla çalışan, yıllık 1 milyarı aşan üretim kapasitesi.',
    highlight: true,
    img: '/images/tarihce/journey-2015-present.jpg',
    imgAlt: '2015–Günümüz — Küresel liderlik',
  },
  {
    year: '2024–2026',
    title: 'Türkiye & MENA: Yetkili Distribütörlük',
    desc: 'Türkiye ve MENA bölgesinde yetkili distribütörlük ağı tam kapasiteyle devreye girer. Lalan Rubbers\'ın uluslararası sertifikalı ürünleri; endüstriyel, kimyasal, gıdaya uygun ve dikişsiz iş eldiveni kategorilerinde B2B müşterilere ulaştırılmaya başlanır.',
    highlight: true,
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&w=800&q=82',
    imgAlt: 'İstanbul Türkiye',
  },
];

export default function TarihcePage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main className="max-w-6xl mx-auto px-6 md:px-8 pt-36 pb-32">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <Image
                src="/logos/lalan-group-logo.png"
                alt="Lalan Group"
                width={120}
                height={40}
                className="object-contain"
                style={{ height: '30px', width: 'auto' }}
              />
            </div>
            <div className="h-5 w-px" style={{ background: 'rgba(172,199,255,0.15)' }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8ec63f' }}>
              1940 — 2026
            </p>
          </div>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            Seksen Yılı Aşkın<br />
            <span style={{ color: '#8ec63f' }}>Kauçuk Mirası</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            1940&apos;ta Sri Lanka&apos;da başlayan bir ticaret macerası, bugün beş kıtada faaliyet gösteren
            ve yılda 1 milyarı aşkın eldiven üreten küresel bir kauçuk devi haline geldi.
          </p>
        </div>

        {/* Key stats */}
        <div
          className="rounded-3xl p-8 mb-24 relative overflow-hidden"
          style={{ background: 'rgba(0,20,50,0.75)', border: '1px solid rgba(92,147,214,0.15)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(142,198,63,0.07) 0%, transparent 70%)' }}
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-7 relative" style={{ color: 'rgba(172,199,255,0.4)' }}>
            Lalan Group — 2026 Rakamları
          </p>
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-7">
            {KEY_STATS.map(({ n, l, color }) => (
              <div key={l}>
                <div
                  className="font-black mb-1.5 leading-none"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color }}
                >
                  {n}
                </div>
                <div
                  className="text-[10px] font-bold uppercase tracking-wider whitespace-pre-line leading-snug"
                  style={{ color: 'rgba(172,199,255,0.45)' }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2
            className="font-black text-white mb-14 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
          >
            Yolculuğumuz
          </h2>

          <TimelineScrollLine>
          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              m.highlight && m.img ? (
                /* Visual card for highlighted milestones */
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(142,198,63,0.05)',
                    border: '1px solid rgba(142,198,63,0.18)',
                  }}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden md:[direction:ltr]" style={{ minHeight: '260px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.imgAlt ?? m.title}
                        className="w-full h-full object-cover absolute inset-0"
                        style={{ minHeight: '260px' }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: i % 2 === 0
                            ? 'linear-gradient(to right, transparent 60%, rgba(0,15,46,0.85))'
                            : 'linear-gradient(to left, transparent 60%, rgba(0,15,46,0.85))',
                        }}
                      />
                      {/* Year badge on image */}
                      <div className="absolute top-5 left-5 md:[direction:ltr]">
                        <span
                          className="font-black text-2xl tabular-nums px-4 py-2 rounded-xl"
                          style={{
                            fontFamily: 'var(--font-manrope), sans-serif',
                            background: 'rgba(0,8,28,0.8)',
                            color: '#8ec63f',
                            border: '1px solid rgba(142,198,63,0.3)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {m.year}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="p-8 md:p-10 flex flex-col justify-center md:[direction:ltr]">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 block"
                        style={{ color: '#8ec63f' }}
                      >
                        Öne Çıkan
                      </span>
                      <h3
                        className="font-black text-white mb-4 leading-tight"
                        style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.75)' }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ) : m.highlight ? (
                /* Highlighted card without image */
                <div
                  key={i}
                  className="rounded-2xl p-6 sm:p-8"
                  style={{ background: 'rgba(142,198,63,0.06)', border: '1px solid rgba(142,198,63,0.2)' }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-black tabular-nums flex-shrink-0 mt-0.5"
                      style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.6rem', color: '#8ec63f' }}
                    >
                      {m.year}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular card */
                <div
                  key={i}
                  className="rounded-xl p-5 sm:p-6 flex items-start gap-5"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(172,199,255,0.07)' }}
                >
                  <span
                    className="font-black tabular-nums flex-shrink-0 mt-0.5 w-24 text-right hidden sm:block"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.1rem', color: 'rgba(172,199,255,0.4)' }}
                  >
                    {m.year}
                  </span>
                  <div className="sm:pl-2" style={{ borderLeft: '1px solid rgba(172,199,255,0.12)', paddingLeft: '1.25rem' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 sm:hidden" style={{ color: 'rgba(172,199,255,0.4)' }}>{m.year}</p>
                    <h3 className="font-bold text-white text-sm mb-1.5" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                      {m.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,212,232,0.6)' }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            ))}
          </div>
          </TimelineScrollLine>
        </div>

      </main>
    </GradientBackground>
  );
}
