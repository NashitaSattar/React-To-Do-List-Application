import "../styles/Card.css";

function Card({ title, description, date, completed }) {
  return (
    <div className="card">
      <h2>Task Details</h2>

      <p>Task Title: {title}</p>

      <p>Task Description: {description ? description : ""}</p>

      <p>Created Date: {date}</p>

      <p>Current Status: {completed ? "✅ Completed" : "Pending"}</p>
    </div>
  );
}

export default Card;
