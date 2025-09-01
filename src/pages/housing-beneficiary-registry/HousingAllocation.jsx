import { useState } from 'react';

export default function HousingAllocation() {
  const [selectedProject, setSelectedProject] = useState('');
  const [allocationMode, setAllocationMode] = useState('manual'); // manual or auto
  const [showAllocationModal, setShowAllocationModal] = useState(false);

  const housingProjects = [
    {
      id: 1,
      name: 'Caloocan Heights Phase 2',
      location: 'Barangay Bagbaguin',
      totalUnits: 500,
      availableUnits: 15,
      allocatedUnits: 485,
      unitTypes: ['1BR (25sqm)', '2BR (35sqm)', '3BR (45sqm)'],
      priceRange: '₱8,000 - ₱15,000/month',
      developer: 'Caloocan Housing Development Corp'
    },
    {
      id: 2,
      name: 'Grace Village',
      location: 'Barangay Bahay Toro',
      totalUnits: 300,
      availableUnits: 2,
      allocatedUnits: 298,
      unitTypes: ['2BR (35sqm)', '3BR (45sqm)'],
      priceRange: '₱10,000 - ₱18,000/month',
      developer: 'LGU Caloocan - SHFC Partnership'
    },
    {
      id: 3,
      name: 'Hope Residences',
      location: 'Barangay Bignay',
      totalUnits: 400,
      availableUnits: 75,
      allocatedUnits: 325,
      unitTypes: ['1BR (25sqm)', '2BR (35sqm)', '3BR (45sqm)', '4BR (55sqm)'],
      priceRange: '₱7,500 - ₱20,000/month',
      developer: 'National Housing Authority'
    }
  ];

  const availableUnits = [
    { id: 'A-12-205', project: 'Caloocan Heights Phase 2', block: 'A-12', unit: '205', type: '2BR', sqm: 35, floor: 2, status: 'available' },
    { id: 'A-15-301', project: 'Caloocan Heights Phase 2', block: 'A-15', unit: '301', type: '3BR', sqm: 45, floor: 3, status: 'available' },
    { id: 'B-08-102', project: 'Grace Village', block: 'B-08', unit: '102', type: '2BR', sqm: 35, floor: 1, status: 'available' },
    { id: 'C-15-101', project: 'Hope Residences', block: 'C-15', unit: '101', type: '1BR', sqm: 25, floor: 1, status: 'available' },
    { id: 'C-20-405', project: 'Hope Residences', block: 'C-20', unit: '405', type: '3BR', sqm: 45, floor: 4, status: 'available' }
  ];

  const priorityBeneficiaries = [
    {
      id: 1,
      name: 'Elena Virtudez',
      familySize: 6,
      priority: 'PWD',
      monthlyIncome: 12000,
      waitingSince: '2024-01-15',
      preferredUnit: '3BR or 4BR',
      specialNeeds: 'Wheelchair accessible unit required',
      score: 95
    },
    {
      id: 2,
      name: 'Francisco Mendoza',
      familySize: 2,
      priority: 'Senior Citizen',
      monthlyIncome: 8000,
      waitingSince: '2024-02-20',
      preferredUnit: '1BR or 2BR',
      specialNeeds: 'Ground floor preferred',
      score: 92
    },
    {
      id: 3,
      name: 'Carmen Reyes',
      familySize: 4,
      priority: 'Solo Parent',
      monthlyIncome: 15000,
      waitingSince: '2024-03-10',
      preferredUnit: '2BR or 3BR',
      specialNeeds: 'Near school/daycare',
      score: 88
    }
  ];

  const recentAllocations = [
    {
      id: 1,
      beneficiary: 'Maria Clara Santos',
      unit: 'Block A-12, Unit 205',
      project: 'Caloocan Heights Phase 2',
      allocatedDate: '2024-08-30',
      moveInDate: '2024-09-15',
      status: 'allocated',
      monthlyRent: 12000
    },
    {
      id: 2,
      beneficiary: 'Juan Miguel Rodriguez',
      unit: 'Block B-08, Unit 102',
      project: 'Grace Village',
      allocatedDate: '2024-08-29',
      moveInDate: '2024-09-10',
      status: 'moved_in',
      monthlyRent: 14000
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'PWD': return 'bg-purple-100 text-purple-800';
      case 'Senior Citizen': return 'bg-orange-100 text-orange-800';
      case 'Solo Parent': return 'bg-pink-100 text-pink-800';
      case 'Informal Settler': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'allocated': return 'bg-blue-100 text-blue-800';
      case 'moved_in': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAutoAllocation = () => {
    console.log('Running automatic allocation algorithm...');
    // Implementation for AI-based allocation matching
  };

  const handleManualAllocation = (beneficiaryId, unitId) => {
    console.log(`Allocating unit ${unitId} to beneficiary ${beneficiaryId}`);
    setShowAllocationModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Housing Allocation & Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400">Match beneficiaries to available housing units and track allocations</p>
      </div>

      {/* Allocation Mode Selector */}
      <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 mb-6 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Allocation Mode</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setAllocationMode('manual')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              allocationMode === 'manual' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border'
            }`}
          >
            👤 Manual Allocation
          </button>
          <button
            onClick={() => setAllocationMode('auto')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              allocationMode === 'auto' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border'
            }`}
          >
            🤖 AI-Assisted Allocation
          </button>
          {allocationMode === 'auto' && (
            <button
              onClick={handleAutoAllocation}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
            >
              ⚡ Run Auto-Allocation
            </button>
          )}
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
        {/* Available Housing Projects */}
        <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Available Housing Projects</h3>
          <div className="space-y-4">
            {housingProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.availableUnits > 10 ? 'bg-green-100 text-green-800' :
                    project.availableUnits > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {project.availableUnits} available
                  </span>
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  <p>📍 {project.location}</p>
                  <p>🏗️ {project.developer}</p>
                  <p>💰 {project.priceRange}</p>
                </div>
                
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(project.allocatedUnits / project.totalUnits) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>{project.allocatedUnits} / {project.totalUnits} allocated</span>
                  <span>{Math.round((project.allocatedUnits / project.totalUnits) * 100)}%</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.unitTypes.map((type, idx) => (
                    <span key={idx} className="bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Beneficiaries Queue */}
        <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Priority Beneficiaries Queue</h3>
          <div className="space-y-4">
            {priorityBeneficiaries.map((beneficiary, idx) => (
              <div key={beneficiary.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full font-bold text-sm">#{idx + 1}</span>
                    <h4 className="font-medium text-gray-900 dark:text-white">{beneficiary.name}</h4>
                  </div>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">
                    Score: {beneficiary.score}
                  </span>
                </div>
                
                <div className="gap-2 grid grid-cols-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>👥 {beneficiary.familySize} members</span>
                  <span>💰 ₱{beneficiary.monthlyIncome.toLocaleString()}</span>
                  <span>📅 Since {beneficiary.waitingSince}</span>
                  <span>🏠 {beneficiary.preferredUnit}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(beneficiary.priority)}`}>
                    {beneficiary.priority}
                  </span>
                </div>
                
                {beneficiary.specialNeeds && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                    ⚠️ {beneficiary.specialNeeds}
                  </div>
                )}
                
                <button 
                  onClick={() => setShowAllocationModal(true)}
                  className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg w-full font-medium text-white text-sm transition-colors"
                >
                  🏠 Allocate Housing
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Units Table */}
      <div className="bg-white dark:bg-slate-800 shadow-sm mb-6 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Available Units for Allocation</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Unit ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Block/Unit
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Type/Size
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Floor
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {availableUnits.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <span className="bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded font-mono text-xs">
                      {unit.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {unit.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {unit.block} - {unit.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {unit.type} ({unit.sqm}sqm)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    Floor {unit.floor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      Allocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Allocations */}
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Recent Allocations</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Beneficiary
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Assigned Unit
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Monthly Rent
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Allocation Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Status
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
                    <div className="font-mono text-xs">{allocation.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {allocation.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    ₱{allocation.monthlyRent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {allocation.allocatedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(allocation.status)}`}>
                      {allocation.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
