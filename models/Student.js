import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Frontend wala 'STUD-12345' ID
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" },
  fatherName: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  class: { type: String, required: true },
  rollNo: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);