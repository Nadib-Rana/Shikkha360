// models/User.ts
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student', 'parent'], required: true },
  profileImage: String,
  contactInfo: {
    phone: String,
    address: String,
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);