import CodeInput from "../components/CodeInput";
import { DownloadIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";
import { FiDownload, FiUser, FiClock, FiRotateCcw } from "react-icons/fi";
import "../styles/Receive.css";

function Receive() {
  return (
    <div className="receive-container">
      <SEO
        title="Receive Files Online - SendIt Secure Download"
        description="Receive files securely using a 4-digit access code. Download shared files instantly, for free, and with no registration required."
        keywords="receive files online, download files, secure file download, 4-digit code sharing"
        url="https://senditsystem.netlify.app/receive"
      />
      <div className="receive-content">
        <section className="receive-header">
          <div className="header-icon"><FiDownload /></div>
          <h2>Receive File</h2>
          <p>Enter the 4-digit code to download</p>
        </section>

        <section className="receive-form-section">
          <div className="form-illustration">
            <DownloadIllustration />
          </div>
          <CodeInput />
        </section>

        <section className="receive-info">
          <h3>How to Receive</h3>
          <div className="steps">
            <div className="receive-step">
              <div className="step-badge">1</div>
              <h4>Get the Code</h4>
              <p>Ask your friend for the 4-digit access code</p>
            </div>
            <div className="step-divider"></div>
            <div className="receive-step">
              <div className="step-badge">2</div>
              <h4>Enter Code</h4>
              <p>Type the code into the input field below</p>
            </div>
            <div className="step-divider"></div>
            <div className="receive-step">
              <div className="step-badge">3</div>
              <h4>Download</h4>
              <p>Click download and the file will be saved</p>
            </div>
          </div>
        </section>

        <section className="receive-notes">
          <div className="note-item">
            <span className="note-icon"><FiUser /></span>
            <p>Guest access available - no login required</p>
          </div>
          <div className="note-item">
            <span className="note-icon"><FiClock /></span>
            <p>Codes expire based on sender's selected time</p>
          </div>
          <div className="note-item">
            <span className="note-icon"><FiRotateCcw /></span>
            <p>Each code can be used multiple times until expired</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Receive;
