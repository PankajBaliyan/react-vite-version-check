// Version checking utility

// Configurable version check interval (default 10 seconds)
const VERSION_CHECK_INTERVAL = 10000; // 10 seconds
let lastCheckedVersion = null;

// Check for version updates every interval
export const startVersionCheck = (callback) => {
  // Initial check
  checkVersion(callback);

  // Set interval for periodic checks
  setInterval(() => {
    checkVersion(callback);
  }, VERSION_CHECK_INTERVAL);
};

// Check if a new version is available
const checkVersion = async (callback) => {
  try {
    // Add timestamp to bust cache
    const response = await fetch(`/version.json?t=${new Date().getTime()}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("newVersion", data.version);

    // Only call the callback if we have a version and it's different from last time
    if (data && data.version) {
      // If this is the first check or the version changed
      if (lastCheckedVersion === null || data.version !== lastCheckedVersion) {
        callback(data.version);
        lastCheckedVersion = data.version;
      }
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
};

// Force a hard reload to clear cache and get the latest version
export const forceHardReload = () => {
  // Clear cache by removing all cached resources
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }

  // Clear local storage
  localStorage.clear();

  // Clear session storage
  sessionStorage.clear();

  // Force reload the page
  window.location.reload(true);
};