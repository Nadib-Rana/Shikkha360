import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import NavigationCard from '../../components/common/NavigationCard';

const studentActions = [
 {
    title: 'Student List',
    description: 'View all registered students',
    to: 'student-list',
    icon: '📋',
  },
  {
    title: 'Student Exam',
    description: 'View all Exam',
    to: 'exam',
    icon: '📋',
  },

];

function Student() {
  const location = useLocation();
  const basePath = location.pathname.endsWith('/')
    ? location.pathname
    : location.pathname + '/';

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentActions.map((action) => (
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

export default Student;