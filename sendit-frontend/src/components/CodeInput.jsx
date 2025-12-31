import { useState } from "react";
import "./styles/CodeInput.css";
import api from "../services/api";

function CodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    if (code.length !== 4) {
      setError("Please enter a valid 4-digit code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to receive file");
        return;
      }

      const response = await api.post(
        "/api/receive",
        { code },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const disposition = response.headers["content-disposition"];
      let fileName = "downloaded-file";

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      // Create blob with correct MIME type
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setCode("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Invalid code or file expired. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCode(value);
    setError("");
  };

  return (
    <div className="code-input-container">
      <div className="code-input-wrapper">
        <label htmlFor="access-code" className="code-label">
          Access Code
        </label>
        <input
          id="access-code"
          type="text"
          inputMode="numeric"
          placeholder="0000"
          value={code}
          onChange={handleCodeChange}
          disabled={loading}
          maxLength="4"
          className="code-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">✓ File downloaded successfully!</div>
      )}

      <button
        className="btn-download"
        onClick={handleDownload}
        disabled={code.length !== 4 || loading}
      >
        <span>📥</span>
        {loading ? "Downloading..." : "Download File"}
      </button>

      <div className="code-info">
        <p>Enter the 4-digit code your friend sent you</p>
      </div>
    </div>
  );
}

export default CodeInput;
