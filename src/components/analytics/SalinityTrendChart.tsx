/**
 * SalinityTrendChart — Tren salinitas (AreaChart with gradient)
 */
import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts'
import { useCoastalData } from '@/hooks/useCoastalData'
import { ChartSkeleton } from '@/components/ui/Skeletons'

export function SalinityTrendChart() {
  const { data, isLoading } = useCoastalData()

  if (isLoading) return <ChartSkeleton />
  if (!data || data.length === 0) return null

  const chartData = data[0].projectionYears.map((year, idx) => ({
    year: year.toString(),
    demak: data[0]?.salinityProjectionSeries[idx],
    pekal: data[1]?.salinityProjectionSeries[idx],
    kalbar: data[2]?.salinityProjectionSeries[idx],
    sultra: data[3]?.salinityProjectionSeries[idx],
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="gradDemak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradPekal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradKalbar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradSultra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis dataKey="year" stroke="#6B7280" tick={{ fontSize: 11 }} />
        <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} unit=" ppt" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
            fontSize: '12px',
          }}
          formatter={(value: number) => [`${value?.toFixed(2)} ppt`, '']}
        />
        <Legend wrapperStyle={{ fontSize: '11px' }} />
        <ReferenceLine y={0.5} stroke="#22C55E" strokeDasharray="4 4"
                       label={{ value: 'Batas Aman (0.5 ppt)', fill: '#22C55E', fontSize: 10 }} />
        <ReferenceLine y={3.5} stroke="#EF4444" strokeDasharray="4 4"
                       label={{ value: 'Kritis (3.5 ppt)', fill: '#EF4444', fontSize: 10 }} />
        <Area type="monotone" dataKey="demak" stroke="#22D3EE" strokeWidth={2}
              fill="url(#gradDemak)" name="Demak-Jepara" />
        <Area type="monotone" dataKey="pekal" stroke="#F59E0B" strokeWidth={2}
              fill="url(#gradPekal)" name="Pekalongan" />
        <Area type="monotone" dataKey="kalbar" stroke="#A78BFA" strokeWidth={2}
              fill="url(#gradKalbar)" name="Kalimantan Barat" />
        <Area type="monotone" dataKey="sultra" stroke="#34D399" strokeWidth={2}
              fill="url(#gradSultra)" name="Sulawesi Tenggara" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
