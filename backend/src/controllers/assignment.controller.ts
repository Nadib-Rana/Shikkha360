import { Request, Response } from "express";
import Assignment from "../models/Assignment";

// ➡️ Create Assignment with optional file upload
export const createAssignment = async (req: Request, res: Response) => {
  try {
    // Check if a file was uploaded via multer
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Parse studentIds from string to array (frontend sends JSON string)
    let studentIds: string[] = [];
    if (req.body.studentIds) {
      if (typeof req.body.studentIds === "string") {
        studentIds = JSON.parse(req.body.studentIds); // convert JSON string to array
      } else {
        studentIds = req.body.studentIds; // already an array
      }
    }

    // Create new Assignment document
    const assignment = new Assignment({
      subject: req.body.subject, // Subject ID
      classId: req.body.classId, // Class ID
      studentIds,                // Array of Student IDs
      dueDate: req.body.dueDate, // Assignment due date
      status: req.body.status,   // Assignment status
      fileUrl,                   // Optional file path
    });

    // Save to MongoDB
    await assignment.save();

    // Send back created assignment
    res.status(201).json(assignment);
    console.log("Hit for CreateAssignment", assignment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create assignment", error: err });
  }
};

// ➡️ Get all assignments
export const getAssignments = async (_req: Request, res: Response) => {
  try {
    // Populate subject to show subject details instead of ID
    const assignments = await Assignment.find().populate("subject").sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assignments", error: err });
  }
};

// ➡️ Update an assignment by ID
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    let studentIds: string[] = [];
    if (req.body.studentIds) {
      if (typeof req.body.studentIds === "string") {
        studentIds = JSON.parse(req.body.studentIds);
      } else {
        studentIds = req.body.studentIds;
      }
    }

    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        studentIds, // ensure correct type
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Assignment not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update assignment", error: err });
  }
};

// ➡️ Delete an assignment by ID
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete assignment", error: err });
  }
};
