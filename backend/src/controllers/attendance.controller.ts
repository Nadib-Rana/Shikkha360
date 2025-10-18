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

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updateData = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      updateData,
      { new: true } 
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json(updatedAttendance);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating attendance' });
  }
};