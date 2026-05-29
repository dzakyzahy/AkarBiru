/**
 * QuickInsights — Top 3 actionable insights for dashboard sidebar
 */
import React from 'react'
import { useCoastalData } from '@/hooks/useCoastalData'
import { useEnergyData } from '@/hooks/useEnergyData'
import { generateInsights, type InsightData, type InsightPriority } from '@/services/aiService'
import { MapPin, Zap, Droplets, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InsightsSkeleton } from '@/components/ui/Skeletons'

const PRIORITY_CONFIG: Record<InsightPriority, { label: string; color: string; bgColor: string }> = {
  urgent: { label: 'SEGERA', color: 'text-red-400', bgColor: 'bg-red-900/20' },
  high: { label: 'PRIORITAS', color: 'text-orange-400', bgColor: 'bg-orange-900/20' },
  medium: { label: 'PERHATIKAN', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20' },
  low: { label: 'INFORMASI', color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
}

const CATEGORY_ICONS = {
  relocation: MapPin,
  solar: Zap,
  water: Droplets,
  infrastructure: AlertTriangle,
}

export function QuickInsights() {
  const { data: coastal, isLoading: cl } = useCoastalData()
  const { data: energy, isLoading: el } = useEnergyData()

  if (cl || el) return <InsightsSkeleton />
  if (!coastal) return null

  const insights = generateInsights(coastal, energy ?? undefined).slice(0, 4)

  return (
    <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(60vh-57px)]">
      {insights.map((insight, idx) => {
        const config = PRIORITY_CONFIG[insight.priority]
        const Icon = CATEGORY_ICONS[insight.category]
        return (
          <div
            key={insight.id}
            className={cn(
              'rounded-lg border p-3 transition-all duration-200',
              'hover:border-gray-600 cursor-pointer group animate-slide-up',
              config.bgColor,
              insight.priority === 'urgent' ? 'border-red-800/50' : 'border-gray-700/30'
            )}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Icon className={cn('w-3.5 h-3.5', config.color)} />
                <span className={cn('text-[10px] font-bold tracking-wider', config.color)}>
                  {config.label}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <CheckCircle2 className="w-3 h-3" />
                <span>Skor: {insight.riskScore}/100</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-white mb-1 leading-tight">{insight.title}</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{insight.location}</span>
            </div>
          </div>
        )
      })}

      <a
        href="#/insights"
        className="flex items-center justify-center gap-1 py-2.5 text-xs text-ocean-400 hover:text-ocean-300 font-medium transition-colors border-b border-gray-800/50"
      >
        Lihat Semua Rekomendasi
        <ChevronRight className="w-3 h-3" />
      </a>
      <div className="py-2 px-1 text-center">
        <p className="text-[9px] text-gray-500 italic">
          *Engine AI ML prediktif sedang dalam tahap pengembangan. Saat ini menggunakan model deterministik.
        </p>
      </div>
    </div>
  )
}
