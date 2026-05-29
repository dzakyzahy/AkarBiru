/**
 * CoastlineChart — Proyeksi degradasi garis pantai (LineChart)
 */
import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts'
import { useCoastalData } from '@/hooks/useCoastalData'
import { ChartSkeleton } from '@/components/ui/Skeletons'

export function CoastlineChart() {
  const { data, isLoading } = useCoastalData()

  if (isLoading) return <ChartSkeleton />
  if (!data || data.length === 0) return null

  const chartData = data[0].projectionYears.map((year, idx) => ({
    year: year.toString(),
    demak: data[0]?.abrasionProjectionSeries[idx],
    pekal: data[1]?.abrasionProjectionSeries[idx],
    kalbar: data[2]?.abrasionProjectionSeries[idx],
    sultra: data[3]?.abrasionProjectionSeries[idx],
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis dataKey="year" stroke="#6B7280" tick={{ fontSize: 11 }} />
        <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} unit=" m" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
            fontSize: '12px',
          }}
          formatter={(value: number) => [`${value?.toFixed(1)} m/tahun`, '']}
        />
        <Legend wrapperStyle={{ fontSize: '11px' }} />
        <ReferenceLine y={6} stroke="#EF4444" strokeDasharray="4 4"
                       label={{ value: 'Batas Kritis', fill: '#EF4444', fontSize: 10 }} />
        <Line type="monotone" dataKey="demak" stroke="#22D3EE"
              strokeWidth={2} dot={{ r: 3 }} name="Demak-Jepara" />
        <Line type="monotone" dataKey="pekal" stroke="#F59E0B"
              strokeWidth={2} dot={{ r: 3 }} name="Pekalongan" />
        <Line type="monotone" dataKey="kalbar" stroke="#A78BFA"
              strokeWidth={2} dot={{ r: 3 }} name="Kalimantan Barat" />
        <Line type="monotone" dataKey="sultra" stroke="#34D399"
              strokeWidth={2} dot={{ r: 3 }} name="Sulawesi Tenggara" />
      </LineChart>
    </ResponsiveContainer>
  )
}
