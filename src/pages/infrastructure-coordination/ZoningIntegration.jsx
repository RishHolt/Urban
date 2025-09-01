import { useState } from 'react';

export default function ZoningIntegration() {
  const [selectedView, setSelectedView] = useState('impact');
  const [selectedProject, setSelectedProject] = useState(1);

  const infrastructureProjects = [
    {
      id: 1,
      name: 'C-4 Road Widening Project',
      type: 'Transportation',
      location: 'Bagong Silang to Monumento',
      status: 'on_schedule',
      progress: 65,
      zoningImpact: {
        affectedZones: ['Commercial', 'Residential', 'Mixed-Use'],
        totalArea: '12.5 hectares',
        zoningChanges: [
          {
            area: 'Monumento Commercial District',
            currentZoning: 'C-2 (General Commercial)',
            proposedZoning: 'C-3 (Central Business District)',
            reason: 'Enhanced road access supports higher commercial density',
            status: 'approved',
            impactLevel: 'high'
          },
          {
            area: 'Grace Park Residential Area',
            currentZoning: 'R-1 (Low Density Residential)',
            proposedZoning: 'R-2 (Medium Density Residential)',
            reason: 'Improved transportation access allows moderate density increase',
            status: 'under_review',
            impactLevel: 'medium'
          }
        ],
        compliance: {
          setbacks: 'Compliant - 15m road right of way maintained',
          heightLimits: 'Compliant - No structures exceed zoning height limits',
          densityLimits: 'Impact Assessment Required',
          environmentalReqs: 'ECC obtained, tree replacement program in place'
        },
        stakeholders: [
          { name: 'Barangay Bagong Silang Council', role: 'Local Community Representative', status: 'supportive' },
          { name: 'Grace Park Business Association', role: 'Business Community', status: 'supportive' },
          { name: 'Residents Coalition', role: 'Affected Residents', status: 'concerns_raised' },
          { name: 'Environmental Groups', role: 'Environmental Advocate', status: 'conditional_support' }
        ]
      },
      coordination: {
        lastMeeting: '2024-09-10',
        nextMeeting: '2024-09-24',
        pendingActions: [
          'Finalize R-2 zoning approval for Grace Park area',
          'Complete traffic impact assessment',
          'Conduct final environmental compliance review'
        ],
        documents: [
          'Zoning Variance Application - Approved',
          'Environmental Impact Assessment - Completed',
          'Traffic Impact Study - In Progress',
          'Community Consultation Report - Completed'
        ]
      }
    },
    {
      id: 2,
      name: 'Caloocan Central Elementary School',
      type: 'Educational',
      location: 'Barangay Grace Park',
      status: 'delayed',
      progress: 40,
      zoningImpact: {
        affectedZones: ['Institutional', 'Residential'],
        totalArea: '2.8 hectares',
        zoningChanges: [
          {
            area: 'Grace Park Education Zone',
            currentZoning: 'I-1 (Light Institutional)',
            proposedZoning: 'I-2 (General Institutional)',
            reason: 'Accommodate larger educational facility with expanded capacity',
            status: 'approved',
            impactLevel: 'medium'
          }
        ],
        compliance: {
          setbacks: 'Compliant - 10m setback from residential areas maintained',
          heightLimits: 'Compliant - 3 stories within I-2 height limits',
          densityLimits: 'Compliant - Educational FAR requirements met',
          environmentalReqs: 'Green building standards implemented, playground areas preserved'
        },
        stakeholders: [
          { name: 'Grace Park Parents Association', role: 'Parent Community', status: 'highly_supportive' },
          { name: 'Local Residents', role: 'Neighboring Community', status: 'supportive' },
          { name: 'DepEd Regional Office', role: 'Education Authority', status: 'supportive' },
          { name: 'Barangay Grace Park', role: 'Local Government', status: 'supportive' }
        ]
      },
      coordination: {
        lastMeeting: '2024-09-05',
        nextMeeting: '2024-09-19',
        pendingActions: [
          'Review updated building plans with zoning office',
          'Coordinate playground area with parks development',
          'Finalize parking requirements with traffic management'
        ],
        documents: [
          'Institutional Zoning Permit - Approved',
          'Building Height Variance - Approved',
          'Educational Facility License - In Process',
          'Community Impact Assessment - Completed'
        ]
      }
    }
  ];

  const currentProject = infrastructureProjects.find(p => p.id === selectedProject) || infrastructureProjects[0];

  const getZoningStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStakeholderStatusColor = (status) => {
    switch (status) {
      case 'highly_supportive': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'supportive': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'concerns_raised': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'conditional_support': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'opposed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getImpactLevelColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Zoning Integration & Coordination</h1>
        <p className="text-gray-600 dark:text-gray-400">Coordinate infrastructure projects with zoning regulations and urban planning policies</p>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Select Infrastructure Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {infrastructureProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      {/* Project Summary */}
      <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 mb-6 p-6 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">{currentProject.name}</h2>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Type:</span> {currentProject.type}</p>
              <p><span className="font-medium">Location:</span> {currentProject.location}</p>
              <p><span className="font-medium">Progress:</span> {currentProject.progress}%</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getZoningStatusColor(currentProject.status)}`}>
                  {currentProject.status.replace('_', ' ')}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Zoning Impact Summary</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Affected Zones:</span> {currentProject.zoningImpact.affectedZones.join(', ')}</p>
              <p><span className="font-medium">Total Area:</span> {currentProject.zoningImpact.totalArea}</p>
              <p><span className="font-medium">Zoning Changes:</span> {currentProject.zoningImpact.zoningChanges.length} proposed</p>
              <p><span className="font-medium">Last Meeting:</span> {currentProject.coordination.lastMeeting}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8 px-6 pt-4">
            {[
              { id: 'impact', label: 'Zoning Impact', icon: '🗺️' },
              { id: 'compliance', label: 'Compliance', icon: '✅' },
              { id: 'stakeholders', label: 'Stakeholders', icon: '👥' },
              { id: 'coordination', label: 'Coordination', icon: '🤝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedView === tab.id
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
          {/* Zoning Impact Tab */}
          {selectedView === 'impact' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Zoning Impact Analysis</h3>
              
              {/* Affected Areas Overview */}
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Affected Zoning Areas</h4>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                  {currentProject.zoningImpact.affectedZones.map((zone, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-3 border rounded text-center">
                      <div className="text-2xl mb-2">
                        {zone === 'Commercial' && '🏢'}
                        {zone === 'Residential' && '🏘️'}
                        {zone === 'Mixed-Use' && '🏗️'}
                        {zone === 'Institutional' && '🏛️'}
                        {zone === 'Industrial' && '🏭'}
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">{zone}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Zone Type</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposed Zoning Changes */}
              <div>
                <h4 className="mb-4 font-medium text-gray-900 dark:text-white">Proposed Zoning Changes</h4>
                <div className="space-y-4">
                  {currentProject.zoningImpact.zoningChanges.map((change, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{change.area}</h5>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{change.reason}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getZoningStatusColor(change.status)}`}>
                            {change.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactLevelColor(change.impactLevel)}`}>
                            {change.impactLevel} impact
                          </span>
                        </div>
                      </div>
                      
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Current Zoning</p>
                          <p className="font-medium text-gray-900 dark:text-white">{change.currentZoning}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Proposed Zoning</p>
                          <p className="font-medium text-gray-900 dark:text-white">{change.proposedZoning}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                          View Details
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                          Review Impact
                        </button>
                        {change.status === 'under_review' && (
                          <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-xs transition-colors">
                            Fast-track Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  🗺️ View Zoning Map
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📋 Request Zoning Review
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📄 Generate Impact Report
                </button>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {selectedView === 'compliance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Zoning Compliance Assessment</h3>
              
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {Object.entries(currentProject.zoningImpact.compliance).map(([key, value]) => (
                  <div key={key} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="text-2xl">
                        {value.toLowerCase().includes('compliant') ? '✅' : 
                         value.toLowerCase().includes('required') ? '⚠️' : '📋'}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{value}</p>
                    
                    <div className="flex gap-2 mt-3">
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        View Requirements
                      </button>
                      {!value.toLowerCase().includes('compliant') && (
                        <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-xs transition-colors">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compliance Checklist */}
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Compliance Checklist</h4>
                <div className="space-y-2">
                  {[
                    { item: 'Building Height Compliance', status: 'completed', required: true },
                    { item: 'Setback Requirements', status: 'completed', required: true },
                    { item: 'Parking Requirements', status: 'completed', required: true },
                    { item: 'Environmental Clearance', status: 'completed', required: true },
                    { item: 'Traffic Impact Assessment', status: 'in_progress', required: true },
                    { item: 'Community Consultation', status: 'completed', required: true },
                    { item: 'Fire Safety Compliance', status: 'completed', required: true },
                    { item: 'Utility Coordination', status: 'in_progress', required: false }
                  ].map((check, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          check.status === 'completed' ? 'bg-green-500' :
                          check.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-gray-900 dark:text-white text-sm">
                          {check.item} {check.required && <span className="text-red-500">*</span>}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                        {check.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stakeholders Tab */}
          {selectedView === 'stakeholders' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Stakeholder Coordination</h3>
              
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {currentProject.zoningImpact.stakeholders.map((stakeholder, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{stakeholder.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{stakeholder.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStakeholderStatusColor(stakeholder.status)}`}>
                        {stakeholder.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Contact
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        Schedule Meeting
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        View History
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stakeholder Engagement Summary */}
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Engagement Summary</h4>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-4 text-center">
                  <div>
                    <div className="font-bold text-green-600 text-xl">
                      {currentProject.zoningImpact.stakeholders.filter(s => s.status.includes('supportive')).length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Supportive</div>
                  </div>
                  <div>
                    <div className="font-bold text-yellow-600 text-xl">
                      {currentProject.zoningImpact.stakeholders.filter(s => s.status === 'concerns_raised').length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Concerns</div>
                  </div>
                  <div>
                    <div className="font-bold text-orange-600 text-xl">
                      {currentProject.zoningImpact.stakeholders.filter(s => s.status === 'conditional_support').length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Conditional</div>
                  </div>
                  <div>
                    <div className="font-bold text-red-600 text-xl">
                      {currentProject.zoningImpact.stakeholders.filter(s => s.status === 'opposed').length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Opposed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Coordination Tab */}
          {selectedView === 'coordination' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Project Coordination Activities</h3>
              
              {/* Meeting Schedule */}
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="mb-3 font-medium text-blue-900 dark:text-blue-300">📅 Meeting Schedule</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Last Meeting:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{currentProject.coordination.lastMeeting}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Next Meeting:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{currentProject.coordination.nextMeeting}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 mt-3 px-3 py-2 rounded-lg w-full font-medium text-white transition-colors">
                    Schedule New Meeting
                  </button>
                </div>

                {/* Document Status */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="mb-3 font-medium text-green-900 dark:text-green-300">📄 Document Status</h4>
                  <div className="space-y-2">
                    {currentProject.coordination.documents.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{doc.split(' - ')[0]}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.includes('Approved') || doc.includes('Completed') 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}>
                          {doc.split(' - ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Actions */}
              <div>
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">🎯 Pending Coordination Actions</h4>
                <div className="space-y-3">
                  {currentProject.coordination.pendingActions.map((action, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <span className="text-gray-900 dark:text-white">{action}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                          Assign
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coordination Timeline */}
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Coordination Timeline</h4>
                <div className="space-y-3">
                  {[
                    { date: '2024-09-10', event: 'Zoning Board Review Meeting', status: 'completed', outcome: 'Approved road widening variance' },
                    { date: '2024-08-25', event: 'Community Consultation', status: 'completed', outcome: 'Residents expressed traffic concerns, addressed' },
                    { date: '2024-08-10', event: 'Environmental Assessment Review', status: 'completed', outcome: 'ECC requirements fulfilled' },
                    { date: '2024-09-24', event: 'Final Approval Meeting', status: 'scheduled', outcome: 'Review remaining compliance items' }
                  ].map((event, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border rounded">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{event.event}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{event.outcome}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📋 Submit Compliance Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  ✅ Request Inspection
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📄 Generate Compliance Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Integration Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Quick Integration Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            🗺️ Update Zoning Maps
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📋 Generate Coordination Report
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            👥 Schedule Stakeholder Meeting
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            ⚠️ Flag Coordination Issue
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            🏛️ Submit to City Planning
          </button>
        </div>
      </div>
    </div>
  );
}
