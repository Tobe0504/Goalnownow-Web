import React from "react";
import classes from "./ToggleSwitch.module.css";

const ToggleSwitch = (props) => {
  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        readOnly={props.readOnly}
        name={props.name}
        id={props.id}
      />
      <span className={classes.sliderRound}></span>
    </label>
  );
};

export default ToggleSwitch;
