import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { updateTask, deleteTask, createActivity } from '../service/taskService'
import { getTaskById } from '../service/taskService'
import { useTheme } from '../context/ThemeContext';
import Card from "../component/Card";
import "../styles/TaskDetails.css"


export const TaskDetails = () => {
    const { theme } = useTheme();

    const {id} = useParams();
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();

    const today = new Date();

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

        const newUpdatedActivity ={
            id: id,
            title: task.title,
            type: "✏️",
            description: "Task is updated",
            timestamp: today
        }

        try {
            setLoading(true);
            await updateTask(id, updatedTask)
            if (!newUpdatedActivity.id || !newUpdatedActivity.title) {
                throw new Error("Invalid activity data");
            }
            setTask(updatedTask)
            setDisabled(true)
            await createActivity(newUpdatedActivity)
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

        const newDeletedActivity ={
            id: id,
            title: task.title,
            type: "❌",
            description: "Task is deleted",
            timestamp: today
        }

        try {
            setLoading(true);
            console.log("Task Deleted")
            await deleteTask(id)
            if (!newDeletedActivity.id || !newDeletedActivity.title) {
                throw new Error("Invalid activity data");
            }
            setSuccess("Task deleted successfully 🚀")
            await createActivity(newDeletedActivity)
            setTimeout(() => {
                navigate("../tasks")
            }, 3000);

        } catch (error) {
            setError("Error occured when deleting task 😢")
        } finally {
            setLoading(false);
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
        {success && 
            <p>
            {success}
            </p>}

        <NavLink to="/dashboard/tasks"><button>Back to My Tasks</button></NavLink>
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
    </div>
  )
}
