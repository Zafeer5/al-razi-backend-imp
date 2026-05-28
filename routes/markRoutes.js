import express from "express";
import Mark from "../models/Mark.js";

const router = express.Router();

// 1. GET: Saare marks fetch karne ke liye
router.get("/", async (req, res) => {
  try {
    const marks = await Mark.find();
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks", error });
  }
});

// 2. POST: Naye marks add karne ke liye (Single/Bulk)
router.post("/", async (req, res) => {
  try {
    // Check agar array hai toh bulk insert, warna single insert
    if (Array.isArray(req.body)) {
      const savedMarks = await Mark.insertMany(req.body);
      res.status(201).json(savedMarks);
    } else {
      const newMark = new Mark(req.body);
      const savedMark = await newMark.save();
      res.status(201).json(savedMark);
    }
  } catch (error) {
    res.status(400).json({ message: "Error adding marks", error });
  }
});

export default router;