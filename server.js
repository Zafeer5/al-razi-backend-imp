import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routes import karein
import studentRoutes from "./routes/studentRoutes.js";
import markRoutes from "./routes/markRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Jab frontend live hoga, hum wo link environment variable mein daalenge
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Database Connected Successfully!");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error: ", error);
  });

// API Routes ko Link karein
app.use("/api/students", studentRoutes);
app.use("/api/marks", markRoutes);

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Al Razi Academy Backend APIs are Live!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});