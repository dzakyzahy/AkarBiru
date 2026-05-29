/**
 * MetricsSummary — 4 aggregate metric cards for the dashboard
 */
import React from 'react'
import { useCoastalData } from '@/hooks/useCoastalData'
import { useEnergyData } from '@/hooks/useEnergyData'
import { Users, AlertTriangle, Zap, TrendingUp } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { MetricsSkeleton } from '@/components/ui/Skeletons'

interface MetricCard {
  label: string
  value: string
  subValue: string
  icon: React.ElementType
  trend: 'up' | 'down' | 'neutral'
  trendLabel: string
  color: string
  bgColor: string
}

export function MetricsSummary() {
  const { data: coastal, isLoading: cl } = useCoastalData()
  const { data: energy, isLoading: el } = useEnergyData()

  if (cl || el) return <MetricsSkeleton />

  const totalAffectedHouseholds = coastal?.flatMap(r => r.salinityZones)
    .reduce((sum, z) => sum + z.affectedHouseholds, 0) ?? 0

  const criticalZones = coastal?.flatMap(r => r.salinityZones)
    .filter(z => z.riskLevel === 'critical').length ?? 0

  const totalSolarSpots = energy?.flatMap(r => r.optimizationSpots).length ?? 0

  const totalEnergyPotential = energy?.flatMap(r => r.optimizationSpots)
    .reduce((sum, s) => sum + s.estimatedAnnualOutputKwh, 0) ?? 0

  const metrics: MetricCard[] = [
    {
      label: 'KK Terdampak Salinitas',
      value: formatNumber(totalAffectedHouseholds),
      subValue: `di ${coastal?.length ?? 0} wilayah pesisir`,
      icon: Users,
      trend: 'up',
      trendLabel: '+12% dari bulan lalu',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
    },
    {
      label: 'Zona Kritis Terdeteksi',
      value: criticalZones.toString(),
      subValue: 'butuh intervensi segera',
      icon: AlertTriangle,
      trend: 'up',
      trendLabel: '+3 zona baru minggu ini',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20',
    },
    {
      label: 'Titik Solar Potensial',
      value: totalSolarSpots.toString(),
      subValue: 'teridentifikasi analisis',
      icon: Zap,
      trend: 'neutral',
      trendLabel: 'Avg. 94% confidence',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20',
    },
    {
      label: 'Potensi Energi/Tahun',
      value: `${(totalEnergyPotential / 1000).toFixed(1)} MWh`,
      subValue: 'dari rekomendasi solar',
      icon: TrendingUp,
      trend: 'neutral',
      trendLabel: `~${Math.round(totalEnergyPotential / 1200)} KK teraliri`,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <div
            key={metric.label}
            className="bg-gray-900 rounded-xl border border-gray-800 p-4
                       hover:border-gray-700 transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('p-2 rounded-lg', metric.bgColor)}>
                <Icon className={cn('w-5 h-5', metric.color)} />
              </div>
              <span className={cn(
                'text-[10px] px-2 py-0.5 rounded-full font-medium',
                metric.trend === 'up' ? 'text-red-400 bg-red-900/20' :
                metric.trend === 'down' ? 'text-green-400 bg-green-900/20' :
                'text-gray-400 bg-gray-800'
              )}>
                {metric.trendLabel}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{metric.label}</p>
            <p className="text-xs text-gray-600 mt-0.5">{metric.subValue}</p>
          </div>
        )
      })}
    </div>
  )
}
