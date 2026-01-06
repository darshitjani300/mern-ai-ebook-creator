const express = require("express");
const router = express.Router();
const {
  generateOutline,
  generateChapterContent,
} = require("../controller/aiController.js");
const protect = require("../middleware/authMiddleware.js");

// protect middleware to all route
router.use(protect);

router.post("/generate-outline", generateOutline);
router.post("/generate-chapter-content", generateChapterContent);

module.exports = router;
