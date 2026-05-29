/**
 * DashboardLayout — Main layout wrapper
 */
import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath: string
}

export function DashboardLayout({ children, currentPath }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(prev => !prev)}
        currentPath={currentPath}
      />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <TopNav onMenuToggle={() => setSidebarCollapsed(prev => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
