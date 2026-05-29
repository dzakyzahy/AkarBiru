# AkarBiru — Migration Audit
## GeoSeeker → AkarBiru Transformation Log

**Date:** 2026-05-29  
**Status:** ✅ Complete

---

## Original GeoSeeker Stack
| Component | Technology |
|-----------|-----------|
| Framework | Vite SPA + React 19 |
| Map Library | `@vis.gl/react-google-maps` v1.7.1 |
| CSS | Tailwind CSS v4 (`@tailwindcss/vite`) |
| State | React Context API |
| AI Service | `@google/genai` (Gemini) — **REMOVED** |
| Animation | `motion` (Framer Motion v12+) |
| Icons | `lucide-react` |
| Server | Express + Vite middleware |

## Files — KEEP (reused)
- `vite.config.ts` — modified path alias
- `tsconfig.json` — modified paths
- `server.ts` — modified, removed StreetView proxy
- `src/main.tsx` — minimal changes
- `package.json` — renamed, deps updated

## Files — MODIFIED (major refactor)
- `src/App.tsx` → hash-based router + DashboardLayout + splash screen
- `src/index.css` → complete AkarBiru design system (Tailwind v4)
- `index.html` → SEO meta tags, fonts, AkarBiru branding

## Files — DELETE (game-specific, no longer imported)
- `src/components/GameMap.tsx` — replaced by `CoastalMap.tsx`
- `src/components/GameSidebar.tsx` — replaced by `Sidebar.tsx`
- `src/components/CompassFeedback.tsx` — game compass, not needed
- `src/components/StreetView.tsx` — game street view, not needed
- `src/context/GameContext.tsx` — game state, replaced by hooks
- `src/services/geminiService.ts` — replaced by `aiService.ts`
- `src/types.ts` — game types, replaced by domain types
- `src/constants.ts` — game zones, replaced by region constants

## Files — NEW
### Types
- `src/types/coastal.types.ts`
- `src/types/energy.types.ts`

### Simulation Data
- `src/lib/simulation/coastal-sim.ts` — 4 Indonesian coastal regions
- `src/lib/simulation/energy-sim.ts` — solar optimization data

### Constants
- `src/lib/constants/regions.ts` — coastal region definitions
- `src/lib/constants/thresholds.ts` — risk level thresholds

### Utilities
- `src/lib/utils.ts` — cn(), formatNumber(), formatIDR()
- `src/lib/geo/coordinate-utils.ts` — Haversine, bearing (from GameContext)

### Services
- `src/services/aiService.ts` — rule-based insight engine (deterministic scoring)

### Hooks
- `src/hooks/useCoastalData.ts`
- `src/hooks/useEnergyData.ts`

### Layout Components
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/TopNav.tsx`
- `src/components/layout/DashboardLayout.tsx`

### Map Components
- `src/components/map/CoastalMap.tsx` — dual Google Maps / Leaflet
- `src/components/map/MapLayerToggle.tsx`

### Dashboard Components
- `src/components/dashboard/MetricsSummary.tsx`
- `src/components/dashboard/RiskAlertBanner.tsx`
- `src/components/dashboard/QuickInsights.tsx`

### Analytics Components
- `src/components/analytics/CoastlineChart.tsx`
- `src/components/analytics/SalinityTrendChart.tsx`
- `src/components/analytics/EnergyOutputChart.tsx`
- `src/components/analytics/RiskRadarChart.tsx`

### Insights Components
- `src/components/insights/InsightCard.tsx`

### Pages
- `src/pages/DashboardPage.tsx`
- `src/pages/MapPage.tsx`
- `src/pages/AnalyticsPage.tsx`
- `src/pages/InsightsPage.tsx`

### UI Components
- `src/components/ui/ErrorBoundary.tsx`
- `src/components/ui/Skeletons.tsx`

## Dependencies Changed
### Added
- `recharts` — charts
- `clsx` + `tailwind-merge` — className utility
- `leaflet` + `react-leaflet` + `@types/leaflet` — fallback map

### Removed
- `@google/genai` — no longer using Gemini API

### Kept
- `@vis.gl/react-google-maps` — primary map (when API key available)
- `lucide-react` — icons
- `motion` — animations
- `express` — dev server
