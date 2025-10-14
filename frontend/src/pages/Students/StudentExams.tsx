
import ExamList from '../../components/Exams/ExamList';
import RoleGuard from '../../components/shared/RoleGuard';

 function StudentExams() {
  return (
    <RoleGuard role="student" allowed={['student']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Upcoming Exams</h1>
        <ExamList />
      </div>
    </RoleGuard>
  );
}

export default StudentExams