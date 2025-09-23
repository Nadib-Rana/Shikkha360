import React from 'react';

interface BadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

const badgeStyles: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800'
};

const Badge: React.FC<BadgeProps> = ({ label, type = 'neutral', className = '' }) => {
  const baseClasses = 'px-2 py-1 rounded-full text-sm font-medium inline-block';
  const colorClasses = badgeStyles[type] || badgeStyles.neutral;

  return <span className={`${baseClasses} ${colorClasses} ${className}`}>{label}</span>;
};

export default Badge;