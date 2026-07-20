import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { CONTACT, ORGANIZATION_ID, hasAddress } from "@/lib/contact";
import { LOCALES, isLocale, localizedAlternates, robotsFor } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { I18nProvider } from "@/components/lalan/i18n-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://lalanmena.com";

const META: Record<string, { title: string; description: string; ogLocale: string }> = {
  tr: {
    title: "Lalan MENA | Lalan Rubbers Türkiye & MENA Distribütörü",
    description:
      "Lalan Rubbers ürünlerinin Türkiye ve MENA bölgesi yetkili distribütörü. Kimyasal direnç, gıdaya uygun ve tek kullanımlık koruyucu eldiven çözümleri.",
    ogLocale: "tr_TR",
  },
  en: {
    title: "Lalan MENA | Lalan Rubbers Distributor for Türkiye & MENA",
    description:
      "Authorised distributor of Lalan Rubbers products for Türkiye and the MENA region. Chemical-resistant, food-safe and disposable protective glove solutions.",
    ogLocale: "en_US",
  },
};

// Her dil için statik sayfa üretilir — site tamamen SSG kalır.
export async function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = META[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    // Çevirisi bitmemiş dil noindex — bkz. lib/i18n.ts LOCALE_READY
    robots: robotsFor(lang),
    // hreflang: her sayfanın diğer dildeki karşılığını arama motoruna bildirir.
    alternates: localizedAlternates(lang, '/'),
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${lang}`,
      siteName: "Lalan MENA",
      locale: m.ogLocale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Lalan MENA",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  // Sitedeki TEK Organization varlığı. Diğer sayfalar bunu tekrar tanımlamak
  // yerine ORGANIZATION_ID ile referans verir (bkz. app/[lang]/iletisim/page.tsx).
  // Doldurulmamış iletişim alanları JSON-LD'ye hiç eklenmez — bkz. lib/contact.ts
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: CONTACT.displayName,
    ...(CONTACT.legalName && { legalName: CONTACT.legalName }),
    description: META[lang].description,
    url: SITE_URL,
    email: CONTACT.email,
    ...(CONTACT.phone && { telephone: CONTACT.phone }),
    ...(CONTACT.linkedin && { sameAs: [CONTACT.linkedin] }),
    ...(hasAddress(CONTACT.address) && {
      address: {
        "@type": "PostalAddress",
        ...(CONTACT.address.street && { streetAddress: CONTACT.address.street }),
        ...(CONTACT.address.district && { addressLocality: CONTACT.address.district }),
        ...(CONTACT.address.city && { addressRegion: CONTACT.address.city }),
        ...(CONTACT.address.postalCode && { postalCode: CONTACT.address.postalCode }),
        ...(CONTACT.address.country && { addressCountry: CONTACT.address.country }),
      },
    }),
    logo: `${SITE_URL}/logos/lalanmenalogo.svg`,
    areaServed: ["TR", "MENA"],
    slogan: "Ağaçlardan Ellerinize",
  };

  return (
    <html lang={lang} className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
