// interfaces/User.ts
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  profileImage?: string;
  contactInfo?: {
    phone?: string;
    address?: string;
  };
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}