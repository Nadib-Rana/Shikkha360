import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaCalendarCheck } from 'react-icons/fa';

interface StatCard {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    id: 1,
    title: 'Total Students',
    value: '1,250',
    icon: <FaUserGraduate />,
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Total Teachers',
    value: '85',
    icon: <FaChalkboardTeacher />,
    color: 'text-green-600'
  },
  {
    id: 3,
    title: 'Monthly Earnings',
    value: '৳ 2,45,000',
    icon: <FaMoneyBillWave />,
    color: 'text-yellow-600'
  },
  {
    id: 4,
    title: 'Attendance Rate',
    value: '96%',
    icon: <FaCalendarCheck />,
    color: 'text-purple-600'
  }
];

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded shadow p-4 flex items-center gap-4 hover:shadow-md transition"
        >
          <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;