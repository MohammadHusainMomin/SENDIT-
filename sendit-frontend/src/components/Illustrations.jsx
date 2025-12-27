import "./styles/Illustrations.css";

export function FileTransferIllustration() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="illustration file-transfer"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left file */}
      <g className="file-item file-left">
        <rect x="20" y="60" width="60" height="80" rx="4" fill="#00d4ff" />
        <line x1="30" y1="75" x2="70" y2="75" stroke="#0f1419" strokeWidth="2" />
        <line x1="30" y1="90" x2="70" y2="90" stroke="#0f1419" strokeWidth="2" />
        <line x1="30" y1="105" x2="55" y2="105" stroke="#0f1419" strokeWidth="2" />
      </g>

      {/* Transfer arrow */}
      <g className="transfer-arrow">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#ffa502" />
          </marker>
        </defs>
        <path
          d="M 100 100 Q 150 80 200 100"
          stroke="#ffa502"
          strokeWidth="4"
          fill="none"
          markerEnd="url(#arrowhead)"
          strokeLinecap="round"
        />
      </g>

      {/* Right file */}
      <g className="file-item file-right">
        <rect x="220" y="60" width="60" height="80" rx="4" fill="#ffa502" />
        <line x1="230" y1="75" x2="270" y2="75" stroke="#0f1419" strokeWidth="2" />
        <line x1="230" y1="90" x2="270" y2="90" stroke="#0f1419" strokeWidth="2" />
        <line x1="230" y1="105" x2="255" y2="105" stroke="#0f1419" strokeWidth="2" />
      </g>

      {/* Success sparkles */}
      <circle cx="150" cy="40" r="4" fill="#ffa502" className="sparkle sparkle-1" />
      <circle cx="170" cy="35" r="3" fill="#00d4ff" className="sparkle sparkle-2" />
      <circle cx="130" cy="35" r="3" fill="#00d4ff" className="sparkle sparkle-3" />
    </svg>
  );
}

export function UploadIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="illustration upload-illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud background */}
      <path
        d="M 50 100 Q 40 90 50 80 Q 45 65 60 65 Q 70 50 85 60 Q 95 50 105 65 Q 120 65 120 80 Q 130 85 130 100 Z"
        fill="#00d4ff"
        opacity="0.8"
      />

      {/* Upload arrow */}
      <g className="upload-arrow">
        <line x1="100" y1="110" x2="100" y2="75" stroke="#0f1419" strokeWidth="4" />
        <polygon points="100,65 90,80 110,80" fill="#0f1419" />
      </g>

      {/* File below cloud */}
      <g className="uploading-file">
        <rect x="75" y="120" width="50" height="60" rx="3" fill="#ffa502" />
        <line x1="85" y1="135" x2="115" y2="135" stroke="#0f1419" strokeWidth="2" />
        <line x1="85" y1="150" x2="115" y2="150" stroke="#0f1419" strokeWidth="2" />
      </g>

      {/* Progress dots */}
      <circle cx="85" cy="30" r="3" fill="#00d4ff" className="progress-dot" />
      <circle cx="100" cy="25" r="3" fill="#00d4ff" className="progress-dot" />
      <circle cx="115" cy="30" r="3" fill="#00d4ff" className="progress-dot" />
    </svg>
  );
}

export function DownloadIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="illustration download-illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud background */}
      <path
        d="M 50 50 Q 40 40 50 30 Q 45 15 60 15 Q 70 0 85 10 Q 95 0 105 15 Q 120 15 120 30 Q 130 35 130 50 Z"
        fill="#00d4ff"
        opacity="0.8"
      />

      {/* Download arrow */}
      <g className="download-arrow">
        <line x1="100" y1="65" x2="100" y2="130" stroke="#0f1419" strokeWidth="4" />
        <polygon points="100,140 90,125 110,125" fill="#0f1419" />
      </g>

      {/* File below */}
      <g className="downloading-file">
        <rect x="75" y="145" width="50" height="60" rx="3" fill="#ffa502" />
        <line x1="85" y1="160" x2="115" y2="160" stroke="#0f1419" strokeWidth="2" />
        <line x1="85" y1="175" x2="115" y2="175" stroke="#0f1419" strokeWidth="2" />
      </g>

      {/* Checkmark */}
      <circle cx="35" cy="170" r="20" fill="none" stroke="#00d4ff" strokeWidth="2" />
      <path d="M 30 170 L 35 175 L 45 165" stroke="#00d4ff" strokeWidth="3" fill="none" />
    </svg>
  );
}

export function CodeIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="illustration code-illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Code box */}
      <rect x="30" y="40" width="140" height="120" rx="8" fill="#16202f" stroke="#2a3647" strokeWidth="2" />

      {/* Code lines */}
      <line x1="45" y1="60" x2="175" y2="60" stroke="#00d4ff" strokeWidth="3" />
      <line x1="45" y1="80" x2="155" y2="80" stroke="#ffa502" strokeWidth="3" />
      <line x1="45" y1="100" x2="170" y2="100" stroke="#00d4ff" strokeWidth="3" />
      <line x1="45" y1="120" x2="140" y2="120" stroke="#ffa502" strokeWidth="3" />
      <line x1="45" y1="140" x2="165" y2="140" stroke="#00d4ff" strokeWidth="3" />

      {/* Cursor blink */}
      <rect x="175" y="50" width="4" height="100" fill="#00d4ff" className="cursor-blink" />
    </svg>
  );
}

export function SecurityIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="illustration security-illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield */}
      <path
        d="M 100 30 L 60 50 L 60 100 Q 100 140 100 140 Q 100 140 140 100 L 140 50 Z"
        fill="#00d4ff"
        stroke="#00bce6"
        strokeWidth="2"
      />

      {/* Padlock */}
      <rect x="85" y="75" width="30" height="35" rx="2" fill="none" stroke="#0f1419" strokeWidth="2" />
      <path
        d="M 90 75 Q 90 65 100 65 Q 110 65 110 75"
        fill="none"
        stroke="#0f1419"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Keyhole */}
      <circle cx="100" cy="85" r="3" fill="#0f1419" />

      {/* Check mark */}
      <path
        d="M 95 95 L 100 100 L 110 90"
        stroke="#ffa502"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        className="checkmark-animation"
      />
    </svg>
  );
}
