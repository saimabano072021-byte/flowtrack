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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>
            Dashboard Overview
          </h2>

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
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-lg)",
            border: "1px solid var(--gray-100)",
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Quick Actions
          </h3>

          <div style={{ display: "flex", gap: 10 }}>
            <a href="/tasks" className="btn btn-primary">
              + New Task
            </a>

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
<div style={{ marginTop: 20 }}>
  {filteredTasks.length === 0 ? (
    <p style={{ color: "#666" }}>No tasks found</p>
  ) : (
    filteredTasks.map((task) => (
      <div
        key={task._id}
        style={{
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 10,
          marginBottom: 12,
          background: "#fff",
        }}
      >
        <h4 style={{ margin: 0 }}>{task.title}</h4>

        <p style={{ margin: "6px 0", color: "#777" }}>
          {task.description}
        </p>

        <div style={{ fontSize: 12 }}>
          Status: <b>{task.status}</b>
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
            style={{ marginTop: 8 }}
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