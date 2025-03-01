// const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes
const VERSION_CHECK_INTERVAL = 15 * 1000; // Check every 10 seconds
let currentVersion = null;

export const startVersionCheck = () => {
  fetchVersion().then((version) => {
    currentVersion = version;
  });

  setInterval(async () => {
    const newVersion = await fetchVersion();
    console.log("newVersion", newVersion);
    if (currentVersion && newVersion !== currentVersion) {
      console.log("New version detected, forcing reload...");
      forceHardReload();
    }
    currentVersion = newVersion;
  }, VERSION_CHECK_INTERVAL);
};

const fetchVersion = async () => {
  try {
    const response = await fetch("/version.json?t=" + new Date().getTime());
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error("Failed to fetch version:", error);
    return currentVersion;
  }
};

const forceHardReload = () => {
  window.location.reload(true);
};
