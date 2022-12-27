import React from "react";
import classes from "./Headlines.module.css";

const Headlines = () => {
  return (
    <div className={classes.container}>
      <div>
        <span>Soccer</span>
        <span>Transfer Talk: Barca making deadline-day Pogba push</span>
      </div>
      <div>
        <span>Tennis</span>
        <span>You just survived grueling heat at the US Open, now what?</span>
      </div>
    </div>
  );
};

export default Headlines;
