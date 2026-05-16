const { body, query, validationResult } = require("express-validator");

const addSchoolRules = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("address").trim().notEmpty().withMessage("address is required"),
  body("latitude")
    .notEmpty()
    .withMessage("latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid number between -90 and 90"),
  body("longitude")
    .notEmpty()
    .withMessage("longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid number between -180 and 180"),
];

const listSchoolsRules = [
  query("latitude")
    .notEmpty()
    .withMessage("latitude query parameter is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("latitude must be a valid number between -90 and 90"),
  query("longitude")
    .notEmpty()
    .withMessage("longitude query parameter is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("longitude must be a valid number between -180 and 180"),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  return next();
}

module.exports = {
  addSchoolRules,
  listSchoolsRules,
  handleValidationErrors,
};
