/**
 * Sidebar Component — Evolved from GeoSeeker GameSidebar
 */
import React from 'react'
import {
  Map,
  BarChart3,
  Lightbulb,
  Home,
  Waves,
  AlertTriangle,
  Sun,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: string
  badgeColor?: string
}

const navItems: NavItem[] = [
  { href: '#/dashboard', label: 'Overview', icon: Home },
  { href: '#/map', label: 'Peta Pesisir', icon: Map, badge: 'LIVE', badgeColor: 'bg-cyan-500' },
  { href: '#/analytics', label: 'Analitik Prediktif', icon: BarChart3 },
  { href: '#/insights', label: 'Rekomendasi Aksi', icon: Lightbulb, badge: '3', badgeColor: 'bg-red-500' },
]

const statusItems: NavItem[] = [
  { href: '#/map?layer=salinity', label: 'Intrusi Salinitas', icon: Waves },
  { href: '#/map?layer=abrasion', label: 'Zona Abrasi', icon: AlertTriangle },
  { href: '#/map?layer=solar', label: 'Titik Solar', icon: Sun },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  currentPath: string
}

export function Sidebar({ collapsed, onToggle, currentPath }: SidebarProps) {
  return (
    <aside className={cn(
      'relative flex flex-col bg-gray-900 border-r border-gray-800',
      'transition-all duration-300 ease-in-out',
      'h-screen flex-shrink-0',
      collapsed ? 'w-16' : 'w-64',
      'hidden md:flex'
    )}>
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 p-4 border-b border-gray-800 h-16',
        collapsed && 'justify-center'
      )}>
        <div className="w-8 h-8 gradient-ocean rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-ocean-500/20">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="font-bold text-white text-sm leading-none">AkarBiru</p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Coastal Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
            Navigasi
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.href.replace('#', '') ||
            currentPath.startsWith(item.href.replace('#', '') + '/')
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                'transition-all duration-150 group relative',
                isActive
                  ? 'bg-ocean-600 text-white shadow-md shadow-ocean-600/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                collapsed && 'justify-center'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full text-white font-medium',
                      item.badgeColor
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs
                                rounded opacity-0 group-hover:opacity-100 transition-opacity
                                whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </a>
          )
        })}

        {/* Layer Shortcuts */}
        {!collapsed && (
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2 mt-4">
            Layer Peta
          </p>
        )}
        {collapsed && <div className="border-t border-gray-800 my-2" />}
        {statusItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'text-gray-500 hover:bg-gray-800 hover:text-gray-300',
                'transition-all duration-150 group relative text-sm',
                collapsed && 'justify-center'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </a>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-gray-800 border border-gray-700
                   rounded-full p-1 text-gray-400 hover:text-white transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* System Status Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/60 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Data BMKG — Live</span>
          </div>
        </div>
      )}
    </aside>
  )
}
