import { useState } from 'react';
import { mockReportsData, mockApplications, mockBarangays, mockZoningTypes } from '../mockdata.jsx';

export default function Submodule5() {
  const [selectedReport, setSelectedReport] = useState('status');
  const [dateRange, setDateRange] = useState({ from: '2025-01-01', to: '2025-01-31' });
  const [filters, setFilters] = useState({
    barangay: '',
    projectType: '',
    zoningType: ''
  });

  const chartData = {
    status: mockReportsData.applicationsByStatus,
    barangay: mockReportsData.applicationsByBarangay,
    processing: mockReportsData.processingTimeData,
    zoning: mockReportsData.zoningDistribution
  };

  const generateCustomReport = () => {
    console.log('Generating custom report with filters:', { dateRange, filters });
    // Implementation for custom report generation
  };

  const exportReport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
    // Implementation for report export
  };

  const renderChart = () => {
    switch (selectedReport) {
      case 'status':
        return (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Applications by Status</h3>
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                {/* Mock Pie Chart */}
                <div className="relative border-8 border-gray-200 dark:border-gray-600 rounded-full w-48 h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-conic from-green-500 to-red-500"></div>
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="flex justify-center items-center bg-white dark:bg-slate-800 rounded-full w-24 h-24">
                    <span className="font-bold text-gray-900 dark:text-white text-lg">71</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-4 grid grid-cols-2 mt-6">
              {chartData.status.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="rounded w-4 h-4"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'barangay':
        return (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Applications by Barangay</h3>
            <div className="space-y-4">
              {chartData.barangay.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-gray-700 dark:text-gray-300 text-sm">{item.barangay}</div>
                  <div className="relative flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                    <div 
                      className="flex justify-end items-center bg-blue-600 pr-2 rounded-full h-6"
                      style={{ width: `${(item.count / 25) * 100}%` }}
                    >
                      <span className="font-medium text-white text-xs">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Average Processing Time</h3>
            <div className="flex justify-center items-end space-x-8 border-gray-200 dark:border-gray-600 border-b h-64">
              {chartData.processing.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t w-12"
                    style={{ height: `${item.time * 20}px` }}
                  ></div>
                  <span className="mt-2 text-gray-600 dark:text-gray-400 text-xs">{item.week}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-xs">{item.time}d</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'zoning':
        return (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Zoning Type Distribution</h3>
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                {/* Mock Donut Chart */}
                <div className="relative border-8 border-gray-200 dark:border-gray-600 rounded-full w-48 h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-conic from-green-500 to-lime-500"></div>
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="flex justify-center items-center bg-white dark:bg-slate-800 rounded-full w-32 h-32">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white text-2xl">100</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-2 grid grid-cols-2 mt-6">
              {chartData.zoning.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="rounded w-3 h-3"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700 dark:text-gray-300 text-xs">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300'>
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Reports & Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Insights on zoning clearance trends and performance</p>
      </div>

      {/* Report Selection and Filters */}
      <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Report Configuration</h2>
        
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Report Type
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="status">Applications by Status</option>
              <option value="barangay">Applications by Barangay</option>
              <option value="processing">Processing Time Trends</option>
              <option value="zoning">Zoning Distribution</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Filter by Barangay
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filters.barangay}
              onChange={(e) => setFilters({...filters, barangay: e.target.value})}
            >
              <option value="">All Barangays</option>
              {mockBarangays.map(barangay => (
                <option key={barangay} value={barangay}>{barangay}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Filter by Zoning Type
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filters.zoningType}
              onChange={(e) => setFilters({...filters, zoningType: e.target.value})}
            >
              <option value="">All Zoning Types</option>
              {mockZoningTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Project Type
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filters.projectType}
              onChange={(e) => setFilters({...filters, projectType: e.target.value})}
            >
              <option value="">All Project Types</option>
              <option value="Residential House">Residential House</option>
              <option value="Commercial Building">Commercial Building</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Subdivision">Subdivision</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700 dark:text-gray-300 text-sm">Date From:</label>
            <input
              type="date"
              className="bg-white dark:bg-slate-700 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700 dark:text-gray-300 text-sm">Date To:</label>
            <input
              type="date"
              className="bg-white dark:bg-slate-700 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            />
          </div>
          <button
            onClick={generateCustomReport}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-blue-100 text-sm">Total Applications</p>
              <p className="font-bold text-3xl">{mockApplications.length}</p>
            </div>
            <div className="opacity-80 text-4xl">📊</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-green-100 text-sm">Approved Rate</p>
              <p className="font-bold text-3xl">64%</p>
            </div>
            <div className="opacity-80 text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-purple-100 text-sm">Avg. Processing</p>
              <p className="font-bold text-3xl">7.5d</p>
            </div>
            <div className="opacity-80 text-4xl">⏱️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-yellow-100 text-sm">Active Planners</p>
              <p className="font-bold text-3xl">6</p>
            </div>
            <div className="opacity-80 text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Main Chart Display */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          {renderChart()}
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Export Options</h3>
            <div className="space-y-3">
              <button
                onClick={() => exportReport('PDF')}
                className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg w-full font-medium text-white transition-colors"
              >
                <span>📄</span>
                Export as PDF
              </button>
              <button
                onClick={() => exportReport('CSV')}
                className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full font-medium text-white transition-colors"
              >
                <span>📊</span>
                Export as CSV
              </button>
              <button
                onClick={() => exportReport('Excel')}
                className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full font-medium text-white transition-colors"
              >
                <span>📈</span>
                Export as Excel
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Quick Insights</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-blue-500 border-l-4 rounded-lg">
                <p className="font-medium text-blue-800 dark:text-blue-300 text-sm">Peak Processing</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs">Most applications submitted on Mondays</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 border-green-500 border-l-4 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-300 text-sm">Top Performer</p>
                <p className="text-green-600 dark:text-green-400 text-xs">San Antonio barangay leads in approvals</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 border-yellow-500 border-l-4 rounded-lg">
                <p className="font-medium text-yellow-800 dark:text-yellow-300 text-sm">Attention Needed</p>
                <p className="text-yellow-600 dark:text-yellow-400 text-xs">15% of applications pending {'>'}14 days</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Scheduled Reports</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Weekly Summary</span>
                <span className="text-green-600 dark:text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Monthly Analytics</span>
                <span className="text-green-600 dark:text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Quarterly Review</span>
                <span className="text-yellow-600 dark:text-yellow-400">⏸ Paused</span>
              </div>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 mt-3 px-3 py-2 rounded w-full text-gray-700 dark:text-gray-300 text-sm text-center">
              Manage Schedules
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-gray-200 dark:border-gray-700 border-b">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Date Generated</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">Weekly Status Report</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">Scheduled</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">2025-01-30</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full font-medium text-green-600 dark:text-green-300 text-xs">
                    Completed
                  </span>
                </td>
                <td className="space-x-2 px-6 py-4 text-sm">
                  <button className="font-medium text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400">
                    Download
                  </button>
                  <button className="font-medium text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-400">
                    Share
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">Barangay Performance Analysis</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">Custom</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">2025-01-28</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full font-medium text-blue-600 dark:text-blue-300 text-xs">
                    Processing
                  </span>
                </td>
                <td className="space-x-2 px-6 py-4 text-sm">
                  <button className="text-gray-400 cursor-not-allowed" disabled>
                    Download
                  </button>
                  <button className="font-medium text-red-600 hover:text-red-900 dark:hover:text-red-300 dark:text-red-400">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
