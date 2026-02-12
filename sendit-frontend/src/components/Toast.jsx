import { useEffect } from "react";
import { FiCheckCircle, FiX, FiInfo } from "react-icons/fi";
import "./styles/Toast.css";

function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast-notification toast-${type}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === "success" && <FiCheckCircle />}
          {type === "error" && <FiX />}
          {type === "info" && <FiInfo />}
        </div>
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <FiX />
      </button>
    </div>
  );
}

export default Toast;
