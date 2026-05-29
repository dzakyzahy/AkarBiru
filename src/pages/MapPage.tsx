/**
 * MapPage — Full-screen coastal map view
 */
import React from 'react'
import { CoastalMap } from '@/components/map/CoastalMap'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-8rem)] min-h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-white">Peta Pesisir Indonesia</h1>
          <p className="text-xs text-gray-400">Visualisasi data kerentanan pesisir real-time</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">LIVE DATA</span>
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden h-[calc(100%-60px)]">
        <ErrorBoundary>
          <CoastalMap className="w-full h-full" />
        </ErrorBoundary>
      </div>
    </div>
  )
}
