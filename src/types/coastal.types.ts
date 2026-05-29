/** Level risiko zona pesisir */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

/** Status tren data */
export type TrendDirection = 'improving' | 'stable' | 'worsening' | 'critical'

/** Koordinat geografis */
export interface GeoCoordinate {
  lat: number
  lng: number
}

/** Zona salinitas — representasi intrusi air laut */
export interface SalinityZone {
  id: string
  regionName: string
  province: string
  coordinates: GeoCoordinate[]          // Polygon boundary
  centroid: GeoCoordinate
  currentSalinityPpt: number            // Parts per thousand (batas aman: <0.5 ppt)
  projectedSalinityPpt: number          // Proyeksi 5 tahun
  intrusionDepthKm: number              // Kedalaman intrusi dari garis pantai
  riskLevel: RiskLevel
  affectedHouseholds: number
  affectedAgriculturalHectares: number
  trendDirection: TrendDirection
  lastUpdated: string                   // ISO timestamp
  dataSource: 'BMKG' | 'BIG' | 'simulated'
}

/** Zona abrasi pantai */
export interface AbrasionZone {
  id: string
  regionName: string
  province: string
  coastlineCoordinates: GeoCoordinate[] // LineString garis pantai
  bufferPolygon: GeoCoordinate[]        // Polygon zona risiko
  annualErosionRateMeters: number       // Meter per tahun
  projectedLossIn5Years: number         // Meter total
  riskLevel: RiskLevel
  affectedInfrastructure: string[]      // ['jalan', 'pemukiman', 'tambak']
  lastUpdated: string
}

/** Data kerentanan pesisir agregat per wilayah */
export interface CoastalVulnerabilityData {
  regionId: string
  regionName: string
  province: string
  overallRiskScore: number              // 0-100
  salinityZones: SalinityZone[]
  abrasionZones: AbrasionZone[]
  projectionYears: number[]             // [2024, 2025, 2026, 2027, 2028, 2029]
  salinityProjectionSeries: number[]    // ppt per tahun
  abrasionProjectionSeries: number[]    // meter per tahun
  lastAnalyzed: string
  mlConfidenceScore: number             // 0-100
}

/** GeoJSON Feature untuk peta */
export interface CoastalFeature {
  type: 'Feature'
  geometry: {
    type: 'Polygon' | 'LineString' | 'Point'
    coordinates: number[][] | number[]
  }
  properties: {
    id: string
    type: 'salinity' | 'abrasion'
    riskLevel: RiskLevel
    regionName: string
    [key: string]: unknown
  }
}

export interface CoastalGeoJSON {
  type: 'FeatureCollection'
  features: CoastalFeature[]
}

/** Response API kerentanan pesisir */
export interface CoastalVulnerabilityResponse {
  success: boolean
  data: CoastalVulnerabilityData[]
  geojson: CoastalGeoJSON
  generatedAt: string
  processingTimeMs: number
}
