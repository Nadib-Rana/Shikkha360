import Layout from '../../components/layout/Layout';
import NavigationCard from '../../components/common/NavigationCard';



const teacherActions = [
  {
    title: 'Add teacher',
    description: 'Create a new teacher profile',
    to: '/add-teacher',
    icon: '➕',
  },
  {
    title: 'Edit teacher',
    description: 'Update teacher information',
    to: '/edit-teacher',
    icon: '✏️',
  },
  {
    title: 'teacher List',
    description: 'View all registered teachers',
    to: '/teacher-list',
    icon: '📋',
  },
  {
    title: 'teacher Profile',
    description: 'View detailed teacher info',
    to: '/teacher-profile',
    icon: '👤',
  },
];

function Teacher() {
  return (
    <div >
      <h2 className="text-xl font-semibold text-gray-700 mb-6">teacher Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherActions.map((action) => (
          <NavigationCard
            key={action.to}
            title={action.title}
            description={action.description}
            to={action.to}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Teacher;