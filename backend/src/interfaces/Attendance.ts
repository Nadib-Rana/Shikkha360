// interfaces/Attendance.ts
import { Types } from 'mongoose';

export interface IAttendance {
  _id?: string;
  userId: Types.ObjectId;
  date: Date;
  section:String;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
  recordedBy: Types.ObjectId;
}