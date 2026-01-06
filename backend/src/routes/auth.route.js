const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateUserProfile,
} = require("../controller/authController.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/me", protect, updateUserProfile);

module.exports = router; 
