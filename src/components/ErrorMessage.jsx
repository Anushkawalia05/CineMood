import React from "react";
import "../styles/home.css";

function ErrorMessage({
  message = "Something went wrong. Please try again."
}) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;