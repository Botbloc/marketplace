// components/Notification.jsx
"use client";
import { useEffect } from "react";

export default function Notification({ message, visible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <div className={`custom-toast ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
}
