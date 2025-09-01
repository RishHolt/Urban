import { useState } from 'react';

export default function HousingDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  const dashboardStats = {
    totalBeneficiaries: 15420,
    allocatedUnits: 8965,
    availableUnits: 2135,
    waitingList: 4320,
    completedAllocations: 6830,
    priorityApplicants: {
      pwds: 845,
      seniors: 1256,
      informalSettlers: 2189,
      solo_parents: 634
    }
  };

  const recentAllocations = [
    {
      id: 1,
      beneficiary: 'Maria Clara Santos',
      familySize: 5,
      unit: 'Block A-12, Unit 205',
      project: 'Caloocan Heights Phase 2',
      status: 'allocated',
      date: '2024-08-30',
      priority: 'Senior Citizen'
    },
    {
      id: 2,
      beneficiary: 'Juan Miguel Rodriguez',
      familySize: 3,
      unit: 'Block B-08, Unit 102',
      project: 'Grace Village',
      status: 'moved_in',
      date: '2024-08-29',
      priority: 'Regular'
    },
    {
      id: 3,
      beneficiary: 'Ana Marie Dela Cruz',
      familySize: 4,
      unit: 'Block C-15, Unit 301',
      project: 'Hope Residences',
      status: 'pending_move_in',
      date: '2024-08-28',
      priority: 'PWD'
    }
  ];

  const housingProjects = [
    { name: 'Caloocan Heights Phase 2', total: 500, allocated: 485, available: 15 },
    { name: 'Grace Village', total: 300, allocated: 298, available: 2 },
    { name: 'Hope Residences', total: 400, allocated: 325, available: 75 },
    { name: 'Sunrise Homes', total: 250, allocated: 180, available: 70 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'allocated': return 'bg-blue-100 text-blue-800';
      case 'moved_in': return 'bg-green-100 text-green-800';
      case 'pending_move_in': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'PWD': return 'bg-purple-100 text-purple-800';
      case 'Senior Citizen': return 'bg-orange-100 text-orange-800';
      case 'Solo Parent': return 'bg-pink-100 text-pink-800';
      case 'Informal Settler': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Housing Beneficiary Registry Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive overview of housing beneficiaries and allocation status</p>
      </div>

      {/* Key Statistics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Total Beneficiaries</p>
              <p className="font-bold text-2xl">{dashboardStats.totalBeneficiaries.toLocaleString()}</p>
              <p className="text-blue-200 text-xs">+12% from last month</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">Allocated Housing Units</p>
              <p className="font-bold text-2xl">{dashboardStats.allocatedUnits.toLocaleString()}</p>
              <p className="text-green-200 text-xs">58% total allocation</p>
            </div>
            <div className="text-3xl">🏠</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-yellow-100 text-sm">Available Units</p>
              <p className="font-bold text-2xl">{dashboardStats.availableUnits.toLocaleString()}</p>
              <p className="text-yellow-200 text-xs">Ready for allocation</p>
            </div>
            <div className="text-3xl">🏘️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100 text-sm">Waiting List</p>
              <p className="font-bold text-2xl">{dashboardStats.waitingList.toLocaleString()}</p>
              <p className="text-purple-200 text-xs">Pending evaluation</p>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Priority Applicants */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-orange-50 dark:from-orange-900/20 to-red-50 dark:to-red-900/20 p-6 border border-orange-200 dark:border-orange-800 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Priority Applicants</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-full">♿</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">PWDs</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Persons with Disability</p>
                  </div>
                </div>
                <span className="font-bold text-purple-600 text-lg">{dashboardStats.priorityApplicants.pwds}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-600 p-2 rounded-full">👴</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Senior Citizens</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">60 years and above</p>
                  </div>
                </div>
                <span className="font-bold text-orange-600 text-lg">{dashboardStats.priorityApplicants.seniors}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-2 rounded-full">🏚️</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Informal Settlers</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Relocation programs</p>
                  </div>
                </div>
                <span className="font-bold text-red-600 text-lg">{dashboardStats.priorityApplicants.informalSettlers}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 text-pink-600 p-2 rounded-full">👩‍👧</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Solo Parents</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Single parent households</p>
                  </div>
                </div>
                <span className="font-bold text-pink-600 text-lg">{dashboardStats.priorityApplicants.solo_parents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Housing Projects Status */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Housing Projects Status</h3>
            <div className="space-y-4">
              {housingProjects.map((project, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {project.allocated} / {project.total} units
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                    <div 
                      className="bg-blue-500 rounded-full h-3 transition-all duration-300"
                      style={{ width: `${(project.allocated / project.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Allocated: {project.allocated}</span>
                    <span className="text-blue-600">Available: {project.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Allocations */}
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Recent Housing Allocations</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Beneficiary
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Family Size
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Assigned Unit
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {recentAllocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div className="font-medium">{allocation.beneficiary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {allocation.familySize} members
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div className="font-mono text-xs">{allocation.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {allocation.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(allocation.priority)}`}>
                      {allocation.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(allocation.status)}`}>
                      {allocation.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {allocation.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          👥 Manage Beneficiaries
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🏠 Housing Allocation
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📊 Generate Reports
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          ⚡ Priority Processing
        </button>
      </div>
    </div>
  );
}
