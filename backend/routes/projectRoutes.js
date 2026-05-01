const express = require("express");
const { createProject, getProjects } = require("../controllers/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createProject);
router.get("/", protect, getProjects);

module.exports = router;