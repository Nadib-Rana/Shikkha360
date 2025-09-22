// interfaces/Fee.ts
import { Types } from 'mongoose';
export interface IFee {
  _id?: string;
  studentId: Types.ObjectId;
  amount: number;
  dueDate: Date;
  paidAmount?: number;
  paymentDate?: Date;
  method?: 'cash' | 'card' | 'bank' | 'mobile';
  status: 'paid' | 'unpaid' | 'partial';
  invoiceId?: string;
  remarks?: string;
}