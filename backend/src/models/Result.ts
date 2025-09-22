// models/Result.ts
import mongoose, { Schema } from 'mongoose';
import { IResult } from '../interfaces/Result';

const ResultSchema = new Schema<IResult>({
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  marks: { type: Number, required: true },
  grade: String,
  comments: String,
}, { timestamps: true });

export default mongoose.model<IResult>('Result', ResultSchema);