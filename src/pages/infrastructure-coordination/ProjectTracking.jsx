import { useState, useEffect } from 'react';

export default function ProjectTracking() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('progress');
  const [timelineView, setTimelineView] = useState('monthly');

  const [projects] = useState([
    {
      id: 1,
      name: 'C-4 Road Widening Project',
      type: 'Transportation',
      location: 'Bagong Silang to Monumento',
      contractor: 'ABC Construction Corp',
      projectManager: 'Engr. Juan Santos',
      budget: 85000000,
      progress: 65,
      startDate: '2024-03-15',
      expectedCompletion: '2024-12-20',
      status: 'on_schedule',
      priority: 'high',
      lastUpdate: '2024-09-15',
      milestones: [
        { id: 1, name: 'Site Preparation', status: 'completed', startDate: '2024-03-15', completedDate: '2024-04-01', progress: 100, budget: 8500000, spent: 8200000 },
        { id: 2, name: 'Foundation Work', status: 'completed', startDate: '2024-04-01', completedDate: '2024-06-15', progress: 100, budget: 15000000, spent: 14800000 },
        { id: 3, name: 'Road Construction', status: 'in_progress', startDate: '2024-06-15', completedDate: null, progress: 75, budget: 45000000, spent: 33000000 },
        { id: 4, name: 'Traffic Signals Installation', status: 'pending', startDate: '2024-11-01', completedDate: null, progress: 0, budget: 12000000, spent: 0 },
        { id: 5, name: 'Final Inspection & Handover', status: 'pending', startDate: '2024-12-10', completedDate: null, progress: 0, budget: 4500000, spent: 0 }
      ],
      issues: [
        { id: 1, title: 'Utility Relocation Delay', severity: 'medium', status: 'resolved', reportedDate: '2024-07-20', resolvedDate: '2024-08-05', description: 'Electric posts relocation took longer than expected' },
        { id: 2, title: 'Weather Delays', severity: 'low', status: 'monitoring', reportedDate: '2024-08-15', resolvedDate: null, description: 'Rainy season affecting concrete work' }
      ],
      resources: [
        { type: 'Heavy Equipment', name: 'Excavators', quantity: 3, status: 'deployed', utilization: 85 },
        { type: 'Personnel', name: 'Construction Workers', quantity: 45, status: 'deployed', utilization: 90 },
        { type: 'Materials', name: 'Concrete', quantity: '2500 cubic meters', status: 'sufficient', utilization: 70 },
        { type: 'Materials', name: 'Asphalt', quantity: '1800 tons', status: 'ordered', utilization: 0 }
      ],
      weeklyReports: [
        { week: 'Week 24 (Sept 9-15)', progress: 5, achievements: 'Completed drainage installation for Section B', challenges: 'Minor weather delays', nextWeek: 'Begin asphalt laying for Section A' },
        { week: 'Week 23 (Sept 2-8)', progress: 8, achievements: 'Finished concrete work for Section A', challenges: 'Equipment maintenance required', nextWeek: 'Install drainage systems' },
        { week: 'Week 22 (Aug 26-Sep 1)', progress: 7, achievements: 'Base course completed for 200m stretch', challenges: 'Material delivery delays', nextWeek: 'Pour concrete for Section A' }
      ]
    },
    {
      id: 2,
      name: 'Caloocan Central Elementary School',
      type: 'Educational',
      location: 'Barangay Grace Park',
      contractor: 'Educational Builders Inc',
      projectManager: 'Arch. Maria Rodriguez',
      budget: 45000000,
      progress: 40,
      startDate: '2024-05-10',
      expectedCompletion: '2025-03-15',
      status: 'delayed',
      priority: 'high',
      lastUpdate: '2024-09-12',
      milestones: [
        { id: 1, name: 'Site Survey & Planning', status: 'completed', startDate: '2024-05-10', completedDate: '2024-05-20', progress: 100, budget: 2000000, spent: 1950000 },
        { id: 2, name: 'Excavation & Site Prep', status: 'completed', startDate: '2024-06-01', completedDate: '2024-07-10', progress: 100, budget: 5000000, spent: 5200000 },
        { id: 3, name: 'Foundation & Structure', status: 'in_progress', startDate: '2024-07-15', completedDate: null, progress: 60, budget: 25000000, spent: 12500000 },
        { id: 4, name: 'Interior Construction', status: 'pending', startDate: '2024-12-15', completedDate: null, progress: 0, budget: 10000000, spent: 0 },
        { id: 5, name: 'Equipment & Furnishing', status: 'pending', startDate: '2025-02-15', completedDate: null, progress: 0, budget: 3000000, spent: 0 }
      ],
      issues: [
        { id: 1, title: 'Steel Supply Shortage', severity: 'high', status: 'active', reportedDate: '2024-08-20', resolvedDate: null, description: 'Nationwide steel shortage affecting construction timeline' },
        { id: 2, title: 'Permit Processing Delay', severity: 'medium', status: 'resolved', reportedDate: '2024-06-15', resolvedDate: '2024-07-01', description: 'Fire safety permit took longer than expected' }
      ],
      resources: [
        { type: 'Personnel', name: 'Construction Workers', quantity: 35, status: 'deployed', utilization: 75 },
        { type: 'Materials', name: 'Steel Reinforcement', quantity: '450 tons', status: 'shortage', utilization: 60 },
        { type: 'Materials', name: 'Concrete', quantity: '1200 cubic meters', status: 'sufficient', utilization: 40 },
        { type: 'Equipment', name: 'Tower Crane', quantity: 1, status: 'deployed', utilization: 80 }
      ],
      weeklyReports: [
        { week: 'Week 24 (Sept 9-15)', progress: 3, achievements: 'Completed 2nd floor structural work', challenges: 'Steel delivery delays continue', nextWeek: 'Continue structural work with available materials' },
        { week: 'Week 23 (Sept 2-8)', progress: 4, achievements: 'Installed electrical conduits', challenges: 'Weather interruptions', nextWeek: 'Focus on interior walls' }
      ]
    }
  ]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'on_schedule': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'delayed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (!selectedProject) {
    return <div>Loading...</div>;
  }

  const budgetUtilization = (selectedProject.milestones.reduce((sum, m) => sum + m.spent, 0) / selectedProject.budget) * 100;
  const schedulePerformance = selectedProject.progress;
  const activeIssues = selectedProject.issues.filter(issue => issue.status === 'active').length;
  const resolvedIssues = selectedProject.issues.filter(issue => issue.status === 'resolved').length;

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Project Tracking & Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of infrastructure project progress and performance</p>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Select Project to Track</label>
        <select
          value={selectedProject.id}
          onChange={(e) => setSelectedProject(projects.find(p => p.id === parseInt(e.target.value)))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      {/* Project Overview Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">📊</div>
          <p className="font-bold text-2xl">{selectedProject.progress}%</p>
          <p className="text-blue-200 text-sm">Overall Progress</p>
          <div className="bg-blue-300 mt-2 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${selectedProject.progress}%` }}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">💰</div>
          <p className="font-bold text-2xl">{budgetUtilization.toFixed(1)}%</p>
          <p className="text-green-200 text-sm">Budget Utilized</p>
          <p className="text-green-100 text-xs">₱{(selectedProject.milestones.reduce((sum, m) => sum + m.spent, 0) / 1000000).toFixed(1)}M spent</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-bold text-2xl">{activeIssues}</p>
          <p className="text-orange-200 text-sm">Active Issues</p>
          <p className="text-orange-100 text-xs">{resolvedIssues} resolved</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">📅</div>
          <p className="font-bold text-2xl">
            {Math.ceil((new Date(selectedProject.expectedCompletion) - new Date()) / (1000 * 60 * 60 * 24))}
          </p>
          <p className="text-purple-200 text-sm">Days Remaining</p>
          <p className="text-purple-100 text-xs">Due: {selectedProject.expectedCompletion}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8 px-6 pt-4">
            {[
              { id: 'progress', label: 'Progress Overview', icon: '📊' },
              { id: 'milestones', label: 'Milestones', icon: '🎯' },
              { id: 'resources', label: 'Resources', icon: '🔧' },
              { id: 'issues', label: 'Issues', icon: '⚠️' },
              { id: 'reports', label: 'Reports', icon: '📄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Progress Overview Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                {/* Overall Progress Chart */}
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Progress Timeline</h3>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                          }`} />
                          <span className="text-gray-900 dark:text-white text-sm">{milestone.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-16 h-2">
                            <div 
                              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                              style={{ width: `${milestone.progress}%` }}
                            />
                          </div>
                          <span className="text-gray-600 dark:text-gray-400 text-xs w-8">{milestone.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Performance */}
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Budget Performance</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white text-2xl">
                        ₱{(selectedProject.milestones.reduce((sum, m) => sum + m.spent, 0) / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        of ₱{(selectedProject.budget / 1000000).toFixed(1)}M utilized
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full h-4 transition-all duration-300"
                        style={{ width: `${budgetUtilization}%` }}
                      />
                    </div>
                    
                    <div className="gap-2 grid grid-cols-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-gray-900 dark:text-white">{budgetUtilization.toFixed(1)}%</div>
                        <div className="text-gray-600 dark:text-gray-400">Utilized</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900 dark:text-white">{(100 - budgetUtilization).toFixed(1)}%</div>
                        <div className="text-gray-600 dark:text-gray-400">Remaining</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 p-6 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Performance Indicators</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="font-bold text-gray-900 dark:text-white text-xl">{schedulePerformance}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Schedule Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="font-bold text-gray-900 dark:text-white text-xl">{budgetUtilization.toFixed(1)}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Budget Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-bold text-gray-900 dark:text-white text-xl">
                      {selectedProject.resources.reduce((sum, r) => sum + r.utilization, 0) / selectedProject.resources.length}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Resource Utilization</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Project Milestones</h3>
              {selectedProject.milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{milestone.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Start: {milestone.startDate} 
                          {milestone.completedDate && ` | Completed: ${milestone.completedDate}`}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-full h-2">
                          <div 
                            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${milestone.progress}%` }}
                          />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{milestone.progress}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Budget</p>
                      <p className="font-medium text-gray-900 dark:text-white">₱{(milestone.budget / 1000000).toFixed(1)}M</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Spent: ₱{(milestone.spent / 1000000).toFixed(1)}M</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Performance</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {((milestone.spent / milestone.budget) * 100).toFixed(1)}% budget used
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {milestone.progress > (milestone.spent / milestone.budget) * 100 ? 
                          'Under budget' : 'On budget'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      Update Progress
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                      Add Report
                    </button>
                    {milestone.status === 'in_progress' && (
                      <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Flag Issue
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Resource Management</h3>
              
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {selectedProject.resources.map((resource, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-2xl mb-2">
                      {resource.type === 'Heavy Equipment' && '🚜'}
                      {resource.type === 'Personnel' && '👷'}
                      {resource.type === 'Materials' && '🧱'}
                      {resource.type === 'Equipment' && '🔧'}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{resource.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{resource.type}</p>
                    <p className="text-gray-900 dark:text-white text-sm">Qty: {resource.quantity}</p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Utilization</span>
                        <span className="font-medium text-gray-900 dark:text-white text-xs">{resource.utilization}%</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 transition-all duration-300 ${
                            resource.utilization >= 80 ? 'bg-green-500' :
                            resource.utilization >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${resource.utilization}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        resource.status === 'deployed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                        resource.status === 'sufficient' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                        resource.status === 'shortage' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                        resource.status === 'ordered' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                      }`}>
                        {resource.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📋 Manage Resources
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📦 Request Resources
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📊 Resource Report
                </button>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Project Issues & Risks</h3>
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  ⚠️ Report New Issue
                </button>
              </div>
              
              {selectedProject.issues.map((issue) => (
                <div key={issue.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{issue.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{issue.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Reported:</span> {issue.reportedDate}
                    </div>
                    <div>
                      <span className="font-medium">Resolved:</span> {issue.resolvedDate || 'Pending'}
                    </div>
                    <div>
                      <span className="font-medium">Days Open:</span> 
                      {issue.resolvedDate 
                        ? Math.ceil((new Date(issue.resolvedDate) - new Date(issue.reportedDate)) / (1000 * 60 * 60 * 24))
                        : Math.ceil((new Date() - new Date(issue.reportedDate)) / (1000 * 60 * 60 * 24))
                      }
                    </div>
                  </div>
                  
                  {issue.status === 'active' && (
                    <div className="flex gap-2 mt-3">
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Resolve Issue
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Update Status
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Escalate
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Weekly Progress Reports</h3>
              
              {selectedProject.weeklyReports.map((report, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{report.week}</h4>
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                      +{report.progress}% progress
                    </span>
                  </div>
                  
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">✅ Achievements</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{report.achievements}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">⚠️ Challenges</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{report.challenges}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">📅 Next Week</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{report.nextWeek}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📄 Generate Weekly Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📊 Progress Analysis
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📈 Performance Metrics
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
