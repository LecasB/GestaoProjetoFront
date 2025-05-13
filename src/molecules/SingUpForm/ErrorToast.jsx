import { useEffect } from "react";

const toastStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  color: "white",
  padding: "15px 20px",
  borderRadius: "8px",
  zIndex: 9999,
  maxWidth: "300px",
  fontSize: "14px",
};

const messageStyle = {
  boxShadow: "0px 2px 12px rgba(0,0,0,0.2)",
  marginBottom: "8px",
  padding: "6px 10px",
  backgroundColor: "#ff4d4f",
  borderRadius: "4px",
};

const ErrorToast = ({ messages, onClose }) => {
  useEffect(() => {
    if (messages && messages.length > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [messages, onClose]);

  if (!messages || messages.length === 0) return null;

  return (
    <div style={toastStyle}>
      {messages.map((msg, index) => (
        <div key={index} style={messageStyle}>
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ErrorToast;
