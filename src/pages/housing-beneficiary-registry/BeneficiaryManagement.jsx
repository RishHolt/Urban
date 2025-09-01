import { useState } from 'react';

export default function BeneficiaryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const mockBeneficiaries = [
    {
      id: 1,
      name: 'Maria Clara Santos',
      age: 45,
      familySize: 5,
      monthlyIncome: 15000,
      occupation: 'Factory Worker',
      address: 'Barangay Bagbaguin, Caloocan City',
      priority: 'Senior Citizen',
      status: 'verified',
      applicationDate: '2024-07-15',
      housingStatus: 'allocated',
      contactNumber: '+63 917 123 4567',
      email: 'maria.santos@email.com'
    },
    {
      id: 2,
      name: 'Juan Miguel Rodriguez',
      age: 32,
      familySize: 3,
      monthlyIncome: 22000,
      occupation: 'Security Guard',
      address: 'Barangay Bahay Toro, Caloocan City',
      priority: 'Regular',
      status: 'under_verification',
      applicationDate: '2024-08-01',
      housingStatus: 'waiting_list',
      contactNumber: '+63 920 456 7890',
      email: 'juan.rodriguez@email.com'
    },
    {
      id: 3,
      name: 'Ana Marie Dela Cruz',
      age: 38,
      familySize: 4,
      monthlyIncome: 18000,
      occupation: 'Solo Parent - Vendor',
      address: 'Barangay Bignay, Caloocan City',
      priority: 'Solo Parent',
      status: 'verified',
      applicationDate: '2024-07-20',
      housingStatus: 'allocated',
      contactNumber: '+63 915 789 0123',
      email: 'ana.delacruz@email.com'
    },
    {
      id: 4,
      name: 'Roberto Gonzales',
      age: 65,
      familySize: 2,
      monthlyIncome: 8000,
      occupation: 'Retired',
      address: 'Barangay Kaybiga, Caloocan City',
      priority: 'Senior Citizen',
      status: 'verified',
      applicationDate: '2024-06-10',
      housingStatus: 'moved_in',
      contactNumber: '+63 918 234 5678',
      email: 'roberto.gonzales@email.com'
    },
    {
      id: 5,
      name: 'Lisa Marie Torres',
      age: 29,
      familySize: 6,
      monthlyIncome: 12000,
      occupation: 'Street Vendor',
      address: 'Informal Settlement, Barangay Deparo',
      priority: 'Informal Settler',
      status: 'needs_documents',
      applicationDate: '2024-08-20',
      housingStatus: 'waiting_list',
      contactNumber: '+63 912 345 6789',
      email: 'lisa.torres@email.com'
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
      case 'verified': return 'bg-green-100 text-green-800';
      case 'under_verification': return 'bg-yellow-100 text-yellow-800';
      case 'needs_documents': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHousingStatusColor = (status) => {
    switch (status) {
      case 'allocated': return 'bg-blue-100 text-blue-800';
      case 'moved_in': return 'bg-green-100 text-green-800';
      case 'waiting_list': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const eligibilityCriteria = [
    'Monthly household income below ₱25,000',
    'No existing property ownership',
    'Valid residency certificate (min. 3 years)',
    'Complete family composition documents',
    'Social worker assessment passed',
    'No previous housing program benefit'
  ];

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Beneficiary Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage housing program beneficiary profiles and eligibility verification</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-4 rounded-lg">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Search Beneficiaries</label>
            <input
              type="text"
              placeholder="Name, address, or ID..."
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Priority Category</label>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Senior Citizen">Senior Citizens</option>
              <option value="PWD">PWDs</option>
              <option value="Solo Parent">Solo Parents</option>
              <option value="Informal Settler">Informal Settlers</option>
              <option value="Regular">Regular</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Verification Status</label>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="under_verification">Under Verification</option>
              <option value="needs_documents">Needs Documents</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full font-medium text-white transition-colors"
            >
              ➕ Add Beneficiary
            </button>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
        {/* Eligibility Criteria */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-indigo-50 dark:to-indigo-900/20 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Eligibility Criteria</h3>
            <div className="space-y-2">
              {eligibilityCriteria.map((criteria, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{criteria}</span>
                </div>
              ))}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 mt-4 px-3 py-2 rounded-lg w-full font-medium text-white text-sm transition-colors">
              📋 Eligibility Assessment
            </button>
          </div>
        </div>

        {/* Beneficiaries Table */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Registered Beneficiaries</h3>
                <div className="flex gap-2">
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg font-medium text-white text-sm transition-colors">
                    📊 Export Excel
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg font-medium text-white text-sm transition-colors">
                    📄 Generate Report
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Beneficiary
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Family Info
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Income/Occupation
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Housing Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                  {mockBeneficiaries.map((beneficiary) => (
                    <tr key={beneficiary.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                        <div>
                          <div className="font-medium">{beneficiary.name}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">{beneficiary.address}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">{beneficiary.contactNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                        <div>
                          <div>Age: {beneficiary.age}</div>
                          <div>Family: {beneficiary.familySize} members</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">Since: {beneficiary.applicationDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                        <div>
                          <div className="font-medium">₱{beneficiary.monthlyIncome.toLocaleString()}/mo</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">{beneficiary.occupation}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(beneficiary.priority)}`}>
                          {beneficiary.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(beneficiary.status)}`}>
                          {beneficiary.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getHousingStatusColor(beneficiary.housingStatus)}`}>
                          {beneficiary.housingStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedBeneficiary(beneficiary)}
                            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs transition-colors"
                          >
                            View
                          </button>
                          <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-xs transition-colors">
                            Edit
                          </button>
                          <button className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-white text-xs transition-colors">
                            Allocate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center px-6 py-3 bg-gray-50 dark:bg-slate-700">
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Showing 1-5 of 15,420 beneficiaries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-600">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-600">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficiary Details Modal */}
      {selectedBeneficiary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-xl">Beneficiary Details</h3>
              <button 
                onClick={() => setSelectedBeneficiary(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Full Name</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.name}</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Age</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.age} years old</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Family Size</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.familySize} members</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Monthly Income</label>
                  <p className="mt-1 text-gray-900 dark:text-white">₱{selectedBeneficiary.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Address</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.address}</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Contact Number</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.contactNumber}</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Email</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedBeneficiary.email}</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  Update Profile
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  Housing Allocation
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  Social Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
