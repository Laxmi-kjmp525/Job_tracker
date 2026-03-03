const router = require("express").Router();

const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/schemas");

// Register with validation
router.post("/register", validate(registerSchema), register);

// Login with validation
router.post("/login", validate(loginSchema), login);

module.exports = router;