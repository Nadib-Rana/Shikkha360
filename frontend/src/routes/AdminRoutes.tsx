import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProfile from '../profile/admin/AdminProfile';
import Student from '../pages/Students/Student';
import Layout from '../components/layout/Layout';
import { FaBook, FaChartBar, FaClipboard, FaCog, FaHome, FaMoneyBill, FaUserGraduate, FaUsers, FaUserTie } from 'react-icons/fa';
import Subject from '../pages/Subjects/Subject';
import Teacher from '../pages/Teachers/Teacher';
import { FaPersonRifle } from 'react-icons/fa6';


const menuItems = [
  { path: '/admin', label: "Dashboard", icon: <FaHome /> },
  { path: '/admin/users', label: "Manage Users", icon: <FaUsers /> },
  { path: '/admin/teachers', label: "Teachers", icon: <FaUserTie /> },
  { path: '/admin/students', label: "Students", icon: <FaUserGraduate /> },
  { path: '/admin/subjects', label: "Subjects", icon: <FaBook /> },
  { path: '/admin/assignments', label: "Assignments", icon: <FaClipboard /> },
  { path: '/admin/reports', label: "Reports", icon: <FaChartBar /> },
  { path: '/admin/fees', label: "Fees & Payments", icon: <FaMoneyBill /> },
  { path: '/admin/settings', label: "Settings", icon: <FaCog /> },
  { path: '/admin/profile', label: "Profile", icon: <FaPersonRifle /> },
];

const AdminRoutes = [
  <Route key="admin-dashboard" path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />,
  
  <Route key="admin-profile" path="/admin/profile"
   element={
   <ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>} />,
 

  <Route key="admin-teachers" path="/admin/teachers" 
  
  
  element={
  <ProtectedRoute>
     <div>
     <Layout links={menuItems}>
          <Teacher />
      </Layout>
     </div>
    </ProtectedRoute>} />,
  

  <Route key="admin-students" path="/admin/students" 
  element={
  <ProtectedRoute>
    <div>
      <Layout links={menuItems}>
          <Student />
      </Layout>
    </div>
  </ProtectedRoute>}/>,


  <Route key="admin-subjects" path="/admin/subjects"
   element={
   <ProtectedRoute>
     <div>
        <Layout links={menuItems}>
           <Subject />
        </Layout>
     </div>
    </ProtectedRoute>} />,


  <Route key="admin-assignments" path="/admin/assignments" element={<ProtectedRoute><div>Assignments Management Page</div></ProtectedRoute>} />,
  <Route key="admin-reports" path="/admin/reports" element={<ProtectedRoute><div>Reports Page</div></ProtectedRoute>} />,
  <Route key="admin-fees" path="/admin/fees" element={<ProtectedRoute><div>Fees & Payments Page</div></ProtectedRoute>} />,
  <Route key="admin-settings" path="/admin/settings" element={<ProtectedRoute><div>Settings Page</div></ProtectedRoute>} />,
];

export default AdminRoutes;
