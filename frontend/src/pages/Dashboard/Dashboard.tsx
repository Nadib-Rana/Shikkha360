import React from 'react';

import RecentActivity from './RecentActivity';
import StatsCards from './StatsCards';


const Dashboard: React.FC = () => {
  return (
    <div> 
      <StatsCards />
      <RecentActivity />
    </div>
  );
};

export default Dashboard;