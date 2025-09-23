import Teacher from '../models/Teacher';
import { Request, Response } from 'express';

export const getTeachers = async (_req: Request, res: Response) => {
  const teachers = await Teacher.find().populate('userId classIds');
  res.json(teachers);
};

export const createTeacher = async (req: Request, res: Response) => {
  const teacher = await Teacher.create(req.body);
  res.status(201).json(teacher);
  console.log("Teacher Created:", teacher);
};