import React from 'react';
import Layout from '../../components/layout/Layout';
import RecentActivity from './RecentActivity';
import StatsCards from './StatsCards';

const stats = [
  { label: 'Total Students', value: 1200, icon: '👨‍🎓', color: 'bg-blue-100 text-blue-700' },
  { label: 'Total Teachers', value: 75, icon: '👩‍🏫', color: 'bg-green-100 text-green-700' },
  { label: 'Total Subjects', value: 25, icon: '📚', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Total Classes', value: 10, icon: '🏫', color: 'bg-purple-100 text-purple-700' }
];

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <StatsCards />
      <RecentActivity />
    </Layout>
  );
};

export default Dashboard;