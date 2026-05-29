/**
 * ErrorBoundary — Catches React rendering errors
 */
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[AkarBiru Error Boundary]:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]
                        text-center p-8 bg-gray-900 rounded-xl border border-gray-800">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center
                          justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-400 text-sm mb-4 max-w-sm">
            Komponen gagal dimuat. Coba refresh halaman atau hubungi tim teknis.
          </p>
          {this.state.error && (
            <code className="text-xs text-red-400 bg-gray-800 px-3 py-1 rounded mb-4
                             max-w-xs truncate block">
              {this.state.error.message}
            </code>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="flex items-center gap-2 px-4 py-2 bg-ocean-600
                       hover:bg-ocean-500 text-white rounded-lg text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
