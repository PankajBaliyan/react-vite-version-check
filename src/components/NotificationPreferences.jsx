import { useState } from 'react';
import './NotificationPreferences.css';

function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    updates: true,
    features: true,
    maintenance: false,
    newsletter: false
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="notification-preferences">
      <h3>🔔 Notification Preferences</h3>
      <div className="preferences-list">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="preference-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleToggle(key)}
              />
              <span className="slider"></span>
            </label>
            <span className="preference-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>
      <p className="preferences-info">
        Your notification preferences are saved automatically
      </p>
    </div>
  );
}

export default NotificationPreferences;