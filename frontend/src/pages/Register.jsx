import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">F</div>
            <h1 className="auth-title">Create your FlowTrack account</h1>
            <p className="auth-subtitle">Start managing your work with a professional task system</p>
          </div>

          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            <button 
              className="auth-btn" 
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}