import React from "react";
import classes from "./ScoreMobileAdSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import scoresSectionAdBall2 from "../../Assets/Images/scoresSectionAdBall2.svg";

const ScoreMobileAdSection = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textSection}>
        <p>
          Up To $50
          <span>Free Matched Bet</span>
        </p>
        <div>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          <span>Bet Now</span>
        </div>
      </div>
      <div className={classes.imageSection}>
        <img src={scoresSectionAdBall2} alt="Ad" />
      </div>
    </div>
  );
};

export default ScoreMobileAdSection;
