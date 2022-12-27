import React from "react";
import classes from "./BreakingNews.module.css";
import breakingImage from "../../Assets/Images/breaking.svg";

const BreakingNews = () => {
  return (
    <div className={classes.container}>
      <img src={breakingImage} alt="Breaking News" />
      <div className={classes.textSection}>
        <span className={classes.category}>Soccer</span>
        <span className={classes.text}>
          Transfer Talk: Barca making deadline-day Pogba push
        </span>
      </div>
    </div>
  );
};

export default BreakingNews;
