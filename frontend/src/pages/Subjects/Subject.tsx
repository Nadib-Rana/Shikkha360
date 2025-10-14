import { useLocation } from 'react-router-dom';
import NavigationCard from '../../components/common/NavigationCard';

const subjectActions = [

  {
    title: 'Subject List',
    description: 'View all registered subjects',
    to: 'subject-list',
    icon: '📋',
  },
  
];

function Subject() {
  const location = useLocation();
  const basePath = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📘 Subject Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectActions.map((action) => (
          <NavigationCard
            key={action.to}
            title={action.title}
            description={action.description}
            to={basePath + action.to}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Subject;