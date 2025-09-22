// models/Fee.ts
import mongoose, { Schema } from 'mongoose';
import { IFee } from '../interfaces/Fee';

const FeeSchema = new Schema<IFee>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidAmount: Number,
  paymentDate: Date,
  method: { type: String, enum: ['cash', 'card', 'bank', 'mobile'] },
  status: { type: String, enum: ['paid', 'unpaid', 'partial'], required: true },
  invoiceId: String,
  remarks: String,
}, { timestamps: true });

export default mongoose.model<IFee>('Fee', FeeSchema);