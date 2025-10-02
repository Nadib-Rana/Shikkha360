import User from '../models/User';
import { Request, Response } from 'express';

// 🟢 Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔵 Get single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟡 Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    console.log('User Created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Invalid data or duplicate email' });
  }
};

// 🟠 Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
    console.log('User Updated:', user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Invalid update data' });
  }
};

// 🔴 Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
    console.log('User Deleted:', user);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};