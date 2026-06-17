import Image from 'next/image';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';

export const metadata = {
  title: 'Plantasyonlar & Kalite Politikası | Lalan MENA',
  description: 'Lalan Group\'un 17.500+ dönüm FSC sertifikalı plantasyonları ve Sri Lanka\'nın en büyük kauçuk fidanlığı.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

const CROPS = [
  {
    name: 'Kauçuk',
    desc: 'Ana ürün. Doğal lateksin tüm üretim sürecinde izlenebilirliğini sağlayan entegre kauçuk plantasyonları.',
    color: '#8ec63f',
  },
  {
    name: 'Çay',
    desc: 'Sri Lanka\'nın dünyaca ünlü seylan çayı üretiminin önemli bir parçası.',
    color: '#5c93d6',
  },
  {
    name: 'Hindistancevizi',
    desc: 'Tropikal iklimde yetişen hindistancevizi plantasyonları çeşitlendirilmiş tarımsal portföyün parçasıdır.',
    color: '#c87c00',
  },
  {
    name: 'Tarçın',
    desc: 'Sri Lanka tarçını (Cinnamomum verum), gurme ve ilaç endüstrisi için yüksek kaliteli ürün.',
    color: '#a05030',
  },
  {
    name: 'Ormancılık',
    desc: 'FSC sertifikalı sürdürülebilir ormancılık uygulamaları; biyoçeşitliliği koruma temel ilkedir.',
    color: '#2a7a3a',
  },
];

const QUALITY_ITEMS = [
  {
    title: 'Hammadde İzlenebilirliği',
    desc: 'Lalan\'ın kendi plantasyonlarından elde edilen lateks, kaynaktan son ürüne kadar her aşamada takip edilebilir. Bu entegre yapı, hammadde kalitesinin doğrudan kontrol altında tutulmasını ve uluslararası standartlara uyumu mümkün kılar.',
  },
  {
    title: 'Merkezi Kauçuk Fidanlığı (CRN)',
    desc: 'Sri Lanka\'nın en büyük kauçuk fidanlığı olma özelliğini taşıyan CRN, Rubber Development Department of Sri Lanka tarafından sertifikalandırılmıştır. Küçük çiftçilere yüksek verimli fidan ve geri alım garantisi sunulmaktadır.',
  },
  {
    title: 'Bağımsız Denetim & Sertifikasyon',
    desc: 'Tüm kalite standartları (ISO, FSC, BRC vb.) bağımsız akreditasyon kuruluşları tarafından yıllık denetimlerle doğrulanmaktadır. Şeffaflık ve hesap verebilirlik Lalan\'ın kurumsal değerleri arasında yer almaktadır.',
  },
  {
    title: 'Sürekli İyileştirme',
    desc: 'Lalan\'ın Ar-Ge faaliyetleri, ürün geliştirme süreçleri ve üretim teknolojileri sürekli güncellenmektedir. 1988\'den bu yana 1 tesisten 7 modern tesise ulaşılan büyüme, bu anlayışın somut göstergesidir.',
  },
];

export default function PlantasyonlarPage() {
  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={18}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <LalanNav />

      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-36 pb-32">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <Image src="/logos/lalan-group-logo.png" alt="Lalan Group" width={120} height={40} className="object-contain" style={{ height: '30px', width: 'auto' }} />
            </div>
            <div className="h-5 w-px" style={{ background: 'rgba(172,199,255,0.15)' }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8ec63f' }}>
              LALAN Hakkında
            </p>
          </div>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            Topraktan Gelen{' '}
            <span style={{ color: '#8ec63f' }}>Güç</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            2003&apos;ten bu yana 17.500 dönümü aşan plantasyon alanlarıyla Lalan, hammaddeyi kontrol eden nadir üreticilerden biridir.
            Lalan&apos;ın lateksi kendi toprağından, kendi standartlarında yetişir.
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { n: '17.500+', l: 'Dönüm Plantasyon' },
            { n: '13', l: 'FSC® Sertifikalı Bölge' },
            { n: '68.8M m²', l: 'Yönetilen Alan' },
            { n: '2003', l: 'Plantasyon Sektörüne Giriş' },
          ].map(({ n, l }) => (
            <div
              key={l}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.08)' }}
            >
              <div className="font-black text-white mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.6rem' }}>{n}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(172,199,255,0.5)' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Crops */}
        <div className="mb-20">
          <h2
            className="font-black text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Yetiştirilen Ürünler
          </h2>
          <p className="mb-8 text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(172,199,255,0.6)' }}>
            Kauçuk ağacı (Hevea brasiliensis) Lalan&apos;ın temel ürünü olmakla birlikte, çeşitlendirme stratejisi kapsamında birden fazla tropikal ürün yetiştirilmektedir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CROPS.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-6 flex gap-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.07)' }}
              >
                <div
                  className="w-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: c.color, minHeight: '40px' }}
                />
                <div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{c.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.65)' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Rubber Nursery highlight */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-20"
          style={{ background: 'rgba(0,40,12,0.5)', border: '1px solid rgba(142,198,63,0.18)' }}
        >
          <div className="flex items-start gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1"
              style={{ background: 'rgba(142,198,63,0.15)', border: '1px solid rgba(142,198,63,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8ec63f' }}>Öne Çıkan</p>
              <h3
                className="font-black text-white mb-3"
                style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.4rem' }}
              >
                Sri Lanka&apos;nın En Büyük Kauçuk Fidanlığı
              </h3>
              <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(200,212,232,0.75)' }}>
                Merkezi Kauçuk Fidanlığı (Central Rubber Nursery — CRN), Sri Lanka Kauçuk Kalkınma Departmanı tarafından sertifikalandırılmış
                ve ülkedeki en büyük fidanlık unvanını taşımaktadır. CRN, küçük çiftçilere yüksek verimli kauçuk fidanı sağlamakta ve geri alım
                garantisiyle yerel üreticilerin sürdürülebilir gelir elde etmesine katkıda bulunmaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Policy */}
        <div>
          <h2
            className="font-black text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Lalan&apos;ın Kalite Politikası
          </h2>
          <p className="mb-10 text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(172,199,255,0.6)' }}>
            Lalan&apos;da kalite, bir departmanın değil tüm organizasyonun sorumluluğudur.
          </p>
          <div className="space-y-4">
            {QUALITY_ITEMS.map((q, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex gap-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.07)' }}
              >
                <span
                  className="font-black text-2xl tabular-nums flex-shrink-0 leading-none pt-0.5"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(142,198,63,0.3)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>{q.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,212,232,0.65)' }}>{q.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dokümanlar */}
        <div className="mt-20">
          <h2
            className="font-black text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Belgeler & Raporlar
          </h2>
          <p className="mb-8 text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(172,199,255,0.6)' }}>
            Lalan&apos;ın FSC® sertifikasyon belgeleri, plantasyon yönetim planları ve agri bölümü politikaları.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Agri Bölümü Politikaları 2022',
                desc: 'Lalan Rubbers Agri Division\'ın güncel politika belgesi — çevre, iş güvenliği, kimyasal kullanım ve FSC uyum standartları.',
                file: '/documents/plantations/lalan-agri-policies-2022.pdf',
                size: '1 MB',
                lang: 'EN',
              },
              {
                title: 'Agri Bölümü Politikaları 2021',
                desc: 'Amendment IV — FSC sertifikası kapsamında kauçuk, orman ve tarım alanlarına uygulanan operasyonel politikalar.',
                file: '/documents/plantations/lalan-agri-policies-2021.pdf',
                size: '859 KB',
                lang: 'EN',
              },
              {
                title: 'FSC® Orman Yönetim Planı 2018–22',
                desc: 'FSC Manual: Lalan\'ın 68,8 milyon m² sertifikalı alanına ait beş yıllık orman yönetim planı ve sürdürülebilirlik hedefleri.',
                file: '/documents/plantations/lalan-fsc-management-plan-2018-22.pdf',
                size: '948 KB',
                lang: 'EN',
              },
            ].map((doc) => (
              <a
                key={doc.file}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.08)', textDecoration: 'none' }}
              >
                {/* İkon + rozetler */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(142,198,63,0.12)', border: '1px solid rgba(142,198,63,0.2)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <polyline points="9 15 12 18 15 15"/>
                    </svg>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ background: 'rgba(172,199,255,0.07)', color: 'rgba(172,199,255,0.5)' }}>
                      PDF
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ background: 'rgba(172,199,255,0.07)', color: 'rgba(172,199,255,0.5)' }}>
                      {doc.lang}
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm mb-2 leading-snug" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                    {doc.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(172,199,255,0.5)' }}>
                    {doc.desc}
                  </p>
                </div>

                {/* Alt çubuk */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(172,199,255,0.06)' }}>
                  <span className="text-[10px] font-medium" style={{ color: 'rgba(172,199,255,0.35)' }}>{doc.size}</span>
                  <span
                    className="text-[11px] font-bold flex items-center gap-1.5 transition-colors group-hover:text-white"
                    style={{ color: '#8ec63f' }}
                  >
                    İndir
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </main>
    </GradientBackground>
  );
}
