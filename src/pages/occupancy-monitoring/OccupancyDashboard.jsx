import { useState } from 'react';

export default function OccupancyDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  const dashboardStats = {
    activePermits: 2847,
    expiringSoon: 156, // within 30 days
    nonCompliant: 23,
    renewalsNeeded: 89,
    inspectionsScheduled: 45,
    violationsReported: 12
  };

  const permitsByType = [
    { type: 'Residential', count: 1892, percentage: 66 },
    { type: 'Commercial', count: 654, percentage: 23 },
    { type: 'Mixed-use', count: 201, percentage: 7 },
    { type: 'Industrial', count: 100, percentage: 4 }
  ];

  const recentPermits = [
    {
      id: 1,
      permitNumber: 'OCP-2024-1245',
      propertyName: 'Santos Commercial Building',
      owner: 'Maria Santos',
      address: 'A. Mabini St., Barangay Grace Park',
      buildingType: 'Commercial',
      occupancyType: 'Retail/Office',
      issuedDate: '2024-08-28',
      expiryDate: '2025-08-28',
      status: 'active',
      lastInspection: '2024-08-15',
      compliance: 'compliant'
    },
    {
      id: 2,
      permitNumber: 'OCP-2024-1246',
      propertyName: 'Rodriguez Residential Complex',
      owner: 'Juan Rodriguez',
      address: 'Gen. San Miguel St., Barangay Sangandaan',
      buildingType: 'Residential',
      occupancyType: 'Apartment Complex',
      issuedDate: '2024-08-30',
      expiryDate: '2025-08-30',
      status: 'active',
      lastInspection: '2024-08-20',
      compliance: 'compliant'
    },
    {
      id: 3,
      permitNumber: 'OCP-2024-1243',
      propertyName: 'Dela Cruz Warehouse',
      owner: 'Ana Dela Cruz',
      address: 'C-4 Road, Barangay Bagong Silang',
      buildingType: 'Industrial',
      occupancyType: 'Warehouse/Storage',
      issuedDate: '2024-08-25',
      expiryDate: '2025-08-25',
      status: 'expiring_soon',
      lastInspection: '2024-07-30',
      compliance: 'minor_violations'
    }
  ];

  const upcomingInspections = [
    {
      id: 1,
      permitNumber: 'OCP-2024-1240',
      propertyName: 'Metro Mall Caloocan',
      address: 'EDSA, Barangay Monumento',
      inspectionType: 'Annual Compliance',
      scheduledDate: '2024-09-05',
      inspector: 'Engr. Roberto Santos',
      notes: 'Focus on fire safety systems'
    },
    {
      id: 2,
      permitNumber: 'OCP-2024-1235',
      propertyName: 'Sunrise Apartments',
      address: 'Rizal Ave., Barangay Grace Park',
      inspectionType: 'Violation Follow-up',
      scheduledDate: '2024-09-03',
      inspector: 'Arch. Maria Gonzales',
      notes: 'Check structural modifications'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance) => {
    switch (compliance) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'minor_violations': return 'bg-yellow-100 text-yellow-800';
      case 'major_violations': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBuildingTypeIcon = (type) => {
    switch (type) {
      case 'Residential': return '🏠';
      case 'Commercial': return '🏢';
      case 'Industrial': return '🏭';
      case 'Mixed-use': return '🏪';
      default: return '🏗️';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Occupancy Monitoring Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track building occupancy permits, compliance, and renewal management</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-red-50 dark:from-red-900/20 to-orange-50 dark:to-orange-900/20 mb-6 p-4 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-red-600 text-2xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-400">Urgent Attention Required</h3>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {dashboardStats.expiringSoon} permits expiring within 30 days • {dashboardStats.violationsReported} new violations reported
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 ml-auto px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-blue-100 text-sm">Active Permits</p>
            <p className="font-bold text-xl">{dashboardStats.activePermits.toLocaleString()}</p>
            <p className="text-blue-200 text-xs">Currently valid</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-yellow-100 text-sm">Expiring Soon</p>
            <p className="font-bold text-xl">{dashboardStats.expiringSoon}</p>
            <p className="text-yellow-200 text-xs">Within 30 days</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-red-100 text-sm">Non-Compliant</p>
            <p className="font-bold text-xl">{dashboardStats.nonCompliant}</p>
            <p className="text-red-200 text-xs">Need action</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-green-100 text-sm">Renewals</p>
            <p className="font-bold text-xl">{dashboardStats.renewalsNeeded}</p>
            <p className="text-green-200 text-xs">Pending</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-purple-100 text-sm">Inspections</p>
            <p className="font-bold text-xl">{dashboardStats.inspectionsScheduled}</p>
            <p className="text-purple-200 text-xs">Scheduled</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="text-center">
            <p className="text-orange-100 text-sm">Violations</p>
            <p className="font-bold text-xl">{dashboardStats.violationsReported}</p>
            <p className="text-orange-200 text-xs">Reported</p>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Permit Distribution */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Permits by Building Type</h3>
            <div className="space-y-3">
              {permitsByType.map((permit, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getBuildingTypeIcon(permit.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{permit.type}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{permit.count} permits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-12 h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2" 
                        style={{ width: `${permit.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{permit.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Inspections */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Upcoming Inspections</h3>
            <div className="space-y-4">
              {upcomingInspections.map((inspection) => (
                <div key={inspection.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{inspection.propertyName}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">📍 {inspection.address}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        🔍 {inspection.inspectionType} • 📅 {inspection.scheduledDate}
                      </p>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full font-mono text-xs">
                      {inspection.permitNumber}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 p-2 rounded text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">👨‍💼</span>
                      <span className="text-gray-700 dark:text-gray-300">Inspector: {inspection.inspector}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-orange-600">📝</span>
                      <span className="text-gray-700 dark:text-gray-300">{inspection.notes}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      Complete Inspection
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Permit Activities */}
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Recent Occupancy Permits</h3>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg font-medium text-white text-sm transition-colors">
                ➕ Issue New Permit
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg font-medium text-white text-sm transition-colors">
                📊 Export Report
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Permit Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {recentPermits.map((permit) => (
                <tr key={permit.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getBuildingTypeIcon(permit.buildingType)}</span>
                        <div className="font-medium">{permit.propertyName}</div>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{permit.address}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{permit.occupancyType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {permit.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {permit.buildingType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <span className="bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded font-mono text-xs">
                      {permit.permitNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div>{permit.expiryDate}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        Issued: {permit.issuedDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                      {permit.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(permit.compliance)}`}>
                      {permit.compliance.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs transition-colors">
                        View
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-xs transition-colors">
                        Inspect
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-white text-xs transition-colors">
                        Renew
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🏗️ Permit Issuance
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📊 Occupancy Tracking
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🔍 Compliance Monitoring
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📈 Reports & Analytics
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          ⚠️ Violation Reports
        </button>
      </div>
    </div>
  );
}
