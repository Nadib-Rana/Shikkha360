import { Request, Response } from "express";
import Exam from "../models/Exam";
import Student from "../models/Student";
import Teacher from "../models/Teacher";

// ----------------- GET Exams -----------------
export const getExams = async (req: Request, res: Response) => {
  try {
    console.log("hit for get Exam");
    const user = (req as any).user;
    let filter: any = {};

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (user.role === "admin") filter = {};
    else if (user.role === "student") {
      const student = await Student.findOne({ userId: user.id });
      if (!student) return res.status(404).json({ message: "Student profile not found" });
      filter = { classId: student.classId };
    } else if (user.role === "teacher") {
      const teacher = await Teacher.findOne({ userId: user.id });
      if (!teacher) return res.status(404).json({ message: "Teacher profile not found" });
      filter = { classId: { $in: teacher.classIds } };
    } else if (user.role === "parent") {
      const student = await Student.findOne({ parentId: user.id });
      if (!student) return res.status(404).json({ message: "No linked student found" });
      filter = { classId: student.classId };
    }

    const exams = await Exam.find(filter)
      .populate("classId", "gradeLevel section")
      .populate("subjectId", "name code")
      .populate("createdBy", "name role");

    res.status(200).json(exams);
  } catch (err: any) {
    console.error("Get exams error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ----------------- GET Exam BY ID -----------------
export const getExamById = async (req: Request, res: Response) => {
  try {
    console.log("hit for get Exam by Id");
    console.log("User->")
    const user = (req as any).user;
    const { id } = req.params;
    console.log(user ,"for get data");

    const exam = await Exam.findById(id)
      .populate("classId", "gradeLevel section")
      .populate("subjectId", "name code")
      .populate("createdBy", "name role");

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Role-based access check
    if (user.role === "admin") {
      return res.status(200).json(exam);
    } else if (user.role === "student") {
      const student = await Student.findOne({ userId: user.id });
      if (!student || student.classId.toString() !== exam.classId._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }
    } else if (user.role === "teacher") {
      const teacher = await Teacher.findOne({ userId: user.id });
      if (!teacher || !teacher.classIds.some(cid => cid.toString() === exam.classId._id.toString())) {
        return res.status(403).json({ message: "Access denied" });
      }
    } else if (user.role === "parent") {
      const student = await Student.findOne({ parentId: user.id });
      if (!student || student.classId.toString() !== exam.classId._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.status(200).json(exam);
  } catch (err: any) {
    console.error("Get exam by ID error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ----------------- CREATE Exam -----------------
export const createExam = async (req: Request, res: Response) => {
  try {
    console.log("hit for Create Exam");
    const user = (req as any).user;
    if (!user || !["admin", "teacher"].includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const exam = await Exam.create({ ...req.body, createdBy: user.id });
    res.status(201).json(exam);
  } catch (err: any) {
    console.error("Create Exam Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ----------------- UPDATE Exam -----------------
export const updateExam = async (req: Request, res: Response) => {
  try {
    console.log("hit for Update Exam");
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update exam" });
    }

    const { id } = req.params;
    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedExam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json(updatedExam);
  } catch (err: any) {
    console.error("Update Exam Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ----------------- DELETE Exam -----------------
export const deleteExam = async (req: Request, res: Response) => {
  try {
    console.log("hit for delete");
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete exam" });
    }

    const { id } = req.params;
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json({ message: "Exam deleted successfully", exam: deletedExam });
  } catch (err: any) {
    console.error("Delete Exam Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
