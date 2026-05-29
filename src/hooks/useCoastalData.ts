/**
 * Custom hook for coastal vulnerability data
 */
import { useState, useEffect } from 'react'
import type { CoastalVulnerabilityData } from '@/types/coastal.types'
import { getCoastalVulnerabilityData } from '@/lib/simulation/coastal-sim'

interface UseCoastalDataReturn {
  data: CoastalVulnerabilityData[] | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useCoastalData(): UseCoastalDataReturn {
  const [data, setData] = useState<CoastalVulnerabilityData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getCoastalVulnerabilityData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data pesisir')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, refetch: fetchData }
}
