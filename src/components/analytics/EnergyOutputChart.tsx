/**
 * EnergyOutputChart — Potensi Energi Solar per Zona (BarChart)
 */
import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useEnergyData } from '@/hooks/useEnergyData'
import { ChartSkeleton } from '@/components/ui/Skeletons'

const TIER_COLORS = {
  'tier-1': '#22D3EE',
  'tier-2': '#F59E0B',
  'tier-3': '#6B7280',
}

export function EnergyOutputChart() {
  const { data, isLoading } = useEnergyData()

  if (isLoading) return <ChartSkeleton />
  if (!data) return null

  const chartData = data.flatMap(region =>
    region.optimizationSpots.map(spot => ({
      name: spot.nearestVillage.length > 15
        ? spot.nearestVillage.slice(0, 15) + '...'
        : spot.nearestVillage,
      output: Math.round(spot.estimatedAnnualOutputKwh / 1000), // MWh
      tier: spot.tierClass,
      full: spot.nearestVillage,
    }))
  )

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis
          dataKey="name"
          stroke="#6B7280"
          tick={{ fontSize: 10 }}
          angle={-20}
          textAnchor="end"
          height={60}
        />
        <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} unit=" MWh" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
            fontSize: '12px',
          }}
          formatter={(value: number, _name: string, props: any) => [
            `${value} MWh/tahun`,
            props.payload.full,
          ]}
        />
        <Bar dataKey="output" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={TIER_COLORS[entry.tier as keyof typeof TIER_COLORS]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
