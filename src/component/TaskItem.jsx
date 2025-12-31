import React from "react";
import "../styles/TaskItem.css"

const TaskItem = ({ individual_task }) => {

  return (
    <li className={`task-status-${individual_task.completed ? "completed" : "pending"}`}>
      {individual_task.title}
      {" ---> "}
      {individual_task.completed ? "✅ Completed" : "Pending"}

    </li>
  );
};



export default TaskItem;
