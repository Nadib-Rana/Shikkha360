import { Request, Response } from "express";
import Result from "../models/Result";

/**
 * ➡️ Create a new Result
 */
export const createResult = async (req: Request, res: Response) => {
  try {
    // Create a new Result document using data from request body
    const result = await Result.create(req.body);

    // Respond with the created Result
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create result error:", error.message);
    res.status(500).json({ message: "Failed to create result", error: error.message });
  }
};

/**
 * ➡️ Get all Results
 */
export const getResults = async (_req: Request, res: Response) => {
  try {
    // Fetch all results from DB
    const results = await Result.find().sort({ createdAt: -1 });

    // Respond with results
    res.json(results);
  } catch (error: any) {
    console.error("Get results error:", error.message);
    res.status(500).json({ message: "Failed to fetch results", error: error.message });
  }
};

/**
 * ➡️ Get a single Result by ID
 */
export const getResultById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the Result document by ID
    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Respond with the Result
    res.json(result);
  } catch (error: any) {
    console.error("Get result by ID error:", error.message);
    res.status(500).json({ message: "Server error while fetching result", error: error.message });
  }
};

/**
 * ➡️ Update a Result by ID
 */
export const updateResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update the Result and return the updated document
    const updatedResult = await Result.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document
      runValidators: true, // run schema validators
    });

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(updatedResult);
  } catch (error: any) {
    console.error("Update result error:", error.message);
    res.status(500).json({ message: "Server error while updating result", error: error.message });
  }
};

/**
 * ➡️ Delete a Result by ID
 */
export const deleteResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete the Result document
    const deletedResult = await Result.findByIdAndDelete(id);

    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({ message: "Result deleted successfully" });
  } catch (error: any) {
    console.error("Delete result error:", error.message);
    res.status(500).json({ message: "Server error while deleting result", error: error.message });
  }
};
