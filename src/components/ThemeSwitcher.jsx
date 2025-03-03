
import { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="theme-switcher">
      <span className="theme-label">Theme:</span>
      <button 
        onClick={toggleTheme} 
        className={`theme-button ${theme === 'light' ? 'light' : 'dark'}`}
      >
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
