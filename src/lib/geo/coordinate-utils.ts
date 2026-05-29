/**
 * Geo/coordinate utility functions
 * Extracted and evolved from GeoSeeker's GameContext.tsx
 */

const DEG_TO_RAD = Math.PI / 180

function deg2rad(deg: number): number {
  return deg * DEG_TO_RAD
}

/**
 * Haversine distance between two lat/lng pairs (in kilometers)
 */
export function getDistanceKm(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Calculate bearing from point 1 to point 2 (in degrees, 0-360)
 */
export function getBearing(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const dLon = deg2rad(lon2 - lon1)
  const y = Math.sin(dLon) * Math.cos(deg2rad(lat2))
  const x =
    Math.cos(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) -
    Math.sin(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(dLon)
  const brng = Math.atan2(y, x)
  return (brng * 180 / Math.PI + 360) % 360
}

/**
 * Calculate the centroid of a polygon defined by lat/lng points
 */
export function calculateCentroid(
  points: { lat: number; lng: number }[]
): { lat: number; lng: number } {
  if (points.length === 0) return { lat: 0, lng: 0 }

  const sum = points.reduce(
    (acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }),
    { lat: 0, lng: 0 }
  )
  return {
    lat: sum.lat / points.length,
    lng: sum.lng / points.length,
  }
}

/**
 * Check if a point is within a bounding box
 */
export function isWithinBounds(
  point: { lat: number; lng: number },
  bounds: { north: number; south: number; east: number; west: number }
): boolean {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  )
}
