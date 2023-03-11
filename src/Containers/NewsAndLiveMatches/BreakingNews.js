import React from "react";
import classes from "./BreakingNews.module.css";
import { useContext } from "react";
import { NewsContext } from "../../Context/NewsContext";

const BreakingNews = () => {
  // context
  const { featuresNews } = useContext(NewsContext);

  return (
    <div className={classes.container}>
      <img
        src={
          featuresNews[0]?.associations?.featureimage?.renditions["1x1"]?.href
        }
        alt="Breaking News"
      />
      <div className={classes.textSection}>
        <span className={classes.category}>
          {featuresNews[0]?.subject[1]?.name}
        </span>
        <span className={classes.text}>{featuresNews[0]?.headline}</span>
      </div>
    </div>
  );
};

export default BreakingNews;
