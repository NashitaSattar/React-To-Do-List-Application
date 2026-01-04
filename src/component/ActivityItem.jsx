import React from "react";
import "../styles/TaskItem.css"

const ActivityItem = ({ individual_activity }) => {
  const formattedTimeStamp = new Date(individual_activity.timestamp).toLocaleString("en-CA")

  let activityColour;

  if (individual_activity.type === "➕"){
    activityColour = "green"
  }
  else if (individual_activity.type === "✏️"){
    activityColour = "orange"
  }
  else{
    activityColour = "red"
  }

  return (
    <li style={{color: activityColour}}>
      {individual_activity.type} <strong>{individual_activity.description}</strong>
      {" ---> "}
      <strong>{individual_activity.title}</strong>
      <pre>{formattedTimeStamp}</pre>
    </li>
  );
};

export default ActivityItem;
