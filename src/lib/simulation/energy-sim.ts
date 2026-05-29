/**
 * Energy Optimization Data Simulation
 *
 * Mensimulasikan output dari pipeline analitik energi surya:
 * - NASA POWER API: solar irradiance data
 * - PVGIS: photovoltaic system performance estimation
 * - Optimasi penempatan panel berdasarkan risiko abrasi & flood
 *
 * Data realistis berdasarkan kondisi iklim dan energi Indonesia
 */

import type { EnergyOptimizerData, SolarOptimizationSpot } from '@/types/energy.types'

const NOW = new Date().toISOString()

const ENERGY_REGIONS_DATA: EnergyOptimizerData[] = [
  {
    regionId: 'pantai-utara-jawa-001',
    regionName: 'Pesisir Demak-Jepara',
    totalCurrentElectrificationRate: 78.5,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    energyOutputProjection: [245000, 312000, 398000, 489000, 567000, 645000],
    householdsServedProjection: [204, 260, 332, 408, 473, 538],
    totalInvestmentNeededIDR: 12_500_000_000,
    totalCo2OffsetTonYear: 182,
    mlModelVersion: 'solar-opt-v2.1.0',
    generatedAt: NOW,
    optimizationSpots: [
      {
        id: 'solar-demak-001',
        coordinates: { lat: -6.8300, lng: 110.6400 },
        nearestVillage: 'Desa Purworejo',
        province: 'Jawa Tengah',
        annualIrradianceKWhM2: 1720,
        peakSunHoursPerDay: 4.7,
        recommendedCapacityKwp: 50,
        estimatedAnnualOutputKwh: 72500,
        estimatedHouseholdsServed: 60,
        abrasionRiskScore: 25,
        floodRiskScore: 35,
        accessibilityScore: 82,
        overallFeasibilityScore: 88,
        mlConfidenceScore: 94,
        tierClass: 'tier-1',
        status: 'recommended',
        estimatedCostIDR: 2_500_000_000,
        paybackPeriodYears: 6.2,
        co2OffsetTonYear: 45,
        lastUpdated: NOW,
      },
      {
        id: 'solar-demak-002',
        coordinates: { lat: -6.8100, lng: 110.5800 },
        nearestVillage: 'Desa Sidogemah',
        province: 'Jawa Tengah',
        annualIrradianceKWhM2: 1680,
        peakSunHoursPerDay: 4.6,
        recommendedCapacityKwp: 35,
        estimatedAnnualOutputKwh: 49700,
        estimatedHouseholdsServed: 41,
        abrasionRiskScore: 55,
        floodRiskScore: 45,
        accessibilityScore: 71,
        overallFeasibilityScore: 72,
        mlConfidenceScore: 87,
        tierClass: 'tier-2',
        status: 'recommended',
        estimatedCostIDR: 1_750_000_000,
        paybackPeriodYears: 7.4,
        co2OffsetTonYear: 31,
        lastUpdated: NOW,
      },
      {
        id: 'solar-jepara-001',
        coordinates: { lat: -6.7400, lng: 110.6800 },
        nearestVillage: 'Desa Bandengan',
        province: 'Jawa Tengah',
        annualIrradianceKWhM2: 1750,
        peakSunHoursPerDay: 4.8,
        recommendedCapacityKwp: 75,
        estimatedAnnualOutputKwh: 110250,
        estimatedHouseholdsServed: 92,
        abrasionRiskScore: 15,
        floodRiskScore: 20,
        accessibilityScore: 91,
        overallFeasibilityScore: 93,
        mlConfidenceScore: 96,
        tierClass: 'tier-1',
        status: 'recommended',
        estimatedCostIDR: 3_750_000_000,
        paybackPeriodYears: 5.8,
        co2OffsetTonYear: 69,
        lastUpdated: NOW,
      },
    ],
  },
  {
    regionId: 'pantai-utara-jawa-002',
    regionName: 'Pesisir Pekalongan-Batang',
    totalCurrentElectrificationRate: 82.3,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    energyOutputProjection: [180000, 225000, 280000, 340000, 400000, 460000],
    householdsServedProjection: [150, 188, 233, 283, 333, 383],
    totalInvestmentNeededIDR: 8_200_000_000,
    totalCo2OffsetTonYear: 130,
    mlModelVersion: 'solar-opt-v2.1.0',
    generatedAt: NOW,
    optimizationSpots: [
      {
        id: 'solar-pekal-001',
        coordinates: { lat: -6.8750, lng: 109.6600 },
        nearestVillage: 'Kelurahan Bandengan',
        province: 'Jawa Tengah',
        annualIrradianceKWhM2: 1690,
        peakSunHoursPerDay: 4.6,
        recommendedCapacityKwp: 45,
        estimatedAnnualOutputKwh: 63800,
        estimatedHouseholdsServed: 53,
        abrasionRiskScore: 40,
        floodRiskScore: 50,
        accessibilityScore: 78,
        overallFeasibilityScore: 76,
        mlConfidenceScore: 89,
        tierClass: 'tier-2',
        status: 'recommended',
        estimatedCostIDR: 2_250_000_000,
        paybackPeriodYears: 6.8,
        co2OffsetTonYear: 40,
        lastUpdated: NOW,
      },
      {
        id: 'solar-batang-001',
        coordinates: { lat: -6.8950, lng: 109.7300 },
        nearestVillage: 'Desa Karangasem Utara',
        province: 'Jawa Tengah',
        annualIrradianceKWhM2: 1710,
        peakSunHoursPerDay: 4.7,
        recommendedCapacityKwp: 60,
        estimatedAnnualOutputKwh: 87600,
        estimatedHouseholdsServed: 73,
        abrasionRiskScore: 20,
        floodRiskScore: 30,
        accessibilityScore: 85,
        overallFeasibilityScore: 87,
        mlConfidenceScore: 92,
        tierClass: 'tier-1',
        status: 'recommended',
        estimatedCostIDR: 3_000_000_000,
        paybackPeriodYears: 6.0,
        co2OffsetTonYear: 55,
        lastUpdated: NOW,
      },
    ],
  },
  {
    regionId: 'kalbar-pesisir-001',
    regionName: 'Pesisir Singkawang-Sambas',
    totalCurrentElectrificationRate: 68.9,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    energyOutputProjection: [120000, 155000, 198000, 248000, 305000, 365000],
    householdsServedProjection: [100, 129, 165, 207, 254, 304],
    totalInvestmentNeededIDR: 6_800_000_000,
    totalCo2OffsetTonYear: 95,
    mlModelVersion: 'solar-opt-v2.1.0',
    generatedAt: NOW,
    optimizationSpots: [
      {
        id: 'solar-singk-001',
        coordinates: { lat: 1.4700, lng: 108.9800 },
        nearestVillage: 'Kelurahan Setapuk Besar',
        province: 'Kalimantan Barat',
        annualIrradianceKWhM2: 1620,
        peakSunHoursPerDay: 4.4,
        recommendedCapacityKwp: 40,
        estimatedAnnualOutputKwh: 54800,
        estimatedHouseholdsServed: 46,
        abrasionRiskScore: 30,
        floodRiskScore: 40,
        accessibilityScore: 74,
        overallFeasibilityScore: 78,
        mlConfidenceScore: 85,
        tierClass: 'tier-2',
        status: 'recommended',
        estimatedCostIDR: 2_000_000_000,
        paybackPeriodYears: 7.2,
        co2OffsetTonYear: 34,
        lastUpdated: NOW,
      },
    ],
  },
  {
    regionId: 'sultra-pesisir-001',
    regionName: 'Pesisir Kendari-Konawe',
    totalCurrentElectrificationRate: 72.1,
    projectionYears: [2024, 2025, 2026, 2027, 2028, 2029],
    energyOutputProjection: [90000, 118000, 152000, 192000, 238000, 290000],
    householdsServedProjection: [75, 98, 127, 160, 198, 242],
    totalInvestmentNeededIDR: 5_200_000_000,
    totalCo2OffsetTonYear: 78,
    mlModelVersion: 'solar-opt-v2.1.0',
    generatedAt: NOW,
    optimizationSpots: [
      {
        id: 'solar-kendari-001',
        coordinates: { lat: -3.9700, lng: 122.5400 },
        nearestVillage: 'Kelurahan Abeli',
        province: 'Sulawesi Tenggara',
        annualIrradianceKWhM2: 1780,
        peakSunHoursPerDay: 4.9,
        recommendedCapacityKwp: 55,
        estimatedAnnualOutputKwh: 82500,
        estimatedHouseholdsServed: 69,
        abrasionRiskScore: 10,
        floodRiskScore: 15,
        accessibilityScore: 88,
        overallFeasibilityScore: 91,
        mlConfidenceScore: 93,
        tierClass: 'tier-1',
        status: 'recommended',
        estimatedCostIDR: 2_750_000_000,
        paybackPeriodYears: 5.5,
        co2OffsetTonYear: 52,
        lastUpdated: NOW,
      },
    ],
  },
]

function simulateProcessingDelay(minMs = 400, maxMs = 1200): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function getEnergyOptimizerData(): Promise<EnergyOptimizerData[]> {
  await simulateProcessingDelay()
  return ENERGY_REGIONS_DATA
}

export async function getEnergyOptimizerByRegion(
  regionId: string
): Promise<EnergyOptimizerData | null> {
  await simulateProcessingDelay(200, 600)
  return ENERGY_REGIONS_DATA.find(r => r.regionId === regionId) ?? null
}

export function getEnergyOptimizerDataSync(): EnergyOptimizerData[] {
  return ENERGY_REGIONS_DATA
}
