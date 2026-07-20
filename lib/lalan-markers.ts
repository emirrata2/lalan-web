export interface PulseMarker {
  id: string
  location: [number, number]
  delay: number
  label: string
  highlight?: boolean
}

// Lalan Group'un doğrulanmış uluslararası operasyonları (resmi kaynak:
// lalanmiddleeast.com/certifications — 7 lokasyon):
// Merkez Sri Lanka + Lalan Turkey, Lalan Middle East (Umman/Sohar),
// Tunus (Kuzey Afrika), Lalan UK, Lalan Malaysia, Lalan Brazil.
// (Almanya/ABD/Japonya ihracat pazarıdır, ofis değildir.)
export const LALAN_MARKERS: PulseMarker[] = [
  { id: "lk",  location: [6.93,   79.85],  delay: 0,    label: "Sri Lanka — Merkez" },
  { id: "tr",  location: [41.01,  28.98],  delay: 0.3,  label: "Türkiye & MENA", highlight: true },
  { id: "om",  location: [24.34,  56.71],  delay: 0.7,  label: "Umman" },
  { id: "tn",  location: [36.81,  10.18],  delay: 1.0,  label: "Tunus" },
  { id: "gb",  location: [51.51,  -0.13],  delay: 1.3,  label: "Birleşik Krallık" },
  { id: "my",  location: [3.14,   101.69], delay: 1.6,  label: "Malezya" },
  { id: "br",  location: [-23.55, -46.63], delay: 1.9,  label: "Brezilya" },
]
