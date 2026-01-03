import React from 'react'
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();
  return (
    
    <div className={`App ${theme}`}>
      <hr/>
      <p>Thank you for using To-Do List</p>
    </div>
  )
}
