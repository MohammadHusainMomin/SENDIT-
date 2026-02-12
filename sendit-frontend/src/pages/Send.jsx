import FileUpload from "../components/FileUpload";
import { UploadIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";
import { FiUploadCloud, FiZap, FiLock, FiTrash2, FiBox } from "react-icons/fi";
import "../styles/Send.css";

function Send() {
  return (
    <div className="send-container">
      <SEO
        title="Send Files Online - SendIt Secure File Sharing"
        description="Upload and send large files for free online. Get a secure 4-digit code to share your files instantly without links. Fast, secure, and encrypted."
        keywords="send files online, upload files free, secure file sharing, send large files, anonymous file sharing"
        url="https://senditsystem.netlify.app/send"
      />
      <div className="send-content">
        <section className="send-header">
          <div className="header-icon"><FiUploadCloud /></div>
          <h2>Send File</h2>
          <p>Share any file with just a 4-digit code</p>
        </section>

        <section className="send-form-section">
          <div className="form-illustration">
            <UploadIllustration />
          </div>
          <FileUpload />
        </section>

        <section className="send-info">
          <h3>Why Choose SENDIT?</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon"><FiZap /></span>
              <h4>Fast Upload</h4>
              <p>Optimized for speed on any connection</p>
            </div>
            <div className="info-item">
              <span className="info-icon"><FiLock /></span>
              <h4>Secure</h4>
              <p>Code-based access only. No links to share.</p>
            </div>
            <div className="info-item">
              <span className="info-icon"><FiTrash2 /></span>
              <h4>Auto Delete</h4>
              <p>Files automatically deleted after 10 minutes</p>
            </div>
            <div className="info-item">
              <span className="info-icon"><FiBox /></span>
              <h4>Any File Type</h4>
              <p>Images, documents, videos, archives, etc.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Send;
