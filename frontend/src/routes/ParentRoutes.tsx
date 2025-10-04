import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ParentDashboard from '../pages/ParentDashboard';

const ParentRoutes = [
  <Route key="parent-dashboard" path="/parent/dashboard" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />,
];

export default ParentRoutes;
