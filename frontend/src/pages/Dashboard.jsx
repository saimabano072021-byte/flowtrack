import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";


export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0 });
  const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState("all");
 
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const user = useMemo(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }, []);

  const isAdmin = user?.role === "admin";

  // ✅ FIXED useEffect (IMPORTANT)
  useEffect(() => {
    if (!user?._id) return;

    fetchStats();

    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/tasks");

      let filtered = [];

      if (user?.role === "admin") {
        filtered = data.filter(t => {
          const createdId =
            typeof t.createdBy === "object"
              ? t.createdBy?._id
              : t.createdBy;

          return String(createdId) === String(user._id);
        });
      } else {
        filtered = data.filter(t => {
          const assignedId =
            typeof t.assignedTo === "object"
              ? t.assignedTo?._id
              : t.assignedTo;

          return String(assignedId) === String(user._id);
        });
      }

      const total = filtered.length;

      const inProgress = filtered.filter(
        t => t.status === "in-progress"
      ).length;

      const completed = filtered.filter(
        t => t.status === "done" || t.status === "completed"
      ).length;

      setStats({ total, inProgress, completed });
     
      setTasks(filtered); // 🔥 ADD THIS

    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };
  const filteredTasks =
  filter === "all"
    ? tasks
    : tasks.filter((t) => t.status === filter);

  const handleOpenProjectModal = () => {
    setShowProjectModal(true);
  };

  const createProject = async () => {
    if (!form.name.trim()) {
      alert("Please enter a project name");
      return;
    }

    try {
      await API.post("/projects", {
        name: form.name,
        description: form.description,
      });

      setShowProjectModal(false);

      setForm({
        name: "",
        description: "",
      });

      alert("Project Created ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: "📋",
      className: "total",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: "⏳",
      className: "progress",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: "✅",
      className: "completed",
    },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Dashboard Overview</h2>

          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={handleOpenProjectModal}
            >
              + New Project
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon ${stat.className}`}>
                  {stat.icon}
                </div>
              </div>

              <div className="stat-value">
                {loading ? "..." : stat.value}
              </div>

              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* QUICK ACTION */}
      
<div className="quick-actions-card">
  <h3>Quick Actions</h3>

  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

    {isAdmin && (
      <a href="/tasks" className="btn btn-primary">
        + New Task
      </a>
    )}

    <a href="/tasks" className="btn btn-secondary">
      View Tasks
    </a>

  </div>
</div>

        {/* TASK FILTER */}
<div style={{ display: "flex", gap: "8px", marginTop: 20 }}>
  {["all", "todo", "in-progress", "done"].map((status) => (
    <button
      key={status}
      onClick={() => setFilter(status)}
      className={`filter-btn ${filter === status ? "active" : ""}`}
    >
      {status === "all"
        ? "All Tasks"
        : status === "in-progress"
        ? "In Progress"
        : status === "done"
        ? "Completed"
        : "Todo"}
    </button>
  ))}
</div>

{/* TASK LIST */}
<div className="dashboard-tasks-list">
  {filteredTasks.length === 0 ? (
    <p className="no-tasks-message">No tasks found</p>
  ) : (
    filteredTasks.map((task) => (
      <div key={task._id} className="dashboard-task-card">
        <div className="task-content">
          <h4 className="task-title">{task.title}</h4>
          <p className="task-description">{task.description}</p>
          <div className="task-status">
            Status: <span className={`status-text ${task.status}`}>{task.status}</span>
          </div>

          {task.project && (
            <div className="task-project-section">
              <div className="project-divider"></div>
              <div className="project-info">
                <h5 className="project-name">{task.project?.name}</h5>
                {task.project?.description && (
                  <p className="project-description">{task.project?.description}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {user?.role === "member" && (
          <select
            value={task.status}
            onChange={async (e) => {
              await API.put(`/tasks/${task._id}`, {
                status: e.target.value,
              });
              fetchStats();
            }}
            className="task-status-select"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        )}
      </div>
    ))
  )}
</div>

   

        {/* MODAL */}
        {showProjectModal && (
          <div className="modal">
            <div className="modal-box">

              <h3>Create Project</h3>

              <input
                placeholder="Project Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="modal-actions">
                <button onClick={createProject}>Create</button>

                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    setForm({ name: "", description: "" });
                  }}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}