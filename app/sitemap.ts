import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';
import { PUBLIC_LOCALES, DEFAULT_LOCALE, LOCALE_HREFLANG } from '@/lib/i18n';

const SITE_URL = 'https://lalanmena.com';

const STATIC_ROUTES = [
  '',
  '/lalan-hakkinda',
  '/plantasyonlar',
  '/products',
  '/sertifikalar',
  '/sunumlar',
  '/surdurulebilirlik',
  '/tarihce',
  '/eldiven-bulucu',
  '/iletisim',
];

// lastModified bilerek yazılmıyor: sayfa bazında gerçek değişiklik tarihi tutmuyoruz.
// Buraya her build'de new Date() basmak, içerik değişmese bile tüm URL'leri
// "az önce güncellendi" diye işaretler; arama motorları bu sinyali zamanla
// dikkate almaz olur. Tarih yerine hiç sinyal vermemek daha doğru.

/**
 * Bir yolu her dil için üretir ve aralarına hreflang (alternates.languages)
 * bağı kurar — Google'ın iki dili aynı sayfanın karşılıkları olarak
 * eşleştirebilmesi için gerekli.
 */
function entriesForPath(path: string): MetadataRoute.Sitemap {
  // Yalnızca çevirisi tamamlanmış diller sitemap'e girer (bkz. LOCALE_READY).
  const languages = Object.fromEntries(
    PUBLIC_LOCALES.map(l => [LOCALE_HREFLANG[l], `${SITE_URL}/${l}${path}`]),
  );

  return PUBLIC_LOCALES.map(locale => ({
    url: `${SITE_URL}/${locale}${path}`,
    alternates: {
      languages: {
        ...languages,
        'x-default': `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];

  const paths = [
    ...STATIC_ROUTES,
    ...PRODUCTS.map(p => `/products/${p.id}`),
    ...categories.map(slug => `/products/category/${slug}`),
  ];

  return paths.flatMap(entriesForPath);
}
