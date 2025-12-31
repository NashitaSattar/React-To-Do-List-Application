import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getTasks, createTask, updateTask, deleteTask } from '../service/taskService'
import TaskItem from '../component/TaskItem'

export const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
              console.log("response : ", response.data);
              console.log(Array.isArray( response.data ))
              setLoading(false);
              setTasks(response.data);
            }
        }  catch (error) {
            setError("Failed to fetch tasks");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
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
        <Link to="/add-task"><button>Add Task</button></Link>
        {tasks.length === 0 &&
          <p>No tasks available today</p>
        }
        {tasks.length > 0 && tasks.every(task => task.completed) &&
          <p>🎉 All tasks completed!</p>
        }
        <ul>
          {tasks.map(task => (
            <Link key={task.id} to={`/tasks/${task.id}`}>
            <TaskItem individual_task={task} />
            </Link>
          ))
          }
        </ul>
      </div>
    </>
  )
}
