import React from 'react';
import type { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: ReactNode; // Made optional since Outlet will handle child routes
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
        <div className="px-6 py-4 text-xl font-bold text-blue-600 border-b">
          Shikkha360
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/students"
            className="block px-3 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Students
          </Link>
          <Link
            to="/teachers"
            className="block px-3 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Teachers
          </Link>
          <Link
            to="/settings"
            className="block px-3 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Welcome, Nadib</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-4">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-6 py-3 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Shikkha360. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;