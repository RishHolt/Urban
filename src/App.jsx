import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar/sidebar'
import Dashboard from './pages/Dashboard'
import GeneralSettings from './pages/settings/General'
import SecuritySettings from './pages/settings/Security'
import Header from './components/header/Header'
import sidebarItems from './components/sidebar/sidebarItems'
import Module2 from './pages/Module2'
import ZoningDashboard from './pages/zoning-system/Dashboard'
import ApplicationsManagement from './pages/zoning-system/ApplicationsManagement'
import ZoningMap from './pages/zoning-system/ZoningMap'
import ReportsAnalytics from './pages/zoning-system/ReportsAnalytics'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const location = useLocation()

  // Helper to find breadcrumb path from sidebarItems
  function getBreadcrumb() {
    for (const item of sidebarItems) {
      if (item.path === location.pathname) return [item.label]
      if (item.subItems) {
        const sub = item.subItems.find(sub => sub.path === location.pathname)
        if (sub) return [item.label, sub.label]
      }
    }
    return ['Dashboard']
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 dark:from-slate-800 via-blue-50 dark:via-slate-800 to-indigo-50 dark:to-slate-800 min-h-screen transition-colors duration-200">
      <div className='flex h-screen overflow-hidden'>
        <Sidebar collapsed={sidebarCollapsed} />
        <div className='flex flex-col flex-1'>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            breadcrumb={getBreadcrumb()}
          />
          <main className="flex-1 dark:bg-slate-800 p-8 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/zoning/dashboard" element={<ZoningDashboard />} />
              <Route path="/zoning/applications" element={<ApplicationsManagement />} />
              <Route path="/zoning/map" element={<ZoningMap />} />
              <Route path="/zoning/reports" element={<ReportsAnalytics />} />
              <Route path="/module2" element={<Module2 />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App