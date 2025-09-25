import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationCardProps {
  title: string;
  description?: string;
  to: string;
  icon?: React.ReactNode;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title, description, to, icon }) => {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col gap-2 hover:bg-blue-50"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </Link>
  );
};

export default NavigationCard;