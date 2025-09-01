import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Globe, ChevronDown } from 'lucide-react'
import sidebarItems from './sidebarItems'
import ProfileCard from './ProfileCard'

function Sidebar({ collapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedItem, setExpandedItem] = React.useState(new Set())
  const [isHidden, setIsHidden] = React.useState(false)
  const [isFullyHidden, setIsFullyHidden] = React.useState(false)

  React.useEffect(() => {
    const newExpanded = new Set()
    sidebarItems.forEach(item => {
      if (item.subItems) {
        const isActiveSubItem = item.subItems.some(
          subItem => location.pathname === subItem.path
        )
        if (isActiveSubItem) {
          newExpanded.add(item.id)
        }
      }
    })
    setExpandedItem(newExpanded)
  }, [location.pathname])

  const toggleExpanded = (item) => {
    const newExpanded = new Set(expandedItem)
    if (newExpanded.has(item.id)) {
      newExpanded.delete(item.id)
    } else {
      newExpanded.add(item.id)
      // If the item has subItems and none are currently active, navigate to the first subitem
      if (item.subItems && item.subItems.length > 0 && !item.subItems.some(sub => sub.path === location.pathname)) {
        navigate(item.subItems[0].path)
      }
    }
    setExpandedItem(newExpanded)
  }

  // Effect to handle complete hiding when collapsed is true
  React.useEffect(() => {
    if (collapsed) {
      // First set width to 0 with animation
      setIsHidden(true);
      
      // After animation completes, completely hide the element
      const timer = setTimeout(() => {
        setIsFullyHidden(true);
      }, 300); // Should match transition duration
      
      return () => clearTimeout(timer);
    } else {
      // When expanding, immediately make the sidebar visible but with zero width
      setIsFullyHidden(false);
      
      // Small delay to ensure DOM updates before starting the animation
      setTimeout(() => {
        // Force browser reflow to ensure the display property change takes effect
        document.body.offsetHeight;
        
        // Now animate to full width
        setIsHidden(false);
      }, 50);
    }
  }, [collapsed]);

  return (
    <div className={`
      ${isFullyHidden ? 'hidden' : 'flex'} 
      bg-white border-r border-slate-200/50 flex-col overflow-hidden dark:bg-slate-900 dark:border-slate-700
    `}
    style={{
      width: isHidden ? '0' : '16rem', /* 16rem = 64 in Tailwind */
      opacity: isHidden ? 0 : 1,
      maxWidth: isHidden ? '0' : '16rem',
      transition: 'width 300ms ease-in-out, opacity 300ms ease-in-out, max-width 300ms ease-in-out'
    }}>
      {/* Logo */}
      <div className='flex items-center px-6 border-slate-200 dark:border-slate-700/50 border-b h-[81px]'>
        <NavLink to="/" className='flex items-center space-x-3'>
          <div className='flex justify-center items-center bg-orange-500 p-2 rounded-xl font-bold text-white'>
            <Globe className='w-6 h-6' />
          </div>
          <div className="overflow-hidden whitespace-nowrap transition-opacity duration-300" 
               style={{ opacity: isHidden ? 0 : 1, width: isHidden ? 0 : 'auto', maxWidth: isHidden ? 0 : '100%' }}>
            <h1 className='font-bold dark:text-white text-xl'>GSM</h1>
            <p className='text-slate-500 text-xs'>Admin Dashboard</p>
          </div>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 space-y-2 p-4 overflow-y-auto'>
        {sidebarItems.map((item) => {
          const isActive = item.path === location.pathname || 
            (item.subItems && item.subItems.some(
              subItem => subItem.path === location.pathname
            ))

          return (
            <div key={item.id}>
              {item.subItems ? (
                <>
                  <button
                    className={`w-full flex justify-between items-center p-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-200 text-orange-600 font-semibold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-slate-600 dark:hover:bg-slate-200'
                    }`}
                    onClick={() => toggleExpanded(item)}
                  >
                    <div className='flex items-center space-x-3'>
                      <item.icon className='w-5 h-5' />
                      <span className="overflow-hidden font-medium text-sm whitespace-nowrap transition-opacity duration-300"
                            style={{ opacity: isHidden ? 0 : 1, width: isHidden ? 0 : 'auto', maxWidth: isHidden ? 0 : '100%' }}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-all duration-200 
                      ${expandedItem.has(item.id) ? 'rotate-180' : ''}`}
                      style={{ opacity: isHidden ? 0 : 1, width: isHidden ? 0 : '1rem', overflow: 'hidden' }} />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ml-8 pl-1 border-slate-300 border-l`}
                    style={{ 
                      maxHeight: (!collapsed && item.subItems && expandedItem.has(item.id)) ? 
                        `${item.subItems.length * 40}px` : '0px',
                      opacity: (!collapsed && item.subItems && expandedItem.has(item.id)) ? 1 : 0,
                      marginTop: (!collapsed && item.subItems && expandedItem.has(item.id)) ? '0.5rem' : '0',
                      transform: (!collapsed && item.subItems && expandedItem.has(item.id)) ? 
                        'translateY(0)' : 'translateY(-10px)',
                    }}
                  >
                    <div className="space-y-1">
                      {item.subItems && item.subItems.map((subitem) => (
                        <NavLink
                          key={subitem.id}
                          to={subitem.path}
                          className={({ isActive }) => 
                            `block w-[calc(100%-0.5rem)] ml-2 text-sm text-left p-2 truncate rounded-lg ${
                              isActive
                                ? 'bg-orange-100 text-orange-700 font-semibold'
                                : 'text-slate-700 dark:text-slate-500 hover:bg-slate-200 dark:hover:text-slate-600 dark:hover:bg-slate-100'
                            }`
                          }
                        >
                          {subitem.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `w-full flex items-center p-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-200 text-orange-600 font-semibold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-slate-600 dark:hover:bg-slate-200'
                    }`
                  }
                >
                  <div className='flex items-center space-x-3'>
                    <item.icon className='w-5 h-5' />
                    <span className="overflow-hidden font-medium text-sm whitespace-nowrap transition-opacity duration-300"
                          style={{ opacity: isHidden ? 0 : 1, width: isHidden ? 0 : 'auto', maxWidth: isHidden ? 0 : '100%' }}>
                      {item.label}
                    </span>
                  </div>
                </NavLink>
              )}
            </div>
          )
        })}
      </nav>
      
      <hr className='mx-2 border-slate-300 dark:border-slate-700' />
      <ProfileCard collapsed={isHidden} name="LEIVY" role="Super Saiyan" avatarUrl="/public/Bartss.png" />
    </div>
  )
}

export default Sidebar