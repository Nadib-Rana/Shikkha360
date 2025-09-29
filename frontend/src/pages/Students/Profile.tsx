
import Layout from '../../components/layout/Layout';
import StatsCards from '../../pages/Dashboard/StatsCards';

const adminSidebar = [
  { path: '/admin/deshboard', label: 'Deshboard' },
  { path: '/admin/accounce', label: 'Accounce' },
  { path: '/admin/students', label: 'Student' },
  { path: '/admin/teachers', label: 'Teacher' },
  { path: '/admin/coordinator', label: 'Own profile' },
  { path: 'admin/setting', label: 'Setting' },
  
];

function Profile() {
  return (
    <>
    <div className="w-full flex items-center justify-between border-1  py-3 px-4 bg-white shadow-sm">
  {/* Logo / Title */}
  <h2 className="text-2xl font-bold text-blue-600 tracking-wide">Shikka360</h2>

  {/* Profile Section */}
  <div className="flex items-center space-x-4">
    <div className="text-right">
      <p className="text-sm font-medium text-gray-800">User Name</p>
      <p className="text-xs text-gray-500">user Role</p>
    </div>
    <img
      className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrIZNXdOFANSt66E6sjQcp0WfejBISj90Vw&s"
      alt="Profile"
    />
  </div>
</div>
    <Layout links={adminSidebar}>
       <StatsCards />
    </Layout>
   </>
  );
}

export default Profile;