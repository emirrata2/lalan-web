import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

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
const SITE_TITLE = "Lalan MENA | Lalan Rubbers Türkiye & MENA Distribütörü";
const SITE_DESCRIPTION =
  "Lalan Rubbers ürünlerinin Türkiye ve MENA bölgesi yetkili distribütörü. Kimyasal direnç, gıdaya uygun ve tek kullanımlık koruyucu eldiven çözümleri.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Lalan MENA",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lalan MENA — Ağaçlardan Ellerinize",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lalan MENA",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: "info@lalanmena.com",
  logo: `${SITE_URL}/logos/lalanmenalogo.svg`,
  areaServed: ["TR", "MENA"],
  slogan: "Ağaçlardan Ellerinize",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        {children}
      </body>
    </html>
  );
}
