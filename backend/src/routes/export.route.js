const express = require("express");
const {
  exportAsPDF,
  exportAsDocument,
} = require("../controller/exportController.js");
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/:id/pdf", protect, exportAsPDF);
router.get("/:id/doc", protect, exportAsDocument);

module.exports = router;
