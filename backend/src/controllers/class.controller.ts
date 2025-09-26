import { Request, Response } from 'express';
import Class from '../models/Class';

// ✅ Create Class
export const createClass = async (req: Request, res: Response) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error: any) {
    console.error('Create Class Error:', error.message);
    res.status(500).json({ message: 'Failed to create class', error: error.message });
  }
};

// ✅ Get All Classes
export const getClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await Class.find()
      .populate('classTeacherId')
      .populate('subjectIds');
    res.status(200).json(classes);
  } catch (error: any) {
    console.error('Get Classes Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch classes', error: error.message });
  }
};

// ✅ Get Class by ID
export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const classDoc = await Class.findById(id)
      .populate('classTeacherId')
      .populate('subjectIds');

    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(classDoc);
  } catch (error: any) {
    console.error('Get Class By ID Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch class', error: error.message });
  }
};

// ✅ Update Class
export const updateClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(updatedClass);
  } catch (error: any) {
    console.error('Update Class Error:', error.message);
    res.status(500).json({ message: 'Failed to update class', error: error.message });
  }
};

// ✅ Delete Class
export const deleteClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error: any) {
    console.error('Delete Class Error:', error.message);
    res.status(500).json({ message: 'Failed to delete class', error: error.message });
  }
};