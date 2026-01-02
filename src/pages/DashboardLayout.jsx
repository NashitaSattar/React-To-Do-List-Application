import React from 'react'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import "../styles/DashBoardLayout.css"

export const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome {user.username}!</p>
      <nav className="DashBoardLayout">
        <ul>
          <li><NavLink to="tasks" className={({ isActive }) => (
                    isActive ? "link-active" : "link-inactive"
                )}>Tasks</NavLink></li>
          <li><NavLink to="profile" className={({ isActive }) => (
                    isActive ? "link-active" : "link-inactive"
                )}>Profile</NavLink></li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>

      <button onClick={logout}>Log Out</button>
    </>

  )
}
