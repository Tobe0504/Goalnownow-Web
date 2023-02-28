import React from "react";
import Layout from "../Layout/Layout";
import ScoreAdSection from "./ScoreAdSection";
import ScoreMobileAdSection from "./ScoreMobileAdSection";
import classes from "./ScorePageLayout.module.css";
import ScorePageNav from "./ScorePageNav";

const ScorePageLayout = (props) => {
  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.adSection}>
          <ScoreAdSection />
        </div>
        {props.showNavSection && (
          <div className={classes.navSection}>
            <ScorePageNav showLeagueBasedNav={props.showLeagueBasedNav} />
          </div>
        )}
        <div className={classes.mobileAdSection}>
          <ScoreMobileAdSection />
        </div>
        <div className={classes.body}>{props.children}</div>
      </div>
    </Layout>
  );
};

export default ScorePageLayout;
