import React, { useEffect, useState } from 'react';

const Notification = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div style={styles.popup}>
      {message}
    </div>
  );
};

const styles = {
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    fontFamily: 'sans-serif',
  }
};

export default Notification;
