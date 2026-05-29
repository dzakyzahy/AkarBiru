/**
 * TopNav Component — Top navigation bar
 */
import React from 'react'
import { Menu, Bell, Search, Leaf } from 'lucide-react'

interface TopNavProps {
  onMenuToggle: () => void
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm flex-shrink-0">
      {/* Left: Mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 gradient-ocean rounded-md flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">AkarBiru</span>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50 w-72 group focus-within:border-ocean-500/50 transition-colors">
          <Search className="w-4 h-4 text-gray-500 group-focus-within:text-ocean-400 transition-colors" />
          <input
            type="text"
            placeholder="Cari wilayah, desa, atau data..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
          />
        </div>
      </div>

      {/* Right: notifications + status */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 bg-gray-800/40 px-3 py-1.5 rounded-lg">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span>Semua sistem operasional</span>
        </div>

        <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-8 h-8 gradient-ocean rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-ocean-500/20">
          AB
        </div>
      </div>
    </header>
  )
}
