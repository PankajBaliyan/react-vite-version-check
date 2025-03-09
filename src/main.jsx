
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { startVersionCheck } from './utils/checkVersion';

// We'll pass newVersion notifications to App component via a global event
window.addEventListener('newVersionAvailable', (e) => {
  const event = new CustomEvent('newVersionAvailable', { 
    detail: { version: e.detail.version } 
  });
  document.dispatchEvent(event);
});

// Start version check with callback to trigger notification
startVersionCheck((newVersion) => {
  window.dispatchEvent(new CustomEvent('newVersionAvailable', { 
    detail: { version: newVersion } 
  }));
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
