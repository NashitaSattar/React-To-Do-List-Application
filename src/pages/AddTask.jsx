import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { createTask } from '../service/taskService';
import "../styles/AddTask.css";

export const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
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
      await createTask(newTask);

      setTitle("");
      setDescription("");
      setSuccess("Submission Successful");
      navigate("/tasks");

    } catch (err) {
      setError("Failed to add task");
      setSuccess("Submission Failed");
      console.error(err);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/tasks"><button>Back to My Tasks</button></Link>
      {loading && <p>Loading...</p>}
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask} className="submit-form">
        <input
          placeholder="Title of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          placeholder="Description of Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className={title.length === 0 ? "disabledButton" : "enabledButton"}
          >
          Add New Task
        </button>
        <p>{success}</p>
      </form>
    </>
  );
};
