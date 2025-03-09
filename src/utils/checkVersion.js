// Version checking utility

// Check for version updates every 10 seconds
export const startVersionCheck = (callback) => {
  // Initial check
  checkVersion(callback);

  // Set interval for periodic checks
  setInterval(() => {
    checkVersion(callback);
  }, 10000); // 10 seconds
};

// Check if a new version is available
const checkVersion = async (callback) => {
  try {
    // Add timestamp to bust cache
    const response = await fetch(`/version.json?t=${new Date().getTime()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("newVersion", data.version);

    if (data && data.version) {
      callback(data.version);
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