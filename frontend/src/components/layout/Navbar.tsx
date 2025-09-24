import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Desktop Links */}
      <div className="space-y-2 text-sm font-medium text-gray-700">
        <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/students" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
          Students
        </Link>
        <Link to="/teachers" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
          Teachers
        </Link>
        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
          Settings
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-sm font-medium text-gray-700">
          <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/students" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
            Students
          </Link>
          <Link to="/teachers" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
            Teachers
          </Link>
          <Link to="/settings" className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600">
            Settings
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar