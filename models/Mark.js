import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Frontend wala 'MARK-12345' ID
  studentId: { type: String, required: true }, // Jis student ke marks hain
  class: { type: String, required: true },
  subject: { type: String, required: true },
  round: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Mark", markSchema);