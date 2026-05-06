const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      createdBy: req.user._id, // 🔥 IMPORTANT LINE
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks (for user)
exports.getTasks = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin") {
      // Admin → tasks created by them
      query = { createdBy: req.user._id };
    } else {
      // Member → tasks assigned to them
      query = { assignedTo: req.user._id };
    }

    const tasks = await Task.find(query)
      .populate("project", "name description")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status || task.status;

    const updated = await task.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};