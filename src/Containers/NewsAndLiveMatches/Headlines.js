import React, { useContext } from "react";
import classes from "./Headlines.module.css";
import { NewsContext } from "../../Context/NewsContext";

const Headlines = () => {
  // context
  const { featuresNews } = useContext(NewsContext);
  return (
    <div className={classes.container}>
      <div>
        <span>{featuresNews[1]?.subject[1]?.name}</span>
        <span>{featuresNews[1]?.headline}</span>
      </div>
      <div>
        <span>{featuresNews[2]?.subject[1]?.name}</span>
        <span>{featuresNews[2]?.headline}</span>
      </div>
    </div>
  );
};

export default Headlines;
