import { useState } from 'react';
import { FaApple, FaWindows } from 'react-icons/fa';
import styles from './Keybinds.module.css';

const KeyButton = ({ children }) => {
  return (
    <span className={styles.keyButton}>
      {children}
    </span>
  );
};

const Keybinds = () => {
  const [isMac, setIsMac] = useState(true);

  const keybinds = [
    { name: 'Toggle Visibility', keys: ['Cmd', 'B'] },
    { name: 'Move window around the screen', keys: ['Cmd', 'Arrow Keys'] },
    { name: 'Take screenshot', keys: ['Cmd', 'H'] },
    { name: 'Get answer from screenshot', keys: ['Cmd', 'Enter'] },
    { name: 'Reset', keys: ['Cmd', 'R'] },
    { name: 'Quit', keys: ['Cmd', 'Q'] }
  ];

  const renderKeys = (keys) => {
    return (
      <div className={styles.keyGroup}>
        {keys.map((key, index) => (
          <span key={index} className={styles.keyWrapper}>
            <KeyButton>
              {key === 'Cmd' ? (isMac ? 'Cmd' : 'Ctrl') : key}
            </KeyButton>
            {index < keys.length - 1 && <span className={styles.plus}>+</span>}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="keybinds" className={styles.container}>
      <div className={styles.platformToggle}>
        <button 
          className={`${styles.toggleButton} ${isMac ? styles.active : ''}`}
          onClick={() => setIsMac(true)}
          title="Mac"
        >
          <FaApple />
        </button>
        <button 
          className={`${styles.toggleButton} ${!isMac ? styles.active : ''}`}
          onClick={() => setIsMac(false)}
          title="Windows"
        >
          <FaWindows />
        </button>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>Keyboard Shortcuts</h2>
        <p className={styles.subtitle}>Master your workflow with these essential shortcuts</p>
      </div>
      
      <div className={styles.keybindsList}>
        {keybinds.map((keybind, index) => (
          <div key={index} className={styles.keybindRow}>
            <span className={styles.keybindName}>{keybind.name}</span>
            <div className={styles.keybindKeys}>
              {renderKeys(keybind.keys)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Keybinds;
