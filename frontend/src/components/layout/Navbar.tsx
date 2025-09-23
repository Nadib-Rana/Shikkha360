import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Shikkha360</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/students" className="hover:text-blue-600">Students</Link>
            <Link to="/teachers" className="hover:text-blue-600">Teachers</Link>
            <Link to="/settings" className="hover:text-blue-600">Settings</Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700">
          <Link to="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
          <Link to="/students" className="block hover:text-blue-600">Students</Link>
          <Link to="/teachers" className="block hover:text-blue-600">Teachers</Link>
          <Link to="/settings" className="block hover:text-blue-600">Settings</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;