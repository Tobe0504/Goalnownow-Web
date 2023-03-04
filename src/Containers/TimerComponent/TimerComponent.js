import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import classes from "./TimerComponent.module.css";

const TimerComponent = ({ date }) => {
  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function calculateCountdown() {
    const timeRemaining = Date.parse(date) - Date.now();

    if (isNaN(timeRemaining)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.max(Math.floor((timeRemaining / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((timeRemaining / 1000 / 60) % 60), 0);
    const hours = Math.max(
      Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
      0
    );
    const days = Math.max(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)), 0);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className={classes.container}>
      <div>
        <FontAwesomeIcon icon={faClock} />
      </div>
      <div>
        {countdown.days.toString().padStart(1, "0")}:
        {countdown.hours.toString().padStart(2, "0")}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default TimerComponent;
