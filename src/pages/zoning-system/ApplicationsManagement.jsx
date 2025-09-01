import { useState } from 'react';
import { mockApplications, mockBarangays, mockDistricts, mockZoningTypes, mockPlanners } from '../mockdata.jsx';

export default function Submodule2() {
  const [applications, setApplications] = useState(mockApplications);
  const [filters, setFilters] = useState({
    status: '',
    barangay: '',
    district: '',
    zoningType: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [selectedApps, setSelectedApps] = useState([]);
  const [viewingApp, setViewingApp] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decisionType, setDecisionType] = useState('');
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [newApplication, setNewApplication] = useState({
    applicantName: '',
    contactNumber: '',
    email: '',
    address: '',
    companyName: '',
    businessPermitNo: '',
    projectType: '',
    lotLocation: '',
    barangay: '',
    district: '',
    lotArea: '',
    intendedUse: '',
    projectDescription: '',
    coordinates: { lat: '', lng: '' }
  });

  const filteredApplications = applications.filter(app => {
    if (filters.status && app.status !== filters.status) return false;
    if (filters.barangay && app.barangay !== filters.barangay) return false;
    if (filters.district && app.district !== filters.district) return false;
    if (filters.zoningType && app.intendedUse !== filters.zoningType) return false;
    if (filters.search && !app.applicantName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !app.refNo.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'For Compliance': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'Rejected': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApps(filteredApplications.map(app => app.id));
    } else {
      setSelectedApps([]);
    }
  };

  const handleSelectApp = (appId, checked) => {
    if (checked) {
      setSelectedApps([...selectedApps, appId]);
    } else {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    }
  };

  const exportSelected = (format) => {
    const selectedData = applications.filter(app => selectedApps.includes(app.id));
    console.log(`Exporting ${selectedData.length} applications as ${format}`);
    // Implementation for export functionality
  };

  const viewApplication = (appId) => {
    const app = applications.find(a => a.id === appId);
    setViewingApp(app);
    setInternalNotes(app.internalNotes || '');
  };

  const getRequirementStatus = (requirement) => {
    if (requirement.uploaded) {
      return <span className="text-green-600 dark:text-green-400">✅ Uploaded</span>;
    } else {
      return <span className="text-red-600 dark:text-red-400">❌ Missing</span>;
    }
  };

  const getComplianceStatus = (status) => {
    switch (status) {
      case 'valid':
        return <span className="text-green-600 dark:text-green-400">✅</span>;
      case 'missing':
        return <span className="text-red-600 dark:text-red-400">❌</span>;
      case 'allowed':
        return <span className="text-green-600 dark:text-green-400">✅</span>;
      case 'conflict':
        return <span className="text-red-600 dark:text-red-400">⚠️</span>;
      default:
        return <span className="text-gray-500">-</span>;
    }
  };

  const handleDecision = (type) => {
    setDecisionType(type);
    setShowDecisionModal(true);
  };

  const confirmDecision = () => {
    console.log(`Decision: ${decisionType}`, { 
      applicationId: viewingApp.id, 
      rejectionReason: decisionType === 'reject' ? rejectionReason : null,
      internalNotes 
    });
    setShowDecisionModal(false);
    setRejectionReason('');
    // Update application status in real app
  };

  const handleNewApplicationSubmit = (e) => {
    e.preventDefault();
    
    // Generate new reference number
    const nextRefNo = `ZC-2025-${String(mockApplications.length + 1).padStart(4, '0')}`;
    
    const newApp = {
      id: mockApplications.length + 1,
      refNo: nextRefNo,
      ...newApplication,
      lotArea: parseFloat(newApplication.lotArea),
      coordinates: {
        lat: parseFloat(newApplication.coordinates.lat),
        lng: parseFloat(newApplication.coordinates.lng)
      },
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedPlanner: 'Unassigned',
      requirements: {
        tct: { uploaded: false, filename: null },
        barangayClearance: { uploaded: false, filename: null },
        siteDevelopmentPlan: { uploaded: false, filename: null },
        environmentalCompliance: { uploaded: false, filename: null },
        fireSafetyClearance: { uploaded: false, filename: null }
      },
      aiSuggestion: {
        predictedZone: 'Analysis Pending',
        confidence: 0,
        notes: 'AI analysis will be performed after document upload'
      },
      complianceChecks: {
        barangayClearance: { status: 'missing', message: 'Barangay clearance required' },
        fireSafety: { status: 'missing', message: 'Fire Safety Certificate required' },
        landUseType: { status: 'missing', message: 'Pending zoning analysis' }
      },
      internalNotes: 'New application submitted'
    };

    setApplications([...applications, newApp]);
    setShowNewApplicationModal(false);
    resetNewApplicationForm();
    
    console.log('New application created:', newApp);
  };

  const resetNewApplicationForm = () => {
    setNewApplication({
      applicantName: '',
      contactNumber: '',
      email: '',
      address: '',
      companyName: '',
      businessPermitNo: '',
      projectType: '',
      lotLocation: '',
      barangay: '',
      district: '',
      lotArea: '',
      intendedUse: '',
      projectDescription: '',
      coordinates: { lat: '', lng: '' }
    });
  };

  const handleNewApplicationChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewApplication(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewApplication(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className='bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300'>
      {!viewingApp ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Applications Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Centralized list of all zoning clearance applications</p>
              </div>
              <button
                onClick={() => setShowNewApplicationModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Application
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-6 rounded-lg">
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Search & Filters</h2>
            
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
              <input
                type="text"
                placeholder="Search by name or ref no..."
                className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              
              <select
                className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="For Compliance">For Compliance</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                value={filters.barangay}
                onChange={(e) => setFilters({...filters, barangay: e.target.value})}
              >
                <option value="">All Barangays</option>
                {mockBarangays.map(barangay => (
                  <option key={barangay} value={barangay}>{barangay}</option>
                ))}
              </select>

              <select
                className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                value={filters.zoningType}
                onChange={(e) => setFilters({...filters, zoningType: e.target.value})}
              >
                <option value="">All Zoning Types</option>
                {mockZoningTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-700 dark:text-gray-300 text-sm">Date From:</label>
                <input
                  type="date"
                  className="bg-white dark:bg-slate-700 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-700 dark:text-gray-300 text-sm">Date To:</label>
                <input
                  type="date"
                  className="bg-white dark:bg-slate-700 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedApps.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 mb-6 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  {selectedApps.length} application(s) selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportSelected('CSV')}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => exportSelected('Excel')}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Export Excel
                  </button>
                  <button
                    onClick={() => exportSelected('PDF')}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="bg-white dark:bg-slate-800 shadow rounded-lg w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedApps.length === filteredApplications.length && filteredApplications.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                    />
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Ref No.</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Project Type</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Barangay</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Date Submitted</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Assigned Planner</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(app.id)}
                        onChange={(e) => handleSelectApp(app.id, e.target.checked)}
                        className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400 text-sm">{app.refNo}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">{app.applicantName}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.projectType}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.lotLocation}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.barangay}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.dateSubmitted}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{app.assignedPlanner}</td>
                    <td className="space-x-2 px-6 py-4 text-sm">
                      <button 
                        onClick={() => viewApplication(app.id)}
                        className="font-medium text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 dark:text-blue-400"
                      >
                        View
                      </button>
                      <button className="font-medium text-green-600 hover:text-green-900 dark:hover:text-green-300 dark:text-green-400">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-2 text-gray-400 dark:text-gray-500 text-lg">No applications found</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your filters or search criteria</div>
            </div>
          )}
        </>
      ) : (
        /* Application Review & Details View */
        <div className="space-y-8">
          {/* Header with Back Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={() => setViewingApp(null)}
                className="flex items-center gap-2 mb-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-200 dark:text-blue-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Applications List
              </button>
              <h1 className="font-bold text-gray-900 dark:text-white text-3xl">Application Review & Details</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review application {viewingApp.refNo} - {viewingApp.applicantName}
              </p>
            </div>
          </div>

          {/* Applicant Information */}
          <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Applicant Information
            </h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Personal Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {viewingApp.applicantName}</p>
                  <p><span className="font-medium">Contact:</span> {viewingApp.contactNumber}</p>
                  <p><span className="font-medium">Email:</span> {viewingApp.email}</p>
                  <p><span className="font-medium">Address:</span> {viewingApp.address}</p>
                </div>
              </div>
              {viewingApp.companyName && (
                <div>
                  <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Company Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company:</span> {viewingApp.companyName}</p>
                    <p><span className="font-medium">Business Permit:</span> {viewingApp.businessPermitNo}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Lot & Project Details */}
          <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lot & Project Details
            </h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Lot Location:</span> {viewingApp.lotLocation}</p>
                <p><span className="font-medium">Barangay:</span> {viewingApp.barangay}</p>
                <p><span className="font-medium">District:</span> {viewingApp.district}</p>
                <p><span className="font-medium">Lot Area:</span> {viewingApp.lotArea} sq.m.</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Intended Use:</span> {viewingApp.intendedUse}</p>
                <p><span className="font-medium">Project Type:</span> {viewingApp.projectType}</p>
                <p><span className="font-medium">Description:</span> {viewingApp.projectDescription}</p>
                <p><span className="font-medium">Coordinates:</span> {viewingApp.coordinates.lat}, {viewingApp.coordinates.lng}</p>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 mt-4 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                📍 <strong>Map Preview:</strong> Click to view lot location on zoning map
              </p>
            </div>
          </section>

          {/* Requirements Status */}
          <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Uploaded Requirements
            </h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Transfer Certificate of Title (TCT)</span>
                  {getRequirementStatus(viewingApp.requirements.tct)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Barangay Clearance</span>
                  {getRequirementStatus(viewingApp.requirements.barangayClearance)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Site Development Plan</span>
                  {getRequirementStatus(viewingApp.requirements.siteDevelopmentPlan)}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Environmental Compliance Certificate</span>
                  {getRequirementStatus(viewingApp.requirements.environmentalCompliance)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fire Safety Clearance</span>
                  {getRequirementStatus(viewingApp.requirements.fireSafetyClearance)}
                </div>
              </div>
            </div>
          </section>

          {/* AI Zoning Suggestion */}
          <section className="bg-gradient-to-r from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 p-6 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Zoning Suggestion (TensorFlow.js)
            </h2>
            <div className="bg-white dark:bg-slate-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">Predicted Zone:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                  {viewingApp.aiSuggestion.predictedZone}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Confidence Score:</span>
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-600 mr-2 rounded-full w-20 h-2">
                    <div 
                      className="bg-purple-600 rounded-full h-2" 
                      style={{ width: `${viewingApp.aiSuggestion.confidence}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                    {viewingApp.aiSuggestion.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                {viewingApp.aiSuggestion.notes}
              </p>
            </div>
          </section>

          {/* Compliance Checker */}
          <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Compliance Checker
            </h2>
            <div className="space-y-4">
              {Object.entries(viewingApp.complianceChecks).map(([key, check]) => (
                <div key={key} className="flex justify-between items-center bg-white dark:bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center">
                    {getComplianceStatus(check.status)}
                    <span className="ml-3 font-medium text-gray-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {check.message}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Notes */}
          <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
            <h2 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Internal Notes
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 mb-4 p-3 border-yellow-400 border-l-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>Previous Notes:</strong> {viewingApp.internalNotes}
              </p>
            </div>
            <textarea
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              rows="3"
              placeholder="Add internal notes (visible only to staff)..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            ></textarea>
          </section>

          {/* Decision Panel */}
          <section className="bg-gradient-to-r from-green-50 dark:from-green-900/20 to-red-50 dark:to-red-900/20 p-6 border rounded-lg">
            <h2 className="flex items-center mb-6 font-semibold text-gray-900 dark:text-white text-xl">
              <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Decision Panel
            </h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <button
                onClick={() => handleDecision('approve')}
                className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium text-white transition-colors"
              >
                <span>✅</span>
                Approve
              </button>
              <button
                onClick={() => handleDecision('compliance')}
                className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition-colors"
              >
                <span>📋</span>
                Return for Compliance
              </button>
              <button
                onClick={() => handleDecision('reject')}
                className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium text-white transition-colors"
              >
                <span>❌</span>
                Reject
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Decision Modal */}
      {showDecisionModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 mx-4 p-6 rounded-lg w-full max-w-md">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
              Confirm {decisionType === 'approve' ? 'Approval' : decisionType === 'compliance' ? 'Return for Compliance' : 'Rejection'}
            </h3>
            
            {decisionType === 'reject' && (
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Rejection Reason (Required):
                </label>
                <textarea
                  className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                  rows="3"
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                ></textarea>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDecisionModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDecision}
                disabled={decisionType === 'reject' && !rejectionReason.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 px-4 py-2 rounded-lg text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Application Modal */}
      {showNewApplicationModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 mx-4 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white text-2xl">
                New Zoning Clearance Application
              </h3>
              <button
                onClick={() => {
                  setShowNewApplicationModal(false);
                  resetNewApplicationForm();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleNewApplicationSubmit} className="space-y-6">
              {/* Applicant Information Section */}
              <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Applicant Information
                </h4>
                
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Applicant Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.applicantName}
                      onChange={(e) => handleNewApplicationChange('applicantName', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.contactNumber}
                      onChange={(e) => handleNewApplicationChange('contactNumber', e.target.value)}
                      placeholder="09123456789"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.email}
                      onChange={(e) => handleNewApplicationChange('email', e.target.value)}
                      placeholder="applicant@email.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.address}
                      onChange={(e) => handleNewApplicationChange('address', e.target.value)}
                      placeholder="Complete address"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.companyName}
                      onChange={(e) => handleNewApplicationChange('companyName', e.target.value)}
                      placeholder="Company name (if applicable)"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Business Permit No. (Optional)
                    </label>
                    <input
                      type="text"
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.businessPermitNo}
                      onChange={(e) => handleNewApplicationChange('businessPermitNo', e.target.value)}
                      placeholder="Business permit number"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details Section */}
              <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v13" />
                  </svg>
                  Project Details
                </h4>
                
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Project Type *
                    </label>
                    <select
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.projectType}
                      onChange={(e) => handleNewApplicationChange('projectType', e.target.value)}
                    >
                      <option value="">Select project type</option>
                      <option value="Residential House">Residential House</option>
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Subdivision">Subdivision</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Mixed-use Building">Mixed-use Building</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Intended Use *
                    </label>
                    <select
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.intendedUse}
                      onChange={(e) => handleNewApplicationChange('intendedUse', e.target.value)}
                    >
                      <option value="">Select intended use</option>
                      {mockZoningTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Lot Location *
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.lotLocation}
                      onChange={(e) => handleNewApplicationChange('lotLocation', e.target.value)}
                      placeholder="Lot 1, Block 2, Subdivision Name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Lot Area (sq.m.) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.lotArea}
                      onChange={(e) => handleNewApplicationChange('lotArea', e.target.value)}
                      placeholder="120.5"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Barangay *
                    </label>
                    <select
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.barangay}
                      onChange={(e) => handleNewApplicationChange('barangay', e.target.value)}
                    >
                      <option value="">Select barangay</option>
                      {mockBarangays.map(barangay => (
                        <option key={barangay} value={barangay}>{barangay}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      District *
                    </label>
                    <select
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.district}
                      onChange={(e) => handleNewApplicationChange('district', e.target.value)}
                    >
                      <option value="">Select district</option>
                      {mockDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows="3"
                    className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                    value={newApplication.projectDescription}
                    onChange={(e) => handleNewApplicationChange('projectDescription', e.target.value)}
                    placeholder="Detailed description of the proposed project"
                  ></textarea>
                </div>
              </div>

              {/* Location Coordinates Section */}
              <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location Coordinates
                </h4>
                
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Latitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.coordinates.lat}
                      onChange={(e) => handleNewApplicationChange('coordinates.lat', e.target.value)}
                      placeholder="14.6760"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Longitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      className="bg-white dark:bg-slate-600 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
                      value={newApplication.coordinates.lng}
                      onChange={(e) => handleNewApplicationChange('coordinates.lng', e.target.value)}
                      placeholder="121.0437"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 mt-4 p-3 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    💡 <strong>Tip:</strong> You can use GPS coordinates from Google Maps or other mapping services. 
                    Accurate coordinates help with zoning analysis and compliance checking.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-gray-200 dark:border-gray-600 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewApplicationModal(false);
                    resetNewApplicationForm();
                  }}
                  className="px-6 py-2 font-medium text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={resetNewApplicationForm}
                  className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium text-white transition-colors"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium text-white transition-colors"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}