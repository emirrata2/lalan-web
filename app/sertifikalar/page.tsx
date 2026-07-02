import Link from 'next/link';
import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';

export const metadata = {
  title: 'Sertifikalar | Lalan MENA',
  description: 'Lalan Rubbers\'ın sahip olduğu uluslararası kalite, güvenlik ve uyumluluk sertifikaları.',
};

const DARK_GRADIENTS = [
  'linear-gradient(to bottom, #010810, #3a6418)',
  'linear-gradient(to bottom, #01080e, #366016)',
];

const CERTS = [
  {
    name: 'ISO 9001',
    img: '/certificates/iso-9001.svg',
    body: 'ISO / BSI',
    scope: 'Kalite Yönetim Sistemi',
    desc: 'Lalan\'ın ürün ve hizmetlerinin müşteri ve mevzuat gerekliliklerini tutarlı biçimde karşılamasını güvence altına alan uluslararası kalite yönetim sistemi standardı.',
  },
  {
    name: 'ISO 13485',
    img: '/certificates/iso-13485.svg',
    body: 'ISO',
    scope: 'Tıbbi Cihaz Kalite Yönetimi',
    desc: 'Lalan\'ın laboratuvar ve tıbbi cihaz sektörüne yönelik kalite yönetim sisteminin uluslararası standartlarla uyumluluğunu belgeleyen sertifika. Medikal sınıf eldivenler için zorunludur.',
  },
  {
    name: 'FDA',
    img: '/certificates/fda.svg',
    body: 'U.S. Food & Drug Administration',
    scope: 'ABD Gıda Teması Onayı',
    desc: 'Lalan\'ın gıdaya uygun eldivenleri FDA Title 21 CFR kapsamında sertifikalandırılmıştır; eldiven bileşenlerinin gıda güvenliği düzenlemelerine uyduğunu ve "gıda veya gıda ambalajında kullanımı genel olarak güvenli maddeler" içerdiğini belgeler.',
  },
  {
    name: 'FDA 510(k)',
    img: '/certificates/fda-510k.svg',
    body: 'U.S. FDA',
    scope: 'Tıbbi Cihaz Piyasa Öncesi Bildirimi',
    desc: 'ABD\'de tıbbi cihaz olarak pazarlanan Lalan eldivenlerinin FDA piyasa öncesi bildirim sürecini (510k) başarıyla tamamladığını; güvenlik ve etkinlik gerekliliklerini karşıladığını gösterir.',
  },
  {
    name: 'Health Canada',
    img: '/certificates/health-canada.svg',
    body: 'Health Canada',
    scope: 'Kanada Piyasası Uyumluluğu',
    desc: 'Lalan eldivenlerinin Kanada Gıda ve İlaç Yasası (FDA) ile yönetmelikleri (FDR) kapsamındaki gereklilikleri karşıladığını belgeleyen Kanada federal sağlık otoritesi onayı.',
  },
  {
    name: 'REACH',
    img: '/certificates/reach.svg',
    body: 'ECHA (Avrupa)',
    scope: 'Kimyasal Madde Güvenliği',
    desc: 'Lalan\'ın AB kimyasal maddeler tüzüğünü benimsediğini; üretim sürecinde kullanılan kimyasalların insan sağlığı ve çevreye yönelik risklerini AB düzenlemelerine uygun şekilde yönettiğini belgeler.',
  },
  {
    name: 'BSCI',
    img: '/certificates/bsci.svg',
    body: 'amfori',
    scope: 'Sosyal Uyumluluk Denetimi',
    desc: 'Lalan, BSCI sosyal denetim metodolojisini kullanarak tüm tesislerindeki çalışma koşullarını sürekli iyileştirmekte ve en yüksek düzeyde sürdürmektedir. İnsan hakları, etik iş pratikleri ve tedarik zinciri şeffaflığını kapsar.',
  },
  {
    name: 'Sedex',
    img: '/certificates/sedex.svg',
    body: 'Sedex Global',
    scope: 'Sorumlu Tedarik Zinciri',
    desc: 'Sedex (Supplier Ethical Data Exchange), Lalan\'ın etik ve sosyal uyumluluk performansına ilişkin bilgileri kataloglayıp ortaklarıyla paylaşmasına olanak tanıyarak sürdürülebilir ve şeffaf bir tedarik zinciri güvencesi sağlar.',
  },
  {
    name: 'BRC Global Standards',
    img: '/certificates/brc-global-standards.svg',
    body: 'BRCGS',
    scope: 'Gıda Güvenliği & Kalitesi',
    desc: 'Gıda sektörü tedarikçileri için küresel standart. BRC Tüketici Ürünleri Sertifikasyonu kapsamında Lalan, ürün tasarımının güvenliği, yasallığı ve kalitesinin yanı sıra üretim ortamının gıda güvenliğine uygunluğunu belgeler.',
  },
  {
    name: 'GOTS',
    img: '/certificates/gots.svg',
    body: 'Global Organic Textile Standard',
    scope: 'Organik Tekstil Standardı',
    desc: 'GOTS, Lalan\'ın üretim sürecinde toksik ağartıcı, boya ve diğer kimyasalların kullanımını sınırlayan organik tekstil üretim sertifikasyonudur. Hammaddeden etiketlemeye kadar tüm zinciri kapsar.',
  },
  {
    name: 'ASTM International',
    img: '/certificates/astm-international.svg',
    body: 'ASTM International',
    scope: 'Malzeme & Test Standartları',
    desc: 'Lalan, ASTM standartlarını ürün kalitesini artırmak, sağlık ve güvenliği güçlendirmek, pazar erişimini kolaylaştırmak ve müşterilere ürünlere güvenebileceklerini göstermek amacıyla uygulamaktadır.',
  },
  {
    name: 'Sanitized®',
    img: '/certificates/sanitized.svg',
    body: 'Sanitized AG (İsviçre)',
    scope: 'Antimikrobiyal Koruma',
    desc: 'SANITIZED® antimikrobiyal işlemi, seçili Lalan ürünleri üzerinde uygulanarak eldivenlerin bakteri, küf, küf mantarı, yosun veya toz akarlarının kolonizasyonuna ve çoğalmasına karşı korunmasını sağlar.',
  },
];

const CERT_GROUPS = [
  {
    label: 'Kalite & Tıbbi',
    ids: ['ISO 9001', 'ISO 13485'],
    color: '#5c93d6',
  },
  {
    label: 'Pazar Erişimi',
    ids: ['FDA', 'FDA 510(k)', 'Health Canada'],
    color: '#8ec63f',
  },
  {
    label: 'Kimyasal & Çevre',
    ids: ['REACH', 'GOTS', 'ASTM International'],
    color: '#c87c00',
  },
  {
    label: 'Sosyal & Etik',
    ids: ['BSCI', 'Sedex', 'BRC Global Standards', 'Sanitized®'],
    color: '#a56dc8',
  },
];

export default function SertifikalarPage() {
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
        <div className="mb-16 max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8ec63f' }}>
            Kalite & Uyumluluk
          </p>
          <h1
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            Küresel Standartlarla<br />
            <span style={{ color: '#8ec63f' }}>Belgelenmiş Kalite</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(200,212,232,0.7)' }}>
            Lalan Rubbers, uluslararası kalite, güvenlik, sosyal sorumluluk ve çevresel standartlara uygunluğunu
            bağımsız kuruluşlar tarafından düzenli olarak denetlettirmektedir.
          </p>
        </div>

        {/* Count strip */}
        <div className="flex flex-wrap gap-4 mb-16">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ background: 'rgba(142,198,63,0.08)', border: '1px solid rgba(142,198,63,0.2)' }}
          >
            <span className="font-black text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif', color: '#8ec63f' }}>{CERTS.length}</span>
            <span className="text-sm font-bold" style={{ color: 'rgba(200,212,232,0.7)' }}>Uluslararası Sertifika & Standart</span>
          </div>
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ background: 'rgba(92,147,214,0.08)', border: '1px solid rgba(92,147,214,0.2)' }}
          >
            <span className="font-black text-xl" style={{ fontFamily: 'var(--font-manrope), sans-serif', color: '#5c93d6' }}>4</span>
            <span className="text-sm font-bold" style={{ color: 'rgba(200,212,232,0.7)' }}>Farklı Uyumluluk Kategorisi</span>
          </div>
        </div>

        {/* Grouped cert sections */}
        {CERT_GROUPS.map(group => {
          const groupCerts = CERTS.filter(c => group.ids.includes(c.name));
          return (
            <div key={group.label} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                <h2
                  className="font-bold text-white text-base uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(200,212,232,0.85)' }}
                >
                  {group.label}
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(172,199,255,0.07)' }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupCerts.map(cert => (
                  <div
                    key={cert.name}
                    className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.08)' }}
                  >
                    {/* Logo */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center p-2.5 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.97)' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cert.img} alt={cert.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="font-bold text-white leading-snug" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                        {cert.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: group.color }}>
                        {cert.scope}
                      </span>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(172,199,255,0.55)' }}>
                        {cert.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: 'rgba(172,199,255,0.25)' }}>
                      {cert.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Politika Belgeleri */}
        <div className="mt-16 mb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full" style={{ background: '#8ec63f' }} />
            <h2
              className="font-bold text-white text-base uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(200,212,232,0.85)' }}
            >
              Politika Belgeleri
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(172,199,255,0.07)' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'rgba(142,198,63,0.1)', color: '#8ec63f', border: '1px solid rgba(142,198,63,0.2)' }}>
              34 Belge
            </span>
          </div>

          {[
            {
              group: 'Kalite & Genel',
              color: '#8ec63f',
              items: [
                { code: 'Kalite Politikası', title: 'Kalite Politikası', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/7472f29a-quality-policy-rev-03-08.04.2021-english-and-sinhala.pdf' },
                { code: 'Tüm Politikalar', title: 'Tüm Politikalar Özeti 2022', file: 'https://www.lalanrubbers.com/wp-content/uploads/2023/06/policies-of-lalan-rubbers-pvt-ltd-2022.pdf' },
              ],
            },
            {
              group: 'İş Etiği & Hukuk',
              color: '#5c93d6',
              items: [
                { code: 'LRP.CP.02', title: 'Rüşvet & Yolsuzluk Karşıtı', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/609ef161-lrp.cp_.02-anti-bribery-corruption-policy.pdf' },
                { code: 'LRP.CP.05', title: 'Etik Ticaret', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/9c386092-lrp.cp_.05-ethical-trading-policy.pdf' },
                { code: 'LRP.CP.08', title: 'Özgür İstihdam', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/1a041227-lrp.cp_.08-free-employment-policy.pdf' },
                { code: 'LRP.CP.09', title: 'Sendika Özgürlüğü', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/d6d97af0-lrp.cp_.09-freedom-of-association-policy.pdf' },
                { code: 'LRP.CP.29', title: 'Disiplin', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/7ceffd9d-lrp.cp_.29-dicipilinary-policy.pdf' },
                { code: 'LRP.CP.34', title: 'Gizlilik & Raporlama Mekanizması', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/002e5864-lrp.cp_.34-confidentiality-reporting-mechanism.pdf' },
              ],
            },
            {
              group: 'Sosyal & İnsan Hakları',
              color: '#a56dc8',
              items: [
                { code: 'LRP.CP.03', title: 'Çocuk İşçiliği Karşıtı', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/f355d741-lrp.cp_.03-child-labour-policy.pdf' },
                { code: 'LRP.CP.07', title: 'Zorla Çalıştırma Karşıtı', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/d0e1ed9e-lrp.cp_.07-forcedprison-bonded-labour-policy.pdf' },
                { code: 'LRP.CP.11', title: 'Taciz Karşıtı', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/403ca3ca-lrp.cp_.11-harassment-policy.pdf' },
                { code: 'LRP.CP.16', title: 'Ayrım Gözetmeme', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/c0360c6f-lrp.cp_.16-non-discrimination-policy.pdf' },
                { code: 'LRP.CP.18', title: 'İşçi-Yönetim İlişkileri', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/1afb1e67-lrp.cp_.18-labour-management-policy.pdf' },
                { code: 'LRP.CP.20', title: 'Sosyal Sorumluluk', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/e3bea7ef-lrp.cp_.20-social-accountability-policy.pdf' },
                { code: 'LRP.CP.21', title: 'Ücret & Maaş', file: '/documents/quality/lalan-wages-policy.pdf' },
                { code: 'LRP.CP.24', title: 'Çalışma Saatleri', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/4938341a-lrp.cp_.24-working-hours-policy.pdf' },
                { code: 'LRP.CP.25', title: 'Genç Çalışanlar', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/0543e507-lrp.cp_.25-young-workers-policy.pdf' },
                { code: 'LRP.CP.26', title: 'İşe Alım & Emeklilik', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/1c93f56d-lrp.cp_.26-recruitment-retirement-policy.pdf' },
                { code: 'LRP.CP.30', title: 'Şikayet Politikası (Sinhala)', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/f03d7b50-lrp.cp_.30-grievance-policy-sinhala.pdf', lang: 'SI' },
                { code: 'LRP.CP.32', title: 'İnsan Hakları', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/133fe920-lrp.cp_.32-human-rights-policy.pdf' },
                { code: 'LRP.CP.33', title: 'Çalışan Veri Gizliliği', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/126c365e-lrp.cp_.33-employee-data-privacy-policy.pdf' },
              ],
            },
            {
              group: 'Çevre & Sürdürülebilirlik',
              color: '#72c26e',
              items: [
                { code: 'LRP.CP.06', title: 'Çevre Politikası', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/ee781697-lrp.cp_.06-environmental-policy.pdf' },
                { code: 'LRP.CP.22', title: 'Atık Yönetimi', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/5f5fdc2a-lrp.cp_.22-waste-management-policy.pdf' },
                { code: 'LRP.CP.23', title: 'Su Yönetimi', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/f922891c-lrp.cp_.23-water-management-policy.pdf' },
                { code: 'LRP.CP.31', title: 'Hava Emisyonu', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/0465cae1-lrp.cp_.31-air-emission-policy.pdf' },
              ],
            },
            {
              group: 'Tesis & Üretim Güvenliği',
              color: '#c87c00',
              items: [
                { code: 'LRP.CP.01', title: 'Alkol & Uyuşturucu', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/b5e5ea34-lrp.cp_.01-alcohol-drug-policy.pdf' },
                { code: 'LRP.CP.04', title: 'Temizlik', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/5bc50e3a-lrp.cp_.04-cleaning-policy.pdf' },
                { code: 'LRP.CP.10', title: 'Cam & Kırılgan Malzeme', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/89a4731a-lrp.cp_.10-glass-brittle-material-breakage-policy.pdf' },
                { code: 'LRP.CP.12', title: 'İş Sağlığı & Güvenliği', file: '/documents/quality/lalan-health-safety-policy.pdf' },
                { code: 'LRP.CP.13', title: 'Hijyen', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/c2eac4aa-lrp.cp_.13-hygiene-policy.pdf' },
                { code: 'LRP.CP.14', title: 'Metal Kontrol', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/1f07039c-lrp.cp_.14-metal-policy.pdf' },
                { code: 'LRP.CP.15', title: 'Sigara Yasağı', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/180df572-lrp.cp_.15-non-smoking-policy.pdf' },
                { code: 'LRP.CP.17', title: 'Kişisel İlaç', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/54fbb603-lrp.cp_.17-personal-medicine-policy.pdf' },
                { code: 'LRP.CP.19', title: 'Güvenlik', file: 'https://www.lalanrubbers.com/wp-content/uploads/2021/10/8e007a98-lrp.cp_.19-security-policy.pdf' },
              ],
            },
          ].map(({ group, color, items }) => (
            <div key={group} className="mb-8">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(172,199,255,0.45)' }}>{group}</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(172,199,255,0.05)' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {items.map((doc) => (
                  <a
                    key={doc.file}
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 hover:-translate-y-px"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(172,199,255,0.07)', textDecoration: 'none' }}
                  >
                    <span
                      className="flex-shrink-0 text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-md whitespace-nowrap"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                    >
                      {doc.code}
                    </span>
                    <span className="flex-1 text-xs font-semibold leading-snug min-w-0 truncate" style={{ color: 'rgba(200,212,232,0.8)' }}>
                      {doc.title}
                    </span>
                    {'lang' in doc && (
                      <span className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(172,199,255,0.07)', color: 'rgba(172,199,255,0.4)' }}>SI</span>
                    )}
                    <svg className="flex-shrink-0 opacity-30 group-hover:opacity-100 transition-opacity" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-4 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ background: 'rgba(0,8,28,0.6)', border: '1px solid rgba(172,199,255,0.08)' }}
        >
          <div>
            <h3 className="font-bold text-white mb-1" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
              Sertifika Belgelerine İhtiyacınız mı Var?
            </h3>
            <p className="text-sm" style={{ color: 'rgba(172,199,255,0.6)' }}>
              Resmi sertifika kopyaları ve uyumluluk dokümanları talep üzerine sağlanmaktadır.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sunumlar"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-px"
              style={{ background: 'rgba(92,147,214,0.12)', color: '#5c93d6', border: '1px solid rgba(92,147,214,0.25)' }}
            >
              Sunumlar & Kataloglar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg,#003608,#004f11)', color: 'white', border: '1px solid rgba(142,198,63,0.3)' }}
            >
              İletişime Geç
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

      </main>
    </GradientBackground>
  );
}
