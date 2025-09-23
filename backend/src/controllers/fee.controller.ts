import Fee from '../models/Fee';
import { Request, Response } from 'express';

export const createFeeRecord = async (req: Request, res: Response) => {
  const fee = await Fee.create(req.body);
  res.status(201).json(fee);
};

export const getFeesByStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const fees = await Fee.find({ studentId }).sort({ dueDate: -1 });
  res.json(fees);
};