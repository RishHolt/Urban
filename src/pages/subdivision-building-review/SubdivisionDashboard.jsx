import { useState } from 'react';

export default function SubdivisionDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  const dashboardStats = {
    activeProjects: 24,
    pendingReview: 8,
    underEvaluation: 12,
    approved: 4,
    totalProjectsThisYear: 67,
    averageReviewTime: 45, // days
    complianceRate: 85 // percentage
  };

  const recentProjects = [
    {
      id: 1,
      name: 'Verde Vista Subdivision',
      developer: 'Caloocan Land Development Corp',
      location: 'Barangay Bagbaguin',
      lotSize: '15.5 hectares',
      units: 245,
      stage: 'Under Evaluation',
      submissionDate: '2024-08-25',
      reviewer: 'Engr. Maria Santos',
      priority: 'high',
      projectType: 'Subdivision'
    },
    {
      id: 2,
      name: 'Caloocan Business Tower',
      developer: 'Metro Properties Inc',
      location: 'Barangay Sangandaan',
      lotSize: '2.3 hectares',
      units: 1, // single building
      stage: 'Pending Review',
      submissionDate: '2024-08-28',
      reviewer: 'Unassigned',
      priority: 'normal',
      projectType: 'Commercial Building'
    },
    {
      id: 3,
      name: 'Sunrise Residences Phase 3',
      developer: 'Sunrise Development Corp',
      location: 'Barangay Deparo',
      lotSize: '8.2 hectares',
      units: 156,
      stage: 'Approved',
      submissionDate: '2024-07-15',
      reviewer: 'Engr. Roberto Reyes',
      priority: 'normal',
      projectType: 'Subdivision'
    }
  ];

  const reviewStages = [
    { stage: 'Document Submission', count: 8, color: 'bg-blue-500' },
    { stage: 'Planning Review', count: 6, color: 'bg-yellow-500' },
    { stage: 'Engineering Review', count: 4, color: 'bg-orange-500' },
    { stage: 'Environmental Assessment', count: 3, color: 'bg-purple-500' },
    { stage: 'Final Approval', count: 3, color: 'bg-green-500' }
  ];

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Under Evaluation': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Subdivision': return '🏘️';
      case 'Commercial Building': return '🏢';
      case 'Residential Building': return '🏠';
      case 'Industrial': return '🏭';
      default: return '🏗️';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Subdivision & Building Review Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor large-scale development projects and building applications</p>
      </div>

      {/* Key Statistics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Active Projects</p>
              <p className="font-bold text-2xl">{dashboardStats.activeProjects}</p>
              <p className="text-blue-200 text-xs">+3 from last month</p>
            </div>
            <div className="text-3xl">🏗️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-yellow-100 text-sm">Pending Review</p>
              <p className="font-bold text-2xl">{dashboardStats.pendingReview}</p>
              <p className="text-yellow-200 text-xs">Needs assignment</p>
            </div>
            <div className="text-3xl">📋</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-100 text-sm">Under Evaluation</p>
              <p className="font-bold text-2xl">{dashboardStats.underEvaluation}</p>
              <p className="text-orange-200 text-xs">In progress</p>
            </div>
            <div className="text-3xl">🔍</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">Approved</p>
              <p className="font-bold text-2xl">{dashboardStats.approved}</p>
              <p className="text-green-200 text-xs">This month</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Review Pipeline */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Review Pipeline</h3>
            <div className="space-y-3">
              {reviewStages.map((stage, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{stage.stage}</span>
                  </div>
                  <span className="bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded-full font-bold text-gray-700 dark:text-gray-300 text-xs">
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Average Review Time</span>
                <p className="font-bold text-gray-900 dark:text-white text-lg">{dashboardStats.averageReviewTime} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Performance Metrics</h3>
            
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-blue-600 dark:text-blue-400 text-sm">Projects This Year</p>
                <p className="font-bold text-blue-900 dark:text-blue-300 text-2xl">{dashboardStats.totalProjectsThisYear}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-green-600 dark:text-green-400 text-sm">Compliance Rate</p>
                <p className="font-bold text-green-900 dark:text-green-300 text-2xl">{dashboardStats.complianceRate}%</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <p className="text-purple-600 dark:text-purple-400 text-sm">Revenue Generated</p>
                <p className="font-bold text-purple-900 dark:text-purple-300 text-2xl">₱2.4M</p>
              </div>
            </div>
            
            {/* Project Type Distribution */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Project Type Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">🏘️ Subdivisions</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-24 h-2">
                      <div className="bg-blue-500 rounded-full w-3/4 h-2"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">🏢 Commercial Buildings</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-24 h-2">
                      <div className="bg-green-500 rounded-full w-1/5 h-2"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm">20%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">🏭 Industrial</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-24 h-2">
                      <div className="bg-purple-500 rounded-full w-1/20 h-2"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Project Applications */}
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Recent Project Applications</h3>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors">
              ➕ New Project Application
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Developer
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Size/Units
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {recentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getProjectTypeIcon(project.projectType)}</span>
                        <div className="font-medium">{project.name}</div>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        Submitted: {project.submissionDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {project.developer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div>{project.lotSize}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {project.projectType === 'Subdivision' ? `${project.units} lots` : `${project.units} building`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStageColor(project.stage)}`}>
                      {project.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div className="font-medium">{project.reviewer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-1">
                      <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs transition-colors">
                        View
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-xs transition-colors">
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📋 Project Applications
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🔍 Technical Review
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          🗺️ Site Planning Tool
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📊 Reports & Monitoring
        </button>
      </div>
    </div>
  );
}
