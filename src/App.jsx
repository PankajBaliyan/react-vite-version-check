import { useEffect, useState } from "react";
import "./App.css";
import UpdateNotification from "./components/UpdateNotification";
import WelcomeMessage from "./components/WelcomeMessage";
import ColorTheme from "./components/ColorTheme";
import NotificationPreferences from "./components/NotificationPreferences";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

const UPDATE_MODE = 0;

function App() {
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVersionAvailable, setNewVersionAvailable] = useState(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch("/version.json?t=" + new Date().getTime());
        const data = await response.json();
        setVersion(data.version);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching version:", error);
        setLoading(false);
      }
    };
    fetchVersion();

    const handleNewVersion = (event) => {
      if (version && event.detail.version !== version) {
        console.log(`New version available: ${version} → ${event.detail.version}`);
        
        if (UPDATE_MODE === 1) {
          import('./utils/checkVersion').then(module => {
            module.forceHardReload();
          });
        } else {
          setNewVersionAvailable(event.detail.version);
        }
      }
    };
    
    document.addEventListener('newVersionAvailable', handleNewVersion);
    
    return () => {
      document.removeEventListener('newVersionAvailable', handleNewVersion);
    };
  }, [version]);

  const handleRefresh = () => {
    import('./utils/checkVersion').then(module => {
      module.forceHardReload();
    });
  };

  const renderVersionSpecificFeatures = () => {
    if (version === "1.0.0") {
      return <WelcomeMessage />;
    } else if (version === "1.0.2") {
      return <ColorTheme />;
    } else if (version === "1.0.3") {
      return <NotificationPreferences />;
    } else if (version === "1.0.5") {
      return <KeyboardShortcuts />;
    }
    return null;
  };

  return (
    <div className="App">
      <div className="version-container">
        <h1>React Vite App</h1>
        {loading ? (
          <p className="version-text">Loading version...</p>
        ) : (
          <>
            <p className="version-text">Current Version: {version || "Unknown"}</p>
            {renderVersionSpecificFeatures()}
          </>
        )}
      </div>

      {newVersionAvailable && (
        <UpdateNotification
          newVersion={newVersionAvailable}
          currentVersion={version}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}

export default App;