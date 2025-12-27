import { useState } from "react";
import axios from "axios";
import "./styles/FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSend = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        token
          ? "http://localhost:5000/api/send-auth"
          : "http://localhost:5000/api/send",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      setCode(res.data.code);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setCode("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setCode("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="file-upload-container">
      {!code ? (
        <>
          <div className="upload-area">
            <label className="file-input-label">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                className="file-input-hidden"
              />
              <div className="upload-box">
                {file ? (
                  <div className="file-preview">
                    <div className="file-icon">📄</div>
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      className="btn-change-file"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(".file-input-hidden").click();
                      }}
                    >
                      Change File
                    </button>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <div className="upload-icon">☁️</div>
                    <p className="upload-text">
                      Click to select a file or drag and drop
                    </p>
                    <p className="upload-hint">Any file type, up to 500MB</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="btn-send"
            onClick={handleSend}
            disabled={!file || loading}
          >
            <span>🚀</span>
            {loading ? "Uploading..." : "Send File"}
          </button>
        </>
      ) : (
        <div className="code-success-container">
          <div className="success-icon">🎉</div>
          <h3>Woohoo! File Uploaded! 🚀</h3>

          <div className="code-display">
            <p className="code-label">Share this code with your friend:</p>
            <div className="code-box">
              <span className="access-code">{code}</span>
              <button
                className="btn-copy"
                onClick={copyToClipboard}
                title="Copy code"
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>
          </div>

          <div className="expiry-notice">
            <p>⏰ This code will expire in 10 minutes</p>
          </div>

          <div className="button-group">
            <button className="btn-send-another" onClick={handleReset}>
              Send Another File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
