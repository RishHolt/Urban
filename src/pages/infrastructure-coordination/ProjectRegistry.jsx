import { useState } from 'react';

export default function ProjectRegistry() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'C-4 Road Widening Project',
      description: 'Widening of C-4 Road to improve traffic flow and reduce congestion between Bagong Silang and Monumento areas',
      type: 'Transportation',
      category: 'Infrastructure',
      location: 'Barangay Bagong Silang to Monumento',
      district: 'District 1',
      barangay: ['Bagong Silang', 'Grace Park West', 'Monumento'],
      contractor: 'ABC Construction Corp',
      contractorRating: 4.2,
      projectManager: 'Engr. Juan Santos',
      budget: 85000000,
      budgetSource: 'National Budget',
      funding: 'DPWH + Local Government',
      progress: 65,
      startDate: '2024-03-15',
      expectedCompletion: '2024-12-20',
      actualCompletion: null,
      status: 'on_schedule',
      priority: 'high',
      permits: ['Environmental Clearance', 'DPWH Permit', 'Building Permit'],
      permitStatus: 'complete',
      milestones: [
        { name: 'Site Preparation', status: 'completed', date: '2024-04-01' },
        { name: 'Foundation Work', status: 'completed', date: '2024-06-15' },
        { name: 'Road Construction', status: 'in_progress', date: '2024-09-01' },
        { name: 'Traffic Signals Installation', status: 'pending', date: '2024-11-01' },
        { name: 'Final Inspection', status: 'pending', date: '2024-12-10' }
      ],
      coordination: ['DPWH', 'MMDA', 'Local Police', 'Barangay Officials'],
      impact: 'Reduce traffic congestion by 40%, improve emergency response times',
      beneficiaries: 85000,
      created: '2024-01-10',
      lastUpdated: '2024-09-15'
    },
    {
      id: 2,
      name: 'Caloocan Central Elementary School',
      description: 'Construction of new 3-story elementary school building to accommodate growing student population',
      type: 'Educational',
      category: 'Social Services',
      location: 'Barangay Grace Park',
      district: 'District 2',
      barangay: ['Grace Park'],
      contractor: 'Educational Builders Inc',
      contractorRating: 4.8,
      projectManager: 'Arch. Maria Rodriguez',
      budget: 45000000,
      budgetSource: 'DepEd + LGU',
      funding: 'Department of Education',
      progress: 40,
      startDate: '2024-05-10',
      expectedCompletion: '2025-03-15',
      actualCompletion: null,
      status: 'delayed',
      priority: 'high',
      permits: ['Building Permit', 'Fire Safety Permit', 'Environmental Permit'],
      permitStatus: 'complete',
      milestones: [
        { name: 'Site Survey', status: 'completed', date: '2024-05-20' },
        { name: 'Excavation', status: 'completed', date: '2024-07-10' },
        { name: 'Foundation & Structure', status: 'in_progress', date: '2024-09-20' },
        { name: 'Interior Construction', status: 'pending', date: '2024-12-15' },
        { name: 'Equipment Installation', status: 'pending', date: '2025-02-15' }
      ],
      coordination: ['DepEd', 'TESDA', 'Local Parents Association'],
      impact: 'Accommodate 750 additional students, reduce classroom overcrowding',
      beneficiaries: 1500,
      created: '2024-03-01',
      lastUpdated: '2024-09-12'
    },
    {
      id: 3,
      name: 'Bagbaguin Drainage System',
      description: 'Installation of comprehensive drainage system to prevent flooding during rainy season',
      type: 'Infrastructure',
      category: 'Utilities',
      location: 'Barangay Bagbaguin',
      district: 'District 3',
      barangay: ['Bagbaguin'],
      contractor: 'Metro Drainage Solutions',
      contractorRating: 4.5,
      projectManager: 'Engr. Roberto Dela Cruz',
      budget: 28000000,
      budgetSource: 'Climate Fund',
      funding: 'World Bank + Local Government',
      progress: 80,
      startDate: '2024-01-20',
      expectedCompletion: '2024-10-30',
      actualCompletion: null,
      status: 'ahead_of_schedule',
      priority: 'medium',
      permits: ['Environmental Impact Assessment', 'Water District Permit'],
      permitStatus: 'complete',
      milestones: [
        { name: 'Survey & Design', status: 'completed', date: '2024-02-15' },
        { name: 'Main Channel Construction', status: 'completed', date: '2024-06-30' },
        { name: 'Secondary Drains', status: 'completed', date: '2024-08-15' },
        { name: 'Pump Station Installation', status: 'in_progress', date: '2024-09-30' },
        { name: 'System Testing', status: 'pending', date: '2024-10-20' }
      ],
      coordination: ['DENR', 'MMDA', 'Local Water District', 'Flood Control'],
      impact: 'Reduce flooding incidents by 75%, protect 500+ households',
      beneficiaries: 2500,
      created: '2023-11-15',
      lastUpdated: '2024-09-10'
    }
  ]);

  const filteredProjects = projects.filter(project => {
    return (
      (filterStatus === 'all' || project.status === filterStatus) &&
      (filterType === 'all' || project.type === filterType) &&
      (filterPriority === 'all' || project.priority === filterPriority) &&
      (searchTerm === '' || 
       project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.contractor.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_schedule': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'ahead_of_schedule': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'delayed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'on_hold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'completed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: projects.length + 1,
      created: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setProjects([...projects, newProject]);
    setShowAddModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Infrastructure Project Registry</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive database of all government infrastructure projects in Caloocan City</p>
      </div>

      {/* Search and Filters */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-5 mb-6">
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Search Projects</label>
          <input
            type="text"
            placeholder="Search by name, location, or contractor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="on_schedule">On Schedule</option>
            <option value="ahead_of_schedule">Ahead of Schedule</option>
            <option value="delayed">Delayed</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Transportation">Transportation</option>
            <option value="Educational">Educational</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Recreation">Recreation</option>
            <option value="Utilities">Utilities</option>
            <option value="Housing">Housing</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Priority</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl text-blue-600 dark:text-blue-400 mb-2">📋</div>
          <p className="font-bold text-blue-900 dark:text-blue-300 text-2xl">{filteredProjects.length}</p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">Total Projects</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl text-green-600 dark:text-green-400 mb-2">💰</div>
          <p className="font-bold text-green-900 dark:text-green-300 text-2xl">
            ₱{(filteredProjects.reduce((sum, p) => sum + p.budget, 0) / 1000000000).toFixed(1)}B
          </p>
          <p className="text-green-600 dark:text-green-400 text-sm">Total Budget</p>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div className="text-2xl text-orange-600 dark:text-orange-400 mb-2">👥</div>
          <p className="font-bold text-orange-900 dark:text-orange-300 text-2xl">
            {filteredProjects.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}
          </p>
          <p className="text-orange-600 dark:text-orange-400 text-sm">Beneficiaries</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-2xl text-purple-600 dark:text-purple-400 mb-2">📊</div>
          <p className="font-bold text-purple-900 dark:text-purple-300 text-2xl">
            {Math.round(filteredProjects.reduce((sum, p) => sum + p.progress, 0) / filteredProjects.length)}%
          </p>
          <p className="text-purple-600 dark:text-purple-400 text-sm">Avg. Progress</p>
        </div>
      </div>

      {/* Add Project Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
        >
          ➕ Register New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Type & Location</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Contractor & PM</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Budget & Progress</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-left text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {project.type === 'Transportation' && '🛣️'}
                        {project.type === 'Educational' && '🏫'}
                        {project.type === 'Healthcare' && '🏥'}
                        {project.type === 'Infrastructure' && '🏗️'}
                        {project.type === 'Recreation' && '🌳'}
                        {project.type === 'Utilities' && '⚡'}
                        {project.type === 'Housing' && '🏠'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{project.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">ID: {String(project.id).padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 dark:text-white text-sm">{project.type}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">📍 {project.location}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">🏛️ {project.district}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 dark:text-white text-sm font-medium">{project.contractor}</div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                      <span>⭐ {project.contractorRating}</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">👨‍💼 {project.projectManager}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 dark:text-white text-sm font-medium">₱{(project.budget / 1000000).toFixed(1)}M</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">{project.budgetSource}</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="text-right text-gray-500 dark:text-gray-400 text-xs mt-1">{project.progress}%</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 dark:text-white text-sm">Start: {project.startDate}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Due: {project.expectedCompletion}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      👥 {project.beneficiaries.toLocaleString()} people
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority} priority
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors"
                      >
                        View
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Edit
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Track
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 mx-4 p-6 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-900 dark:text-white text-2xl">{selectedProject.name}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {/* Basic Information */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">Project Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Type:</span> {selectedProject.type}</p>
                  <p><span className="font-medium">Category:</span> {selectedProject.category}</p>
                  <p><span className="font-medium">Location:</span> {selectedProject.location}</p>
                  <p><span className="font-medium">District:</span> {selectedProject.district}</p>
                  <p><span className="font-medium">Barangays:</span> {selectedProject.barangay.join(', ')}</p>
                  <p><span className="font-medium">Description:</span> {selectedProject.description}</p>
                </div>
              </div>

              {/* Contractor & Management */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">Contractor & Management</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Contractor:</span> {selectedProject.contractor}</p>
                  <p><span className="font-medium">Rating:</span> ⭐ {selectedProject.contractorRating}/5.0</p>
                  <p><span className="font-medium">Project Manager:</span> {selectedProject.projectManager}</p>
                  <p><span className="font-medium">Budget:</span> ₱{(selectedProject.budget / 1000000).toFixed(1)}M</p>
                  <p><span className="font-medium">Budget Source:</span> {selectedProject.budgetSource}</p>
                  <p><span className="font-medium">Funding:</span> {selectedProject.funding}</p>
                </div>
              </div>

              {/* Timeline & Status */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">Timeline & Status</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Start Date:</span> {selectedProject.startDate}</p>
                  <p><span className="font-medium">Expected Completion:</span> {selectedProject.expectedCompletion}</p>
                  <p><span className="font-medium">Progress:</span> {selectedProject.progress}%</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('_', ' ')}
                    </span>
                  </p>
                  <p><span className="font-medium">Priority:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                  </p>
                </div>
              </div>

              {/* Impact & Coordination */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">Impact & Coordination</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Expected Impact:</span> {selectedProject.impact}</p>
                  <p><span className="font-medium">Beneficiaries:</span> {selectedProject.beneficiaries.toLocaleString()}</p>
                  <p><span className="font-medium">Coordinating Agencies:</span> {selectedProject.coordination.join(', ')}</p>
                  <p><span className="font-medium">Permits:</span> {selectedProject.permits.join(', ')}</p>
                  <p><span className="font-medium">Permit Status:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.permitStatus)}`}>
                      {selectedProject.permitStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Project Milestones */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">Project Milestones</h3>
              <div className="space-y-3">
                {selectedProject.milestones.map((milestone, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{milestone.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{milestone.date}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                      milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                    }`}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                📊 View Progress Report
              </button>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                ✏️ Edit Project
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                🗺️ Coordinate with Zoning
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                📄 Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 mx-4 p-6 rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-900 dark:text-white text-2xl">Register New Infrastructure Project</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name..."
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Project Type</label>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select type...</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Educational">Educational</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Recreation">Recreation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Location</label>
                  <input
                    type="text"
                    placeholder="Project location..."
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">District</label>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select district...</option>
                    <option value="District 1">District 1 (North Caloocan)</option>
                    <option value="District 2">District 2 (Central Caloocan)</option>
                    <option value="District 3">District 3 (South Caloocan)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Budget (PHP)</label>
                  <input
                    type="number"
                    placeholder="Project budget..."
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Priority</label>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select priority...</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Start Date</label>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Expected Completion</label>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Project Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe the project objectives and scope..."
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">Expected Impact</label>
                <textarea
                  rows="2"
                  placeholder="Describe the expected benefits and impact..."
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                >
                  Register Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
