# React Vite Version Check Application

This application demonstrates a React application built with Vite that checks for version updates and notifies users when a new version is available. The app includes theme switching capabilities and welcome notifications.

## Features

- **Version Tracking**: Automatically checks for application updates
- **Update Notifications**: Displays a non-intrusive notification when updates are available
- **Theme Switching**: Supports light and dark themes
- **Welcome Messages**: Displays welcome messages to users

## Project Structure

- `/public/version.json` - Contains the current application version
- `/scripts/incrementVersion.js` - Script to automatically increment version on build
- `/src/App.jsx` - Main application that checks and displays version information
- `/src/components/` - UI components including UpdateNotification, WelcomeMessage, and ThemeSwitcher

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

## Version Management

The application provides two update modes:
- **Mode 0**: Send update notification to users
- **Mode 1**: Auto hard reload when new version is detected

### Cache Busting

The application fetches the version file with a timestamp parameter to prevent caching:

```javascript
const response = await fetch('/version.json?t=' + new Date().getTime());
```

## UI Components

- **UpdateNotification**: Displays a notification when a new version is available
- **WelcomeMessage**: Shows a welcome message to users
- **ColorTheme**: Manages color themes for the application
- **ThemeSwitcher**: Allows users to switch between light and dark themes

## Technologies Used

- React 19
- Vite 6
- ESLint 9