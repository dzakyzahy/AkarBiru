/**
 * MapLayerToggle — Toggle controls for map data layers
 */
import React from 'react'
import { Waves, AlertTriangle, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MapLayerType = 'salinity' | 'abrasion' | 'solar'

interface MapLayerToggleProps {
  activeLayers: Set<MapLayerType>
  onToggle: (layer: MapLayerType) => void
}

const LAYERS: { id: MapLayerType; label: string; icon: React.ElementType; color: string; activeColor: string }[] = [
  { id: 'salinity', label: 'Salinitas', icon: Waves, color: 'text-blue-400', activeColor: 'bg-blue-600' },
  { id: 'abrasion', label: 'Abrasi', icon: AlertTriangle, color: 'text-red-400', activeColor: 'bg-red-600' },
  { id: 'solar', label: 'Solar', icon: Sun, color: 'text-yellow-400', activeColor: 'bg-yellow-600' },
]

export function MapLayerToggle({ activeLayers, onToggle }: MapLayerToggleProps) {
  return (
    <div className="glass rounded-xl p-1.5 flex flex-col gap-1">
      {LAYERS.map(({ id, label, icon: Icon, color, activeColor }) => {
        const isActive = activeLayers.has(id)
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
              'transition-all duration-150',
              isActive
                ? `${activeColor} text-white shadow-md`
                : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
            )}
            title={`Toggle layer: ${label}`}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-white' : color)} />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
