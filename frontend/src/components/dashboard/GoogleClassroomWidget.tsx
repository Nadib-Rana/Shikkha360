import React from "react";
import { useGoogleClassroom } from "../../features/google-classroom/hooks/useGoogleClassroom";

const GoogleClassroomWidget: React.FC = () => {
  const { courses, loading } = useGoogleClassroom();
  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="font-bold mb-2">Google Classroom Courses</h3>
      <ul>
        {courses.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleClassroomWidget;
