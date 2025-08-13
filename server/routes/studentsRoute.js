import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/StudentController.js";

const router = express.Router();

// Create a new student
router.post("/create", createStudent);

// Get all students
router.get("/students", getStudents);

// Delete a student by ID
router.delete("/delete/:id", deleteStudent);

// Update a student by ID
router.put("/update/:id", updateStudent);

export default router;
