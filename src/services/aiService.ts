/**
 * AkarBiru AI Service — Rule-Based Insight Engine
 *
 * Menghasilkan rekomendasi aksi berdasarkan threshold logic deterministik.
 * BUKAN machine learning — scoring dihitung dari data metrik nyata:
 * - Laju abrasi (weight: 25%)
 * - Tingkat salinitas (weight: 30%)
 * - Jumlah KK terdampak (weight: 25%)
 * - Jarak intrusi dari garis pantai (weight: 20%)
 */

import type { CoastalVulnerabilityData } from '@/types/coastal.types'
import type { EnergyOptimizerData } from '@/types/energy.types'
import { SALINITY_THRESHOLDS, ABRASION_THRESHOLDS } from '@/lib/constants/thresholds'

export type InsightCategory = 'relocation' | 'solar' | 'water' | 'infrastructure'
export type InsightPriority = 'urgent' | 'high' | 'medium' | 'low'

export interface InsightData {
  id: string
  category: InsightCategory
  priority: InsightPriority
  title: string
  description: string
  location: string
  coordinates?: { lat: number; lng: number }
  actionItems: string[]
  estimatedImpact: string
  riskScore: number         // 0-100 deterministic weighted score
  modelConfidence: number   // 0-100 based on data completeness
  dataSource: string
}

/**
 * Weighted Risk Score Calculator
 *
 * Komponen skor:
 * - Abrasi: 25% — normalisasi laju erosi terhadap threshold kritis (6 m/tahun)
 * - Salinitas: 30% — normalisasi PPT terhadap threshold kritis (3.5 ppt)
 * - Penduduk: 25% — normalisasi jumlah KK terdampak (maks referensi: 1000 KK)
 * - Intrusi: 20% — normalisasi kedalaman intrusi (maks referensi: 5 km)
 */
function calculateWeightedRiskScore(params: {
  abrasionRate: number
  salinityPpt: number
  affectedHouseholds: number
  intrusionDepthKm: number
}): number {
  const abrasionNorm = Math.min(params.abrasionRate / ABRASION_THRESHOLDS.critical, 1.0)
  const salinityNorm = Math.min(params.salinityPpt / SALINITY_THRESHOLDS.critical, 1.0)
  const householdsNorm = Math.min(params.affectedHouseholds / 1000, 1.0)
  const intrusionNorm = Math.min(params.intrusionDepthKm / 5.0, 1.0)

  const weightedScore =
    abrasionNorm * 0.25 +
    salinityNorm * 0.30 +
    householdsNorm * 0.25 +
    intrusionNorm * 0.20

  return Math.round(weightedScore * 100)
}

/**
 * Calculate model confidence based on data completeness & consistency
 */
function calculateModelConfidence(params: {
  hasProjectionData: boolean
  dataSources: number // jumlah sumber data berbeda
  trendConsistency: boolean // apakah tren konsisten dengan data historis
}): number {
  let score = 60 // base confidence

  if (params.hasProjectionData) score += 15
  score += Math.min(params.dataSources * 5, 15) // maks 15 dari sumber data
  if (params.trendConsistency) score += 10

  return Math.min(score, 99)
}

function derivePriority(riskScore: number): InsightPriority {
  if (riskScore >= 80) return 'urgent'
  if (riskScore >= 60) return 'high'
  if (riskScore >= 40) return 'medium'
  return 'low'
}

/**
 * Generate actionable insights from coastal vulnerability data
 * Pure rule-based logic — no ML/API calls
 */
export function generateInsights(
  coastalData: CoastalVulnerabilityData[],
  energyData?: EnergyOptimizerData[]
): InsightData[] {
  const insights: InsightData[] = []

  for (const region of coastalData) {
    // Aggregate region-level metrics
    const maxAbrasionRate = Math.max(
      ...region.abrasionZones.map(z => z.annualErosionRateMeters),
      0
    )
    const maxSalinity = Math.max(
      ...region.salinityZones.map(z => z.currentSalinityPpt),
      0
    )
    const totalAffectedHH = region.salinityZones.reduce(
      (sum, z) => sum + z.affectedHouseholds, 0
    )
    const maxIntrusionDepth = Math.max(
      ...region.salinityZones.map(z => z.intrusionDepthKm),
      0
    )

    // ===== Insight 1: Critical salinity zones → water infrastructure recommendation =====
    for (const zone of region.salinityZones) {
      if (zone.currentSalinityPpt >= SALINITY_THRESHOLDS.low) {
        const riskScore = calculateWeightedRiskScore({
          abrasionRate: maxAbrasionRate,
          salinityPpt: zone.currentSalinityPpt,
          affectedHouseholds: zone.affectedHouseholds,
          intrusionDepthKm: zone.intrusionDepthKm,
        })

        const modelConfidence = calculateModelConfidence({
          hasProjectionData: region.projectionYears.length > 0,
          dataSources: 2,
          trendConsistency: zone.trendDirection === 'worsening' || zone.trendDirection === 'critical',
        })

        if (zone.currentSalinityPpt >= SALINITY_THRESHOLDS.medium) {
          insights.push({
            id: `insight-water-${zone.id}`,
            category: 'water',
            priority: derivePriority(riskScore),
            title: `Krisis Air Bersih: ${zone.regionName}`,
            description: `Intrusi salinitas di ${zone.regionName} telah mencapai ${zone.currentSalinityPpt} ppt — ${((zone.currentSalinityPpt / SALINITY_THRESHOLDS.safe) * 100).toFixed(0)}% di atas batas aman. Diproyeksikan mencapai ${zone.projectedSalinityPpt} ppt dalam 5 tahun. ${zone.affectedHouseholds} KK dan ${zone.affectedAgriculturalHectares} hektare lahan pertanian terdampak. Diperlukan intervensi desalinasi atau sumber air alternatif.`,
            location: `${zone.regionName}, ${zone.province}`,
            coordinates: zone.centroid,
            actionItems: [
              'Pasang unit desalinasi portabel untuk kebutuhan air minum darurat',
              `Bangun sumur bor dalam (>50m) untuk ${zone.affectedHouseholds} KK`,
              'Monitoring salinitas harian di titik-titik kritis',
              'Sosialisasi penampungan air hujan untuk irigasi pertanian',
            ],
            estimatedImpact: `${zone.affectedHouseholds} KK mendapat akses air bersih, ${zone.affectedAgriculturalHectares} ha lahan pertanian terselamatkan`,
            riskScore,
            modelConfidence,
            dataSource: `Simulasi xarray + scipy (${zone.dataSource})`,
          })
        }
      }
    }

    // ===== Insight 2: High abrasion zones → relocation/infrastructure recommendation =====
    for (const zone of region.abrasionZones) {
      if (zone.annualErosionRateMeters >= ABRASION_THRESHOLDS.medium) {
        const riskScore = calculateWeightedRiskScore({
          abrasionRate: zone.annualErosionRateMeters,
          salinityPpt: maxSalinity,
          affectedHouseholds: totalAffectedHH,
          intrusionDepthKm: maxIntrusionDepth,
        })

        const modelConfidence = calculateModelConfidence({
          hasProjectionData: true,
          dataSources: 3,
          trendConsistency: true,
        })

        const isRelocation = zone.annualErosionRateMeters >= ABRASION_THRESHOLDS.critical
        const category: InsightCategory = isRelocation ? 'relocation' : 'infrastructure'

        insights.push({
          id: `insight-${category}-${zone.id}`,
          category,
          priority: derivePriority(riskScore),
          title: isRelocation
            ? `DARURAT Relokasi: ${zone.regionName}`
            : `Penguatan Infrastruktur: ${zone.regionName}`,
          description: isRelocation
            ? `Laju abrasi di ${zone.regionName} mencapai ${zone.annualErosionRateMeters} m/tahun — di atas batas kritis ${ABRASION_THRESHOLDS.critical} m/tahun. Diproyeksikan kehilangan ${zone.projectedLossIn5Years} meter garis pantai dalam 5 tahun. Infrastruktur terdampak: ${zone.affectedInfrastructure.join(', ')}. Relokasi bertahap sangat direkomendasikan.`
            : `Laju abrasi ${zone.annualErosionRateMeters} m/tahun di ${zone.regionName} memerlukan penguatan tanggul pantai dan penanaman mangrove. Proyeksi kehilangan: ${zone.projectedLossIn5Years}m dalam 5 tahun.`,
          location: `${zone.regionName}, ${zone.province}`,
          coordinates: zone.coastlineCoordinates[0],
          actionItems: isRelocation
            ? [
                'Identifikasi lokasi relokasi dalam radius 5 km dari pesisir',
                'Pemetaan aset dan infrastruktur terdampak',
                'Koordinasi dengan BNPB untuk dana tanggap darurat',
                'Mulai sosialisasi relokasi bertahap ke masyarakat',
              ]
            : [
                'Bangun breakwater/pemecah ombak di segmen paling kritis',
                'Program penanaman mangrove 500m sepanjang garis pantai',
                'Pasang sensor pemantauan gelombang real-time',
                'Perkuat tanggul desa dengan geotextile',
              ],
          estimatedImpact: `Melindungi ${zone.affectedInfrastructure.length} infrastruktur kritis, mencegah kerugian Rp ${(zone.projectedLossIn5Years * 50_000_000).toLocaleString('id-ID')}/tahun`,
          riskScore,
          modelConfidence,
          dataSource: 'Simulasi model erosi garis pantai (scipy linear regression)',
        })
      }
    }

    // ===== Insight 3: Solar energy opportunities =====
    const regionEnergy = energyData?.find(e => e.regionId === region.regionId)
    if (regionEnergy) {
      const topSpots = regionEnergy.optimizationSpots
        .filter(s => s.status === 'recommended' && s.overallFeasibilityScore >= 75)
        .sort((a, b) => b.overallFeasibilityScore - a.overallFeasibilityScore)

      if (topSpots.length > 0) {
        const bestSpot = topSpots[0]
        const totalOutput = topSpots.reduce((s, spot) => s + spot.estimatedAnnualOutputKwh, 0)
        const totalHH = topSpots.reduce((s, spot) => s + spot.estimatedHouseholdsServed, 0)

        insights.push({
          id: `insight-solar-${region.regionId}`,
          category: 'solar',
          priority: regionEnergy.totalCurrentElectrificationRate < 75 ? 'high' : 'medium',
          title: `Peluang Solar Mikrogrid: ${region.regionName}`,
          description: `Teridentifikasi ${topSpots.length} titik optimal instalasi panel surya di ${region.regionName}. Total potensi output: ${(totalOutput / 1000).toFixed(0)} MWh/tahun, mampu melayani ${totalHH} KK. Tingkat elektrifikasi saat ini: ${regionEnergy.totalCurrentElectrificationRate}%. Irradiance terbaik: ${bestSpot.annualIrradianceKWhM2} kWh/m²/tahun di ${bestSpot.nearestVillage}.`,
          location: `${bestSpot.nearestVillage}, ${region.province}`,
          coordinates: bestSpot.coordinates,
          actionItems: [
            `Survei teknis di ${topSpots.length} titik prioritas`,
            `Ajukan proposal APBN/APBD: Rp ${(regionEnergy.totalInvestmentNeededIDR / 1_000_000_000).toFixed(1)} miliar`,
            'Koordinasi dengan PLN untuk interconnection study',
            `Target pemasangan fase 1: ${bestSpot.recommendedCapacityKwp} kWp di ${bestSpot.nearestVillage}`,
          ],
          estimatedImpact: `${totalHH} KK teraliri listrik bersih, offset ${regionEnergy.totalCo2OffsetTonYear} ton CO₂/tahun`,
          riskScore: 100 - bestSpot.overallFeasibilityScore, // inverse: high feasibility = low risk
          modelConfidence: bestSpot.mlConfidenceScore,
          dataSource: 'Simulasi PVGIS + NASA POWER irradiance model',
        })
      }
    }
  }

  // Sort by priority weight then risk score
  const priorityWeight: Record<InsightPriority, number> = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  }

  return insights.sort((a, b) => {
    const pw = priorityWeight[a.priority] - priorityWeight[b.priority]
    if (pw !== 0) return pw
    return b.riskScore - a.riskScore
  })
}
