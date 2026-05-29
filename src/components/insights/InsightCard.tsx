/**
 * InsightCard — Actionable recommendation card with deterministic scoring
 *
 * Risk score is calculated from weighted combination of:
 * - Laju abrasi (25%)
 * - Tingkat salinitas (30%)
 * - Jumlah KK terdampak (25%)
 * - Jarak intrusi dari garis pantai (20%)
 */
import React, { useState } from 'react'
import { MapPin, Zap, Droplets, AlertTriangle, ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { InsightData, InsightPriority, InsightCategory } from '@/services/aiService'

const PRIORITY_CONFIG: Record<InsightPriority, {
  label: string; color: string; bgColor: string; borderColor: string
}> = {
  urgent: { label: 'SEGERA', color: 'text-red-400', bgColor: 'bg-red-900/20', borderColor: 'border-red-800/50' },
  high: { label: 'PRIORITAS', color: 'text-orange-400', bgColor: 'bg-orange-900/20', borderColor: 'border-orange-800/50' },
  medium: { label: 'PERHATIKAN', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', borderColor: 'border-yellow-800/50' },
  low: { label: 'INFORMASI', color: 'text-blue-400', bgColor: 'bg-blue-900/20', borderColor: 'border-blue-800/50' },
}

const CATEGORY_ICONS: Record<InsightCategory, React.ElementType> = {
  relocation: MapPin,
  solar: Zap,
  water: Droplets,
  infrastructure: AlertTriangle,
}

const CATEGORY_LABELS: Record<InsightCategory, string> = {
  relocation: 'Relokasi',
  solar: 'Energi Solar',
  water: 'Sumber Air',
  infrastructure: 'Infrastruktur',
}

interface InsightCardProps {
  insight: InsightData
  index?: number
}

export function InsightCard({ insight, index = 0 }: InsightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const config = PRIORITY_CONFIG[insight.priority]
  const Icon = CATEGORY_ICONS[insight.category]

  return (
    <div
      className={cn(
        'rounded-xl border p-5 transition-all duration-200 animate-slide-up',
        'hover:shadow-lg hover:shadow-black/20',
        config.bgColor, config.borderColor
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn('p-2 rounded-lg', config.bgColor)}>
            <Icon className={cn('w-4 h-4', config.color)} />
          </div>
          <div>
            <span className={cn('text-[10px] font-bold tracking-wider', config.color)}>
              {config.label}
            </span>
            <span className="text-[10px] text-gray-500 ml-2">
              {CATEGORY_LABELS[insight.category]}
            </span>
          </div>
        </div>

        {/* Score Badges */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded-lg border border-gray-700/50">
            <div className={cn(
              'w-2 h-2 rounded-full',
              insight.riskScore >= 80 ? 'bg-red-400' :
              insight.riskScore >= 60 ? 'bg-orange-400' :
              insight.riskScore >= 40 ? 'bg-yellow-400' : 'bg-green-400'
            )} />
            <span className="text-xs font-bold text-white">Skor Risiko: {insight.riskScore}/100</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <CheckCircle2 className="w-3 h-3" />
            <span>Kepercayaan Model: {insight.modelConfidence}%</span>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-sm font-semibold text-white mb-2">{insight.title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-3">{insight.description}</p>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-3">
        <MapPin className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-500">{insight.location}</span>
      </div>

      {/* Expandable Section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-ocean-400 hover:text-ocean-300 font-medium transition-colors mb-2"
      >
        {expanded ? 'Sembunyikan Detail' : 'Lihat Rencana Aksi'}
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {expanded && (
        <div className="animate-fade-in space-y-3">
          {/* Action Items */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-300">Langkah Aksi:</p>
            <ul className="space-y-1.5">
              {insight.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                  <ArrowRight className="w-3 h-3 text-ocean-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-gray-800/40 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-300 mb-1">Estimasi Dampak:</p>
            <p className="text-xs text-gray-400">{insight.estimatedImpact}</p>
          </div>

          {/* Data Source */}
          <p className="text-[10px] text-gray-600 italic">
            Sumber: {insight.dataSource}
          </p>
        </div>
      )}
    </div>
  )
}
