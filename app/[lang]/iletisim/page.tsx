import LalanNav from '@/components/lalan/nav';
import { GradientBackground } from '@/components/ui/gradient-background';
import {
  CONTACT,
  ORGANIZATION_ID,
  telHref,
  whatsappHref,
  formatAddress,
  hasAddress,
} from '@/lib/contact';
import { isLocale, localizedAlternates, robotsFor } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';

const DARK_GRADIENTS = [
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
  'linear-gradient(160deg, #001a08 0%, #003885 50%, #000f2e 100%)',
  'linear-gradient(160deg, #000f2e 0%, #004f11 45%, #001233 100%)',
  'linear-gradient(160deg, #000f2e 0%, #5c93d6 50%, #001a08 100%)',
];

const SITE_URL = 'https://lalanmena.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    robots: robotsFor(lang),
    alternates: localizedAlternates(lang, '/iletisim'),
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      url: `${SITE_URL}/${lang}/iletisim`,
      type: 'website',
    },
  };
}

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(172,199,255,0.08)',
} as const;

const LABEL_STYLE = {
  color: 'rgba(172,199,255,0.45)',
} as const;

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ContactCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl flex gap-4 items-start" style={CARD_STYLE}>
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={LABEL_STYLE}>
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contact;

  const address = formatAddress(CONTACT.address);
  const showAddress = hasAddress(CONTACT.address);

  // Künye yalnızca en az bir yasal alan doldurulduğunda gösterilir.
  const legalRows = [
    { label: t.labels.legalName, value: CONTACT.legalName },
    { label: t.labels.taxOffice, value: CONTACT.taxOffice },
    { label: t.labels.taxNumber, value: CONTACT.taxNumber },
    { label: t.labels.mersisNo, value: CONTACT.mersisNo },
  ].filter(r => r.value);

  // Kurum bilgisi (telefon/adres dahil) tek yerde, app/[lang]/layout.tsx'teki
  // Organization bloğunda tanımlı. Burada onu tekrarlamak yerine @id ile
  // referans veriyoruz — aynı sayfada iki kurum varlığı çıkmasın diye.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t.kicker,
    url: `${SITE_URL}/${lang}/iletisim`,
    mainEntity: { '@id': ORGANIZATION_ID },
  };

  return (
    <GradientBackground
      gradients={DARK_GRADIENTS}
      animationDuration={14}
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#e8edf5' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LalanNav />

      <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-24">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#8ec63f' }}>
            {t.kicker}
          </p>
          <h1
            className="text-3xl md:text-4xl font-black mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
          >
            {t.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(172,199,255,0.8)' }}>
            {t.intro}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <ContactCard icon={<MailIcon />} label={t.labels.email}>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-sm font-bold text-white transition-colors hover:text-[#8ec63f] break-all"
            >
              {CONTACT.email}
            </a>
          </ContactCard>

          {CONTACT.phone && (
            <ContactCard icon={<PhoneIcon />} label={t.labels.phone}>
              <a
                href={telHref(CONTACT.phone)}
                className="text-sm font-bold text-white transition-colors hover:text-[#8ec63f]"
              >
                {CONTACT.phone}
              </a>
            </ContactCard>
          )}

          {CONTACT.whatsapp && (
            <ContactCard icon={<PhoneIcon />} label={t.labels.whatsapp}>
              <a
                href={whatsappHref(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white transition-colors hover:text-[#8ec63f]"
              >
                {CONTACT.whatsapp}
              </a>
            </ContactCard>
          )}

          {showAddress && (
            <ContactCard icon={<PinIcon />} label={t.labels.address}>
              <p className="text-sm font-semibold text-white leading-relaxed">{address}</p>
              {CONTACT.mapsUrl && (
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-bold transition-colors"
                  style={{ color: '#8ec63f' }}
                >
                  {t.labels.openInMaps}
                </a>
              )}
            </ContactCard>
          )}

          {CONTACT.workingHours && (
            <ContactCard icon={<ClockIcon />} label={t.labels.workingHours}>
              <p className="text-sm font-semibold text-white">{CONTACT.workingHours}</p>
            </ContactCard>
          )}
        </div>

        {/* Birincil CTA */}
        <div
          className="p-8 md:p-10 rounded-3xl text-center mb-12"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(172,199,255,0.1)',
          }}
        >
          <h2
            className="text-xl md:text-2xl font-black text-white mb-3"
            style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
          >
            {t.cta.title}
          </h2>
          <p className="text-sm leading-relaxed mb-7 max-w-[52ch] mx-auto" style={{ color: 'rgba(172,199,255,0.75)' }}>
            {t.cta.body}
          </p>
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t.cta.subject)}`}
            className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)',
              boxShadow: '0 8px 24px rgba(0,79,17,0.45)',
              border: '1px solid rgba(142,198,63,0.3)',
            }}
          >
            <MailIcon />
            {t.cta.button}
          </a>
        </div>

        {legalRows.length > 0 && (
          <section
            className="p-6 rounded-2xl"
            style={CARD_STYLE}
            aria-labelledby="kunye-baslik"
          >
            <h2
              id="kunye-baslik"
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4"
              style={LABEL_STYLE}
            >
              {t.labels.legal}
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {legalRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 text-sm">
                  <dt style={{ color: 'rgba(172,199,255,0.6)' }}>{label}</dt>
                  <dd className="font-semibold text-white text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>
    </GradientBackground>
  );
}
