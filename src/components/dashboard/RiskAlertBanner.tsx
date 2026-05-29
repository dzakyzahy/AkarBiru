/**
 * RiskAlertBanner — Critical risk warning banner
 */
import React, { useState } from 'react'
import { AlertTriangle, X, ChevronRight } from 'lucide-react'
import { useCoastalData } from '@/hooks/useCoastalData'

export function RiskAlertBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { data: coastal } = useCoastalData()

  if (dismissed || !coastal) return null

  const criticalZones = coastal.flatMap(r => r.salinityZones)
    .filter(z => z.riskLevel === 'critical')

  const criticalAbrasion = coastal.flatMap(r => r.abrasionZones)
    .filter(z => z.riskLevel === 'critical')

  const totalCritical = criticalZones.length + criticalAbrasion.length
  if (totalCritical === 0) return null

  const totalAffectedHH = criticalZones.reduce((s, z) => s + z.affectedHouseholds, 0)

  return (
    <div className="mb-4 bg-red-900/20 border border-red-800/50 rounded-xl p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-900/40 rounded-lg flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-red-300">
              Peringatan Kritis — {totalCritical} Zona Darurat
            </h3>
            <span className="px-2 py-0.5 bg-red-800/40 text-red-300 text-xs rounded-full font-medium animate-pulse">
              URGENT
            </span>
          </div>
          <p className="text-xs text-red-300/70 leading-relaxed">
            Terdeteksi {criticalZones.length} zona salinitas dan {criticalAbrasion.length} zona abrasi berstatus kritis.
            Total {totalAffectedHH.toLocaleString('id-ID')} KK membutuhkan intervensi segera.
            {criticalZones[0] && ` Area terdampak terparah: ${criticalZones[0].regionName}, ${criticalZones[0].province}.`}
          </p>
          <a
            href="#/insights"
            className="inline-flex items-center gap-1 mt-2 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
          >
            Lihat Rekomendasi Aksi
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-red-400/50 hover:text-red-300 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
