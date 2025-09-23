import Message from '../models/Message';
import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
};

export const getMessagesForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const messages = await Message.find({ receiverId: userId }).sort({ timestamp: -1 });
  res.json(messages);
};