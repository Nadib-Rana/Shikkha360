import { Request, Response } from 'express';
import Assignment from '../models/Assignment';
import { IAssignment } from '../interfaces/Assignment';

// ✅ Get all assignments
export const getAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().populate('subject').sort({ dueDate: 1 }).lean();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

// ✅ Get single assignment by ID
export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('subject').lean();
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignment' });
  }
};

// ✅ Create new assignment
export const createAssignment = async (req: Request<{}, {}, IAssignment>, res: Response) => {
  try {
    const { subject, dueDate, status } = req.body;
    const newAssignment = new Assignment({ subject, dueDate, status });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create assignment' });
  }
};

// ✅ Update assignment
export const updateAssignment = async (
  req: Request<{ id: string }, {}, Partial<IAssignment>>,
  res: Response
) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update assignment' });
  }
};


// ✅ Delete assignment
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete assignment' });
  }
};