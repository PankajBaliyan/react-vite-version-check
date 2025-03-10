import { useState } from 'react';
import './ColorTheme.css';

function ColorTheme() {
  const [selectedColor, setSelectedColor] = useState('default');

  const colors = {
    default: { primary: '#4f46e5', secondary: '#6366f1' },
    sunset: { primary: '#f97316', secondary: '#fb923c' },
    ocean: { primary: '#0ea5e9', secondary: '#38bdf8' },
    forest: { primary: '#22c55e', secondary: '#4ade80' }
  };

  const handleColorChange = (colorTheme) => {
    setSelectedColor(colorTheme);
    document.documentElement.style.setProperty('--primary-color', colors[colorTheme].primary);
    document.documentElement.style.setProperty('--secondary-color', colors[colorTheme].secondary);
  };

  return (
    <div className="color-theme">
      <h3>Choose Your Theme</h3>
      <div className="color-options">
        {Object.keys(colors).map((colorName) => (
          <button
            key={colorName}
            className={`color-button ${selectedColor === colorName ? 'selected' : ''}`}
            style={{
              background: `linear-gradient(135deg, ${colors[colorName].primary}, ${colors[colorName].secondary})`
            }}
            onClick={() => handleColorChange(colorName)}
          >
            {colorName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorTheme;