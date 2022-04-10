import React, { forwardRef } from "react";
import classes from './Input.module.scss'

const Input = forwardRef(({id, type, label, error = "", width = "345px", height= "50px", fontWeight = "300", value = ""}, ref) => (

    <div className={classes.error__forms}>
      <label style={{fontWeight}} htmlFor={id}>{label}</label>
      <input min={1} ref={ref} defaultValue={value} className={classes.input} style={{width, height}} id={id} type={type} />
      <p className={classes.error}>{error}</p>
    </div>
  ));

export default Input;
