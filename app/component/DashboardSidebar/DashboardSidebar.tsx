'use client';

import { useAuth } from '@/app/_lib/authContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { hasRole } = useAuth();

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
    <div className="w-64 bg-white shadow-sm h-screen ">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
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
    </div>
  );
};

export default DashboardSidebar;