
# React Vite Version Check Application

This application demonstrates a React application built with Vite that checks for version updates and displays content based on the current version. The app automatically increments the version number during each build.

## Problem Statement

When deploying web applications, users often continue to use cached versions of your site, missing important updates. This project solves that problem by:

1. Tracking application versions in a separate JSON file
2. Automatically incrementing the version during builds
3. Forcing version checks on application load with cache-busting techniques
4. Displaying version-specific UI components based on the current version

## Project Structure

- `/public/version.json` - Contains the current application version
- `/scripts/incrementVersion.js` - Script to automatically increment version on build
- `/src/App.jsx` - Main application that checks and displays version information

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Running the Application

```bash
npm run dev
```

The application will be available at port 3000.

### Building for Production

```bash
npm run build
```

This command will:
1. Automatically increment the version in `public/version.json`
2. Build the production-ready application

### Previewing the Production Build

```bash
npm run preview
```

## Key Features

### Version Management

The application uses a separate `version.json` file to track versions, following semantic versioning (MAJOR.MINOR.PATCH). The `incrementVersion.js` script automatically updates the patch version during each build.

### Cache Busting

The application fetches the version file with a timestamp parameter to prevent caching:

```javascript
const response = await fetch('/version.json?t=' + new Date().getTime());
```

### Version-Specific UI

The application displays different UI components based on the current version:
- Version 1.0.0: Initial release message
- Version 1.0.1: Adds a shiny button component
- Version 1.0.2: Adds a colorful background component

## Problem Solving Approach

1. **Version Tracking**: Separated version data into a standalone JSON file that could be updated independently
2. **Build Automation**: Created a script to increment the version number automatically during builds
3. **Cache Prevention**: Added timestamp parameters to fetch requests to ensure fresh version data
4. **Conditional Rendering**: Implemented version-based UI components to demonstrate visible changes

## Conclusion

This project demonstrates a practical approach to version management in React applications. By automating version increments and implementing version-specific UI changes, developers can ensure users always see the latest features while maintaining backward compatibility.

The version checking system is particularly useful for:
- Showing users when new features are available
- Displaying version-specific content
- Troubleshooting issues related to cached content
- Ensuring critical updates are visible to users

This implementation can be extended to include more sophisticated version management, such as prompting users to refresh when new versions are detected or implementing feature flags tied to specific versions.
