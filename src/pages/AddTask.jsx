import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { createTask, createActivity } from '../service/taskService';
import { useTheme } from '../context/ThemeContext';
import "../styles/AddTask.css";

export const AddTask = () => {
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const today = new Date();
  const currentDate = today.toLocaleDateString()

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newTask = {
        title: title,
        description: description,
        completed: false,
        date: currentDate

      };
      const taskResponse = await createTask(newTask);
      const createdTask = taskResponse.data;

      const newActivity = {
        id: createdTask.id,
        title: createdTask.title,
        type: "➕",
        description: "Task is created",
        timestamp: today

      };

      if (!newActivity.id || !newActivity.title) {
        throw new Error("Invalid activity data");
      }
      await createActivity(newActivity);

      setTitle("");
      setDescription("");
      setSuccess("Submission Successful");
      navigate("../tasks");

    } catch (err) {
      setError("Failed to add task");
      setSuccess("Submission Failed");
      console.error(err);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <NavLink to="/dashboard/tasks"><button>Back to My Tasks</button></NavLink>
      {loading && <p>Loading...</p>}
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask} className="submit-form">
        <input
          placeholder="Title of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value.trimStart())}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          placeholder="Description of Task"
          value={description}
          onChange={(e) => setDescription(e.target.value.trimStart())}
        />
        <button
          type="submit"
          className={title.length === 0 ? "disabled-button" : "enabled-button"}
          >
          Add New Task
        </button>
        <p>{success}</p>
      </form>
    </div>
  );
};