/**
 * Loading skeleton components
 */
import React from 'react'

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="skeleton w-10 h-10 rounded-lg" />
            <div className="skeleton w-20 h-5 rounded-full" />
          </div>
          <div className="skeleton w-24 h-8 mb-2" />
          <div className="skeleton w-32 h-4 mb-1" />
          <div className="skeleton w-28 h-3" />
        </div>
      ))}
    </div>
  )
}

export function MapSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-cyan-400 font-medium">Memuat peta...</p>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-[280px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-ocean-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-500">Memuat grafik...</p>
      </div>
    </div>
  )
}

export function InsightsSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="skeleton w-8 h-8 rounded-lg" />
            <div className="skeleton w-16 h-4 rounded-full" />
          </div>
          <div className="skeleton w-full h-4 mb-2" />
          <div className="skeleton w-3/4 h-3" />
        </div>
      ))}
    </div>
  )
}
