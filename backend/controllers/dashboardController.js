const Task = require("../models/Task");

// Get Dashboard Stats
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total tasks
    const totalTasks = await Task.countDocuments({
      assignedTo: userId,
    });

    // Status counts
    const todo = await Task.countDocuments({
      assignedTo: userId,
      status: "todo",
    });

    const inProgress = await Task.countDocuments({
      assignedTo: userId,
      status: "in-progress",
    });

    const done = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });

    // Overdue tasks
    const overdue = await Task.find({
      assignedTo: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    res.json({
      totalTasks,
      status: {
        todo,
        inProgress,
        done,
      },
      overdueTasks: overdue.length,
      overdueList: overdue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};