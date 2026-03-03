const router = require("express").Router();
const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobStats,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const validate = require("../middleware/validate");
const {
  jobCreateSchema,
  jobUpdateSchema,
} = require("../validators/schemas");

router.use(protect);

// Stats route
router.get("/stats", getJobStats);

// Create Job (validated)
router.post("/", validate(jobCreateSchema), createJob);

// Get Jobs (pagination/filter/search)
router.get("/", getJobs);

// Update Job (validated)
router.put("/:id", validate(jobUpdateSchema), updateJob);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;