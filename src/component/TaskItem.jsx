import React from "react";
import "../styles/TaskItem.css"

const TaskItem = ({ individual_task }) => {

  return (
    <li className={`task-status-${individual_task.completed ? "completed" : "pending"}`}>
      <strong>{individual_task.title}</strong>
      <pre>{individual_task.completed ? "✅ Completed" : "Pending"}</pre>

    </li>
  );
};



export default TaskItem;
