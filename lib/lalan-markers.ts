export interface PulseMarker {
  id: string
  location: [number, number]
  delay: number
  label: string
  highlight?: boolean
}

export const LALAN_MARKERS: PulseMarker[] = [
  { id: "lk",   location: [6.93,   79.85],  delay: 0,    label: "Sri Lanka — Merkez" },
  { id: "tr",   location: [39.93,  32.86],  delay: 0.3,  label: "Türkiye & MENA", highlight: true },
  { id: "gb",   location: [51.51,  -0.13],  delay: 1.0,  label: "Birleşik Krallık" },
  { id: "de",   location: [50.11,   8.68],  delay: 1.4,  label: "Almanya" },
  { id: "us",   location: [40.71,  -74.01], delay: 1.8,  label: "Amerika Birleşik Devletleri" },
  { id: "jp",   location: [35.68,  139.65], delay: 2.2,  label: "Japonya" },
  { id: "au",   location: [-33.87, 151.21], delay: 2.6,  label: "Avustralya" },
  { id: "my",   location: [3.14,   101.69], delay: 3.0,  label: "Malezya" },
]
