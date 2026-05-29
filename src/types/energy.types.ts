export type SolarTierClass = 'tier-1' | 'tier-2' | 'tier-3'
export type InstallationStatus = 'recommended' | 'under-review' | 'not-suitable'

/** Titik optimal instalasi panel surya */
export interface SolarOptimizationSpot {
  id: string
  coordinates: { lat: number; lng: number }
  nearestVillage: string
  province: string
  
  // Solar Resource Data (simulasi PVGIS / NASA POWER)
  annualIrradianceKWhM2: number         // kWh/m²/tahun (rata-rata Jawa: 1600-1800)
  peakSunHoursPerDay: number            // Jam matahari efektif per hari
  
  // System Recommendation
  recommendedCapacityKwp: number        // Kapasitas instalasi dalam kWp
  estimatedAnnualOutputKwh: number      // Estimasi produksi per tahun
  estimatedHouseholdsServed: number     // Jumlah KK yang bisa dilayani
  
  // Risk & Feasibility
  abrasionRiskScore: number             // 0-100 (hindari area abrasi tinggi)
  floodRiskScore: number                // 0-100
  accessibilityScore: number            // 0-100 (kemudahan akses instalasi)
  overallFeasibilityScore: number       // 0-100
  
  // ML Output
  mlConfidenceScore: number             // 0-100 (output model prediktif)
  tierClass: SolarTierClass
  status: InstallationStatus
  
  // Economics (simulasi)
  estimatedCostIDR: number              // Biaya estimasi dalam Rupiah
  paybackPeriodYears: number
  co2OffsetTonYear: number              // Ton CO2 yang dihemat per tahun
  
  lastUpdated: string
}

/** Data optimizer energi untuk satu wilayah */
export interface EnergyOptimizerData {
  regionId: string
  regionName: string
  totalCurrentElectrificationRate: number  // % rumah tangga yang teraliri listrik
  optimizationSpots: SolarOptimizationSpot[]
  projectionYears: number[]
  energyOutputProjection: number[]          // kWh per tahun
  householdsServedProjection: number[]
  totalInvestmentNeededIDR: number
  totalCo2OffsetTonYear: number
  mlModelVersion: string
  generatedAt: string
}

/** Response API energy optimizer */
export interface EnergyOptimizerResponse {
  success: boolean
  data: EnergyOptimizerData[]
  geojson: {
    type: 'FeatureCollection'
    features: Array<{
      type: 'Feature'
      geometry: { type: 'Point'; coordinates: [number, number] }
      properties: SolarOptimizationSpot
    }>
  }
  generatedAt: string
  processingTimeMs: number
}
