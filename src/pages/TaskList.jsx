import React from 'react'
import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../service/taskService'
import TaskItem from '../component/TaskItem'

export const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState(false)
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
        <hr/>
        <h2>My Tasks</h2>
        {tasks.length === 0 &&
          <p>No tasks available today</p>
        }
        {tasks.every(task => task.completed) &&
          <p>🎉 All tasks completed!</p>
        }
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} individual_task={task} />
          ))}
        </ul>
      </div>
    </>
  )
}
