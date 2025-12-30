import React from "react";
import "../styles/TaskItem.css"

const TaskItem = ({ individual_task }) => {
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

  individual_task.date = currentDate

  return (
    <li className={`task-status-${individual_task.completed ? "completed" : "pending"}`}>
      {individual_task.title}

      {individual_task?.description && (
        <span>: {individual_task.description}</span>
      )}

      {" ("}{individual_task.completed ? "Completed" : "Pending"}{") "}

      {" --- "}{`Created on: ${individual_task.date}`}
    </li>
  );
};



export default TaskItem;
