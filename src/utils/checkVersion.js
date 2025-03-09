
const VERSION_CHECK_INTERVAL = 10 * 1000; // Check every 10 seconds
let currentVersion = null;

export const startVersionCheck = (onNewVersion) => {
  fetchVersion().then((version) => {
    currentVersion = version;
  });

  setInterval(async () => {
    const newVersion = await fetchVersion();
    if (currentVersion && newVersion !== currentVersion) {
      console.log(`New version detected: ${currentVersion} → ${newVersion}`);
      // Call callback if provided (for notification)
      if (onNewVersion) {
        onNewVersion(newVersion);
      }
    }
    currentVersion = newVersion;
  }, VERSION_CHECK_INTERVAL);
};

export const fetchVersion = async () => {
  try {
    // Add cache-busting timestamp
    const response = await fetch(`/version.json?t=${new Date().getTime()}`);
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error("Failed to fetch version:", error);
    return currentVersion;
  }
};

export const forceHardReload = () => {
  // Clear all caches and local storage
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Clear localStorage
  localStorage.clear();
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  // Hard reload to get completely fresh app
  window.location.reload(true);
};
