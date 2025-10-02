// models/Attendance.ts
import mongoose from 'mongoose';
import { IAttendance } from '../interfaces/Attendance';

const { Schema } = mongoose;

const AttendanceSchema = new Schema<IAttendance>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  date: { type: Date, required: true },

 section:{type:Schema.Types.ObjectId , ref:'section'},

  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
 
  remarks: { type: String },
 
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
  
  { timestamps: true });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);