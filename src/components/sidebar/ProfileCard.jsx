import React from 'react'

function ProfileCard({ name, role, avatarUrl, collapsed }) {
  return (
    <div className="flex items-center space-x-3 p-4">
      <img 
        src={avatarUrl} 
        alt="Profile" 
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex-1 min-w-0 overflow-hidden transition-all duration-300"
           style={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto', maxWidth: collapsed ? 0 : '100%' }}>
        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
          {name}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
          {role}
        </p>
      </div>
    </div>
  )
}

export default ProfileCard