import { useState } from 'react';
import { mockApplications } from '../mockdata.jsx';

export default function ApplicationReview() {
  const [selectedApp, setSelectedApp] = useState(mockApplications[0]);
  const [aiSuggestion, setAiSuggestion] = useState({
    suggestedZone: 'R-2 (Residential 2)',
    confidence: 92,
    reasoning: 'Based on lot size, location, and intended use patterns'
  });
  const [complianceCheck, setComplianceCheck] = useState({
    status: 'needs_documents',
    missing: ['Environmental Compliance Certificate', 'Fire Safety Permit'],
    approved: ['Barangay Clearance', 'Site Development Plan', 'Tax Declaration']
  });

  const requirements = [
    { name: 'Tax Declaration', status: 'uploaded', date: '2024-08-25' },
    { name: 'Barangay Clearance', status: 'uploaded', date: '2024-08-24' },
    { name: 'Site Development Plan', status: 'uploaded', date: '2024-08-23' },
    { name: 'Environmental Compliance Certificate', status: 'missing', date: null },
    { name: 'Fire Safety Permit', status: 'missing', date: null },
    { name: 'HLURB Certificate', status: 'under_review', date: '2024-08-20' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-green-600 bg-green-100';
      case 'missing': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} for application ${selectedApp?.refNo}`);
    // Handle approval/rejection logic
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Application Review & Details</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive application review with AI assistance and compliance checking</p>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Application Selection */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-4 rounded-lg">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Select Application</h3>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={selectedApp?.refNo || ''}
              onChange={(e) => {
                const app = mockApplications.find(a => a.refNo === e.target.value);
                setSelectedApp(app);
              }}
            >
              {mockApplications.map(app => (
                <option key={app.refNo} value={app.refNo}>
                  {app.refNo} - {app.applicantName}
                </option>
              ))}
            </select>
          </div>

          {/* AI Zoning Suggestion */}
          <div className="bg-gradient-to-r from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 mb-6 p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="flex items-center mb-3 font-semibold text-gray-900 dark:text-white">
              <span className="mr-2">🤖</span>
              AI Zoning Suggestion
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Recommended Zone:</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">{aiSuggestion.suggestedZone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-purple-600 dark:text-purple-400">{aiSuggestion.confidence}%</span>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-16 h-2">
                    <div 
                      className="bg-purple-500 rounded-full h-2" 
                      style={{ width: `${aiSuggestion.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{aiSuggestion.reasoning}</p>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white dark:bg-slate-800 p-4 border rounded-lg">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Compliance Status</h3>
            <div className="space-y-2">
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                complianceCheck.status === 'needs_documents' ? 'bg-yellow-100 text-yellow-800' : 
                complianceCheck.status === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {complianceCheck.status === 'needs_documents' ? '⚠️ Needs Documents' : 
                 complianceCheck.status === 'compliant' ? '✅ Compliant' : '❌ Non-Compliant'}
              </div>
              
              {complianceCheck.missing.length > 0 && (
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Missing Documents:</p>
                  <ul className="text-xs text-red-500 dark:text-red-400 ml-4">
                    {complianceCheck.missing.map((doc, idx) => (
                      <li key={idx}>• {doc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Review Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedApp && (
            <>
              {/* Applicant Information */}
              <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Applicant Information</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Full Name</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.applicantName}</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Contact Number</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.contactNumber || '+63 917 123 4567'}</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Email</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.email || 'applicant@email.com'}</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Company/Developer</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.company || 'Individual'}</p>
                  </div>
                </div>
              </div>

              {/* Lot & Project Details */}
              <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Lot & Project Details</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Lot Area</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.lotArea || '500'} sq.m</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Floor Area</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.floorArea || '350'} sq.m</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Intended Use</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.businessType}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Property Location</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{selectedApp.address}, {selectedApp.barangay}</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">Coordinates</label>
                    <p className="mt-1 text-gray-900 dark:text-white font-mono text-xs">14.6765, 121.0442</p>
                  </div>
                </div>
              </div>

              {/* Uploaded Requirements */}
              <div className="bg-white dark:bg-slate-800 shadow-sm p-6 border rounded-lg">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Uploaded Requirements</h3>
                <div className="space-y-3">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status === 'uploaded' && '✅'}
                          {req.status === 'missing' && '❌'}
                          {req.status === 'under_review' && '⏳'}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{req.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {req.date && `Uploaded: ${req.date}`}
                        {req.status === 'missing' && 'Required'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Actions */}
              <div className="bg-gradient-to-r from-gray-50 dark:from-slate-800 to-white dark:to-slate-800 p-6 border rounded-lg">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Review Actions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Review Notes</label>
                    <textarea 
                      className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white resize-none" 
                      rows="3"
                      placeholder="Add review notes or comments..."
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => handleAction('approve')}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                    >
                      ✅ Approve Application
                    </button>
                    <button 
                      onClick={() => handleAction('compliance')}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                    >
                      ⚠️ Return for Compliance
                    </button>
                    <button 
                      onClick={() => handleAction('reject')}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                    >
                      ❌ Reject Application
                    </button>
                    <button 
                      onClick={() => handleAction('hold')}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                    >
                      ⏸️ Put on Hold
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
