import React from "react";
import classes from "./Button.module.scss";

const Button = ({ text, width, height = "50px", onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classes.btn}
      style={{ width, height }}
    >
      {text}
    </button>
  );
};

export default Button;
