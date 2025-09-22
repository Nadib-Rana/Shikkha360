// interfaces/Message.ts
import { Types } from 'mongoose';
export interface IMessage {
  _id?: string;
  senderId: Types.ObjectId;
  receiverId:Types.ObjectId;
  content: string;
  type?: 'email' | 'sms' | 'in-app';
  readStatus?: boolean;
  timestamp?: Date;
}