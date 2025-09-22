// models/Message.ts
import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../interfaces/Message';

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['email', 'sms', 'in-app'], default: 'in-app' },
  readStatus: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', MessageSchema);