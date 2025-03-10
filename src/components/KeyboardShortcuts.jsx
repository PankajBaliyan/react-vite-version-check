import { useEffect, useState } from 'react';
import './KeyboardShortcuts.css';

function KeyboardShortcuts() {
  const [activeShortcut, setActiveShortcut] = useState(null);

  const shortcuts = [
    { key: '/', description: 'Quick search' },
    { key: 'N', description: 'New item' },
    { key: 'S', description: 'Save changes' },
    { key: 'Esc', description: 'Close modal' },
    { key: '?', description: 'Show shortcuts' }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const shortcut = shortcuts.find(s => 
        s.key.toLowerCase() === e.key.toLowerCase()
      );
      if (shortcut) {
        setActiveShortcut(shortcut.key);
        setTimeout(() => setActiveShortcut(null), 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="keyboard-shortcuts">
      <h3>⌨️ Keyboard Shortcuts</h3>
      <div className="shortcuts-grid">
        {shortcuts.map(({ key, description }) => (
          <div 
            key={key} 
            className={`shortcut-item ${activeShortcut === key ? 'active' : ''}`}
          >
            <kbd>{key}</kbd>
            <span>{description}</span>
          </div>
        ))}
      </div>
      <p className="shortcuts-tip">
        Try pressing any of these keys to see them highlight!
      </p>
    </div>
  );
}

export default KeyboardShortcuts;