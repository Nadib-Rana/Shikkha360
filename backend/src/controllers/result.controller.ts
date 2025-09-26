import Result from '../models/Result';
import { Request, Response } from 'express';

// Create result
export const createResult = async (req: Request, res: Response) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Create result error:', error.message);
    res.status(500).json({ message: 'Failed to create result', error: error.message });
  }
};

// Update result
export const updateResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedResult = await Result.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedResult) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json(updatedResult);
  } catch (error: any) {
    console.error('Update result error:', error.message);
    res.status(500).json({ message: 'Server error while updating result', error: error.message });
  }
};