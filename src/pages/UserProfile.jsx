import React from 'react'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext'
import { getTasks } from '../service/taskService';
import { useTheme } from '../context/ThemeContext';

export const UserProfile = () => {
    const { theme } = useTheme();

    const { user } = useContext(AuthContext);
    const response = getTasks();
    const [error, setError] = useState("")
    const [allTasks, setAllTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        fetchStats();
      }, []);

    const fetchStats = async () => {
            try {
                const response = await getTasks();
                if (Array.isArray(response.data) === false){
                  setError("Invalid Data Structure")
                } else {
                  setAllTasks(response.data.length);
                  setCompletedTasks(response.data.filter(task => task.completed === true).length);
                }
            }  catch (error) {
                setError("Failed to fetch tasks");
                console.error(error);
            }
        }


  return (
    <div className={`App ${theme}`}>
        <h3>My Profile</h3>
        {error && 
            <p style={{color: "red"}}>
            {error}
            </p>
        }
        <p>Username: {user.username}</p>
        <p>Login Date: {user.currentDate}</p>
        <p>Total Tasks: {allTasks}</p>
        <p>Tasks Completed: {completedTasks}</p>
    </div>
  )
}
