import 'server-only';
import type { Locale } from './i18n';

// Sözlükler dinamik import ile yüklenir: yalnızca istenen dilin JSON'u
// sunucuda çözülür, istemci paketine hiç girmez.
const dictionaries = {
  tr: () => import('@/dictionaries/tr.json').then(m => m.default),
  en: () => import('@/dictionaries/en.json').then(m => m.default),
};

// Türkçe referans şemadır: en.json'da eksik/fazla anahtar olursa
// getDictionary'nin dönüş tipi uyuşmaz ve derleme zamanında hata verir.
export type Dictionary = Awaited<ReturnType<typeof dictionaries.tr>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
