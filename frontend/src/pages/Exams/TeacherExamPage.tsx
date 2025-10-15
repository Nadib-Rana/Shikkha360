import React from "react";
import ExamList from "../../components/Exams/ExamList";

const TeacherExamPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher - Exams</h1>
      <ExamList canCreate={true} canEdit={false} canDelete={false} />
    </div>
  );
};

export default TeacherExamPage;
