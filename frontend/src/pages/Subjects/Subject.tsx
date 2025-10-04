import Layout from '../../components/layout/Layout';
import NavigationCard from '../../components/common/NavigationCard';



const subjectActions = [
  {
    title: 'Add New Subject',
    description: 'Create a new subject profile',
    to: '/add-subject',
    icon: '➕',
  },
  {
    title: 'Edit Subject',
    description: 'Update subject information',
    to: '/edit-subject',
    icon: '✏️',
  },
  {
    title: 'Subject List',
    description: 'View all registered subjects',
    to: '/subject-list',
    icon: '📋',
  },
  {
    title: 'subject Profile',
    description: 'View detailed subject info',
    to: '/subject-profile',
    icon: '👤',
  },
];

function Subject() {
  return (
    <div >
      <h2 className="text-xl font-semibold text-gray-700 mb-6">subject Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectActions.map((action) => (
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

export default Subject;