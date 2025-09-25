import React from 'react';
import { FaUserEdit, FaUpload, FaSignInAlt } from 'react-icons/fa';

interface ActivityItem {
  id: number;
  icon?: React.ReactNode;
  description: string;
  timestamp: string;
}

const activityData: ActivityItem[] = [
  {
    id: 1,
    icon: <FaSignInAlt />,
    description: 'Admin logged in',
    timestamp: 'Today at 10:45 AM'
  },
  {
    id: 2,
    icon: <FaUpload />,
    description: 'Student uploaded assignment',
    timestamp: 'Yesterday at 3:20 PM'
  },
  {
    id: 3,
    icon: <FaUserEdit />,
    description: 'Teacher updated profile',
    timestamp: 'Monday at 9:10 AM'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activityData.length === 0 ? (
          <li className="text-sm text-gray-500">No recent activity</li>
        ) : (
          activityData.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3">
              <div className="text-blue-500 text-lg">{activity.icon ?? '📝'}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="mt-6 text-center text-xs text-gray-400 italic">
        Make sure in one life.
      </div>
    </div>
  );
};

export default RecentActivity;