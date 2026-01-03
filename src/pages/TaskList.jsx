import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { getTasks } from '../service/taskService'
import { useTheme } from '../context/ThemeContext';
import TaskItem from '../component/TaskItem'
import "../styles/TaskList.css"

export const TaskList = () => {
  const { theme } = useTheme();
  
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [helper, setHelper] = useState("")
  const [allTasks, setAllTasks] = useState([])
  const searchRef = useRef(null);


  // Runs once to fetch tasks from database
  useEffect(() => {
    fetchTasks();
  }, []);

  // FETCH tasks from database
   const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await getTasks();
            if (Array.isArray(response.data) === false){
              setError("Invalid Data Structure");
            } else {
              setLoading(false);
              setAllTasks(response.data);
              setTasks(response.data);
            }
        }  catch (error) {
            setError("Failed to fetch tasks");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
      e.preventDefault();
      console.log("Search Button Clicked")
      const searchTerm = searchRef.current.value.trim().toLowerCase();

      if (searchTerm.length === 0){
        setTasks(allTasks)
        return;
      }

      if (searchTerm.length < 2){
        setHelper("Search term must be at least 2 characters")
        return;
      }

      setHelper("")

      try {

        const filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchTerm)
        || task.description?.toLowerCase().includes(searchTerm)
        )
        setTasks(filteredTasks)

      } catch (error) {
        setError("Failed to search tasks")
      } 
    }

  return (
    <div className={`App ${theme}`}>
      {loading && 
        <p>
          Loading...
        </p>}
      {error && 
        <p style={{color: "red"}}>
          {error}
        </p>
      }
      <div>
        <h2>My Tasks</h2>
        <div className="container">
          <NavLink to="/dashboard/add-task"><button>Add Task</button></NavLink>
          <div className="search-bar-container">
            <input
            ref={searchRef}
            type="text"
            placeholder="Search Tasks"
            />
            <button onClick={handleSearch}>Search</button></div>
            {helper && <p style={{ color: "red" }}>{helper}</p>}
          </div>
        {tasks.length === 0 &&
          <p>No tasks found 🔍</p>
        }
        {tasks.length > 0 && tasks.every(task => task.completed) &&
          <p>🎉 All tasks completed!</p>
        }
        <ul>
          {tasks.map(task => (
            <NavLink key={task.id} to={`/dashboard/tasks/${task.id}`}>
            <TaskItem individual_task={task} />
            </NavLink>
          ))
          }
        </ul>
      </div>
    </div>
  )
}
