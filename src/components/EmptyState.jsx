import React from "react";
import "../styles/home.css";

function EmptyState({
  title = "No movies found",
  message = "Try searching for something else."
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;