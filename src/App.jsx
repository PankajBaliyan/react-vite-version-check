import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the version on mount
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('/version.json?t=' + new Date().getTime());
        const data = await response.json();
        setVersion(data.version);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching version:', error);
        setLoading(false);
      }
    };
    fetchVersion();
  }, []);

  // Version-specific content
  const getVersionContent = () => {
    if (!version) return 'No version detected.';
    switch (version) {
      case '1.0.0':
        return 'Welcome to Version 1.0.0! This is the initial release.';
      case '1.0.1':
        return 'Now on Version 1.0.1! Check out the new feature: a shiny button!';
      case '1.0.2':
        return 'Version 1.0.2 brings a colorful background!';
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
          <p>Current Version: {version || 'Unknown'}</p>
          <p>{getVersionContent()}</p>
          {version === '1.0.1' && <button>Shiny Button</button>}
          {version === '1.0.2' && <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>Colorful Box</div>}
        </>
      )}
      <p>Update public/version.json and wait up to 5 minutes to see the UI update after a hard reload.</p>
    </div>
  );
}

export default App;