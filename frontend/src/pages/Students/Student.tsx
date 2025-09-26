import Layout from '../../components/layout/Layout';
import NavigationCard from '../../components/common/NavigationCard';

const studentLinks = [
  { path: '/home', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/results', label: 'Results' },
  { path: '/profile', label: 'Profile' },
];

const studentActions = [
  {
    title: 'Add Student',
    description: 'Create a new student profile',
    to: '/add-student',
    icon: '➕',
  },
  {
    title: 'Edit Student',
    description: 'Update student information',
    to: '/edit-student',
    icon: '✏️',
  },
  {
    title: 'Student List',
    description: 'View all registered students',
    to: '/student-list',
    icon: '📋',
  },
  {
    title: 'Student Profile',
    description: 'View detailed student info',
    to: '/student-profile',
    icon: '👤',
  },
];

function Student() {
  return (
    <Layout links={studentLinks}>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentActions.map((action) => (
          <NavigationCard
            key={action.to}
            title={action.title}
            description={action.description}
            to={action.to}
            icon={action.icon}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Student;