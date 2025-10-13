import Teacher from '../models/Teacher';
import User from '../models/User';
import { Request, Response } from 'express';

// GET all teachers
export const getTeachers = async (_req: Request, res: Response) => {
  const teachers = await Teacher.find().populate('userId classIds');
  res.json(teachers);
};

// GET teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  const teacher = await Teacher.findById(req.params.id).populate('userId classIds');
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  res.json(teacher);
};

// CREATE new teacher
export const createTeacher = async (req: Request, res: Response) => {
  const teacher = await Teacher.create(req.body);
  res.status(201).json(teacher);
  console.log("Teacher Created:", teacher);
};

// UPDATE teacher info
export const updateTeacher = async (req: Request, res: Response) => {
  const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Teacher not found' });
  res.json(updated);
};

// DELETE teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  const deleted = await Teacher.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Teacher not found' });
  res.json({ message: 'Teacher deleted' });
};

// TOGGLE status (active/inactive)
export const toggleTeacherStatus = async (req: Request, res: Response) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

  const user = await User.findById(teacher.userId);
  if (!user) return res.status(404).json({ message: 'Linked user not found' });

  user.status = user.status === 'active' ? 'inactive' : 'active';
  await user.save();

  res.json({ message: `Teacher ${user.status === 'active' ? 'activated' : 'suspended'}` });
};

// ASSIGN subjects and classes
export const assignSubjectsAndClasses = async (req: Request, res: Response) => {
  const { subjects, classIds } = req.body;
  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    { $set: { subjects, classIds } },
    { new: true }
  );
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  res.json(teacher);
};