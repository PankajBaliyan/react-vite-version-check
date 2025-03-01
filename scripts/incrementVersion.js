import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const versionFilePath = join(__dirname, "../public/version.json");

// Read current version
let currentVersion;
try {
  const versionData = readFileSync(versionFilePath, "utf8");
  currentVersion = JSON.parse(versionData).version;
} catch (error) {
  console.error("Error reading version.json, defaulting to 1.0.0:", error);
  currentVersion = "1.0.0"; // Default if file doesn’t exist or is invalid
}

// Parse version (e.g., "1.0.0" -> [1, 0, 0])
const versionParts = currentVersion.split(".").map(Number);
let [major, minor, patch] = versionParts;

// Increment the patch (minor update)
patch += 1;

// Construct new version
const newVersion = `${major}.${minor}.${patch}`;

// Write updated version back to version.json
const newVersionData = { version: newVersion };
writeFileSync(versionFilePath, JSON.stringify(newVersionData, null, 2), "utf8");

console.log(`Version updated from ${currentVersion} to ${newVersion}`);
