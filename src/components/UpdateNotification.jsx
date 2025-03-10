import { useState, useEffect } from 'react';
import './UpdateNotification.css';

function UpdateNotification({ newVersion, currentVersion, onRefresh }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Small delay before showing the notification for a smooth entrance
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = () => {
    setVisible(false);
    // Small delay before refresh to allow animation to complete
    setTimeout(onRefresh, 400);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <div className={`update-notification ${visible ? 'visible' : ''}`}>
      <div className="update-content">
        <h3>New Version Available</h3>
        <p>Version {newVersion} is ready to install. You're currently on {currentVersion}.</p>
        <div className="update-actions">
          <button className="primary-button" onClick={handleUpdate}>
            Update Now
          </button>
          <button className="secondary-button" onClick={handleDismiss}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;