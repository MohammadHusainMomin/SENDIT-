import { useState, useContext } from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { AuthContext } from "../context/AuthContext";
import "./styles/AuthModel.css";
import api from "../services/api";

function AuthModal({ isOpen, closeModal }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (mode === "register" && !form.name) {
      setError("Name is required");
      return;
    }
    if (!form.email) {
      setError("Email is required");
      return;
    }
    if (!form.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url =
        mode === "register"
          ? "/api/auth/register"
          : "/api/auth/login";

      const payload =
        mode === "register"
          ? form
          : { email: form.email, password: form.password };

      const res = await api.post(url, payload);

      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={closeModal}>
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-icon">🔐</div>
          <h3>{mode === "login" ? "Welcome Back" : "Join SENDIT"}</h3>
          <p>
            {mode === "login"
              ? "Sign in to access your files"
              : "Create an account to get started"}
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {error && <div className="error-message">{error}</div>}

          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setError("");
                }}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setError("");
              }}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setError("");
              }}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading
              ? mode === "login"
                ? "Signing In..."
                : "Creating Account..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <GoogleLoginBtn closeModal={closeModal} />

        <div className="auth-toggle">
          <p>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              className="toggle-link"
              onClick={toggleMode}
              disabled={loading}
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

       
      </div>
    </div>
  );
}

export default AuthModal;
