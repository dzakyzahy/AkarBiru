/**
 * RiskRadarChart — Multi-dimensional risk assessment per region
 */
import React from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts'
import { useCoastalData } from '@/hooks/useCoastalData'
import { useEnergyData } from '@/hooks/useEnergyData'
import { ChartSkeleton } from '@/components/ui/Skeletons'

export function RiskRadarChart() {
  const { data: coastal, isLoading: cl } = useCoastalData()
  const { data: energy, isLoading: el } = useEnergyData()

  if (cl || el) return <ChartSkeleton />
  if (!coastal) return null

  // Build radar data for top 2 regions
  const regions = coastal.slice(0, 3)
  const chartData = [
    {
      dimension: 'Salinitas',
      ...Object.fromEntries(regions.map(r => [
        r.regionId,
        Math.min(Math.round(
          (Math.max(...r.salinityZones.map(z => z.currentSalinityPpt)) / 3.5) * 100
        ), 100)
      ]))
    },
    {
      dimension: 'Abrasi',
      ...Object.fromEntries(regions.map(r => [
        r.regionId,
        Math.min(Math.round(
          (Math.max(...r.abrasionZones.map(z => z.annualErosionRateMeters)) / 8) * 100
        ), 100)
      ]))
    },
    {
      dimension: 'Penduduk',
      ...Object.fromEntries(regions.map(r => [
        r.regionId,
        Math.min(Math.round(
          (r.salinityZones.reduce((s, z) => s + z.affectedHouseholds, 0) / 2500) * 100
        ), 100)
      ]))
    },
    {
      dimension: 'Infrastruktur',
      ...Object.fromEntries(regions.map(r => [
        r.regionId,
        Math.min(Math.round(
          (r.abrasionZones.reduce((s, z) => s + z.affectedInfrastructure.length, 0) / 8) * 100
        ), 100)
      ]))
    },
    {
      dimension: 'Energi Gap',
      ...Object.fromEntries(regions.map(r => {
        const e = energy?.find(ed => ed.regionId === r.regionId)
        return [r.regionId, e ? Math.round(100 - e.totalCurrentElectrificationRate) : 20]
      }))
    },
  ]

  const COLORS = ['#22D3EE', '#F59E0B', '#A78BFA']

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#1F2937" />
        <PolarAngleAxis
          dataKey="dimension"
          stroke="#6B7280"
          tick={{ fontSize: 10, fill: '#9CA3AF' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          stroke="#374151"
          tick={{ fontSize: 9, fill: '#6B7280' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
            fontSize: '12px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '11px' }} />
        {regions.map((region, idx) => (
          <Radar
            key={region.regionId}
            name={region.regionName}
            dataKey={region.regionId}
            stroke={COLORS[idx]}
            fill={COLORS[idx]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}
