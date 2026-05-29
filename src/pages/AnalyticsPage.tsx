/**
 * AnalyticsPage — Predictive analytics with 4 charts
 */
import React from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CoastlineChart } from '@/components/analytics/CoastlineChart'
import { SalinityTrendChart } from '@/components/analytics/SalinityTrendChart'
import { EnergyOutputChart } from '@/components/analytics/EnergyOutputChart'
import { RiskRadarChart } from '@/components/analytics/RiskRadarChart'
import { TrendingUp, Waves, Zap, Shield } from 'lucide-react'

interface ChartCardProps {
  title: string
  subtitle: string
  icon: React.ElementType
  iconColor: string
  children: React.ReactNode
}

function ChartCard({ title, subtitle, icon: Icon, iconColor, children }: ChartCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <div className={`p-2 rounded-lg bg-gray-800`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-lg font-bold text-white">Analitik Prediktif</h1>
        <p className="text-xs text-gray-400">Model proyeksi berbasis data historis dan simulasi scipy/xarray</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Proyeksi Degradasi Garis Pantai"
          subtitle="Laju abrasi (m/tahun) — 2024-2029"
          icon={TrendingUp}
          iconColor="text-cyan-400"
        >
          <ErrorBoundary>
            <CoastlineChart />
          </ErrorBoundary>
        </ChartCard>

        <ChartCard
          title="Tren Intrusi Salinitas"
          subtitle="Parts per thousand (ppt) — 2024-2029"
          icon={Waves}
          iconColor="text-blue-400"
        >
          <ErrorBoundary>
            <SalinityTrendChart />
          </ErrorBoundary>
        </ChartCard>

        <ChartCard
          title="Potensi Energi Solar per Zona"
          subtitle="Estimasi output tahunan (MWh)"
          icon={Zap}
          iconColor="text-yellow-400"
        >
          <ErrorBoundary>
            <EnergyOutputChart />
          </ErrorBoundary>
        </ChartCard>

        <ChartCard
          title="Profil Risiko Multidimensi"
          subtitle="Perbandingan antar wilayah"
          icon={Shield}
          iconColor="text-purple-400"
        >
          <ErrorBoundary>
            <RiskRadarChart />
          </ErrorBoundary>
        </ChartCard>
      </div>
    </>
  )
}
