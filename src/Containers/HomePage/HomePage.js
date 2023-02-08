import React from "react";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <ScorePageMatchLayout>
      <section className={classes.container}></section>
    </ScorePageMatchLayout>
  );
};

export default HomePage;
