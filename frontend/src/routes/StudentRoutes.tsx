import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Student from '../pages/Students/Student';
import AddStudent from '../pages/Students/AddStudent';
import StudentList from '../pages/Students/StudentList';
import StudentProfile from '../pages/Students/StudentProfile';
import StudentAssignments from '../pages/Students/StudentAssignments';
import StudentResults from '../pages/Students/StudentResults';
import StudentDashboard from '../pages/Students/Dashboard';

const StudentRoutes = [
  <Route key="students" path="/students" element={<ProtectedRoute><Student /></ProtectedRoute>} />,
  <Route key="students-add" path="/students/add" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />,
  <Route key="students-list" path="/students/list" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />,
  <Route key="students-profile" path="/students/profile/:id" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />,
  <Route key="students-assignments" path="/students/assignments" element={<ProtectedRoute><StudentAssignments /></ProtectedRoute>} />,
  <Route key="students-result" path="/students/result" element={<ProtectedRoute><StudentResults /></ProtectedRoute>} />,
  <Route key="student-dashboard" path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />,
];

export default StudentRoutes;
