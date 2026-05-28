import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// 1. GET: Saare students database se fetch karne ke liye
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// 2. POST: Naya single student add karne ke liye
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
});

// 3. POST: Bulk excel students add karne ke liye
router.post("/bulk", async (req, res) => {
  try {
    const savedStudents = await Student.insertMany(req.body);
    res.status(201).json(savedStudents);
  } catch (error) {
    res.status(400).json({ message: "Error adding bulk students", error });
  }
});

export default router;