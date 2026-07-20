import { NextResponse, type NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

// NOT: Next.js 16'da bu dosya "middleware.ts" DEĞİL "proxy.ts" adını taşır ve
// dışa aktarılan fonksiyon "proxy" olmalıdır (bkz. next/dist/docs — proxy.md).

/**
 * Accept-Language başlığından desteklenen bir dil seçer.
 * Harici bir müzakere kütüphanesi (Negotiator/intl-localematcher) eklemek yerine
 * basit q-değeri sıralaması yapıyoruz — iki dil için fazlası gereksiz.
 */
function getLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language');
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(',')
    .map(part => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find(p => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // 'en-US' → 'en' olarak da eşleşsin
    const base = tag.split('-')[0];
    const hit = LOCALES.find(l => l === tag || l === base);
    if (hit) return hit;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Statik varlıkları ve dosya uzantılı istekleri (robots.txt, sitemap.xml,
  // og-image.png, PDF'ler...) dil yönlendirmesinin dışında tut.
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
