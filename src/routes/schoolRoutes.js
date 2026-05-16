const express = require("express");
const { createSchool, getSchools } = require("../controllers/schoolController");
const {
  addSchoolRules,
  listSchoolsRules,
  handleValidationErrors,
} = require("../middleware/validateSchool");

const router = express.Router();

router.post("/addSchool", addSchoolRules, handleValidationErrors, createSchool);
router.get(
  "/listSchools",
  listSchoolsRules,
  handleValidationErrors,
  getSchools,
);

module.exports = router;
