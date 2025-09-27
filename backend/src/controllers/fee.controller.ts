import Fee from '../models/Fee';
import { Request, Response } from 'express';

//create New Free Record
export const createFeeRecord = async (req: Request, res: Response) => {
  const fee = await Fee.create(req.body);
  res.status(201).json(fee);
};

// All Fees 
export const getFees = async (req: Request, res: Response) => {
  try {
    const allFees = await Fee.find();
    res.status(200).json(allFees); // ✅ 200 OK for successful fetch
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: 'Server error while fetching fees' });
  }
};


// Get Fee by student Id
export const getFeesByStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const fees = await Fee.find({ studentId }).sort({ dueDate: -1 });
  res.json(fees);
};