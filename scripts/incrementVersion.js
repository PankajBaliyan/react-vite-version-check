import { writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const versionFilePath = join(__dirname, "../public/version.json");

// Get latest Git commit hash
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

// Get current timestamp (YYYYMMDD-HHMMSS)
const now = new Date();
const timestamp = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // YYYYMMDDHHMMSS

// Generate a random 3-digit number (000-999)
const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

// Create unique version string
const newVersion = `${commitHash}-${timestamp}-${randomSuffix}`;

// Save the new version
try {
  writeFileSync(versionFilePath, JSON.stringify({ version: newVersion }, null, 2), "utf8");
  console.log(`Version updated to: ${newVersion}`);
} catch (error) {
  console.error("Error writing version.json:", error);
}
