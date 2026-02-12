import { useEffect, useState } from "react";
import "./styles/CountdownTimer.css";

function CountdownTimer({ expiresInMinutes, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(expiresInMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire && onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire && onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`countdown-container ${isLowTime ? "low-time" : ""}`}>
      <div className="countdown-label">⏰ Expires in:</div>
      <div className="countdown-display">
        {hours > 0 && (
          <>
            <span className="time-unit">{String(hours).padStart(2, "0")}</span>
            <span className="time-separator">:</span>
          </>
        )}
        <span className="time-unit">{String(minutes).padStart(2, "0")}</span>
        <span className="time-separator">:</span>
        <span className="time-unit">{String(seconds).padStart(2, "0")}</span>
      </div>
      {isLowTime && (
        <p className="expire-warning">⚠️ Code expiring soon!</p>
      )}
    </div>
  );
}

export default CountdownTimer;
