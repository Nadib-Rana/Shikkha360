export default interface Exam {
  _id: string;
  title: string;
  type: string;
  date: string;
  classId: string;
  subjectId: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;


}