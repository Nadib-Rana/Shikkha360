
import Layout from '../../components/layout/Layout';
import NavigationCard from '../../components/common/NavigationCard';
import { FaPlus, FaEdit, FaList, FaUserTie, FaTrashAlt, FaUserGraduate } from 'react-icons/fa';
import { MdAssignment } from 'react-icons/md';

function AdminProfile() {
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Teacher Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavigationCard
            title="Add Teacher"
            description="Create a new teacher profile"
            to="/addteacher"
            icon={<FaPlus />}
          />
          <NavigationCard
            title="Edit Teacher"
            description="Update teacher information"
            to="/editteacher"
            icon={<FaEdit />}
          />
          <NavigationCard
            title="Teacher List"
            description="View all registered teachers"
            to="/teacherlist"
            icon={<FaList />}
          />
          <NavigationCard
            title="Teacher Profile"
            description="View detailed teacher info"
            to="/teacherprofile"
            icon={<FaUserTie />}
          />
          <NavigationCard
            title="Assign Subjects"
            description="Assign subjects to teachers"
            to="/assignsubjects"
            icon={<MdAssignment />}
          />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <NavigationCard
            title="Edit Student"
            description="Update student information"
            to="/edit-student"
            icon={<FaEdit />}
          />
          
          <NavigationCard
            title="Edit Student"
            description="Update student information"
            to="/edit-student"
            icon={<FaEdit />}
          />
          <NavigationCard
            title="Delete Student"
            description="Remove student from system"
            to="/delete-student"
            icon={<FaTrashAlt />}
          />
          <NavigationCard
            title="Student Profile"
            description="View detailed student info"
            to="/student-profile"
            icon={<FaUserGraduate />}
          />
        </div>
      </div>

    </Layout>
  );
}

export default AdminProfile;