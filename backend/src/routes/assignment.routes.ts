import { Router } from "express";
import multer from "multer";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignment.controller";

const router = Router();

// ========================
// Multer configuration for file uploads
// ========================
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/"); // files will be saved in /uploads folder
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); // unique file name
  },
});
const upload = multer({ storage });

// ========================
// Assignment Routes
// ========================

// GET all assignments
router.get("/", getAssignments); // ✅ pass function reference only

// POST new assignment with optional file
router.post("/", upload.single("file"), createAssignment);

// PUT update assignment by ID
router.put("/:id", upload.single("file"), updateAssignment);

// DELETE assignment by ID
router.delete("/:id", deleteAssignment);

export default router;
