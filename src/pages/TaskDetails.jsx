import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { getTaskById } from '../service/taskService'
import Card from "../component/Card";


export const TaskDetails = () => {
    const {id} = useParams();
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

  // Runs once to fetch task from database
  useEffect(() => {
    fetchTask();
  }, [id]);

  // FETCH tasks from database
   const fetchTask = async () => {
        try {
            setLoading(true);
            const response = await getTaskById(id);
            setLoading(false);
            setTask(response.data);
            console.log(response.data)
        } catch (error) {
            setError("Task not found 😢");
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
        <Link to="/tasks"><button>Back to My Tasks</button></Link>
        <Card
            title={task.title}
            description={task.description}
            date={task.date}
            completed={task.completed}
        />

    
    </>
  )
}
