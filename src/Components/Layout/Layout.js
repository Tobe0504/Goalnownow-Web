import React, { useContext, useEffect } from "react";
import Footer from "../../Containers/Footer/Footer";
import Header from "../../Containers/Header/Header";
import LeaguesAndCategories from "../../Containers/LeaguesAndCategories/LeaguesAndCategories";
import NewsAndLiveMatches from "../../Containers/NewsAndLiveMatches/NewsAndLiveMatches";
import { MatchesContext } from "../../Context/MatchesContext";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const { fetchTournamentEvents } = useContext(MatchesContext);

  useEffect(() => {
    fetchTournamentEvents();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.body}>
        <div className={classes.leftSection}>
          <LeaguesAndCategories />
        </div>
        <div className={classes.middleSection}>{props.children}</div>
        <div className={classes.rightSection}>
          <NewsAndLiveMatches />
        </div>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
