import { Request, Response } from 'express';
import Assignment from '../models/Assignment';

// ➡️ Create

// ➡️ Create with file upload
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const assignment = new Assignment({
      ...req.body,
      fileUrl, // ✅ save file path
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create assignment', error: err });
  }
};

// ➡️ Read All
export const getAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().populate('subject').sort({ dueDate: 1 });
    res.json(assignments);
    console.log(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch assignments', error: err });
    console.log(err)
  }
};

// ➡️ Read One
export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('subject');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
    console.log(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignment', error: err });
    console.log(err);
  }
};

// ➡️ Update
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Assignment not found' });
    res.json(updated);
    console.log(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update assignment', error: err });
   console.log(err);
}
};

// ➡️ Delete
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted successfully' });
    console.log(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete assignment', error: err });
    console.log(err);
  }
};