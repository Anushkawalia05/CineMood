import React from "react";
import "../styles/home.css";

function Loading({ message = "Loading movies..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;