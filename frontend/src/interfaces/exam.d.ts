export interface IExam {
  _id: string;
  title: string;
  type: 'midterm' | 'final' | 'quiz';
  date: string;
  classId: string;
  subjectId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}