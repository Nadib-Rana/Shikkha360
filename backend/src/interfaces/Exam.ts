// interfaces/Exam.ts
import { Types } from 'mongoose';
export interface IExam {
  _id?: string;
  title: string;
  type: 'midterm' | 'final' | 'quiz';
  date: Date;
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  createdBy: Types.ObjectId;
}