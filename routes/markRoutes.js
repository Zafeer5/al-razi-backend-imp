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

// 2. POST: Naye marks add karne ke liye (Single/Bulk) - With Upsert Fix
router.post("/", async (req, res) => {
  try {
    // Check agar array hai toh bulk processing hogi
    if (Array.isArray(req.body)) {
      const bulkOps = req.body.map((markData) => ({
        updateOne: {
          filter: { 
            studentId: markData.studentId, 
            subject: markData.subject, 
            round: markData.round 
          },
          update: { $set: markData },
          upsert: true, // Agar nahi mila toh naya insert karega, mil gaya toh update
        },
      }));

      const result = await Mark.bulkWrite(bulkOps);
      res.status(201).json({ message: "Bulk marks processed successfully", result });
    } else {
      // Single entry ke liye Upsert logic
      const { studentId, subject, round } = req.body;

      const savedMark = await Mark.findOneAndUpdate(
        { studentId, subject, round }, // In teen cheezon se check karega ke duplicate hai ya nahi
        req.body,                     // Naya data update karega
        { new: true, upsert: true, runValidators: true } // Upsert option enable kiya
      );

      res.status(201).json(savedMark);
    }
  } catch (error) {
    res.status(400).json({ message: "Error processing marks", error });
  }
});

// 3. DELETE: Single marks entry delete karne ke liye
router.delete("/:id", async (req, res) => {
  try {
    const deletedMark = await Mark.findOneAndDelete({ id: req.params.id });
    if (!deletedMark) {
      return res.status(404).json({ message: "Mark entry not found" });
    }
    res.status(200).json({ message: "Mark entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mark", error });
  }
});

// 4. DELETE: Tamam marks wipe karne ke liye (Database Reset)
router.delete("/", async (req, res) => {
  try {
    await Mark.deleteMany({});
    res.status(200).json({ message: "All marks wiped successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error wiping marks", error });
  }
});

// 5. PUT: Single mark entry update/edit karne ke liye
router.put("/:id", async (req, res) => {
  try {
    const updatedMark = await Mark.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, // Naya data jo frontend bheje ga
      { new: true } // Return updated document
    );
    if (!updatedMark) {
      return res.status(404).json({ message: "Mark entry not found" });
    }
    res.status(200).json(updatedMark);
  } catch (error) {
    res.status(500).json({ message: "Error updating mark", error });
  }
});

export default router;
