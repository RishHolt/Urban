import { useState } from 'react';
import { mockApplications } from '../mockdata.jsx';

export default function AuditLogs() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [filterDate, setFilterDate] = useState('7days');
  
  const mockAuditLogs = [
    {
      id: 1,
      applicationRef: 'CAL-2024-0001',
      action: 'Status Changed',
      oldStatus: 'pending',
      newStatus: 'under_review',
      user: 'Maria Santos',
      role: 'Planning Officer',
      timestamp: '2024-08-31 10:30:15',
      notes: 'Assigned to technical review team',
      ipAddress: '192.168.1.10'
    },
    {
      id: 2,
      applicationRef: 'CAL-2024-0002',
      action: 'Document Uploaded',
      oldStatus: null,
      newStatus: null,
      user: 'Juan Dela Cruz',
      role: 'Applicant',
      timestamp: '2024-08-31 09:15:30',
      notes: 'Environmental Compliance Certificate uploaded',
      ipAddress: '203.177.45.22'
    },
    {
      id: 3,
      applicationRef: 'CAL-2024-0001',
      action: 'Application Approved',
      oldStatus: 'under_review',
      newStatus: 'approved',
      user: 'Roberto Reyes',
      role: 'City Planning Administrator',
      timestamp: '2024-08-30 16:45:00',
      notes: 'All requirements satisfied. Zoning clearance granted.',
      ipAddress: '192.168.1.5'
    },
    {
      id: 4,
      applicationRef: 'CAL-2024-0003',
      action: 'Status Changed',
      oldStatus: 'pending',
      newStatus: 'on_hold',
      user: 'Ana Mercado',
      role: 'Planning Officer',
      timestamp: '2024-08-30 14:20:10',
      notes: 'Waiting for HLURB clearance from applicant',
      ipAddress: '192.168.1.12'
    },
    {
      id: 5,
      applicationRef: 'CAL-2024-0004',
      action: 'Application Created',
      oldStatus: null,
      newStatus: 'pending',
      user: 'Pedro Gonzales',
      role: 'Applicant',
      timestamp: '2024-08-30 11:30:45',
      notes: 'New zoning clearance application submitted',
      ipAddress: '203.177.45.15'
    }
  ];

  const users = [
    'Maria Santos', 'Roberto Reyes', 'Ana Mercado', 'Juan Dela Cruz', 'Pedro Gonzales'
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'Status Changed': return '🔄';
      case 'Application Approved': return '✅';
      case 'Application Rejected': return '❌';
      case 'Document Uploaded': return '📎';
      case 'Application Created': return '📝';
      case 'User Login': return '🔑';
      case 'User Logout': return '🚪';
      default: return '📋';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      on_hold: 'bg-gray-100 text-gray-800'
    };
    
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      'City Planning Administrator': 'bg-purple-100 text-purple-800',
      'Planning Officer': 'bg-blue-100 text-blue-800',
      'Technical Reviewer': 'bg-green-100 text-green-800',
      'Clerk': 'bg-gray-100 text-gray-800',
      'Applicant': 'bg-orange-100 text-orange-800'
    };
    
    return roleConfig[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300">
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Audit Logs & User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Track all system activities, user actions, and access management</p>
      </div>

      {/* Statistics Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Total Actions Today</p>
              <p className="font-bold text-2xl">24</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">Active Users</p>
              <p className="font-bold text-2xl">8</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-yellow-100 text-sm">Login Sessions</p>
              <p className="font-bold text-2xl">15</p>
            </div>
            <div className="text-3xl">🔑</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100 text-sm">Failed Logins</p>
              <p className="font-bold text-2xl">2</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-4 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Filter Audit Logs</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Action Type</label>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="status_change">Status Changes</option>
              <option value="document_upload">Document Uploads</option>
              <option value="approval">Approvals</option>
              <option value="login">User Logins</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">User</label>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">Time Period</label>
            <select 
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full font-medium text-white transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Activity Log</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Status Change
                </th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 font-medium text-gray-500 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div className="font-medium">{log.timestamp.split(' ')[1]}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{log.timestamp.split(' ')[0]}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getActionIcon(log.action)}</span>
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <span className="bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded font-mono text-xs">
                      {log.applicationRef}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    <div>
                      <div className="font-medium">{log.user}</div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(log.role)}`}>
                        {log.role}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white text-sm">
                    {log.oldStatus && log.newStatus && (
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(log.oldStatus)}`}>
                          {log.oldStatus.replace('_', ' ')}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(log.newStatus)}`}>
                          {log.newStatus.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white text-sm">
                    <div className="max-w-xs">
                      <p className="truncate">{log.notes}</p>
                      <p className="text-gray-400 text-xs">IP: {log.ipAddress}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center px-6 py-3 bg-gray-50 dark:bg-slate-700">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Showing 1-5 of 124 records
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-600">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-600">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex gap-3 mt-6">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📊 Export to Excel
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📄 Export to PDF
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
          📋 Generate Audit Report
        </button>
      </div>
    </div>
  );
}
