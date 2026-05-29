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

// 4. DELETE: Single student delete karne ke liye
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: req.params.id });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

// 5. DELETE: Tamam students ko wipe karne ke liye (Database Reset)
router.delete("/", async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: "All students wiped successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error wiping students", error });
  }
});

// 6. PUT: Single student ka data update/edit karne ke liye
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, // Naya data jo frontend bheje ga
      { new: true } // Return updated document
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

export default router;
