import React, { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";
import { Helmet } from "react-helmet";
import Layout from "../../Components/Layout/Layout";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./Favourites.module.css";
import FavoritedMatchContainer from "./FavoritedMatchContainer";

const Favourites = () => {
  // context
  const {
    fetchTournamentEvents,
    showOdds,
    leagueMatches,
    premierLeagueevents,
    frenchLeague,
    germanLeague,
    premierLeagueIsLoading,
    germanLeagueIsLoading,
    frenchLeagueIsLoading,
    italianLeague,
    italianLeagueIsLoading,
    spanishLeague,
    spanishLeagueIsLoading,
    championsLeague,
    championsLeagueIsLoading,
    europaLeague,
    europaLeagueIsLoading,
    faCup,
    faCupIsLoading,
    setPremierLeagueEvents,
    setFrenchLeague,
    setGermanLeague,
    setItalianLeague,
    setSpanishLeague,
    setChampionsLeague,
    setEuropaLeague,
    setFaCup,
  } = useContext(MatchesContext);
  return (
    <ScorePageLayout showNavSection={true}>
      <div className={classes.container}>
        <div className={classes.container}>
          <FavoritedMatchContainer
            leagueEvent={championsLeague}
            setLegueEvent={setChampionsLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={europaLeague}
            setLegueEvent={setEuropaLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={premierLeagueevents}
            setLegueEvent={setPremierLeagueEvents}
          />

          <FavoritedMatchContainer
            leagueEvent={spanishLeague}
            setLegueEvent={setSpanishLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={frenchLeague}
            setLegueEvent={setFrenchLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={germanLeague}
            setLegueEvent={setGermanLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={italianLeague}
            setLegueEvent={setItalianLeague}
          />
          <FavoritedMatchContainer
            leagueEvent={faCup}
            setLegueEvent={setFaCup}
          />
        </div>
      </div>
    </ScorePageLayout>
  );
};

export default Favourites;
