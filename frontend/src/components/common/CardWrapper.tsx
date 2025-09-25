import React from 'react';

interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default CardWrapper;