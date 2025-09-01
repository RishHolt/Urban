import { mockApplications, mockZoningAlerts, mockKPIs } from '../mockdata.jsx';

export default function Submodule1() {
  const recentApplications = mockApplications.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'For Compliance': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'Rejected': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className='bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300'>
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Zoning Clearance Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Quick overview of zoning clearance operations</p>
      </div>

      {/* KPI Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-blue-100 text-sm">Pending Applications</p>
              <p className="font-bold text-3xl">{mockKPIs.pendingApplications}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-green-100 text-sm">Approved Today</p>
              <p className="font-bold text-3xl">{mockKPIs.approvedToday}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-yellow-100 text-sm">For Compliance</p>
              <p className="font-bold text-3xl">{mockKPIs.forCompliance}</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-purple-100 text-sm">Avg. Processing Time</p>
              <p className="font-bold text-3xl">{mockKPIs.averageProcessingTime}</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            <span className="text-xl">➕</span>
            New Application Review
          </button>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            <span className="text-xl">📊</span>
            Generate Report
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            <span className="text-xl">🗺</span>
            Open Zoning Map
          </button>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="bg-white dark:bg-slate-800 shadow rounded-lg w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Ref No.</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Project Type</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">{app.refNo}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.applicantName}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.barangay}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.projectType}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.dateSubmitted}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Zoning Alerts */}
      <div>
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">Zoning Alerts & Notifications</h2>
        <div className="space-y-3">
          {mockZoningAlerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Ref. #{alert.refNo}
                  </p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{alert.message}</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{alert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}