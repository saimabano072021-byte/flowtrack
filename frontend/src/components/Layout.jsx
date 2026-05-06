import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/tasks", label: "Tasks", icon: "✅" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">F</div>
            <span className="logo-text">FlowTrack</span>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            title="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {user && (
            <div className="user-info">
              <div className="user-avatar">{getInitials(user.name)}</div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <button className="logout-btn" onClick={logout} title="Logout">
                🚪
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Header */}
        <div className="page-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="page-title">FlowTrack</h1>
          <div style={{ width: 40 }}></div>
        </div>
        
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}