// İletişim bilgilerinin TEK kaynağı. Buradaki değerler /iletisim sayfası,
// ana sayfa #contact bölümü, footer ve Organization JSON-LD tarafından okunur.
//
// Boş string ('') veya null bırakılan alanlar sayfada HİÇ render edilmez —
// böylece doldurulmamış bir alan asla yanlış/eksik bilgi olarak görünmez.
// Bir alanı yayına almak için tek yapmanız gereken karşısını doldurmak.

/**
 * Sitedeki tek Organization varlığının schema.org kimliği.
 * Organization SADECE app/layout.tsx'te tanımlanır; diğer sayfalar onu yeniden
 * tanımlamak yerine bu @id ile referans verir — aynı sayfada iki farklı kurum
 * varlığı çıkmasın diye.
 */
export const ORGANIZATION_ID = 'https://lalanmena.com/#organization';

export type ContactInfo = {
  /** Ticari unvan (künye için tam yasal isim) */
  legalName: string;
  /** Görünen marka adı */
  displayName: string;
  email: string;
  /** İnsan tarafından okunan telefon, ör. '+90 212 000 00 00' */
  phone: string;
  /** WhatsApp numarası (varsa) */
  whatsapp: string;
  address: {
    /** Cadde/sokak/no ve bina */
    street: string;
    /** İlçe */
    district: string;
    /** İl */
    city: string;
    postalCode: string;
    country: string;
  };
  /** Google Maps yer linki (varsa) */
  mapsUrl: string;
  workingHours: string;
  /** Vergi dairesi ve numarası (künye) */
  taxOffice: string;
  taxNumber: string;
  /** Mersis numarası (künye) */
  mersisNo: string;
  linkedin: string;
};

export const CONTACT: ContactInfo = {
  // TODO: ticari unvanı girin, ör. 'Lalan Mena Kauçuk Ürünleri Tic. Ltd. Şti.'
  legalName: '',
  displayName: 'Lalan MENA',
  email: 'info@lalanmena.com',
  // TODO: telefon numarasını girin, ör. '+90 212 000 00 00'
  phone: '',
  // TODO: WhatsApp numarası (yoksa boş bırakın)
  whatsapp: '',
  address: {
    // TODO: açık adresi girin
    street: '',
    district: '',
    city: '',
    postalCode: '',
    country: 'Türkiye',
  },
  // TODO: Google Maps linki (yoksa boş bırakın — harita bloğu gizlenir)
  mapsUrl: '',
  // TODO: ör. 'Hafta içi 09:00 – 18:00'
  workingHours: '',
  // TODO: künye bilgileri (yoksa boş bırakın)
  taxOffice: '',
  taxNumber: '',
  mersisNo: '',
  linkedin: '',
};

/** `tel:` / `href` için numarayı sadeleştirir: '+90 212 000 00 00' → '+902120000000' */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** WhatsApp wa.me linki için numarayı sadeleştirir (baştaki + atılır). */
export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}

/** Adresin dolu parçalarını tek satırda birleştirir. Hiçbiri yoksa '' döner. */
export function formatAddress(a: ContactInfo['address']): string {
  return [a.street, a.district, a.city, a.postalCode, a.country]
    .filter(Boolean)
    .join(', ');
}

/** Adreste gösterilecek en az bir parça var mı? */
export function hasAddress(a: ContactInfo['address']): boolean {
  return Boolean(a.street || a.district || a.city);
}
