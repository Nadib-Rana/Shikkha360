import React from "react";
import ExamList from "../../components/Exams/ExamList";


interface User {
  _id: string;
  name: string;
  email?: string;
  role:"teacher";

}

interface TeacherExamPageProps {
  user: User;
}

const TeacherExamPage: React.FC<TeacherExamPageProps> = ({ user }) => {
  return <ExamList user={user} />;
};

export default TeacherExamPage;
