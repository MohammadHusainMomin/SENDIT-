import { QRCodeCanvas } from "qrcode.react";
import { FiDownload } from "react-icons/fi";
import { useRef } from "react";
import "./styles/QRCodeDisplay.css";

function QRCodeDisplay({ value }) {
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `sendit-qr-code-${value}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="qr-code-container">
      <p className="qr-label">📱 Scan with Camera</p>
      <div className="qr-code-wrapper" ref={qrRef}>
        <QRCodeCanvas
          id="qr-code"
          value={value}
          size={256}
          level="H"
          includeMargin={true}
          backgroundColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <button className="btn-download-qr" onClick={downloadQR}>
        <FiDownload /> Download QR Code
      </button>
    </div>
  );
}

export default QRCodeDisplay;
