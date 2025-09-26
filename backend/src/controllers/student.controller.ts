import Student from '../models/Student';
import { Request, Response } from 'express';

// ✅ Create Student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    console.log('Student Created:', student);
    res.status(201).json(student);
  } catch (error: any) {
    console.error('Create Student Error:', error.message);
    res.status(500).json({ message: 'Failed to create student', error: error.message });
  }
};

// ✅ Get All Students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await Student.find().populate('userId parentId classId');
    res.json(students);
  } catch (error: any) {
    console.error('Get Students Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

// ✅ Get Student by ID
export const getStudentById = async (req: Request, res: Response) => {
  console.log("Hit for get studet")
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate('userId parentId classId');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error: any) {
    console.error('Get Student By ID Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch student', error: error.message });
  }
};

// ✅ Update Student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error: any) {
    console.error('Update Student Error:', error.message);
    res.status(500).json({ message: 'Failed to update student', error: error.message });
  }
};

// ✅ Delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    console.error('Delete Student Error:', error.message);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};