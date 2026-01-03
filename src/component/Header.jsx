import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <header>
        <h2>To-Do List</h2>
        <button onClick={toggleTheme}>
          Switch Theme
        </button>
        <p>{theme === "light" ? "Current Theme: Light" : "Current Theme: Dark"}</p>
        <hr/>
      </header>
    </div>
  );
};
