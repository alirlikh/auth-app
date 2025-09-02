'use client';

import { useAuth } from "@/app/_lib/authContext";
import Menu, { menuList } from "../Menu/Menu";


const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            {user && <span className="text-gray-500">Welcome, {user?.name.first + user?.name.last }</span>}
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
        <nav className="my-2 mx-2 p-1">
        <Menu items={menuList} isRoot />
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;