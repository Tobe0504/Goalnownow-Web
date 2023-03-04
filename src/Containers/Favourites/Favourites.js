import React, { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./Favourites.module.css";
import FavoritedMatchContainer from "./FavoritedMatchContainer";

const Favourites = () => {
  // context
  const { favouritedMatches, setFavouritedMatches } =
    useContext(MatchesContext);
  return (
    <ScorePageLayout showNavSection={true}>
      <div className={classes.container}>
        <div className={classes.container}>
          <FavoritedMatchContainer
            leagueEvent={favouritedMatches}
            setLegueEvent={setFavouritedMatches}
            leagueAbbv={"GB"}
          />
        </div>
      </div>
    </ScorePageLayout>
  );
};

export default Favourites;
