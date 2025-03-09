
import { readFileSync, writeFileSync, existsSync } from "fs";
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
  if (!existsSync(versionFilePath)) {
    console.log("version.json doesn't exist, creating it with version 1.0.0");
    writeFileSync(versionFilePath, JSON.stringify({ version: "1.0.0" }, null, 2), "utf8");
    currentVersion = "1.0.0";
  } else {
    const versionData = readFileSync(versionFilePath, "utf8");
    try {
      currentVersion = JSON.parse(versionData).version;
    } catch (parseError) {
      console.error("Error parsing version.json, defaulting to 1.0.0:", parseError);
      currentVersion = "1.0.0";
    }
  }
} catch (error) {
  console.error("Error reading/creating version.json, defaulting to 1.0.0:", error);
  currentVersion = "1.0.0";
}

// Parse version (e.g., "1.0.0" -> [1, 0, 0])
const versionParts = currentVersion.split(".").map(Number);
let [major, minor, patch] = versionParts;

// Increment the patch (minor update)
patch += 1;

// Construct new version
const newVersion = `${major}.${minor}.${patch}`;

// Save new version
try {
  writeFileSync(versionFilePath, JSON.stringify({ version: newVersion }, null, 2), "utf8");
  console.log(`Version updated: ${currentVersion} → ${newVersion}`);
} catch (error) {
  console.error("Error writing version.json:", error);
}
