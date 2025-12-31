import { useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import "./styles/ForgotPassword.css";

function ForgotPassword({ closeModal }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { success, error: showError } = useToast();

  const sendOtp = async () => {
    if (!form.email) {
      const msg = "Email is required";
      setError(msg);
      showError(msg);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/api/auth/forgot-password", {
        email: form.email
      });
      success("OTP sent to your email! ✓");
      setStep(2);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send OTP";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!form.otp) {
      const msg = "OTP is required";
      setError(msg);
      showError(msg);
      return;
    }

    if (!form.newPassword) {
      const msg = "Password is required";
      setError(msg);
      showError(msg);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      const msg = "Passwords do not match";
      setError(msg);
      showError(msg);
      return;
    }

    if (form.newPassword.length < 6) {
      const msg = "Password must be at least 6 characters";
      setError(msg);
      showError(msg);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await api.post("/api/auth/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword
      });
      success("Password reset successful! 🎉");
      closeModal();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to reset password";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setError("");
    setForm({ ...form, otp: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h3>Reset Your Password</h3>
        <p>We'll help you regain access to your account</p>
      </div>

      {error && (
        <div className="forgot-password-error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {step === 1 && (
        <form className="forgot-password-form" onSubmit={(e) => {
          e.preventDefault();
          sendOtp();
        }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-forgot-submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="forgot-password-form" onSubmit={(e) => {
          e.preventDefault();
          resetPassword();
        }}>
          <div className="form-group">
            <label htmlFor="otp">OTP Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP from your email"
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
              disabled={loading}
              maxLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-forgot-submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button type="button" className="btn-forgot-back" onClick={goBack} disabled={loading}>
            ← Back to Email
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
