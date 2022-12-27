import React from "react";
import BreakingNews from "./BreakingNews";
import FeaturedMatch from "./FeaturedMatch";
import Headlines from "./Headlines";
import LiveTables from "./LiveTables";
import classes from "./NewsAndLiveMatches.module.css";

const NewsAndLiveMatches = () => {
  return (
    <div className={classes.container}>
      <div className={classes.breaking}>
        <BreakingNews />
      </div>
      <div className={classes.headlines}>
        <Headlines />
      </div>
      <div className={classes.featuresMatches}>
        <FeaturedMatch />
      </div>
      <div className={classes.liveTable}>
        <LiveTables />
      </div>
      <div className={classes.adSection}></div>
    </div>
  );
};

export default NewsAndLiveMatches;
