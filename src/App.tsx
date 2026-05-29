/**
 * AkarBiru — Platform Mitigasi Krisis Pesisir Indonesia
 * Transformed from GeoSeeker game
 *
 * Uses hash-based routing for SPA navigation
 */

import React, { useState, useEffect } from 'react'
import { DashboardLayout } from './components/layout/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import MapPage from './pages/MapPage'
import AnalyticsPage from './pages/AnalyticsPage'
import InsightsPage from './pages/InsightsPage'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Leaf, BarChart3, Map, Lightbulb, Waves } from 'lucide-react'

function useHashRoute(): string {
  const [path, setPath] = useState(() => {
    const hash = window.location.hash.replace('#', '') || '/dashboard'
    return hash
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/dashboard'
      setPath(hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Redirect to dashboard if on root
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.location.hash = '#/dashboard'
    }
  }, [])

  return path
}

function renderPage(path: string) {
  const basePath = path.split('?')[0]

  switch (basePath) {
    case '/dashboard':
      return <DashboardPage />
    case '/map':
      return <MapPage />
    case '/analytics':
      return <AnalyticsPage />
    case '/insights':
      return <InsightsPage />
    default:
      return <DashboardPage />
  }
}

export default function App() {
  const currentPath = useHashRoute()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Splash screen
  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-ocean-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          <div className="w-20 h-20 gradient-ocean rounded-2xl flex items-center justify-center shadow-2xl shadow-ocean-500/30 mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AkarBiru</h1>
          <p className="text-gray-400 text-sm mb-8">Platform Mitigasi Krisis Pesisir Indonesia</p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-md">
            {[
              { icon: Waves, label: 'Analisis Salinitas' },
              { icon: Map, label: 'Peta Pesisir' },
              { icon: BarChart3, label: 'Prediksi AI' },
              { icon: Lightbulb, label: 'Rekomendasi Aksi' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50 text-xs text-gray-400">
                <Icon className="w-3 h-3 text-ocean-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Loading spinner */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-ocean-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Memuat dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <DashboardLayout currentPath={currentPath}>
        <ErrorBoundary>
          {renderPage(currentPath)}
        </ErrorBoundary>
      </DashboardLayout>
    </ErrorBoundary>
  )
}
