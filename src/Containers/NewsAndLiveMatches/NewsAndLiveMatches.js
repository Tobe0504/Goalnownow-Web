import React, { useContext, useEffect } from "react";
import BreakingNews from "./BreakingNews";
import FeaturedMatch from "./FeaturedMatch";
import Headlines from "./Headlines";
import LiveTables from "./LiveTables";
import classes from "./NewsAndLiveMatches.module.css";
import { NewsContext } from "../../Context/NewsContext";
import { CircularProgress } from "@mui/material";

const NewsAndLiveMatches = () => {
  // Context
  const { isFetchingFeaturedNews, fetchFeaturedNews } = useContext(NewsContext);

  // Effects
  useEffect(() => {
    fetchFeaturedNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      {isFetchingFeaturedNews ? (
        <div className={classes.loading}>
          <CircularProgress
            color="inherit"
            style={{ color: "#ffd91b" }}
            size="1rem"
          />
        </div>
      ) : (
        <>
          <div className={classes.breaking}>
            <BreakingNews />
          </div>
          <div className={classes.headlines}>
            <Headlines />
          </div>
        </>
      )}

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
