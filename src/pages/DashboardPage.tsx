/**
 * DashboardPage — Main dashboard view
 */
import React from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CoastalMap } from '@/components/map/CoastalMap'
import { MetricsSummary } from '@/components/dashboard/MetricsSummary'
import { RiskAlertBanner } from '@/components/dashboard/RiskAlertBanner'
import { QuickInsights } from '@/components/dashboard/QuickInsights'

export default function DashboardPage() {
  return (
    <>
      {/* Alert Banner */}
      <RiskAlertBanner />

      {/* Metrics Summary */}
      <ErrorBoundary>
        <MetricsSummary />
      </ErrorBoundary>

      {/* Main Grid: Map + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Hero Map — spans 2/3 */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800
                        overflow-hidden" style={{ height: '60vh', minHeight: '480px' }}>
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div>
              <h2 className="text-sm font-semibold text-white">Peta Kerentanan Pesisir</h2>
              <p className="text-xs text-gray-400">Real-time • Data BMKG + BIG</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">LIVE</span>
            </div>
          </div>
          <ErrorBoundary>
            <CoastalMap className="w-full h-[calc(100%-57px)]" />
          </ErrorBoundary>
        </div>

        {/* Quick Insights Panel — spans 1/3 */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Rekomendasi Segera</h2>
            <p className="text-xs text-gray-400">Berdasarkan analisis rule-based scoring</p>
          </div>
          <ErrorBoundary>
            <QuickInsights />
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}
