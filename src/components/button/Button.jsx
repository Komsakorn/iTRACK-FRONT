import React from "react";
import "./Button.css";

const Button = ({ children, onClick, isInvalid = false, ...props }) => {
  return (
    <button className={isInvalid ? "error" : ""} {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
