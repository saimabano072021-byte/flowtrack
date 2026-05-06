import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "", // 🔥 ADDED
  });

  const user = useMemo(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

    setTasks(data);

     
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");

      const filtered = data.filter(p =>
        p.createdBy === user?._id ||
        (p.members && p.members.includes(user?._id))
      );

      setProjects(filtered);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  // 🔥 FETCH USERS (ADDED)
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenTaskModal = async () => {
    setShowModal(true);
    await fetchProjects();
    await fetchUsers(); // 🔥 ADDED
  };

  useEffect(() => {
    fetchTasks();

    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const createTask = async () => {
    if (!form.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (!form.project) {
      alert("Please select a project");
      return;
    }
    if (!form.assignedTo) { // 🔥 ADDED
      alert("Please select a member");
      return;
    }

    try {
      await API.post("/tasks", {
        title: form.title,
        description: form.description,
        project: form.project,
        assignedTo: form.assignedTo, // 🔥 FIXED
      });

      setShowModal(false);
      setForm({ title: "", description: "", project: "", assignedTo: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter(task => task.status === filter);
  }, [tasks, filter]);

  const getStatusBadgeClass = (status) => {
    if (status === "done" || status === "completed") return "status-badge completed";
    if (status === "in-progress") return "status-badge in-progress";
    return "status-badge todo";
  };

  const formatStatus = (status) => status?.replace("-", " ") || "";

  return (
    <Layout>
      <div className="animate-fade-in">

        <div className="tasks-header">
          <h2 className="tasks-title">My Tasks</h2>

          {user?.role === "admin" && (
            <button className="add-task-btn" onClick={handleOpenTaskModal}>
              + New Task
            </button>
          )}
        </div>

        <div className="task-filter-bar">
          {['all', 'todo', 'in-progress', 'done'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`filter-btn ${filter === status ? "active" : ""}`}
            >
              {status === 'all'
                ? 'All Tasks'
                : status === 'done'
                ? 'Completed'
                : formatStatus(status)}
            </button>
          ))}
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : filteredTasks.length === 0 ? (
          <div>No tasks found</div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <span className={getStatusBadgeClass(task.status)}>
                  {formatStatus(task.status)}
                </span>

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

                {user?.role === "member" && (
                  <select
                    className="task-status-select"
                    value={task.status}
                    onChange={async (e) => {
                      await API.patch(`/tasks/${task._id}`, {
                        status: e.target.value,
                      });
                      fetchTasks();
                    }}
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-box">

              <h3>Create Task</h3>

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <select
                className="form-input"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>

              {/* 🔥 ONLY ADDITION */}
              <select
                className="form-input"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({ ...form, assignedTo: e.target.value })
                }
              >
                <option value="">Assign To</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <div className="modal-actions">
                <button onClick={createTask}>Create</button>
                <button onClick={() => {
                  setShowModal(false);
                  setForm({ title: "", description: "", project: "", assignedTo: "" });
                }}>Cancel</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}