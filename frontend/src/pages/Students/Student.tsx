import React from "react";
import Layout from "../../components/layout/Layout";
import NavigationCard from "../../components/common/NavigationCard";

function Student() {
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavigationCard
            title="Add Student"
            description="Create a new student profile"
            to="/add-student"
            icon="➕"
          />
          <NavigationCard
            title="Edit Student"
            description="Update student information"
            to="/edit-student"
            icon="✏️"
          />
          <NavigationCard
            title="Student List"
            description="View all registered students"
            to="/student-list"
            icon="📋"
          />
          <NavigationCard
            title="Student Profile"
            description="View detailed student info"
            to="/student-profile"
            icon="👤"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Student;