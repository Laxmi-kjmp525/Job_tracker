const { z } = require("zod");

// Auth
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// Jobs
const jobCreateSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]).optional(),
  notes: z.string().optional(),
  dateApplied: z.string().datetime().optional(),
});

const jobUpdateSchema = z.object({
  company: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]).optional(),
  notes: z.string().optional().nullable(),
  dateApplied: z.string().datetime().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  jobCreateSchema,
  jobUpdateSchema,
};