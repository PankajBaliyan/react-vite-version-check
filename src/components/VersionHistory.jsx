
import { useState } from 'react';
import './VersionHistory.css';

function VersionHistory({ currentVersion }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const versionHistory = [
    { 
      version: '1.0.4', 
      date: '2023-11-10', 
      changes: ['Added theme switcher', 'Improved UI responsiveness'] 
    },
    { 
      version: '1.0.3', 
      date: '2023-11-05', 
      changes: ['Added version history', 'Added update notifications'] 
    },
    { 
      version: '1.0.2', 
      date: '2023-11-01', 
      changes: ['Added colorful background component'] 
    },
    { 
      version: '1.0.1', 
      date: '2023-10-28', 
      changes: ['Added shiny button component'] 
    },
    { 
      version: '1.0.0', 
      date: '2023-10-25', 
      changes: ['Initial release'] 
    }
  ];
  
  return (
    <div className="version-history">
      <button 
        className="history-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Version History' : 'Show Version History'}
      </button>
      
      {isOpen && (
        <div className="history-container">
          <h3>Version History</h3>
          <ul className="history-list">
            {versionHistory.map((item) => (
              <li 
                key={item.version} 
                className={`history-item ${item.version === currentVersion ? 'current' : ''}`}
              >
                <div className="version-header">
                  <span className="version-number">v{item.version}</span>
                  <span className="version-date">{item.date}</span>
                </div>
                <ul className="change-list">
                  {item.changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VersionHistory;
