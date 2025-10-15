import Subject from "../models/Subject";
import { Request, Response } from "express";

// Create Subject
export const createSubject = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
    console.log("Subject added:", subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};

// Get All Subjects
export const getAllSubjects = async (req: Request, res: Response) => {
 console.log("Get All Subjects");
  
    try {
    const subjects = await Subject.find()
    .populate("assignedTeacherIds", "name email");
    
    res.status(200).json(subjects);
    console.log("All Subjects:", subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// Get Subject by ID
export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id).populate("assignedTeacherIds", "name email");
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.status(200).json(subject);
    console.log("Subject:", subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

// Update Subject
export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Subject not found" });
    res.status(200).json(updated);
    console.log("Subject updated:", updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

// Delete Subject
export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Subject.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Subject not found" });
    res.status(200).json({ message: "Subject deleted successfully" });
    console.log("Subject deleted:", deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};