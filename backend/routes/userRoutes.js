const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users
router.get("/", protect, async (req, res) => {
  const users = await User.find().select("_id name email");
  res.json(users);
});

module.exports = router;