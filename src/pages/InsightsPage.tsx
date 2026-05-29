/**
 * InsightsPage — Full list of actionable AI-generated insights
 */
import React, { useState } from 'react'
import { useCoastalData } from '@/hooks/useCoastalData'
import { useEnergyData } from '@/hooks/useEnergyData'
import { generateInsights, type InsightCategory, type InsightPriority } from '@/services/aiService'
import { InsightCard } from '@/components/insights/InsightCard'
import { InsightsSkeleton } from '@/components/ui/Skeletons'
import { cn } from '@/lib/utils'
import { Filter, Lightbulb } from 'lucide-react'

const CATEGORY_FILTERS: { id: InsightCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'water', label: 'Sumber Air' },
  { id: 'relocation', label: 'Relokasi' },
  { id: 'infrastructure', label: 'Infrastruktur' },
  { id: 'solar', label: 'Energi Solar' },
]

const PRIORITY_FILTERS: { id: InsightPriority | 'all'; label: string; color: string }[] = [
  { id: 'all', label: 'Semua', color: 'text-gray-400' },
  { id: 'urgent', label: 'Segera', color: 'text-red-400' },
  { id: 'high', label: 'Prioritas', color: 'text-orange-400' },
  { id: 'medium', label: 'Perhatikan', color: 'text-yellow-400' },
  { id: 'low', label: 'Informasi', color: 'text-blue-400' },
]

export default function InsightsPage() {
  const { data: coastal, isLoading: cl } = useCoastalData()
  const { data: energy, isLoading: el } = useEnergyData()
  const [categoryFilter, setCategoryFilter] = useState<InsightCategory | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<InsightPriority | 'all'>('all')

  const isLoading = cl || el

  const allInsights = coastal ? generateInsights(coastal, energy ?? undefined) : []

  const filtered = allInsights.filter(i => {
    if (categoryFilter !== 'all' && i.category !== categoryFilter) return false
    if (priorityFilter !== 'all' && i.priority !== priorityFilter) return false
    return true
  })

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Rekomendasi Aksi
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {allInsights.length} rekomendasi berdasarkan analisis rule-based scoring dari data pesisir.
          </p>
          <div className="inline-flex items-center mt-2 px-2 py-1 bg-ocean-900/40 border border-ocean-800/50 rounded text-[10px] text-ocean-300">
            <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mr-1.5 animate-pulse" />
            Catatan: Engine AI saat ini menggunakan model deterministik. Model Machine Learning prediktif sedang dalam tahap pengembangan (Roadmap Q3).
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex gap-1 flex-wrap">
            {CATEGORY_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setCategoryFilter(f.id)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-lg font-medium transition-all',
                  categoryFilter === f.id
                    ? 'bg-ocean-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex gap-1 flex-wrap">
          {PRIORITY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setPriorityFilter(f.id)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-all',
                priorityFilter === f.id
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800/30 text-gray-500 hover:bg-gray-800/60 hover:text-gray-300'
              )}
            >
              <span className={f.color}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <InsightsSkeleton />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-sm">Tidak ada rekomendasi untuk filter ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((insight, idx) => (
            <div key={insight.id}>
              <InsightCard insight={insight} index={idx} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
