import React, { useEffect, useState } from 'react';
import successAudio from "../../assets/audio/success.mp3"

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

const toastStyles: Record<string, string> = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300'
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const audio = new Audio(successAudio);
    audio.play();

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed right-4 z-50 px-4 py-2 rounded shadow border transition-all duration-300 ease-in-out flex items-center justify-between gap-4 min-w-[200px] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${toastStyles[type]}`}
      style={{ top: `${4 + Math.random() * 60}px` }}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-lg font-bold text-gray-500 hover:text-red-500 transition"
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;