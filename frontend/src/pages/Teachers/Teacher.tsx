import Layout from "../../components/layout/Layout";
import NavigationCard from "../../components/common/NavigationCard";

function Teacher() {
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Teacher Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavigationCard
            title="Add Teacher"
            description="Create a new Teacher profile"
            to="/add-Teacher"
            icon="➕"
          />
          <NavigationCard
            title="Edit Teacher"
            description="Update Teacher information"
            to="/edit-Teacher"
            icon="✏️"
          />
          <NavigationCard
            title="Teacher List"
            description="View all registered Teachers"
            to="/Teacher-list"
            icon="📋"
          />
          <NavigationCard
            title="Teacher Profile"
            description="View detailed Teacher info"
            to="/Teacher-profile"
            icon="👤"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Teacher;