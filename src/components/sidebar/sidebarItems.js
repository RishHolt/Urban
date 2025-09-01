import { LayoutDashboard, Settings, Users, FileText, MapPin, BarChart3, ClipboardCheck, Home, Building, Wrench, Eye } from 'lucide-react'

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "zoning-system",
    label: "Zoning Clearance System",
    icon: ClipboardCheck,
    subItems: [
      {
        id: "zoning-dashboard",
        label: "Dashboard",
        path: "/zoning/dashboard"
      },
      {
        id: "applications-management",
        label: "Applications Management",
        path: "/zoning/applications"
      },
      {
        id: "application-review",
        label: "Application Review",
        path: "/zoning/review"
      },
      {
        id: "zoning-map",
        label: "Zoning Map & Compliance",
        path: "/zoning/map"
      },
      {
        id: "zoning-reports-analytics",
        label: "Reports & Analytics",
        path: "/zoning/reports"
      },
      {
        id: "zoning-audit-logs",
        label: "Audit Logs",
        path: "/zoning/audit"
      }
    ]
  },
  {
    id: "housing-beneficiary-registry",
    label: "Housing Beneficiary Registry",
    icon: Home,
    subItems: [
      {
        id: "housing-dashboard",
        label: "Housing Dashboard",
        path: "/housing/dashboard"
      },
      {
        id: "beneficiary-management",
        label: "Beneficiary Management",
        path: "/housing/beneficiaries"
      },
      {
        id: "housing-allocation",
        label: "Housing Allocation",
        path: "/housing/allocation"
      }
    ]
  },
  {
    id: "subdivision-building-review",
    label: "Subdivision & Building Review",
    icon: Building,
    subItems: [
      {
        id: "subdivision-dashboard",
        label: "Review Dashboard",
        path: "/subdivision/dashboard"
      }
    ]
  },
  {
    id: "occupancy-monitoring",
    label: "Occupancy Monitoring Tool",
    icon: Eye,
    subItems: [
      {
        id: "occupancy-dashboard",
        label: "Occupancy Dashboard",
        path: "/occupancy/dashboard"
      }
    ]
  },
  {
    id: "infrastructure-coordination",
    label: "Infrastructure Project Coordination",
    icon: Wrench,
    subItems: [
      {
        id: "infrastructure-dashboard",
        label: "Infrastructure Dashboard",
        path: "/infrastructure/dashboard"
      },
      {
        id: "project-registry",
        label: "Project Registry",
        path: "/infrastructure/registry"
      },
      {
        id: "project-tracking",
        label: "Project Tracking",
        path: "/infrastructure/tracking"
      },
      {
        id: "zoning-integration",
        label: "Zoning Integration",
        path: "/infrastructure/zoning"
      },
      {
        id: "infrastructure-reports-analytics",
        label: "Reports & Analytics",
        path: "/infrastructure/reports"
      },
      {
        id: "audit-transparency",
        label: "Audit & Transparency",
        path: "/infrastructure/audit"
      }
    ]
  },
  {
    id: "module2",
    label: "Module2",
    icon: LayoutDashboard,
    path: "/module2"
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    subItems: [
      {
        id: "general-settings",
        label: "General",
        path: "/settings/general"
      },
      {
        id: "security-settings",
        label: "Security",
        path: "/settings/security"
      }
    ]
  }
]

export default sidebarItems