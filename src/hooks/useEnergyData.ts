/**
 * Custom hook for energy optimization data
 */
import { useState, useEffect } from 'react'
import type { EnergyOptimizerData } from '@/types/energy.types'
import { getEnergyOptimizerData } from '@/lib/simulation/energy-sim'

interface UseEnergyDataReturn {
  data: EnergyOptimizerData[] | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useEnergyData(): UseEnergyDataReturn {
  const [data, setData] = useState<EnergyOptimizerData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getEnergyOptimizerData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data energi')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, refetch: fetchData }
}
