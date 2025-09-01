// Mock data for Zoning Clearance System

export const mockApplications = [
  {
    id: 1,
    refNo: "ZC-2025-0001",
    applicantName: "Maria Santos",
    contactNumber: "09123456789",
    email: "maria.santos@email.com",
    address: "123 Grace Park Ave, Caloocan City",
    companyName: null,
    businessPermitNo: null,
    projectType: "Residential House",
    lotLocation: "Lot 1, Block 2, Grace Park East",
    coordinates: { lat: 14.6507, lng: 120.9677 },
    barangay: "Barangay 14 (Grace Park East)",
    district: "2nd District",
    lotArea: 120.5,
    intendedUse: "R-1 (Residential 1)",
    projectDescription: "Construction of a 2-story residential house",
    dateSubmitted: "2025-01-15",
    status: "Pending",
    assignedPlanner: "Eng. Juan dela Cruz",
    requirements: {
      tct: { uploaded: true, filename: "TCT_001.pdf" },
      barangayClearance: { uploaded: true, filename: "Brgy_Clearance.pdf" },
      siteDevelopmentPlan: { uploaded: false, filename: null },
      environmentalCompliance: { uploaded: true, filename: "ECC.pdf" },
      fireSafetyClearance: { uploaded: false, filename: null }
    },
    aiSuggestion: {
      predictedZone: "Residential Zone",
      confidence: 87,
      notes: "Lot falls inside a residential zone boundary"
    },
    complianceChecks: {
      barangayClearance: { status: "valid", message: "Valid clearance" },
      fireSafety: { status: "missing", message: "Fire Safety Certificate required" },
      landUseType: { status: "allowed", message: "Allowed in Residential Zone" }
    },
    internalNotes: "Applicant contacted on Jan 20 regarding missing documents"
  },
  {
    id: 2,
    refNo: "ZC-2025-0002",
    applicantName: "ABC Development Corp",
    contactNumber: "09234567890",
    email: "info@abcdev.com",
    address: "456 Rizal Ave, Caloocan City",
    companyName: "ABC Development Corporation",
    businessPermitNo: "BP-2024-5678",
    projectType: "Commercial Building",
    lotLocation: "Lot 5, Block 3, Monumento Area",
    coordinates: { lat: 14.6539, lng: 120.9843 },
    barangay: "Barangay 35 (Monumento)",
    district: "2nd District",
    lotArea: 500.0,
    intendedUse: "C-2 (Commercial 2)",
    projectDescription: "Construction of 5-story commercial building with retail spaces",
    dateSubmitted: "2025-01-10",
    status: "For Compliance",
    assignedPlanner: "Arch. Lisa Reyes",
    requirements: {
      tct: { uploaded: true, filename: "TCT_002.pdf" },
      barangayClearance: { uploaded: true, filename: "Brgy_Clearance_002.pdf" },
      siteDevelopmentPlan: { uploaded: true, filename: "Site_Plan_002.pdf" },
      environmentalCompliance: { uploaded: false, filename: null },
      fireSafetyClearance: { uploaded: true, filename: "Fire_Safety_002.pdf" }
    },
    aiSuggestion: {
      predictedZone: "Commercial Zone",
      confidence: 95,
      notes: "Lot is within designated commercial zone near Bonifacio Monument"
    },
    complianceChecks: {
      barangayClearance: { status: "valid", message: "Valid clearance" },
      fireSafety: { status: "valid", message: "Fire Safety Certificate valid" },
      landUseType: { status: "allowed", message: "Allowed in Commercial Zone" }
    },
    internalNotes: "ECC requirement sent to applicant via email"
  },
  {
    id: 3,
    refNo: "ZC-2025-0003",
    applicantName: "Roberto Garcia",
    contactNumber: "09345678901",
    email: "roberto.garcia@email.com",
    address: "789 Bagong Silang St, Caloocan City",
    companyName: null,
    businessPermitNo: null,
    projectType: "Warehouse",
    lotLocation: "Lot 10, Block 1, Bagong Silang",
    coordinates: { lat: 14.7324, lng: 121.0120 },
    barangay: "Barangay 176-A (Bagong Silang)",
    district: "3rd District",
    lotArea: 800.0,
    intendedUse: "I-1 (Industrial 1)",
    projectDescription: "Construction of storage warehouse facility",
    dateSubmitted: "2025-01-08",
    status: "Approved",
    assignedPlanner: "Eng. Carlos Mendoza",
    requirements: {
      tct: { uploaded: true, filename: "TCT_003.pdf" },
      barangayClearance: { uploaded: true, filename: "Brgy_Clearance_003.pdf" },
      siteDevelopmentPlan: { uploaded: true, filename: "Site_Plan_003.pdf" },
      environmentalCompliance: { uploaded: true, filename: "ECC_003.pdf" },
      fireSafetyClearance: { uploaded: true, filename: "Fire_Safety_003.pdf" }
    },
    aiSuggestion: {
      predictedZone: "Industrial Zone",
      confidence: 92,
      notes: "Located in approved industrial zone"
    },
    complianceChecks: {
      barangayClearance: { status: "valid", message: "Valid clearance" },
      fireSafety: { status: "valid", message: "Fire Safety Certificate valid" },
      landUseType: { status: "allowed", message: "Allowed in Industrial Zone" }
    },
    internalNotes: "Approved on Jan 25, 2025. Clearance document generated."
  },
  {
    id: 4,
    refNo: "ZC-2025-0004",
    applicantName: "Green Subdivision Inc",
    contactNumber: "09456789012",
    email: "contact@greensubdivision.com",
    address: "321 Camarin Road, Caloocan City",
    companyName: "Green Subdivision Inc",
    businessPermitNo: "BP-2024-9012",
    projectType: "Subdivision",
    lotLocation: "Lots 1-50, Camarin Area",
    coordinates: { lat: 14.7595, lng: 121.0458 },
    barangay: "Barangay 171 (Camarin)",
    district: "1st District",
    lotArea: 10000.0,
    intendedUse: "Mixed-use",
    projectDescription: "Development of 50-lot residential subdivision with commercial area",
    dateSubmitted: "2025-01-05",
    status: "Rejected",
    assignedPlanner: "Arch. Michelle Torres",
    requirements: {
      tct: { uploaded: true, filename: "TCT_004.pdf" },
      barangayClearance: { uploaded: false, filename: null },
      siteDevelopmentPlan: { uploaded: true, filename: "Site_Plan_004.pdf" },
      environmentalCompliance: { uploaded: false, filename: null },
      fireSafetyClearance: { uploaded: false, filename: null }
    },
    aiSuggestion: {
      predictedZone: "Residential Zone",
      confidence: 78,
      notes: "Lot partially falls in agricultural zone"
    },
    complianceChecks: {
      barangayClearance: { status: "missing", message: "Barangay clearance required" },
      fireSafety: { status: "missing", message: "Fire Safety Certificate required" },
      landUseType: { status: "conflict", message: "Subdivision not allowed in agricultural zone" }
    },
    internalNotes: "Rejected due to zoning conflict. Applicant needs to apply for rezoning first."
  },
  {
    id: 5,
    refNo: "ZC-2025-0005",
    applicantName: "Jose Villanueva",
    contactNumber: "09567890123",
    email: "jose.villanueva@email.com",
    address: "45 Tala Hospital Road, Caloocan City",
    companyName: null,
    businessPermitNo: null,
    projectType: "Residential House",
    lotLocation: "Lot 8, Block 5, Tala Estate",
    coordinates: { lat: 14.7612, lng: 121.0123 },
    barangay: "Barangay 179 (Tala)",
    district: "3rd District",
    lotArea: 200.0,
    intendedUse: "R-2 (Residential 2)",
    projectDescription: "Construction of single-story residential house with garden",
    dateSubmitted: "2025-01-20",
    status: "Approved",
    assignedPlanner: "Eng. Patricia Santos",
    requirements: {
      tct: { uploaded: true, filename: "TCT_005.pdf" },
      barangayClearance: { uploaded: true, filename: "Brgy_Clearance_005.pdf" },
      siteDevelopmentPlan: { uploaded: true, filename: "Site_Plan_005.pdf" },
      environmentalCompliance: { uploaded: true, filename: "ECC_005.pdf" },
      fireSafetyClearance: { uploaded: true, filename: "Fire_Safety_005.pdf" }
    },
    aiSuggestion: {
      predictedZone: "Residential Zone",
      confidence: 92,
      notes: "Lot is in established residential area near Tala Hospital"
    },
    complianceChecks: {
      barangayClearance: { status: "valid", message: "Valid clearance from Barangay 179" },
      fireSafety: { status: "valid", message: "Fire Safety Certificate valid" },
      landUseType: { status: "allowed", message: "Allowed in Residential Zone" }
    },
    internalNotes: "Complete application - approved after site inspection"
  }
];

export const mockZoningAlerts = [
  {
    id: 1,
    refNo: "ZC-2025-0014",
    message: "Applicant requested Commercial in Residential Zone",
    type: "warning",
    date: "2025-01-30"
  },
  {
    id: 2,
    refNo: "ZC-2025-0012",
    message: "Missing Environmental Compliance Certificate for Industrial project",
    type: "error",
    date: "2025-01-29"
  },
  {
    id: 3,
    refNo: "ZC-2025-0010",
    message: "Application pending for 15 days - requires follow-up",
    type: "info",
    date: "2025-01-28"
  }
];

export const mockKPIs = {
  pendingApplications: 15,
  approvedToday: 3,
  approvedThisWeek: 12,
  forCompliance: 8,
  averageProcessingTime: "7.5 days",
  totalApplications: 156
};

export const mockBarangays = [
  // South Caloocan - 1st District
  "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4",
  "Barangay 77", "Barangay 78", "Barangay 85",
  "Barangay 132", "Barangay 140", "Barangay 164",
  // South Caloocan - 2nd District  
  "Barangay 14 (Grace Park East)", "Barangay 35 (Monumento)", 
  "Barangay 50", "Barangay 76 (Sangandaan)",
  "Barangay 86", "Barangay 100", "Barangay 131",
  // North Caloocan - 1st District
  "Barangay 165", "Barangay 171 (Camarin)", "Barangay 177",
  // North Caloocan - 3rd District
  "Barangay 176-A (Bagong Silang)", "Barangay 176-B (Bagong Silang)",
  "Barangay 179 (Tala)", "Barangay 185", "Barangay 188"
];

export const mockDistricts = [
  "1st District", "2nd District", "3rd District"
];

export const mockZoningTypes = [
  "R-1 (Residential 1)", 
  "R-2 (Residential 2)", 
  "C-1 (Commercial 1)", 
  "C-2 (Commercial 2)", 
  "C-3 (Commercial 3)", 
  "I-1 (Industrial 1)", 
  "I-2 (Industrial 2)", 
  "Mixed-use", 
  "Institutional", 
  "Parks & Recreation", 
  "Transportation & Utilities", 
  "Cemetery",
  "Special Zone"
];

export const mockPlanners = [
  "Eng. Juan dela Cruz", "Arch. Lisa Reyes", "Eng. Carlos Mendoza", 
  "Arch. Michelle Torres", "Eng. Patricia Santos", "Arch. Roberto Kim"
];

export const mockReportsData = {
  applicationsByStatus: [
    { name: "Pending", value: 15, color: "#f59e0b" },
    { name: "Approved", value: 45, color: "#10b981" },
    { name: "For Compliance", value: 8, color: "#3b82f6" },
    { name: "Rejected", value: 3, color: "#ef4444" }
  ],
  applicationsByBarangay: [
    { barangay: "Barangay 35 (Monumento)", count: 18 },
    { barangay: "Barangay 14 (Grace Park East)", count: 15 },
    { barangay: "Barangay 176-A (Bagong Silang)", count: 12 },
    { barangay: "Barangay 171 (Camarin)", count: 10 },
    { barangay: "Barangay 179 (Tala)", count: 8 }
  ],
  processingTimeData: [
    { week: "Week 1", time: 6.2 },
    { week: "Week 2", time: 7.8 },
    { week: "Week 3", time: 5.9 },
    { week: "Week 4", time: 8.1 }
  ],
  zoningDistribution: [
    { name: "Residential", value: 45, color: "#10b981" },
    { name: "Commercial", value: 25, color: "#3b82f6" },
    { name: "Industrial", value: 15, color: "#f59e0b" },
    { name: "Mixed-use", value: 10, color: "#8b5cf6" },
    { name: "Agricultural", value: 5, color: "#84cc16" }
  ]
};