import { useState } from 'react';

export default function ReportsAnalytics() {
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('quarterly');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const reportData = {
    summary: {
      totalProjects: 48,
      activeProjects: 18,
      completedProjects: 25,
      plannedProjects: 15,
      totalBudget: 1250000000, // PHP
      budgetUtilized: 785000000,
      avgProjectDuration: 8.5, // months
      avgCompletionRate: 92.3,
      onTimeCompletion: 78.5,
      budgetVariance: -5.2 // negative means under budget
    },
    districts: [
      {
        name: 'District 1 (North Caloocan)',
        projects: 16,
        budget: 420000000,
        utilized: 285000000,
        completion: 85.2,
        majorProjects: ['C-4 Road Widening', 'North Caloocan Hospital', 'Bagong Silang Sports Complex']
      },
      {
        name: 'District 2 (Central Caloocan)',
        projects: 18,
        budget: 485000000,
        utilized: 312000000,
        completion: 88.7,
        majorProjects: ['Grace Park Elementary School', 'EDSA Underpass', 'Central Market Renovation']
      },
      {
        name: 'District 3 (South Caloocan)',
        projects: 14,
        budget: 345000000,
        utilized: 188000000,
        completion: 79.3,
        majorProjects: ['Bagbaguin Drainage System', 'Camarin Bridge', 'South Caloocan Health Center']
      }
    ],
    projectTypes: [
      { type: 'Transportation', count: 12, budget: 385000000, avgCompletion: 82.5 },
      { type: 'Educational', count: 8, budget: 245000000, avgCompletion: 90.2 },
      { type: 'Healthcare', count: 6, budget: 185000000, avgCompletion: 88.9 },
      { type: 'Infrastructure', count: 10, budget: 215000000, avgCompletion: 85.7 },
      { type: 'Recreation', count: 7, budget: 125000000, avgCompletion: 94.1 },
      { type: 'Utilities', count: 5, budget: 95000000, avgCompletion: 76.8 }
    ],
    quarterlyPerformance: [
      { quarter: 'Q1 2024', projectsStarted: 8, projectsCompleted: 6, budgetSpent: 125000000, efficiency: 89.2 },
      { quarter: 'Q2 2024', projectsStarted: 5, projectsCompleted: 9, budgetSpent: 185000000, efficiency: 91.5 },
      { quarter: 'Q3 2024', projectsStarted: 7, projectsCompleted: 8, budgetSpent: 165000000, efficiency: 88.7 },
      { quarter: 'Q4 2024', projectsStarted: 4, projectsCompleted: 2, budgetSpent: 95000000, efficiency: 85.3 }
    ]
  };

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Transportation': return '🛣️';
      case 'Educational': return '🏫';
      case 'Healthcare': return '🏥';
      case 'Infrastructure': return '🏗️';
      case 'Recreation': return '🌳';
      case 'Utilities': return '⚡';
      default: return '🏗️';
    }
  };

  const getPerformanceColor = (value, threshold = 80) => {
    if (value >= threshold) return 'text-green-600';
    if (value >= threshold - 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Infrastructure Reports & Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive analysis and reporting of infrastructure project performance</p>
      </div>

      {/* Controls */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Report Type</label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="summary">Executive Summary</option>
            <option value="performance">Performance Analysis</option>
            <option value="budget">Budget Analysis</option>
            <option value="timeline">Timeline Analysis</option>
            <option value="district">District Comparison</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Time Period</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">District Filter</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Districts</option>
            <option value="district1">District 1 (North)</option>
            <option value="district2">District 2 (Central)</option>
            <option value="district3">District 3 (South)</option>
          </select>
        </div>
      </div>

      {/* Executive Summary Report */}
      {selectedReport === 'summary' && (
        <div className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
              <div className="text-3xl mb-2">🏗️</div>
              <p className="font-bold text-2xl">{reportData.summary.totalProjects}</p>
              <p className="text-blue-200 text-sm">Total Projects</p>
              <p className="text-blue-100 text-xs">{reportData.summary.activeProjects} active</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-bold text-2xl">₱{(reportData.summary.totalBudget / 1000000000).toFixed(1)}B</p>
              <p className="text-green-200 text-sm">Total Investment</p>
              <p className="text-green-100 text-xs">{((reportData.summary.budgetUtilized / reportData.summary.totalBudget) * 100).toFixed(1)}% utilized</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
              <div className="text-3xl mb-2">📊</div>
              <p className="font-bold text-2xl">{reportData.summary.avgCompletionRate}%</p>
              <p className="text-purple-200 text-sm">Avg. Completion Rate</p>
              <p className="text-purple-100 text-xs">{reportData.summary.avgProjectDuration} mo. avg duration</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
              <div className="text-3xl mb-2">⏰</div>
              <p className="font-bold text-2xl">{reportData.summary.onTimeCompletion}%</p>
              <p className="text-orange-200 text-sm">On-Time Completion</p>
              <p className="text-orange-100 text-xs">{reportData.summary.budgetVariance}% budget variance</p>
            </div>
          </div>

          {/* Project Types Analysis */}
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Projects by Type</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {reportData.projectTypes.map((type, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getProjectTypeIcon(type.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{type.type}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{type.count} projects</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">₱{(type.budget / 1000000).toFixed(0)}M</p>
                        <p className={`text-sm font-medium ${getPerformanceColor(type.avgCompletion)}`}>
                          {type.avgCompletion}% completion
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full h-3 transition-all duration-300"
                        style={{ width: `${type.avgCompletion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District Performance */}
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">District Performance</h3>
            </div>
            <div className="p-4">
              <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
                {reportData.districts.map((district, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">{district.name}</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Projects</span>
                        <span className="font-medium text-gray-900 dark:text-white">{district.projects}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Budget</span>
                        <span className="font-medium text-gray-900 dark:text-white">₱{(district.budget / 1000000).toFixed(0)}M</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Utilized</span>
                        <span className="font-medium text-gray-900 dark:text-white">₱{(district.utilized / 1000000).toFixed(0)}M</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">Completion Rate</span>
                          <span className={`font-medium ${getPerformanceColor(district.completion)}`}>
                            {district.completion}%
                          </span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${district.completion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Major Projects:</p>
                      <ul className="space-y-1">
                        {district.majorProjects.map((project, idx) => (
                          <li key={idx} className="text-gray-900 dark:text-white text-xs">• {project}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Analysis Report */}
      {selectedReport === 'performance' && (
        <div className="space-y-6">
          {/* Quarterly Performance Trend */}
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Quarterly Performance Trends</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {reportData.quarterlyPerformance.map((quarter, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">{quarter.quarter}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quarter.efficiency >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                        quarter.efficiency >= 80 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                      }`}>
                        {quarter.efficiency}% efficiency
                      </span>
                    </div>
                    
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                      <div className="text-center">
                        <div className="font-bold text-blue-600 text-xl">{quarter.projectsStarted}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Started</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600 text-xl">{quarter.projectsCompleted}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600 text-xl">₱{(quarter.budgetSpent / 1000000).toFixed(0)}M</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Spent</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold text-xl ${getPerformanceColor(quarter.efficiency, 85)}`}>
                          {quarter.efficiency}%
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Efficiency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-r from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="mb-3 font-medium text-gray-900 dark:text-white">⭐ Performance Highlights</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">On-Time Completion Rate</span>
                  <span className={`font-medium ${getPerformanceColor(reportData.summary.onTimeCompletion)}`}>
                    {reportData.summary.onTimeCompletion}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Budget Variance</span>
                  <span className={`font-medium ${reportData.summary.budgetVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {reportData.summary.budgetVariance > 0 ? '+' : ''}{reportData.summary.budgetVariance}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Average Project Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{reportData.summary.avgProjectDuration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Project Success Rate</span>
                  <span className={`font-medium ${getPerformanceColor(reportData.summary.avgCompletionRate)}`}>
                    {reportData.summary.avgCompletionRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 dark:from-orange-900/20 to-red-50 dark:to-red-900/20 p-4 border border-orange-200 dark:border-orange-800 rounded-lg">
              <h4 className="mb-3 font-medium text-gray-900 dark:text-white">⚠️ Areas for Improvement</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">4 projects experiencing delays</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Material supply chain issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Weather impact on timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Permit processing delays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Portfolio Overview */}
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Project Portfolio Status</h3>
            </div>
            <div className="p-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-bold text-green-900 dark:text-green-300 text-2xl">{reportData.summary.completedProjects}</div>
                  <div className="text-green-600 dark:text-green-400 text-sm">Completed Projects</div>
                  <div className="text-green-500 dark:text-green-400 text-xs">
                    {((reportData.summary.completedProjects / reportData.summary.totalProjects) * 100).toFixed(1)}% of total
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">🚧</div>
                  <div className="font-bold text-blue-900 dark:text-blue-300 text-2xl">{reportData.summary.activeProjects}</div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm">Active Projects</div>
                  <div className="text-blue-500 dark:text-blue-400 text-xs">
                    {((reportData.summary.activeProjects / reportData.summary.totalProjects) * 100).toFixed(1)}% of total
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="font-bold text-purple-900 dark:text-purple-300 text-2xl">{reportData.summary.plannedProjects}</div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Planned Projects</div>
                  <div className="text-purple-500 dark:text-purple-400 text-xs">Next fiscal year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Analysis Report */}
      {selectedReport === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Budget Analysis & Financial Performance</h3>
            </div>
            <div className="p-4">
              {/* Budget Overview */}
              <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-bold text-blue-900 dark:text-blue-300 text-2xl">₱{(reportData.summary.totalBudget / 1000000000).toFixed(1)}B</div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm">Total Allocated</div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">💸</div>
                  <div className="font-bold text-green-900 dark:text-green-300 text-2xl">₱{(reportData.summary.budgetUtilized / 1000000000).toFixed(1)}B</div>
                  <div className="text-green-600 dark:text-green-400 text-sm">Utilized</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className={`font-bold text-2xl ${reportData.summary.budgetVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {reportData.summary.budgetVariance > 0 ? '+' : ''}{reportData.summary.budgetVariance}%
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Budget Variance</div>
                </div>
              </div>

              {/* Budget by Project Type */}
              <div className="mb-6">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Budget Allocation by Project Type</h4>
                <div className="space-y-3">
                  {reportData.projectTypes.map((type, index) => (
                    <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span>{getProjectTypeIcon(type.type)}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{type.type}</span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">₱{(type.budget / 1000000).toFixed(0)}M</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${(type.budget / reportData.summary.totalBudget) * 100}%` }}
                        />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-right text-xs mt-1">
                        {((type.budget / reportData.summary.totalBudget) * 100).toFixed(1)}% of total budget
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Efficiency Metrics */}
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Budget Efficiency Metrics</h4>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white text-xl">
                      ₱{((reportData.summary.budgetUtilized / reportData.summary.completedProjects) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Cost per Completed Project</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white text-xl">
                      {((reportData.summary.budgetUtilized / reportData.summary.totalBudget) * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Budget Utilization Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white text-xl">
                      ₱{(reportData.summary.budgetUtilized / reportData.summary.avgProjectDuration / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Monthly Spend Rate</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-xl ${reportData.summary.budgetVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₱{(Math.abs(reportData.summary.budgetVariance * reportData.summary.totalBudget / 100) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {reportData.summary.budgetVariance < 0 ? 'Savings' : 'Overrun'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* District Comparison Report */}
      {selectedReport === 'district' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">District Performance Comparison</h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">District</th>
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Projects</th>
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Budget</th>
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Utilized</th>
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Completion Rate</th>
                      <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.districts.map((district, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 dark:text-white">{district.name}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{district.projects}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">₱{(district.budget / 1000000).toFixed(0)}M</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">₱{(district.utilized / 1000000).toFixed(0)}M</td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${getPerformanceColor(district.completion)}`}>
                            {district.completion}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-16 h-2">
                            <div 
                              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                              style={{ width: `${district.completion}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* District Insights */}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="mb-2 font-medium text-green-900 dark:text-green-300">🏆 Best Performing</h4>
              <p className="font-bold text-green-900 dark:text-green-300">District 2 (Central)</p>
              <p className="text-green-600 dark:text-green-400 text-sm">88.7% completion rate</p>
              <p className="text-green-500 dark:text-green-400 text-xs">Strong project management</p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="mb-2 font-medium text-yellow-900 dark:text-yellow-300">⚠️ Needs Attention</h4>
              <p className="font-bold text-yellow-900 dark:text-yellow-300">District 3 (South)</p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">79.3% completion rate</p>
              <p className="text-yellow-500 dark:text-yellow-400 text-xs">Resource allocation review needed</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-300">💡 Opportunities</h4>
              <p className="font-bold text-blue-900 dark:text-blue-300">Cross-District Projects</p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">Metro-wide coordination</p>
              <p className="text-blue-500 dark:text-blue-400 text-xs">Scale efficiency gains</p>
            </div>
          </div>
        </div>
      )}

      {/* Report Export Options */}
      <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-blue-50 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Export & Sharing Options</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📄 Export PDF Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📊 Export Excel Data
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📧 Email Report
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📅 Schedule Automated Reports
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            🏛️ Submit to City Council
          </button>
        </div>
      </div>
    </div>
  );
}
