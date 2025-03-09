
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const versionFilePath = join(__dirname, "../public/version.json");

// Check if CI environment
const isCI = process.env.CI === 'true';

// Create version file if it doesn't exist
if (!existsSync(versionFilePath)) {
  console.log("version.json doesn't exist, creating it with version 1.0.0");
  writeFileSync(versionFilePath, JSON.stringify({ version: "1.0.0" }, null, 2), "utf8");
}

// If running in CI environment, make sure version.json exists and is included in build
if (isCI) {
  console.log("Running in CI environment, ensuring version.json is prepared for deployment");
  
  // Read current version from version.json
  try {
    const versionData = readFileSync(versionFilePath, "utf8");
    const currentVersion = JSON.parse(versionData).version;
    console.log(`Current version detected for CI deployment: ${currentVersion}`);
    
    // Ensure version.json is updated as part of the build
    console.log("Version file is prepared for deployment");
  } catch (error) {
    console.error("Error reading version.json in CI environment:", error);
    process.exit(1);
  }
}
