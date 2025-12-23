import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-xl mb-4 flex items-center justify-between min-w-[320px] max-w-[500px] animate-slide-in border-l-4 ${
      type === 'success' ? 'border-green-700' :
      type === 'error' ? 'border-red-700' :
      type === 'warning' ? 'border-yellow-700' :
      'border-blue-700'
    }`}>
      <div className="flex items-center flex-1">
        <span className="text-2xl mr-3 font-bold">{icons[type]}</span>
        <p className="font-medium text-sm leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none transition-colors"
        aria-label="Close"
      >
        <span className="text-xl font-bold">&times;</span>
      </button>
    </div>
  );
};

export default Toast;

