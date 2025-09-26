import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavLink = {
  path: string;
  label: string;
};

type SidebarProps = {
  links: NavLink[];
};

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const renderLinks = () =>
    links.map(({ path, label }) => {
      const isActive = location.pathname === path;
      return (
        <Link
          key={path}
          to={path}
          className={`block px-3 py-2 rounded transition ${
            isActive
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700'
          }`}
        >
          {label}
        </Link>
      );
    });

  return (
    <div className="flex flex-col">
      {/* Section Heading */}
      <div className="text-sm font-semibold text-gray-500 mb-2 pl-3">Navigation</div>

      {/* Desktop Links */}
      <div className="space-y-2 hidden md:block">{renderLinks()}</div>

      {/* Mobile Toggle */}
      <div className="md:hidden mt-4 px-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? '✕ Close' : '☰ Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-3">{renderLinks()}</div>
      )}
    </div>
  );
};

export default Sidebar;