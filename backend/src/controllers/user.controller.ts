import User from '../models/User';
import { Request, Response } from 'express';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
  console.log("User Created:", user);
};