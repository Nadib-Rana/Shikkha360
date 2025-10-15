import React from "react";
import ExamList from "../../components/Exams/ExamList";
import Searching from "../../components/common/Scarching";

const AdminExamPage: React.FC = () => {
  return (
    <div className="p-6">
      
      <h1 className="text-3xl font-bold mb-4">Admin - Manage Exams</h1>
      <ExamList canCreate={true} canEdit={true} canDelete={true} />
    </div>
  );
};

export default AdminExamPage;
