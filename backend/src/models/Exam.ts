// models/Exam.ts
import mongoose, { Schema } from 'mongoose';
import { IExam } from '../interfaces/Exam';

const ExamSchema = new Schema<IExam>({
  title: { type: String, required: true },
  type: { type: String, enum: ['midterm', 'final', 'quiz'], required: true },
  date: { type: Date, required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IExam>('Exam', ExamSchema);