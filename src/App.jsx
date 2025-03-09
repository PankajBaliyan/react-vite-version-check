import { useEffect, useState } from "react";
import "./App.css";
import UpdateNotification from "./components/UpdateNotification";
import ThemeSwitcher from "./components/ThemeSwitcher";
import VersionHistory from "./components/VersionHistory";

function App() {
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVersionAvailable, setNewVersionAvailable] = useState(null);

  // Fetch the version on mount
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

    // Listen for version updates from the global version checker
    const handleNewVersion = (event) => {
      if (version && event.detail.version !== version) {
        console.log(`New version available: ${version} → ${event.detail.version}`);
        setNewVersionAvailable(event.detail.version);
      }
    };
    
    document.addEventListener('newVersionAvailable', handleNewVersion);
    
    return () => {
      document.removeEventListener('newVersionAvailable', handleNewVersion);
    };
  }, [version]);

  const handleRefresh = () => {
    // Import and use the improved forceHardReload function
    import('./utils/checkVersion').then(module => {
      module.forceHardReload();
    });
  };

  // Version-specific content
  const getVersionContent = () => {
    if (!version) return "No version detected.";
    switch (version) {
      case "1.0.0":
        return "Welcome to Version 1.0.0! This is the initial release.";
      case "1.0.1":
        return "Now on Version 1.0.1! Check out the new feature: a shiny button!";
      case "1.0.2":
        return "Version 1.0.2 brings a colorful background!";
      case "1.0.3":
        return "Version 1.0.3 adds version history and update notifications!";
      case "1.0.4":
        return "Version 1.0.4 introduces a beautiful theme switcher!";
      default:
        return `Running on Version ${version}. Update public/version.json to see changes!`;
    }
  };

  return (
    <div className="App">
      <h1>React Vite App with Auto Reload</h1>
      {loading ? (
        <p>Loading version...</p>
      ) : (
        <>
          <p>Current Version: {version || "Unknown"}</p>
          <p>{getVersionContent()}</p>
          {version === "1.0.1" && (
            <button className="feature-button">Shiny Button</button>
          )}
          {version === "1.0.2" && (
            <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
              Colorful Box
            </div>
          )}
          {version === "1.0.4" && <ThemeSwitcher />}

          <VersionHistory currentVersion={version} />
        </>
      )}
      <p>Update public/version.json to see the UI update with new features.</p>

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
