import React, { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineWarning, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <AiOutlineCheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AiOutlineWarning className="w-5 h-5 text-red-400" />;
      case 'info':
        return <AiOutlineInfoCircle className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/50';
      case 'error':
        return 'bg-red-500/10 border-red-500/50';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/50';
      default:
        return 'bg-gray-500/10 border-gray-500/50';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-xl ${getBgColor()} ${getTextColor()}`}>
      {getIcon()}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-75 transition-opacity"
      >
        <AiOutlineClose className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
