/**
 * Risk level thresholds for coastal vulnerability assessment
 * Based on Indonesian government standards (BMKG, BIG)
 */

import type { RiskLevel } from '@/types/coastal.types'

/** Salinity thresholds (parts per thousand) */
export const SALINITY_THRESHOLDS = {
  safe: 0.5,        // < 0.5 ppt — aman untuk pertanian & air minum
  low: 1.0,         // 0.5 - 1.0 ppt — dampak minimal
  medium: 2.0,      // 1.0 - 2.0 ppt — dampak moderat
  high: 3.5,        // 2.0 - 3.5 ppt — dampak serius
  critical: 3.5,    // > 3.5 ppt — krisis
} as const

/** Abrasion rate thresholds (meters/year) */
export const ABRASION_THRESHOLDS = {
  low: 2.0,         // < 2 m/tahun — normal
  medium: 4.0,      // 2 - 4 m/tahun — perlu perhatian
  high: 6.0,        // 4 - 6 m/tahun — serius
  critical: 6.0,    // > 6 m/tahun — darurat
} as const

/** Overall risk score ranges (0-100) */
export const RISK_SCORE_RANGES: Record<RiskLevel, { min: number; max: number }> = {
  low: { min: 0, max: 30 },
  medium: { min: 30, max: 60 },
  high: { min: 60, max: 80 },
  critical: { min: 80, max: 100 },
} as const

/** Map risk level to display properties */
export const RISK_LEVEL_CONFIG: Record<RiskLevel, {
  label: string
  labelId: string
  color: string
  bgColor: string
  borderColor: string
  fillOpacity: number
}> = {
  low: {
    label: 'Low',
    labelId: 'Rendah',
    color: '#22C55E',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800',
    fillOpacity: 0.2,
  },
  medium: {
    label: 'Medium',
    labelId: 'Sedang',
    color: '#F59E0B',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800',
    fillOpacity: 0.3,
  },
  high: {
    label: 'High',
    labelId: 'Tinggi',
    color: '#EF4444',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-800',
    fillOpacity: 0.4,
  },
  critical: {
    label: 'Critical',
    labelId: 'Kritis',
    color: '#DC2626',
    bgColor: 'bg-red-900/30',
    borderColor: 'border-red-700',
    fillOpacity: 0.5,
  },
}

/**
 * Determine risk level from salinity (ppt)
 */
export function getSalinityRiskLevel(ppt: number): RiskLevel {
  if (ppt >= SALINITY_THRESHOLDS.critical) return 'critical'
  if (ppt >= SALINITY_THRESHOLDS.medium) return 'high'
  if (ppt >= SALINITY_THRESHOLDS.low) return 'medium'
  return 'low'
}

/**
 * Determine risk level from abrasion rate (m/year)
 */
export function getAbrasionRiskLevel(metersPerYear: number): RiskLevel {
  if (metersPerYear >= ABRASION_THRESHOLDS.critical) return 'critical'
  if (metersPerYear >= ABRASION_THRESHOLDS.medium) return 'high'
  if (metersPerYear >= ABRASION_THRESHOLDS.low) return 'medium'
  return 'low'
}

/**
 * Determine risk level from overall score (0-100)
 */
export function getRiskLevelFromScore(score: number): RiskLevel {
  if (score >= RISK_SCORE_RANGES.critical.min) return 'critical'
  if (score >= RISK_SCORE_RANGES.high.min) return 'high'
  if (score >= RISK_SCORE_RANGES.medium.min) return 'medium'
  return 'low'
}
