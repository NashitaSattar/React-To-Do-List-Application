import React from 'react'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'

export const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome {user.username}!</p>

      <button onClick={logout}>Log Out</button>
    </>

  )
}
