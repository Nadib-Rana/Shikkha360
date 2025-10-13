import { useLocation } from 'react-router-dom';
import NavigationCard from '../../components/common/NavigationCard';

const teacherActions = [
  {
    title: 'Add New Teacher',
    description: 'Create a new teacher profile',
    to: 'add-teacher',
    icon: '➕',
  },
  {
    title: 'Edit Teacher',
    description: 'Update teacher information',
    to: 'edit-teacher',
    icon: '✏️',
  },
  {
    title: 'Teacher List',
    description: 'View all registered teachers',
    to: 'teacher-list',
    icon: '📋',
  },
  {
    title: 'Teacher Profile',
    description: 'View detailed teacher info',
    to: 'teacher-profile',
    icon: '👤',
  },
];

function Teachers() {
  const location = useLocation();
  const basePath = location.pathname.endsWith('/')
    ? location.pathname
    : location.pathname + '/';

  return (
   <>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Teacher Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherActions.map((action) => (
          <NavigationCard
            key={action.to}
            title={action.title}
            description={action.description}
            to={`${basePath}${action.to}`}
            icon={action.icon}
          />
        ))}
      </div>
    </>
  );
}

export default Teachers;