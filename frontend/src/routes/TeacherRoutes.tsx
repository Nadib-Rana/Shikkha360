import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Teacher from '../pages/Teachers/ManageTeachers';
import TeacherList from '../pages/Teachers/TeacherList';
import TeacherProfile from '../pages/Teachers/TeacherProfile';
import TeacherAssignments from '../pages/Teachers/TeacherAssignments';
import AssignSubjects from '../pages/Teachers/AssignSubjects';
// import TeacherResults from '../pages/Teachers/TeacherResults';

const TeacherRoutes = [
  <Route key="teachers" path="/teachers/dashboard" element={<ProtectedRoute><Teacher /></ProtectedRoute>} />,
  <Route key="teachers-list" path="/teachers/list" element={<ProtectedRoute><TeacherList /></ProtectedRoute>} />,
  <Route key="teachers-profile" path="/teachers/profile/:id" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />,
  <Route key="teachers-assignments" path="/teachers/assignments" element={<ProtectedRoute><TeacherAssignments /></ProtectedRoute>} />,
  <Route key="teachers-assign-subjects" path="/teachers/assign-subjects" element={<ProtectedRoute><AssignSubjects /></ProtectedRoute>} />,
//   <Route key="teachers-result" path="/teachers/result" element={<ProtectedRoute><TeacherResults /></ProtectedRoute>} />,
  <Route key="teacher-dashboard" path="/teacher" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />,
];

export default TeacherRoutes;
