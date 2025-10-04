// models/Teacher.ts
import mongoose, { Schema } from 'mongoose';
import { ITeacher } from '../interfaces/Teacher';

const TeacherSchema = new Schema<ITeacher>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  teacherID: { type: String, unique: true, required: true },

  subjects: [String],

  classIds: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Class' 
    }
  ],

  joiningDate: Date,

  qualifications: String,

}, 

{ timestamps: true });

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);