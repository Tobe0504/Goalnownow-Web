import React from "react";
import classes from "./ScoreAdSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import scoresSectionAdBall from "../../Assets/Images/scoresSectionAdBall.svg";

const ScoreAdSection = () => {
  return (
    <div className={classes.container}>
      <img src={scoresSectionAdBall} alt="Ad" />
      <div className={classes.textSection}>
        <p>
          Double Odds On All World Cup Games live on
          <span>Goalscorer Bets</span>
        </p>
        <div>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          <span>if he scores two or more</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreAdSection;
