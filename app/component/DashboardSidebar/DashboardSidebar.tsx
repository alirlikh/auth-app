'use client';

import { useAuth } from '@/app/_lib/authContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CollapseIcon from '../icons/CollapseIcon';
import { useState } from 'react';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { hasRole } = useAuth();
  const [sideOpen, setSideOpen] = useState<boolean>(false)

  const handleSide = () => {
    setSideOpen((prev) => !prev)    
    console.log(sideOpen);
    
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  // Admin-only navigationjust for test
  const adminNavigation = [
    { name: 'Admin Panel', href: '/dashboard/admin', icon: '🔧' },
    // { name: 'Manage Users', href: '/users', icon: '👥' },
  ];

  return (
    <div className={`relative h-svh max-h-full bg-white shadow-sm w-[54]  overflow-clip  transition-all duration-200 ${sideOpen == true ? "!w-64" :"hover:w-64"}` }>
      <nav className="mt-5 pl-3 pr-1 w-full">
        <div className="space-y-1 w-full">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } group flex items-center p-2 text-sm font-medium border-l-4 transition-all duration-200 w-full `}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Admin-only section */}
        {hasRole('admin') && (
          <>
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </h3>
              <div className="mt-2 space-y-1">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>
      <div className='absolute bottom-0 left-2 w-full border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 '>
        <button className={`${sideOpen == true ? "bg-gray-300" : ""} p-2 rounded-2xl`} onClick={handleSide}>
        <CollapseIcon  width={30} height={30}/>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;