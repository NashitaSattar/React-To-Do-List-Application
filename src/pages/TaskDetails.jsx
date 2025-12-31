import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../service/taskService'
import { getTaskById } from '../service/taskService'
import Card from "../component/Card";
import "../styles/TaskDetails.css"


export const TaskDetails = () => {
    const {id} = useParams();
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();

  // Runs once to fetch task from database with id
  useEffect(() => {
    fetchTask();
  }, [id]);

  // FETCH task from database with id
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

    const handleUpdateTask = async () => {
        const updatedTask ={
            ...task,
            completed: true
        }
        try {
            setLoading(true);
            await updateTask(id, updatedTask)
            setTask(updatedTask)
            setDisabled(true)
        } catch (error) {
            setError("Error occured when updating task 😢")
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteTask = async () => {
        const result = window.confirm("Are you sure you want to delete this user?")
        if (!result) {
            return;
    }
        try {
            setLoading(true);
            console.log("Task Deleted")
            await deleteTask(id)
            setSuccess("Task deleted successfully 🚀")
            setTimeout(() => {
                navigate("/tasks")
            }, 3000);

        } catch (error) {
            setError("Error occured when deleting task 😢")
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
        {success && 
            <p>
            {success}
            </p>}

        <Link to="/tasks"><button>Back to My Tasks</button></Link>
        <Card
            title={task.title}
            description={task.description}
            date={task.date}
            completed={task.completed}
        />

        <div className="buttons-container">
            <button className={task.completed || disabled ? "disable-button" : "update-button"} onClick={handleUpdateTask} disabled={task.completed || disabled}>Mark as Done</button>
            <button className="delete-button" onClick={handleDeleteTask}>Delete</button>
        </div>
    </>
  )
}
