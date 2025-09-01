import Dashboard from './pages/Dashboard'
import ZoningDashboard from './pages/zoning-system/Dashboard'
import ApplicationsManagement from './pages/zoning-system/ApplicationsManagement'
import ZoningMap from './pages/zoning-system/ZoningMap'
import ZoningReportsAnalytics from './pages/zoning-system/ReportsAnalytics'
import ApplicationReview from './pages/zoning-system/ApplicationReview'
import AuditLogs from './pages/zoning-system/AuditLogs'
import HousingDashboard from './pages/housing-beneficiary-registry/HousingDashboard'
import BeneficiaryManagement from './pages/housing-beneficiary-registry/BeneficiaryManagement'
import HousingAllocation from './pages/housing-beneficiary-registry/HousingAllocation'
import SubdivisionDashboard from './pages/subdivision-building-review/SubdivisionDashboard'
import OccupancyDashboard from './pages/occupancy-monitoring/OccupancyDashboard'
import InfrastructureDashboard from './pages/infrastructure-coordination/InfrastructureDashboard'
import ProjectRegistry from './pages/infrastructure-coordination/ProjectRegistry'
import ProjectTracking from './pages/infrastructure-coordination/ProjectTracking'
import ZoningIntegration from './pages/infrastructure-coordination/ZoningIntegration'
import ReportsAnalytics from './pages/infrastructure-coordination/ReportsAnalytics'
import AuditTransparency from './pages/infrastructure-coordination/AuditTransparency'
import Module2 from './pages/Module2'
import GeneralSettings from './pages/settings/General'
import SecuritySettings from './pages/settings/Security'

const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  // Zoning Clearance System
  {
    path: '/zoning/dashboard',
    element: <ZoningDashboard />,
  },
  {
    path: '/zoning/applications',
    element: <ApplicationsManagement />,
  },
  {
    path: '/zoning/map',
    element: <ZoningMap />,
  },
  {
    path: '/zoning/reports',
    element: <ZoningReportsAnalytics />,
  },
  {
    path: '/zoning/review',
    element: <ApplicationReview />,
  },
  {
    path: '/zoning/audit',
    element: <AuditLogs />,
  },
  // Housing Beneficiary Registry
  {
    path: '/housing/dashboard',
    element: <HousingDashboard />,
  },
  {
    path: '/housing/beneficiaries',
    element: <BeneficiaryManagement />,
  },
  {
    path: '/housing/allocation',
    element: <HousingAllocation />,
  },
  // Subdivision & Building Review
  {
    path: '/subdivision/dashboard',
    element: <SubdivisionDashboard />,
  },
  // Occupancy Monitoring Tool
  {
    path: '/occupancy/dashboard',
    element: <OccupancyDashboard />,
  },
  // Infrastructure Project Coordination
  {
    path: '/infrastructure/dashboard',
    element: <InfrastructureDashboard />,
  },
  {
    path: '/infrastructure/registry',
    element: <ProjectRegistry />,
  },
  {
    path: '/infrastructure/tracking',
    element: <ProjectTracking />,
  },
  {
    path: '/infrastructure/zoning',
    element: <ZoningIntegration />,
  },
  {
    path: '/infrastructure/reports',
    element: <ReportsAnalytics />,
  },
  {
    path: '/infrastructure/audit',
    element: <AuditTransparency />,
  },
  {
    path: '/module2',
    element: <Module2 />,
  },
  {
    path: '/settings/general',
    element: <GeneralSettings />,
  },
  {
    path: '/settings/security',
    element: <SecuritySettings />,
  },
]

export default routes