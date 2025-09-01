import { useState } from 'react';

export default function AuditTransparency() {
  const [activeTab, setActiveTab] = useState('audit');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-q3');
  const [auditScope, setAuditScope] = useState('all');

  const auditData = {
    summary: {
      totalProjectsAudited: 23,
      complianceRate: 87.5,
      issuesFound: 8,
      issuesResolved: 6,
      budgetAccuracy: 94.2,
      timelineAccuracy: 82.1,
      lastAuditDate: '2024-09-15',
      nextScheduledAudit: '2024-12-15'
    },
    auditFindings: [
      {
        id: 1,
        project: 'C-4 Road Widening Project',
        findingType: 'Budget Variance',
        severity: 'medium',
        description: 'Material costs exceeded initial estimates by 8.5% due to steel price increases',
        recommendation: 'Implement dynamic pricing models for future material cost estimates',
        status: 'resolved',
        dateFound: '2024-08-15',
        dateResolved: '2024-09-10',
        responsibleParty: 'Project Manager & Procurement',
        correctiveAction: 'Updated procurement contracts with price adjustment clauses'
      },
      {
        id: 2,
        project: 'Grace Park Elementary School',
        findingType: 'Timeline Delay',
        severity: 'high',
        description: 'Construction delayed by 6 weeks due to permit processing delays',
        recommendation: 'Streamline permit coordination process between agencies',
        status: 'in_progress',
        dateFound: '2024-07-22',
        dateResolved: null,
        responsibleParty: 'Permits & Licensing Office',
        correctiveAction: 'Implementing digital permit tracking system'
      },
      {
        id: 3,
        project: 'Bagbaguin Drainage System',
        findingType: 'Quality Control',
        severity: 'low',
        description: 'Minor deviations in concrete mix specifications during heavy rain periods',
        recommendation: 'Enhanced quality control protocols during adverse weather',
        status: 'resolved',
        dateFound: '2024-06-30',
        dateResolved: '2024-07-15',
        responsibleParty: 'Quality Assurance Team',
        correctiveAction: 'Implemented weather-specific quality control procedures'
      }
    ],
    transparencyMetrics: {
      publicDocumentsAvailable: 156,
      citizenInquiries: 42,
      inquiriesResolved: 38,
      publicMeetingsHeld: 12,
      stakeholderParticipation: 89.3,
      mediaReleases: 8,
      websiteVisits: 15420,
      documentDownloads: 2380
    },
    complianceChecklist: [
      { item: 'Environmental Impact Assessments', required: 15, completed: 15, percentage: 100 },
      { item: 'Community Consultations', required: 18, completed: 17, percentage: 94.4 },
      { item: 'Budget Approvals', required: 23, completed: 23, percentage: 100 },
      { item: 'Technical Inspections', required: 45, completed: 42, percentage: 93.3 },
      { item: 'Safety Assessments', required: 23, completed: 21, percentage: 91.3 },
      { item: 'Quality Audits', required: 12, completed: 11, percentage: 91.7 },
      { item: 'Financial Reconciliations', required: 8, completed: 8, percentage: 100 },
      { item: 'Progress Reports', required: 36, completed: 34, percentage: 94.4 }
    ],
    publicRecords: [
      {
        id: 1,
        title: 'Q3 2024 Infrastructure Progress Report',
        type: 'Progress Report',
        datePublished: '2024-09-15',
        downloads: 245,
        category: 'Performance',
        access: 'public',
        format: 'PDF'
      },
      {
        id: 2,
        title: 'Environmental Impact Assessment - C-4 Road Project',
        type: 'Environmental Assessment',
        datePublished: '2024-08-30',
        downloads: 189,
        category: 'Environmental',
        access: 'public',
        format: 'PDF'
      },
      {
        id: 3,
        title: 'Budget Utilization Report - Educational Projects',
        type: 'Financial Report',
        datePublished: '2024-09-05',
        downloads: 156,
        category: 'Financial',
        access: 'public',
        format: 'Excel'
      },
      {
        id: 4,
        title: 'Community Consultation Results - Housing Projects',
        type: 'Community Report',
        datePublished: '2024-08-20',
        downloads: 203,
        category: 'Community',
        access: 'public',
        format: 'PDF'
      }
    ]
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getComplianceColor = (percentage) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Infrastructure Audit & Transparency</h1>
        <p className="text-gray-600 dark:text-gray-400">Ensure accountability and transparency in infrastructure project management</p>
      </div>

      {/* Audit Overview */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-bold text-2xl">{auditData.summary.totalProjectsAudited}</p>
          <p className="text-blue-200 text-sm">Projects Audited</p>
          <p className="text-blue-100 text-xs">Last audit: {auditData.summary.lastAuditDate}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">✅</div>
          <p className="font-bold text-2xl">{auditData.summary.complianceRate}%</p>
          <p className="text-green-200 text-sm">Compliance Rate</p>
          <p className="text-green-100 text-xs">{auditData.summary.issuesResolved}/{auditData.summary.issuesFound} issues resolved</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">💰</div>
          <p className="font-bold text-2xl">{auditData.summary.budgetAccuracy}%</p>
          <p className="text-purple-200 text-sm">Budget Accuracy</p>
          <p className="text-purple-100 text-xs">Financial compliance score</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="text-3xl mb-2">📊</div>
          <p className="font-bold text-2xl">{auditData.transparencyMetrics.publicDocumentsAvailable}</p>
          <p className="text-orange-200 text-sm">Public Documents</p>
          <p className="text-orange-100 text-xs">{auditData.transparencyMetrics.documentDownloads} downloads</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8 px-6 pt-4">
            {[
              { id: 'audit', label: 'Audit Findings', icon: '🔍' },
              { id: 'compliance', label: 'Compliance', icon: '✅' },
              { id: 'transparency', label: 'Public Transparency', icon: '🌐' },
              { id: 'reports', label: 'Audit Reports', icon: '📄' }
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
          {/* Audit Findings Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Audit Findings & Recommendations</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  🔍 Conduct New Audit
                </button>
              </div>
              
              <div className="space-y-4">
                {auditData.auditFindings.map((finding) => (
                  <div key={finding.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{finding.findingType}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Project: {finding.project}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                          {finding.severity} severity
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                          {finding.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">Description</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{finding.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">Recommendation</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{finding.recommendation}</p>
                    </div>
                    
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Found On</p>
                        <p className="font-medium text-gray-900 dark:text-white">{finding.dateFound}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Responsible Party</p>
                        <p className="font-medium text-gray-900 dark:text-white">{finding.responsibleParty}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Resolution Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{finding.dateResolved || 'Pending'}</p>
                      </div>
                    </div>
                    
                    {finding.correctiveAction && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800 rounded">
                        <h5 className="font-medium text-green-800 dark:text-green-300 text-sm mb-1">Corrective Action Taken</h5>
                        <p className="text-green-700 dark:text-green-400 text-sm">{finding.correctiveAction}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                        View Details
                      </button>
                      {finding.status !== 'resolved' && (
                        <>
                          <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                            Mark Resolved
                          </button>
                          <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-xs transition-colors">
                            Update Status
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Compliance Monitoring</h3>
              
              {/* Compliance Overview */}
              <div className="bg-gradient-to-r from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 mb-6 p-6 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-center">
                  <div>
                    <div className="font-bold text-green-600 text-2xl">{auditData.summary.complianceRate}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Overall Compliance</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-600 text-2xl">{auditData.summary.budgetAccuracy}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Budget Accuracy</div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-600 text-2xl">{auditData.summary.timelineAccuracy}%</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Timeline Accuracy</div>
                  </div>
                </div>
              </div>

              {/* Compliance Checklist */}
              <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Compliance Requirements Status</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {auditData.complianceChecklist.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            item.percentage === 100 ? 'bg-green-500' :
                            item.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-900 dark:text-white">{item.item}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {item.completed}/{item.required}
                          </span>
                          <span className={`font-medium ${getComplianceColor(item.percentage)}`}>
                            {item.percentage.toFixed(1)}%
                          </span>
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-16 h-2">
                            <div 
                              className={`rounded-full h-2 transition-all duration-300 ${
                                item.percentage === 100 ? 'bg-green-500' :
                                item.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📋 Generate Compliance Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  ✅ Schedule Compliance Review
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                  📊 Compliance Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Public Transparency Tab */}
          {activeTab === 'transparency' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Public Transparency & Access</h3>
              
              {/* Transparency Metrics */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-bold text-blue-900 dark:text-blue-300 text-xl">
                    {auditData.transparencyMetrics.publicDocumentsAvailable}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm">Public Documents</div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg text-center">
                  <div className="text-3xl mb-2">❓</div>
                  <div className="font-bold text-green-900 dark:text-green-300 text-xl">
                    {auditData.transparencyMetrics.citizenInquiries}
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm">Citizen Inquiries</div>
                  <div className="text-green-500 dark:text-green-400 text-xs">
                    {auditData.transparencyMetrics.inquiriesResolved} resolved
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 border border-purple-200 dark:border-purple-800 rounded-lg text-center">
                  <div className="text-3xl mb-2">🗣️</div>
                  <div className="font-bold text-purple-900 dark:text-purple-300 text-xl">
                    {auditData.transparencyMetrics.publicMeetingsHeld}
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Public Meetings</div>
                  <div className="text-purple-500 dark:text-purple-400 text-xs">
                    {auditData.transparencyMetrics.stakeholderParticipation}% participation
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
                  <div className="text-3xl mb-2">👁️</div>
                  <div className="font-bold text-orange-900 dark:text-orange-300 text-xl">
                    {auditData.transparencyMetrics.websiteVisits.toLocaleString()}
                  </div>
                  <div className="text-orange-600 dark:text-orange-400 text-sm">Website Visits</div>
                  <div className="text-orange-500 dark:text-orange-400 text-xs">This quarter</div>
                </div>
              </div>

              {/* Public Documents */}
              <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Public Records & Documents</h4>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Document</th>
                          <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Type</th>
                          <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Published</th>
                          <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Downloads</th>
                          <th className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 text-left text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditData.publicRecords.map((record) => (
                          <tr key={record.id} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 dark:text-white">{record.title}</div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm">{record.category}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-gray-600 dark:text-gray-400 text-sm">{record.type}</span>
                              <div className="text-gray-500 dark:text-gray-500 text-xs">{record.format}</div>
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">{record.datePublished}</td>
                            <td className="px-4 py-3">
                              <span className="font-medium text-gray-900 dark:text-white">{record.downloads}</span>
                              <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">downloads</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs transition-colors">
                                  View
                                </button>
                                <button className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-xs transition-colors">
                                  Download
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Citizen Engagement */}
              <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-green-50 dark:to-green-900/20 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Citizen Engagement Statistics</h4>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Inquiry Resolution Rate</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-full h-2">
                        <div 
                          className="bg-green-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${(auditData.transparencyMetrics.inquiriesResolved / auditData.transparencyMetrics.citizenInquiries) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {Math.round((auditData.transparencyMetrics.inquiriesResolved / auditData.transparencyMetrics.citizenInquiries) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Stakeholder Participation</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${auditData.transparencyMetrics.stakeholderParticipation}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {auditData.transparencyMetrics.stakeholderParticipation}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Checklist */}
              <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Regulatory Compliance Status</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {auditData.complianceChecklist.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded">
                        <span className="text-gray-900 dark:text-white">{item.item}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {item.completed}/{item.required}
                          </span>
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-20 h-2">
                            <div 
                              className={`rounded-full h-2 transition-all duration-300 ${
                                item.percentage === 100 ? 'bg-green-500' :
                                item.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className={`font-medium ${getComplianceColor(item.percentage)}`}>
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Audit Reports & Documentation</h3>
                <div className="flex gap-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2024-q3">Q3 2024</option>
                    <option value="2024-q2">Q2 2024</option>
                    <option value="2024-q1">Q1 2024</option>
                    <option value="2023-q4">Q4 2023</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
                    📄 Generate New Report
                  </button>
                </div>
              </div>
              
              {/* Audit Summary */}
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white dark:bg-slate-800 p-4 border rounded-lg">
                  <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Audit Summary ({selectedPeriod})</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Projects Audited</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditData.summary.totalProjectsAudited}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Issues Identified</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditData.summary.issuesFound}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Issues Resolved</span>
                      <span className="font-medium text-green-600">{auditData.summary.issuesResolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Overall Compliance</span>
                      <span className={`font-medium ${getComplianceColor(auditData.summary.complianceRate)}`}>
                        {auditData.summary.complianceRate}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 border rounded-lg">
                  <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Upcoming Audits</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                      <p className="font-medium text-blue-900 dark:text-blue-300">Quarterly Review</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">December 15, 2024</p>
                      <p className="text-blue-500 dark:text-blue-400 text-xs">All active projects</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                      <p className="font-medium text-green-900 dark:text-green-300">Financial Audit</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">January 10, 2025</p>
                      <p className="text-green-500 dark:text-green-400 text-xs">Budget compliance focus</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
                      <p className="font-medium text-purple-900 dark:text-purple-300">Environmental Audit</p>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">February 5, 2025</p>
                      <p className="text-purple-500 dark:text-purple-400 text-xs">Environmental compliance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Reports */}
              <div className="bg-white dark:bg-slate-800 border rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Available Audit Reports</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {[
                      { title: 'Q3 2024 Infrastructure Audit Report', date: '2024-09-15', type: 'Comprehensive', status: 'published' },
                      { title: 'Financial Compliance Review - Q2 2024', date: '2024-07-30', type: 'Financial', status: 'published' },
                      { title: 'Environmental Impact Assessment Review', date: '2024-08-10', type: 'Environmental', status: 'published' },
                      { title: 'Q4 2024 Preliminary Audit', date: '2024-12-15', type: 'Preliminary', status: 'scheduled' }
                    ].map((report, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{report.title}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{report.type} • {report.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          {report.status === 'published' && (
                            <div className="flex gap-1">
                              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                                View
                              </button>
                              <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs transition-colors">
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transparency Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-green-50 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Transparency & Accountability Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📊 Publish Performance Dashboard
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📄 Release Quarterly Report
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            🗣️ Schedule Public Meeting
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            📺 Publish Progress Video
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
            🔍 Request External Audit
          </button>
        </div>
      </div>
    </div>
  );
}
