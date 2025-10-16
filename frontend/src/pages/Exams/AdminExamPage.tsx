import React from "react";
import ExamList from "../../components/Exams/ExamList";
interface User {
  _id: string;
  name: string;
  email?: string;
  role: "admin" ;
}

interface TeacherExamPageProps {
  user: User;
}
 const AdminExamPage: React.FC<TeacherExamPageProps> = ({ user }) => {
   return <ExamList canCreate={true} canEdit={true} canDelete={true} user={user} />
}

export default AdminExamPage;
