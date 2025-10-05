import React from 'react';
import Sidebar from './Sidebar';

type NavLink = {
  path: string;
  label: string;
};

type LayoutProps = {
  children: React.ReactNode;
  links: NavLink[];
};

const Layout: React.FC<LayoutProps> = ({ children, links }) => {
  return (
    <div className=" flex min-h-screen">
      <aside className="w-64 bg-white border-r p-4">
        <Sidebar links={links} />
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
};

export default Layout;