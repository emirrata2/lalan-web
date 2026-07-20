// Çok dillilik yapılandırması — tek kaynak.
// Karar (2026-07-17): Türkçe + İngilizce. Arapça KAPSAM DIŞI — RTL desteği
// gerektiriyor (57 yön-bağımlı stil + app/[lang]/tarihce'deki direction:rtl
// düzen hilesi), ayrı bir iş olarak ele alınacak.

export const LOCALES = ['tr', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'tr';

/** Dil seçicide ve <html lang> dışındaki yerlerde gösterilen adlar. */
export const LOCALE_LABELS: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
};

/** Kısa etiket (nav'daki dil seçici için). */
export const LOCALE_SHORT: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
};

/** hreflang değerleri — bölge belirtmiyoruz, saf dil kodu. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  tr: 'tr',
  en: 'en',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Bir dilin içeriği YAYINA HAZIR mı?
 *
 * Çeviri kademeli ilerliyor: arayüz iskeleti (nav, footer, 404, iletişim)
 * İngilizce'ye çevrildi, ancak sayfa gövdeleri ve ürün metinleri hâlâ Türkçe.
 * Hazır olmayan dil:
 *   - sitemap'e girmez,
 *   - noindex ile işaretlenir,
 *   - hreflang bağlarına dahil edilmez.
 *
 * Aksi halde Google'a "işte İngilizce sürüm" deyip Türkçe içerik sunmuş olur,
 * bu da yinelenen/yanıltıcı içerik olarak değerlendirilir.
 *
 * ÇEVİRİ TAMAMLANINCA: en → true yapın, başka değişiklik gerekmez.
 */
export const LOCALE_READY: Record<Locale, boolean> = {
  tr: true,
  en: false,
};

/** Yayına hazır diller — sitemap ve hreflang bunları kullanır. */
export const PUBLIC_LOCALES = LOCALES.filter(l => LOCALE_READY[l]);

/**
 * Bir yolu belirtilen dile taşır: ('/products', 'en') → '/en/products'
 * Yolda zaten dil öneki varsa değiştirir.
 */
export function localizePath(path: string, locale: Locale): string {
  const stripped = stripLocale(path);
  return `/${locale}${stripped === '/' ? '' : stripped}` || '/';
}

/**
 * Bir sayfanın metadata.alternates bloğunu üretir: canonical kendi dilini,
 * languages ise diğer dildeki karşılığını gösterir.
 * Canonical'ın dil önekli olması şart — öneksiz hali proxy tarafından
 * yönlendirildiği için arama motoruna yönlendirilen bir URL'i canonical
 * olarak vermiş oluruz.
 */
export function localizedAlternates(locale: Locale, path: string) {
  const p = path === '/' ? '' : path;
  return {
    canonical: `/${locale}${p}`,
    // Yalnızca yayına hazır diller hreflang'e girer (bkz. LOCALE_READY).
    languages: {
      ...Object.fromEntries(PUBLIC_LOCALES.map(l => [LOCALE_HREFLANG[l], `/${l}${p}`])),
      'x-default': `/${DEFAULT_LOCALE}${p}`,
    },
  };
}

/**
 * Çevirisi tamamlanmamış dillerde arama motorlarını uzak tutar.
 * Sayfa erişilebilir kalır (önizleme/iç kullanım), ama indekslenmez.
 */
export function robotsFor(locale: Locale) {
  return LOCALE_READY[locale] ? undefined : { index: false, follow: false };
}

/** Yoldaki dil önekini söker: '/en/products' → '/products' */
export function stripLocale(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return path || '/';
}
