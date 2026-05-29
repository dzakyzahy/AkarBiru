/**
 * CoastalMap Component
 *
 * Hero component AkarBiru. Dual rendering:
 * - If VITE_GOOGLE_MAPS_API_KEY is available: @vis.gl/react-google-maps
 * - Fallback: Leaflet with CartoDB Dark Matter tiles (free)
 *
 * Displays coastal vulnerability overlays:
 * - Salinity zones (polygons, color-coded by risk)
 * - Abrasion zones (polygons with buffer areas)
 * - Solar optimization spots (markers)
 */

import React, { useState, useCallback } from 'react'
import { MapLayerToggle, type MapLayerType } from './MapLayerToggle'
import { useCoastalData } from '@/hooks/useCoastalData'
import { useEnergyData } from '@/hooks/useEnergyData'
import type { RiskLevel } from '@/types/coastal.types'
import { RISK_LEVEL_CONFIG } from '@/lib/constants/thresholds'
import { cn } from '@/lib/utils'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
const INDONESIA_CENTER = { lat: -2.5, lng: 118.0 }

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#EF4444',
  critical: '#DC2626',
}

interface CoastalMapProps {
  className?: string
  initialCenter?: { lat: number; lng: number }
  initialZoom?: number
}

export function CoastalMap({
  className,
  initialCenter = INDONESIA_CENTER,
  initialZoom = 5,
}: CoastalMapProps) {
  const [activeLayers, setActiveLayers] = useState<Set<MapLayerType>>(
    new Set(['salinity', 'abrasion', 'solar'])
  )
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)
  const { data: coastalData, isLoading: coastalLoading } = useCoastalData()
  const { data: energyData, isLoading: energyLoading } = useEnergyData()

  const toggleLayer = useCallback((layer: MapLayerType) => {
    setActiveLayers(prev => {
      const next = new Set(prev)
      if (next.has(layer)) next.delete(layer)
      else next.add(layer)
      return next
    })
  }, [])

  const isLoading = coastalLoading || energyLoading

  // Choose renderer based on API key availability
  const useGoogleMaps = !!GOOGLE_MAPS_API_KEY

  return (
    <div className={cn('relative flex flex-col w-full h-full min-h-[400px]', className)}>
      {/* Layer Toggle Controls */}
      <div className="absolute top-4 left-4 z-10">
        <MapLayerToggle activeLayers={activeLayers} onToggle={toggleLayer} />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-gray-950/80 flex items-center
                        justify-center rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent
                           rounded-full animate-spin" />
            <p className="text-sm text-cyan-400 font-medium">Memproses data spasial...</p>
            <p className="text-xs text-gray-500">Menjalankan model xarray & scipy</p>
          </div>
        </div>
      )}

      {/* Map Renderer */}
      {useGoogleMaps ? (
        <GoogleMapRenderer
          center={initialCenter}
          zoom={initialZoom}
          activeLayers={activeLayers}
          coastalData={coastalData}
          energyData={energyData}
          selectedZoneId={selectedZoneId}
          onZoneSelect={setSelectedZoneId}
        />
      ) : (
        <LeafletMapRenderer
          center={initialCenter}
          zoom={initialZoom}
          activeLayers={activeLayers}
          coastalData={coastalData}
          energyData={energyData}
          selectedZoneId={selectedZoneId}
          onZoneSelect={setSelectedZoneId}
        />
      )}

      {/* Selected Zone Info */}
      {selectedZoneId && coastalData && (
        <ZoneInfoPopup
          zoneId={selectedZoneId}
          coastalData={coastalData}
          onClose={() => setSelectedZoneId(null)}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 glass rounded-lg p-3 text-xs">
        <p className="text-gray-400 font-medium mb-2">Level Risiko</p>
        {Object.entries(RISK_COLORS).map(([level, color]) => (
          <div key={level} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-gray-300 capitalize">
              {RISK_LEVEL_CONFIG[level as RiskLevel].labelId}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Google Maps Renderer
// ============================================
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import type { CoastalVulnerabilityData } from '@/types/coastal.types'
import type { EnergyOptimizerData } from '@/types/energy.types'

interface MapRendererProps {
  center: { lat: number; lng: number }
  zoom: number
  activeLayers: Set<MapLayerType>
  coastalData: CoastalVulnerabilityData[] | null
  energyData: EnergyOptimizerData[] | null
  selectedZoneId: string | null
  onZoneSelect: (id: string | null) => void
}

function GoogleMapRenderer({ center, zoom, activeLayers, coastalData, energyData, onZoneSelect }: MapRendererProps) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapId="AKARBIRU_MAP"
        colorScheme="DARK"
      >
        {/* Solar Spots as AdvancedMarkers */}
        {activeLayers.has('solar') && energyData?.flatMap(region =>
          region.optimizationSpots.map(spot => (
            <AdvancedMarker
              key={spot.id}
              position={spot.coordinates}
              onClick={() => onZoneSelect(spot.id)}
            >
              <Pin background="#F59E0B" borderColor="#92400E" glyphColor="white" scale={0.8} />
            </AdvancedMarker>
          ))
        )}

        {/* Salinity zone centroids as markers (Google Maps without drawing library) */}
        {activeLayers.has('salinity') && coastalData?.flatMap(region =>
          region.salinityZones.map(zone => (
            <AdvancedMarker
              key={zone.id}
              position={zone.centroid}
              onClick={() => onZoneSelect(zone.id)}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 animate-pulse"
                   style={{
                     backgroundColor: `${RISK_COLORS[zone.riskLevel]}30`,
                     borderColor: RISK_COLORS[zone.riskLevel],
                   }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RISK_COLORS[zone.riskLevel] }} />
              </div>
            </AdvancedMarker>
          ))
        )}

        {/* Abrasion zone markers */}
        {activeLayers.has('abrasion') && coastalData?.flatMap(region =>
          region.abrasionZones.map(zone => (
            <AdvancedMarker
              key={zone.id}
              position={zone.coastlineCoordinates[0]}
              onClick={() => onZoneSelect(zone.id)}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-sm border-2"
                   style={{
                     backgroundColor: `${RISK_COLORS[zone.riskLevel]}40`,
                     borderColor: RISK_COLORS[zone.riskLevel],
                   }}>
                <span className="text-[8px] font-bold" style={{ color: RISK_COLORS[zone.riskLevel] }}>!</span>
              </div>
            </AdvancedMarker>
          ))
        )}
      </Map>
    </APIProvider>
  )
}

// ============================================
// Leaflet Fallback Renderer
// ============================================
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function LeafletMapRenderer({ center, zoom, activeLayers, coastalData, energyData }: MapRendererProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Salinity Polygons */}
      {activeLayers.has('salinity') && coastalData?.flatMap(region =>
        region.salinityZones.map(zone => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates.map(c => [c.lat, c.lng] as [number, number])}
            pathOptions={{
              color: RISK_COLORS[zone.riskLevel],
              fillColor: RISK_COLORS[zone.riskLevel],
              fillOpacity: RISK_LEVEL_CONFIG[zone.riskLevel].fillOpacity,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-gray-900 text-sm">
                <p className="font-bold">{zone.regionName}</p>
                <p className="text-xs text-gray-600">{zone.province}</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p>Salinitas: <strong>{zone.currentSalinityPpt} ppt</strong></p>
                  <p>Proyeksi 5 thn: <strong>{zone.projectedSalinityPpt} ppt</strong></p>
                  <p>KK Terdampak: <strong>{zone.affectedHouseholds.toLocaleString('id-ID')}</strong></p>
                  <p>Intrusi: <strong>{zone.intrusionDepthKm} km</strong></p>
                  <p className="capitalize" style={{ color: RISK_COLORS[zone.riskLevel] }}>
                    Risiko: <strong>{RISK_LEVEL_CONFIG[zone.riskLevel].labelId}</strong>
                  </p>
                </div>
              </div>
            </Popup>
          </Polygon>
        ))
      )}

      {/* Abrasion Zones */}
      {activeLayers.has('abrasion') && coastalData?.flatMap(region =>
        region.abrasionZones.map(zone => (
          <React.Fragment key={zone.id}>
            {/* Coastline */}
            <Polyline
              positions={zone.coastlineCoordinates.map(c => [c.lat, c.lng] as [number, number])}
              pathOptions={{
                color: RISK_COLORS[zone.riskLevel],
                weight: 3,
                dashArray: '8 4',
              }}
            />
            {/* Buffer zone */}
            <Polygon
              positions={zone.bufferPolygon.map(c => [c.lat, c.lng] as [number, number])}
              pathOptions={{
                color: RISK_COLORS[zone.riskLevel],
                fillColor: RISK_COLORS[zone.riskLevel],
                fillOpacity: 0.15,
                weight: 1,
                dashArray: '4 4',
              }}
            >
              <Popup>
                <div className="text-gray-900 text-sm">
                  <p className="font-bold">{zone.regionName}</p>
                  <p className="text-xs text-gray-600">{zone.province}</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p>Laju Erosi: <strong>{zone.annualErosionRateMeters} m/tahun</strong></p>
                    <p>Proyeksi 5 thn: <strong>{zone.projectedLossIn5Years} m</strong></p>
                    <p>Infrastruktur: <strong>{zone.affectedInfrastructure.join(', ')}</strong></p>
                    <p className="capitalize" style={{ color: RISK_COLORS[zone.riskLevel] }}>
                      Risiko: <strong>{RISK_LEVEL_CONFIG[zone.riskLevel].labelId}</strong>
                    </p>
                  </div>
                </div>
              </Popup>
            </Polygon>
          </React.Fragment>
        ))
      )}

      {/* Solar Spots */}
      {activeLayers.has('solar') && energyData?.flatMap(region =>
        region.optimizationSpots.map(spot => (
          <CircleMarker
            key={spot.id}
            center={[spot.coordinates.lat, spot.coordinates.lng]}
            radius={8}
            pathOptions={{
              color: '#F59E0B',
              fillColor: '#FBBF24',
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-gray-900 text-sm">
                <p className="font-bold">{spot.nearestVillage}</p>
                <p className="text-xs text-gray-600">{spot.province}</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p>Kapasitas: <strong>{spot.recommendedCapacityKwp} kWp</strong></p>
                  <p>Output/thn: <strong>{(spot.estimatedAnnualOutputKwh/1000).toFixed(1)} MWh</strong></p>
                  <p>KK Terlayani: <strong>{spot.estimatedHouseholdsServed}</strong></p>
                  <p>Irradiance: <strong>{spot.annualIrradianceKWhM2} kWh/m²</strong></p>
                  <p className="text-green-600">Feasibility: <strong>{spot.overallFeasibilityScore}/100</strong></p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))
      )}
    </MapContainer>
  )
}

// ============================================
// Zone Info Popup
// ============================================
function ZoneInfoPopup({
  zoneId,
  coastalData,
  onClose,
}: {
  zoneId: string
  coastalData: CoastalVulnerabilityData[]
  onClose: () => void
}) {
  // Find zone in data
  let zone: any = null
  let zoneType: 'salinity' | 'abrasion' = 'salinity'

  for (const region of coastalData) {
    const sal = region.salinityZones.find(z => z.id === zoneId)
    if (sal) { zone = sal; zoneType = 'salinity'; break }
    const abr = region.abrasionZones.find(z => z.id === zoneId)
    if (abr) { zone = abr; zoneType = 'abrasion'; break }
  }

  if (!zone) return null

  return (
    <div className="absolute top-4 right-4 z-20 glass rounded-xl p-4 max-w-xs animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RISK_COLORS[zone.riskLevel] }} />
          <span className="text-sm font-semibold text-white">{zone.regionName}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xs">✕</button>
      </div>
      <p className="text-xs text-gray-400 mb-2">{zone.province}</p>
      {zoneType === 'salinity' && (
        <div className="space-y-1 text-xs text-gray-300">
          <p>Salinitas: <span className="font-mono text-white">{zone.currentSalinityPpt} ppt</span></p>
          <p>Intrusi: <span className="font-mono text-white">{zone.intrusionDepthKm} km</span></p>
          <p>KK Terdampak: <span className="font-mono text-white">{zone.affectedHouseholds}</span></p>
        </div>
      )}
      {zoneType === 'abrasion' && (
        <div className="space-y-1 text-xs text-gray-300">
          <p>Erosi: <span className="font-mono text-white">{zone.annualErosionRateMeters} m/thn</span></p>
          <p>Proyeksi 5 thn: <span className="font-mono text-white">{zone.projectedLossIn5Years} m</span></p>
        </div>
      )}
    </div>
  )
}
