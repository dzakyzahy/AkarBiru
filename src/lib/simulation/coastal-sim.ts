/**
 * Coastal Vulnerability Data Simulation
 *
 * Mensimulasikan output dari pipeline analitik:
 * - xarray: multi-dimensional coastal data processing
 * - scipy: statistical modeling untuk proyeksi salinitas
 * - pandas: time-series aggregation
 * - Mocked Google Earth Engine: satellite imagery analysis
 *
 * Data didasarkan pada wilayah pesisir nyata Indonesia yang rentan:
 * Pantai Utara Jawa, Pesisir Kalimantan Barat, Pesisir Sulawesi Tenggara
 */

import type {
  CoastalVulnerabilityData,
  SalinityZone,
  AbrasionZone,
} from '@/types/coastal.types'

const NOW = new Date().toISOString()

const COASTAL_REGIONS_DATA: CoastalVulnerabilityData[] = [
  // ===== Region 1: Pesisir Demak-Jepara (Jawa Tengah) =====
  {
    regionId: 'pantai-utara-jawa-001',
    regionName: 'Pesisir Demak-Jepara',
    province: 'Jawa Tengah',
    overallRiskScore: 87,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    salinityProjectionSeries: [1.2, 1.45, 1.78, 2.1, 2.54, 2.9],
    abrasionProjectionSeries: [4.2, 4.8, 5.3, 5.9, 6.4, 7.1],
    mlConfidenceScore: 91,
    lastAnalyzed: NOW,
    salinityZones: [
      {
        id: 'sal-demak-001',
        regionName: 'Desa Bedono',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.8234, lng: 110.6234 },
          { lat: -6.8156, lng: 110.6312 },
          { lat: -6.8089, lng: 110.6198 },
          { lat: -6.8167, lng: 110.6145 },
        ],
        centroid: { lat: -6.8162, lng: 110.6222 },
        currentSalinityPpt: 1.2,
        projectedSalinityPpt: 2.9,
        intrusionDepthKm: 3.4,
        riskLevel: 'critical',
        affectedHouseholds: 847,
        affectedAgriculturalHectares: 234,
        trendDirection: 'critical',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
      {
        id: 'sal-demak-002',
        regionName: 'Desa Timbulsloko',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.8340, lng: 110.5950 },
          { lat: -6.8280, lng: 110.6050 },
          { lat: -6.8200, lng: 110.5980 },
          { lat: -6.8260, lng: 110.5880 },
        ],
        centroid: { lat: -6.8270, lng: 110.5965 },
        currentSalinityPpt: 1.8,
        projectedSalinityPpt: 3.5,
        intrusionDepthKm: 4.1,
        riskLevel: 'critical',
        affectedHouseholds: 623,
        affectedAgriculturalHectares: 178,
        trendDirection: 'worsening',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
      {
        id: 'sal-jepara-001',
        regionName: 'Desa Tanggultlare',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.7520, lng: 110.6700 },
          { lat: -6.7450, lng: 110.6780 },
          { lat: -6.7380, lng: 110.6710 },
          { lat: -6.7440, lng: 110.6630 },
        ],
        centroid: { lat: -6.7448, lng: 110.6705 },
        currentSalinityPpt: 0.9,
        projectedSalinityPpt: 1.6,
        intrusionDepthKm: 2.1,
        riskLevel: 'medium',
        affectedHouseholds: 312,
        affectedAgriculturalHectares: 89,
        trendDirection: 'worsening',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
      {
        id: 'sal-demak-003',
        regionName: 'Desa Sriwulan',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.8500, lng: 110.5600 },
          { lat: -6.8430, lng: 110.5700 },
          { lat: -6.8360, lng: 110.5640 },
          { lat: -6.8420, lng: 110.5540 },
        ],
        centroid: { lat: -6.8428, lng: 110.5620 },
        currentSalinityPpt: 1.5,
        projectedSalinityPpt: 2.7,
        intrusionDepthKm: 3.0,
        riskLevel: 'high',
        affectedHouseholds: 534,
        affectedAgriculturalHectares: 156,
        trendDirection: 'worsening',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
    ],
    abrasionZones: [
      {
        id: 'abr-demak-001',
        regionName: 'Pesisir Wedung',
        province: 'Jawa Tengah',
        coastlineCoordinates: [
          { lat: -6.8123, lng: 110.5934 },
          { lat: -6.8045, lng: 110.6034 },
          { lat: -6.7967, lng: 110.6134 },
        ],
        bufferPolygon: [
          { lat: -6.8143, lng: 110.5924 },
          { lat: -6.8025, lng: 110.6044 },
          { lat: -6.7947, lng: 110.6154 },
          { lat: -6.7967, lng: 110.6174 },
          { lat: -6.8065, lng: 110.6054 },
          { lat: -6.8163, lng: 110.5944 },
        ],
        annualErosionRateMeters: 5.8,
        projectedLossIn5Years: 29.0,
        riskLevel: 'high',
        affectedInfrastructure: ['jalan desa', 'pemukiman', 'tambak udang'],
        lastUpdated: NOW,
      },
      {
        id: 'abr-demak-002',
        regionName: 'Pesisir Sayung',
        province: 'Jawa Tengah',
        coastlineCoordinates: [
          { lat: -6.8550, lng: 110.5400 },
          { lat: -6.8480, lng: 110.5500 },
          { lat: -6.8400, lng: 110.5600 },
        ],
        bufferPolygon: [
          { lat: -6.8570, lng: 110.5390 },
          { lat: -6.8460, lng: 110.5510 },
          { lat: -6.8380, lng: 110.5620 },
          { lat: -6.8400, lng: 110.5640 },
          { lat: -6.8500, lng: 110.5520 },
          { lat: -6.8590, lng: 110.5410 },
        ],
        annualErosionRateMeters: 7.2,
        projectedLossIn5Years: 36.0,
        riskLevel: 'critical',
        affectedInfrastructure: ['jalan provinsi', 'sekolah', 'pemukiman', 'tambak ikan'],
        lastUpdated: NOW,
      },
    ],
  },

  // ===== Region 2: Pesisir Pekalongan-Batang (Jawa Tengah) =====
  {
    regionId: 'pantai-utara-jawa-002',
    regionName: 'Pesisir Pekalongan-Batang',
    province: 'Jawa Tengah',
    overallRiskScore: 72,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    salinityProjectionSeries: [0.8, 0.95, 1.15, 1.38, 1.62, 1.89],
    abrasionProjectionSeries: [3.1, 3.4, 3.8, 4.2, 4.7, 5.2],
    mlConfidenceScore: 88,
    lastAnalyzed: NOW,
    salinityZones: [
      {
        id: 'sal-pekal-001',
        regionName: 'Kelurahan Panjang Wetan',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.8700, lng: 109.6700 },
          { lat: -6.8630, lng: 109.6780 },
          { lat: -6.8560, lng: 109.6720 },
          { lat: -6.8620, lng: 109.6640 },
        ],
        centroid: { lat: -6.8628, lng: 109.6710 },
        currentSalinityPpt: 0.8,
        projectedSalinityPpt: 1.89,
        intrusionDepthKm: 2.3,
        riskLevel: 'medium',
        affectedHouseholds: 456,
        affectedAgriculturalHectares: 67,
        trendDirection: 'worsening',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
      {
        id: 'sal-batang-001',
        regionName: 'Desa Klidang Lor',
        province: 'Jawa Tengah',
        coordinates: [
          { lat: -6.8900, lng: 109.7200 },
          { lat: -6.8840, lng: 109.7280 },
          { lat: -6.8780, lng: 109.7210 },
          { lat: -6.8830, lng: 109.7140 },
        ],
        centroid: { lat: -6.8838, lng: 109.7208 },
        currentSalinityPpt: 0.6,
        projectedSalinityPpt: 1.2,
        intrusionDepthKm: 1.8,
        riskLevel: 'low',
        affectedHouseholds: 234,
        affectedAgriculturalHectares: 45,
        trendDirection: 'stable',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
    ],
    abrasionZones: [
      {
        id: 'abr-pekal-001',
        regionName: 'Pantai Pekalongan Utara',
        province: 'Jawa Tengah',
        coastlineCoordinates: [
          { lat: -6.8600, lng: 109.6500 },
          { lat: -6.8530, lng: 109.6600 },
          { lat: -6.8460, lng: 109.6700 },
        ],
        bufferPolygon: [
          { lat: -6.8620, lng: 109.6490 },
          { lat: -6.8510, lng: 109.6610 },
          { lat: -6.8440, lng: 109.6720 },
          { lat: -6.8460, lng: 109.6740 },
          { lat: -6.8550, lng: 109.6620 },
          { lat: -6.8640, lng: 109.6510 },
        ],
        annualErosionRateMeters: 3.8,
        projectedLossIn5Years: 19.0,
        riskLevel: 'medium',
        affectedInfrastructure: ['pemukiman', 'tambak'],
        lastUpdated: NOW,
      },
    ],
  },

  // ===== Region 3: Pesisir Singkawang-Sambas (Kalimantan Barat) =====
  {
    regionId: 'kalbar-pesisir-001',
    regionName: 'Pesisir Singkawang-Sambas',
    province: 'Kalimantan Barat',
    overallRiskScore: 64,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    salinityProjectionSeries: [0.6, 0.72, 0.88, 1.05, 1.24, 1.45],
    abrasionProjectionSeries: [2.5, 2.8, 3.1, 3.5, 3.9, 4.3],
    mlConfidenceScore: 84,
    lastAnalyzed: NOW,
    salinityZones: [
      {
        id: 'sal-singk-001',
        regionName: 'Kelurahan Sedau',
        province: 'Kalimantan Barat',
        coordinates: [
          { lat: 1.4600, lng: 108.9600 },
          { lat: 1.4660, lng: 108.9680 },
          { lat: 1.4590, lng: 108.9740 },
          { lat: 1.4530, lng: 108.9660 },
        ],
        centroid: { lat: 1.4595, lng: 108.9670 },
        currentSalinityPpt: 0.6,
        projectedSalinityPpt: 1.45,
        intrusionDepthKm: 1.9,
        riskLevel: 'medium',
        affectedHouseholds: 289,
        affectedAgriculturalHectares: 120,
        trendDirection: 'worsening',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
      {
        id: 'sal-sambas-001',
        regionName: 'Desa Jawai Laut',
        province: 'Kalimantan Barat',
        coordinates: [
          { lat: 1.5200, lng: 109.0100 },
          { lat: 1.5270, lng: 109.0180 },
          { lat: 1.5200, lng: 109.0250 },
          { lat: 1.5130, lng: 109.0170 },
        ],
        centroid: { lat: 1.5200, lng: 109.0175 },
        currentSalinityPpt: 0.45,
        projectedSalinityPpt: 1.1,
        intrusionDepthKm: 1.4,
        riskLevel: 'low',
        affectedHouseholds: 178,
        affectedAgriculturalHectares: 95,
        trendDirection: 'stable',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
    ],
    abrasionZones: [
      {
        id: 'abr-singk-001',
        regionName: 'Pantai Pasir Panjang',
        province: 'Kalimantan Barat',
        coastlineCoordinates: [
          { lat: 1.4500, lng: 108.9500 },
          { lat: 1.4580, lng: 108.9600 },
          { lat: 1.4650, lng: 108.9700 },
        ],
        bufferPolygon: [
          { lat: 1.4480, lng: 108.9490 },
          { lat: 1.4560, lng: 108.9590 },
          { lat: 1.4630, lng: 108.9710 },
          { lat: 1.4670, lng: 108.9710 },
          { lat: 1.4600, lng: 108.9610 },
          { lat: 1.4520, lng: 108.9510 },
        ],
        annualErosionRateMeters: 2.8,
        projectedLossIn5Years: 14.0,
        riskLevel: 'medium',
        affectedInfrastructure: ['jalan pantai', 'warung wisata'],
        lastUpdated: NOW,
      },
    ],
  },

  // ===== Region 4: Pesisir Kendari-Konawe (Sulawesi Tenggara) =====
  {
    regionId: 'sultra-pesisir-001',
    regionName: 'Pesisir Kendari-Konawe',
    province: 'Sulawesi Tenggara',
    overallRiskScore: 56,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    salinityProjectionSeries: [0.4, 0.48, 0.58, 0.7, 0.84, 1.0],
    abrasionProjectionSeries: [1.8, 2.0, 2.3, 2.6, 2.9, 3.3],
    mlConfidenceScore: 79,
    lastAnalyzed: NOW,
    salinityZones: [
      {
        id: 'sal-kendari-001',
        regionName: 'Kelurahan Puday',
        province: 'Sulawesi Tenggara',
        coordinates: [
          { lat: -3.9800, lng: 122.5200 },
          { lat: -3.9730, lng: 122.5280 },
          { lat: -3.9660, lng: 122.5210 },
          { lat: -3.9720, lng: 122.5130 },
        ],
        centroid: { lat: -3.9728, lng: 122.5205 },
        currentSalinityPpt: 0.4,
        projectedSalinityPpt: 1.0,
        intrusionDepthKm: 1.2,
        riskLevel: 'low',
        affectedHouseholds: 156,
        affectedAgriculturalHectares: 78,
        trendDirection: 'stable',
        lastUpdated: NOW,
        dataSource: 'simulated',
      },
    ],
    abrasionZones: [
      {
        id: 'abr-kendari-001',
        regionName: 'Teluk Kendari',
        province: 'Sulawesi Tenggara',
        coastlineCoordinates: [
          { lat: -3.9900, lng: 122.5000 },
          { lat: -3.9830, lng: 122.5100 },
          { lat: -3.9760, lng: 122.5200 },
        ],
        bufferPolygon: [
          { lat: -3.9920, lng: 122.4990 },
          { lat: -3.9810, lng: 122.5110 },
          { lat: -3.9740, lng: 122.5220 },
          { lat: -3.9760, lng: 122.5240 },
          { lat: -3.9850, lng: 122.5120 },
          { lat: -3.9940, lng: 122.5010 },
        ],
        annualErosionRateMeters: 1.8,
        projectedLossIn5Years: 9.0,
        riskLevel: 'low',
        affectedInfrastructure: ['pelabuhan kecil', 'jalan desa'],
        lastUpdated: NOW,
      },
    ],
  },
]

/**
 * Simulate processing delay untuk kesan "real API call"
 */
function simulateProcessingDelay(minMs = 400, maxMs = 1200): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function getCoastalVulnerabilityData(): Promise<CoastalVulnerabilityData[]> {
  await simulateProcessingDelay()
  return COASTAL_REGIONS_DATA
}

export async function getCoastalVulnerabilityByRegion(
  regionId: string
): Promise<CoastalVulnerabilityData | null> {
  await simulateProcessingDelay(200, 600)
  return COASTAL_REGIONS_DATA.find(r => r.regionId === regionId) ?? null
}

export function getCoastalVulnerabilityDataSync(): CoastalVulnerabilityData[] {
  return COASTAL_REGIONS_DATA
}
