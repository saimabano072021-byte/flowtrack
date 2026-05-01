const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route (any logged-in user)
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user,
  });
});

// Admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

module.exports = router;