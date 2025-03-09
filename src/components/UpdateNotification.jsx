
import { useState, useEffect } from 'react';
import './UpdateNotification.css';

function UpdateNotification({ newVersion, currentVersion, onRefresh }) {
  const [visible, setVisible] = useState(true);
  const [autoUpdateTimer, setAutoUpdateTimer] = useState(null);
  
  // Optional: Add auto-update countdown (uncomment if desired)
  /*
  useEffect(() => {
    if (visible) {
      // Auto-update after 60 seconds
      const countdown = 60;
      setAutoUpdateTimer(countdown);
      
      const timer = setInterval(() => {
        setAutoUpdateTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onRefresh();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [visible, onRefresh]);
  */
  
  return (
    <div className={`update-notification ${visible ? 'visible' : ''}`}>
      <div className="update-content">
        <h3>New Version Available!</h3>
        <p>Version {newVersion} is now available. You're currently using {currentVersion}.</p>
        {autoUpdateTimer && <p className="auto-update-timer">Auto-updating in {autoUpdateTimer} seconds...</p>}
        <div className="update-actions">
          <button className="primary-button" onClick={onRefresh}>Update Now</button>
          <button className="secondary-button" onClick={() => setVisible(false)}>Later</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;
