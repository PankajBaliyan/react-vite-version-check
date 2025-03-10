import { writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// get the version file path
const versionFilePath = join(__dirname, "../public/version.json");

// Get latest Git commit hash
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

// Save new version
try {
  writeFileSync(versionFilePath, JSON.stringify({ version: commitHash }, null, 2), "utf8");
  console.log(`Version updated to latest commit: ${commitHash}`);
} catch (error) {
  console.error("Error writing version.json:", error);
}
