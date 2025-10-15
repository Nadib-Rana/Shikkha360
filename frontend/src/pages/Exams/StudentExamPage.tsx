import React from "react";
import ExamList from "../../components/Exams/ExamList";

const StudentExamPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student - Exams</h1>
      <ExamList canCreate={false} canEdit={false} canDelete={false} />
    </div>
  );
};

export default StudentExamPage;
