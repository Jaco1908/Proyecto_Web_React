import React, { useState, useEffect } from 'react';

const ToastNotification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Crear el progreso de la barra
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    // Auto-cerrar después del duration
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Esperar a que termine la animación
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '✅';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': 
        return {
          bg: '#f0fff4',
          border: '#9ae6b4',
          text: '#2d3748',
          progress: '#48bb78'
        };
      case 'error':
        return {
          bg: '#fed7d7',
          border: '#feb2b2',
          text: '#2d3748',
          progress: '#f56565'
        };
      case 'warning':
        return {
          bg: '#fef7e0',
          border: '#fbd38d',
          text: '#2d3748',
          progress: '#ed8936'
        };
      case 'info':
        return {
          bg: '#e6fffa',
          border: '#81e6d9',
          text: '#2d3748',
          progress: '#38b2ac'
        };
      default:
        return {
          bg: '#f0fff4',
          border: '#9ae6b4',
          text: '#2d3748',
          progress: '#48bb78'
        };
    }
  };

  const colors = getColors();

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '15px 20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      minWidth: '320px',
      maxWidth: '400px',
      animation: visible ? 'slideInRight 0.3s ease-out' : 'slideOutRight 0.3s ease-in',
      overflow: 'hidden'
    }}>
      {/* Contenido principal */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '1.5rem' }}>
          {getIcon()}
        </span>
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0,
            color: colors.text,
            fontSize: '0.95rem',
            fontWeight: '500',
            lineHeight: '1.4'
          }}>
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 300);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: colors.text,
            opacity: 0.6,
            padding: '2px',
            borderRadius: '4px',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.6'}
        >
          ✕
        </button>
      </div>

      {/* Barra de progreso */}
      <div style={{
        width: '100%',
        height: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: colors.progress,
          borderRadius: '2px',
          transition: 'width 0.1s linear'
        }} />
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hook para mostrar notificaciones
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remover después del duration + tiempo de animación
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration + 300);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div>
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    ToastContainer,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
  };
};

export default ToastNotification;
