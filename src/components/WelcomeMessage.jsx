import { useState } from 'react';
import './WelcomeMessage.css';

function WelcomeMessage() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="welcome-message">
      <div className="welcome-content">
        <h2>👋 Welcome to New Version</h2>
        <p>Thank you for using our application. We're excited to have you here!</p>
        <button className="close-button" onClick={() => setIsVisible(false)}>
          Got it!
        </button>
      </div>
    </div>
  );
}

export default WelcomeMessage;