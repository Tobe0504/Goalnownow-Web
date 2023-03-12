import React, { useContext, useEffect } from "react";
import { MatchesContext } from "../../Context/MatchesContext";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./Favourites.module.css";
import FavoritedMatchContainer from "./FavoritedMatchContainer";

const Favourites = () => {
  // context
  const {
    favouritedMatches,
    setFavouritedMatches,
    premierLeagueevents,
    frenchLeague,
    germanLeague,
    italianLeague,
    spanishLeague,
    championsLeague,
    europaLeague,
    faCup,
  } = useContext(MatchesContext);

  // useEffect(() => {
  //   // Search array1
  //   const updatedArray = premierLeagueevents?.map((item) => {
  //     return (
  //       item.name &&
  //       favouritedMatches?.some((match) => match.name === item.name)
  //     );
  //   });

  //   const newSpanishLeagueLeagueArray = favouritedMatches?.map((data) => {
  //     return spanishLeague?.filter((datum) => {
  //       return datum?.name === data?.name;
  //     });
  //   });

  //   console.log(updatedArray, 7777777);
  // }, []);

  console.log(premierLeagueevents, favouritedMatches, "eents");
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
