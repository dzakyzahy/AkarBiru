/**
 * Wilayah Pesisir Indonesia — Region Definitions
 * Data berdasarkan riset kondisi pesisir Indonesia yang rentan
 */

export interface CoastalRegion {
  id: string
  name: string
  province: string
  center: { lat: number; lng: number }
  zoom: number
  bounds: { north: number; south: number; east: number; west: number }
}

export const INDONESIA_CENTER = { lat: -2.5, lng: 118.0 }
export const INDONESIA_ZOOM = 5

export const COASTAL_REGIONS: CoastalRegion[] = [
  {
    id: 'pantai-utara-jawa-001',
    name: 'Pesisir Demak-Jepara',
    province: 'Jawa Tengah',
    center: { lat: -6.82, lng: 110.62 },
    zoom: 11,
    bounds: { north: -6.70, south: -6.95, east: 110.80, west: 110.40 },
  },
  {
    id: 'pantai-utara-jawa-002',
    name: 'Pesisir Pekalongan-Batang',
    province: 'Jawa Tengah',
    center: { lat: -6.88, lng: 109.67 },
    zoom: 11,
    bounds: { north: -6.75, south: -7.00, east: 109.85, west: 109.50 },
  },
  {
    id: 'kalbar-pesisir-001',
    name: 'Pesisir Singkawang-Sambas',
    province: 'Kalimantan Barat',
    center: { lat: 1.45, lng: 108.97 },
    zoom: 10,
    bounds: { north: 1.80, south: 1.10, east: 109.20, west: 108.70 },
  },
  {
    id: 'sultra-pesisir-001',
    name: 'Pesisir Kendari-Konawe',
    province: 'Sulawesi Tenggara',
    center: { lat: -3.98, lng: 122.52 },
    zoom: 10,
    bounds: { north: -3.70, south: -4.20, east: 122.80, west: 122.20 },
  },
]

export function getRegionById(id: string): CoastalRegion | undefined {
  return COASTAL_REGIONS.find(r => r.id === id)
}
