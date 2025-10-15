import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ParentDashboard from '../pages/ParentDashboard';
import ParentExamPage from '../pages/Exams/ParentExamPage';

const ParentRoutes = [
  <Route key="parent-dashboard" path="/parent/dashboard" element={
    <ProtectedRoute>
      <ParentDashboard />
    </ProtectedRoute>}
  />,
   <Route key="parent-dashboard" path="/parent/children/exam" element={
    <ProtectedRoute>
      <ParentExamPage />
    </ProtectedRoute>}
  />,
];

export default ParentRoutes;
