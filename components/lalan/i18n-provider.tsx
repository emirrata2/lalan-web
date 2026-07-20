'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import { type Locale, localizePath } from '@/lib/i18n';

// NOT: Proje genelinde kural "React hooks only, Context yok" idi (CLAUDE.md).
// Çok dillilik bunun tek gerekçeli istisnası: nav/footer/katalog gibi client
// bileşenleri her sayfada kullanılıyor ve dili 13 çağrı noktasından tek tek
// prop olarak geçirmek hem tekrarlı hem hataya açık olurdu.
// Sözlük RSC yüküne serileşir (~4KB) — bu bilinçli bir takas.

type I18nValue = {
  lang: Locale;
  dict: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  lang,
  dict,
  children,
}: I18nValue & { children: React.ReactNode }) {
  return (
    <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n, I18nProvider içinde kullanılmalı (app/[lang]/layout.tsx).');
  }
  return ctx;
}

/**
 * Dil önekli link yolu üretir: useLocalePath()('/products') → '/en/products'
 * Client bileşenlerinde <Link href={lp('/products')} /> şeklinde kullanılır.
 */
export function useLocalePath() {
  const { lang } = useI18n();
  return (path: string) => localizePath(path, lang);
}
