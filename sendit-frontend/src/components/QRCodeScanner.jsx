import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./styles/QRCodeScanner.css";

function QRCodeScanner({ onScan, onClose }) {
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      "qr-scanner-container",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
      },
      false
    );

    scannerRef.current = scanner;

    const onScanSuccess = (decodedText) => {
      setScanning(false);
      scanner.clear();
      // Extract just the 4-digit code if it's a full URL
      const codeMatch = decodedText.match(/(\d{4})/);
      const code = codeMatch ? codeMatch[1] : decodedText;
      onScan(code);
    };

    const onScanError = (error) => {
      // Silently handle scanning errors
      console.log("QR scan error:", error);
    };

    Promise.resolve(scanner.render(onScanSuccess, onScanError))
      .catch(() => {
        setError(
          "Could not start camera. Please check camera permissions."
        );
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [scanning, onScan]);

  return (
    <div className="qr-scanner-modal">
      <div className="qr-scanner-content">
        <div className="qr-scanner-header">
          <h3>📱 Scan QR Code</h3>
          <button
            className="btn-close-scanner"
            onClick={() => {
              setScanning(false);
              onClose();
            }}
            title="Close scanner"
          >
            ✕
          </button>
        </div>

        {error ? (
          <div className="scanner-error">
            <p>{error}</p>
            <button
              onClick={() => {
                setError("");
                setScanning(true);
              }}
              className="btn-retry-scanner"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div id="qr-scanner-container" className="scanner-container"></div>
            <p className="scanner-hint">
              Position QR code within the frame to scan
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default QRCodeScanner;
