// models/Student.ts
import mongoose, { Schema } from 'mongoose';
import { IStudent } from '../interfaces/Student';

const StudentSchema = new Schema<IStudent>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentID: { type: String, unique: true, required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  section: String,
  admissionDate: Date,
  parentId: { type: Schema.Types.ObjectId, ref: 'User' },
  documents: [String],
}, { timestamps: true });

export default mongoose.model<IStudent>('Student', StudentSchema);