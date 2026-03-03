const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Job Tracker API is running (PostgreSQL)...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Global error handler (good practice)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

module.exports = app;