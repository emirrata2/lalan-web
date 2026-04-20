export interface PulseMarker {
  id: string
  location: [number, number]
  delay: number
  label: string
}

export const LALAN_MARKERS: PulseMarker[] = [
  { id: "lk",  location: [6.93,   79.85],  delay: 0,    label: "Sri Lanka — Merkez" },
  { id: "gb",  location: [51.51,  -0.13],  delay: 0.4,  label: "Birleşik Krallık" },
  { id: "de",  location: [50.11,   8.68],  delay: 0.8,  label: "Almanya" },
  { id: "us",  location: [40.71,  -74.01], delay: 1.2,  label: "Amerika Birleşik Devletleri" },
  { id: "jp",  location: [35.68,  139.65], delay: 1.6,  label: "Japonya" },
  { id: "au",  location: [-33.87, 151.21], delay: 2.0,  label: "Avustralya" },
  { id: "my",  location: [3.14,   101.69], delay: 2.4,  label: "Malezya" },
]
