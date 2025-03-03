
import { useState, useEffect } from 'react';
import './UpdateNotification.css';

function UpdateNotification({ newVersion, currentVersion, onRefresh }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className={`update-notification ${visible ? 'visible' : ''}`}>
      <div className="update-content">
        <h3>New Version Available!</h3>
        <p>Version {newVersion} is now available. You're currently using {currentVersion}.</p>
        <div className="update-actions">
          <button className="primary-button" onClick={onRefresh}>Update Now</button>
          <button className="secondary-button" onClick={() => setVisible(false)}>Later</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;
