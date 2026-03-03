const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    // ZodError gives err.issues
    const details = err.issues?.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      message: "Validation error",
      errors: details || [],
    });
  }
};

module.exports = validate;