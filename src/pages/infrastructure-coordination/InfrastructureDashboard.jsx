import { useState } from 'react';

export default function InfrastructureDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');

  const dashboardStats = {
    ongoingProjects: 18,
    upcomingProjects: 12,
    completedProjects: 35,
    totalBudget: 450000000, // PHP
    budgetUtilized: 285000000,
    projectsOnSchedule: 14,
    projectsDelayed: 4
  };

  const ongoingProjects = [
    {
      id: 1,
      name: 'C-4 Road Widening Project',
      type: 'Transportation',
      location: 'Barangay Bagong Silang to Monumento',
      contractor: 'ABC Construction Corp',
      budget: 85000000,
      progress: 65,
      startDate: '2024-03-15',
      expectedCompletion: '2024-12-20',
      status: 'on_schedule',
      projectManager: 'Engr. Juan Santos',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Caloocan Central Elementary School',
      type: 'Educational',
      location: 'Barangay Grace Park',
      contractor: 'Educational Builders Inc',
      budget: 45000000,
      progress: 40,
      startDate: '2024-05-10',
      expectedCompletion: '2025-03-15',
      status: 'delayed',
      projectManager: 'Arch. Maria Rodriguez',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Bagbaguin Drainage System',
      type: 'Infrastructure',
      location: 'Barangay Bagbaguin',
      contractor: 'Metro Drainage Solutions',
      budget: 28000000,
      progress: 80,
      startDate: '2024-01-20',
      expectedCompletion: '2024-10-30',
      status: 'ahead_of_schedule',
      projectManager: 'Engr. Roberto Dela Cruz',
      priority: 'medium'
    }
  ];

  const upcomingProjects = [
    {
      id: 1,
      name: 'Caloocan Health Center Expansion',
      type: 'Healthcare',
      location: 'Barangay Sangandaan',
      budget: 35000000,
      startDate: '2024-10-15',
      duration: '8 months',
      status: 'procurement',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Peace Park Development',
      type: 'Recreation',
      location: 'Barangay Grace Park West',
      budget: 15000000,
      startDate: '2024-11-01',
      duration: '6 months',
      status: 'design_phase',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_schedule': return 'bg-green-100 text-green-800';
      case 'ahead_of_schedule': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      case 'procurement': return 'bg-yellow-100 text-yellow-800';
      case 'design_phase': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Transportation': return '🛣️';
      case 'Educational': return '🏫';
      case 'Healthcare': return '🏥';
      case 'Infrastructure': return '🏗️';
      case 'Recreation': return '🌳';
      case 'Utilities': return '⚡';
      case 'Housing': return '🏠';
      default: return '🏗️';
    }
  };

  const budgetUtilizationPercentage = (dashboardStats.budgetUtilized / dashboardStats.totalBudget) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Infrastructure Project Coordination Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor government infrastructure projects and coordinate with urban planning</p>
      </div>

      {/* Key Statistics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Ongoing Projects</p>
              <p className="font-bold text-2xl">{dashboardStats.ongoingProjects}</p>
              <p className="text-blue-200 text-xs">{dashboardStats.projectsOnSchedule} on schedule</p>
            </div>
            <div className="text-3xl">🏗️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">Completed Projects</p>
              <p className="font-bold text-2xl">{dashboardStats.completedProjects}</p>
              <p className="text-green-200 text-xs">This fiscal year</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100 text-sm">Total Budget</p>
              <p className="font-bold text-2xl">₱{(dashboardStats.totalBudget / 1000000).toFixed(0)}M</p>
              <p className="text-purple-200 text-xs">{budgetUtilizationPercentage.toFixed(1)}% utilized</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-100 text-sm">Upcoming Projects</p>
              <p className="font-bold text-2xl">{dashboardStats.upcomingProjects}</p>
              <p className="text-orange-200 text-xs">Ready to start</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </div>
      </div>

      {/* Budget Utilization */}
      <div className="bg-gradient-to-r from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 mb-6 p-6 border border-green-200 dark:border-green-800 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Budget Utilization Overview</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Allocated</p>
            <p className="font-bold text-gray-900 dark:text-white text-xl">₱{(dashboardStats.totalBudget / 1000000).toFixed(1)}M</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Utilized</p>
            <p className="font-bold text-blue-600 text-xl">₱{(dashboardStats.budgetUtilized / 1000000).toFixed(1)}M</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Remaining</p>
            <p className="font-bold text-green-600 text-xl">₱{((dashboardStats.totalBudget - dashboardStats.budgetUtilized) / 1000000).toFixed(1)}M</p>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full h-4 transition-all duration-300"
            style={{ width: `${budgetUtilizationPercentage}%` }}
          />
        </div>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400 text-sm">
          {budgetUtilizationPercentage.toFixed(1)}% of total budget utilized
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8">
        {/* Ongoing Projects */}
        <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Ongoing Projects</h3>
          <div className="space-y-4">
            {ongoingProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getProjectTypeIcon(project.type)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">📍 {project.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                
                <div className="gap-2 grid grid-cols-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>🏢 {project.contractor}</span>
                  <span>💰 ₱{(project.budget / 1000000).toFixed(1)}M</span>
                  <span>📅 Start: {project.startDate}</span>
                  <span>🎯 Due: {project.expectedCompletion}</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`rounded-full h-2 transition-all duration-300 ${
                        project.status === 'on_schedule' ? 'bg-green-500' :
                        project.status === 'ahead_of_schedule' ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">PM: {project.projectManager}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Projects */}
        <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Upcoming Projects</h3>
          <div className="space-y-4">
            {upcomingProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getProjectTypeIcon(project.type)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">📍 {project.location}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                
                <div className="gap-2 grid grid-cols-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>💰 ₱{(project.budget / 1000000).toFixed(1)}M</span>
                  <span>⏱️ {project.duration}</span>
                  <span>📅 Start: {project.startDate}</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                    View Details
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                    Track Progress
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white text-xs transition-colors">
                    Coordinate
                  </button>
                </div>
              </div>
            ))}
            
            <button className="bg-blue-600 hover:bg-blue-700 mt-4 p-3 rounded-lg w-full font-medium text-white transition-colors">
              ➕ Register New Project
            </button>
          </div>
        </div>
      </div>

      {/* Project Timeline Overview */}
      <div className="bg-white dark:bg-slate-800 shadow-sm mb-6 p-6 border rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Project Timeline Overview</h3>
        
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <div className="text-2xl mb-2">📋</div>
            <p className="font-bold text-blue-900 dark:text-blue-300 text-lg">6</p>
            <p className="text-blue-600 dark:text-blue-400 text-sm">Planning Phase</p>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
            <div className="text-2xl mb-2">🛒</div>
            <p className="font-bold text-yellow-900 dark:text-yellow-300 text-lg">4</p>
            <p className="text-yellow-600 dark:text-yellow-400 text-sm">Procurement</p>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
            <div className="text-2xl mb-2">🚧</div>
            <p className="font-bold text-orange-900 dark:text-orange-300 text-lg">18</p>
            <p className="text-orange-600 dark:text-orange-400 text-sm">Construction</p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <div className="text-2xl mb-2">🎉</div>
            <p className="font-bold text-green-900 dark:text-green-300 text-lg">35</p>
            <p className="text-green-600 dark:text-green-400 text-sm">Completed</p>
          </div>
        </div>
      </div>

      {/* Districts Coverage */}
      <div className="bg-white dark:bg-slate-800 shadow-sm mb-6 p-6 border rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Infrastructure Coverage by District</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">District 1 (North Caloocan)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🛣️ Roads</span>
                <span className="text-gray-900 dark:text-white">12 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🏫 Schools</span>
                <span className="text-gray-900 dark:text-white">3 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🏥 Health</span>
                <span className="text-gray-900 dark:text-white">2 projects</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">District 2 (Central Caloocan)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🛣️ Roads</span>
                <span className="text-gray-900 dark:text-white">8 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🏢 Commercial</span>
                <span className="text-gray-900 dark:text-white">5 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">⚡ Utilities</span>
                <span className="text-gray-900 dark:text-white">4 projects</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">District 3 (South Caloocan)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🏠 Housing</span>
                <span className="text-gray-900 dark:text-white">6 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🌊 Drainage</span>
                <span className="text-gray-900 dark:text-white">4 projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🌳 Parks</span>
                <span className="text-gray-900 dark:text-white">3 projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📋 Project Registry
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📊 Project Tracking
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🗺️ Zoning Integration
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📈 Reports & Analytics
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🔍 Audit & Transparency
        </button>
      </div>
    </div>
  );
}
