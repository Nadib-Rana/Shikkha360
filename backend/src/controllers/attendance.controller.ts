import Attendance from '../models/Attendance';
import { Request, Response } from 'express';

export const markAttendance = async (req: Request, res: Response) => {
  const attendance = await Attendance.create(req.body);
  res.status(201).json(attendance);
};

export const getAttendanceByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const records = await Attendance.find({ userId }).sort({ date: -1 });
  res.json(records);
};