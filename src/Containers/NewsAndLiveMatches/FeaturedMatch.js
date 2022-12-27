import React from "react";
import classes from "./FeaturedMatch.module.css";
import chelseaLogo from "../../Assets/Images/chelseaLogo.svg";
import leicesterLogo from "../../Assets/Images/leicesterCityLogo.svg";

const FeaturedMatch = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>Featured Match</div>
      <div className={classes.scoreSection}>
        <div>
          <img src={chelseaLogo} alt="Clog Logo" />
          <span>Chelsea</span>
        </div>
        <div>
          <div>Premier League</div>
          <div>1 : 2</div>
          <div>
            <span></span>
            <span>49:30</span>
          </div>
        </div>
        <div>
          <img src={leicesterLogo} alt="Clog Logo" />
          <span>Leicester</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatch;
