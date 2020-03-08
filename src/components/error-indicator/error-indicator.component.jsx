import React from "react";
import "./error-indicator.style.scss";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <h1>Ups. Something Wrong</h1>
      <span>We will fix it</span>
    </div>
  );
};

export default ErrorIndicator;
