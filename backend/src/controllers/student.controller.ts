import Student from '../models/Student';
import { Request, Response } from 'express';

export const getStudents = async (_req: Request, res: Response) => {
  const students = await Student.find().populate('userId parentId classId');
  res.json(students);
};

export const createStudent = async (req: Request, res: Response) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
  console.log("Student Created:", student);
};