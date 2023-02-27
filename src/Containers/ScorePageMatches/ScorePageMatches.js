import React, { useContext, useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { matches } from "../../Utilities/matches";
import classes from "./ScorePageMatches.module.css";

import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { MatchesContext } from "../../Context/MatchesContext";
import { useNavigate } from "react-router";
import LeagueMatchContainer from "./LeagueMatchContainer";
import { LinearProgress } from "@mui/material";

const ScorePageMatches = () => {
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

  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  //   navigate
  const navigate = useNavigate();

  // utils

  useEffect(() => {
    fetchTournamentEvents();
  }, []);

  return (
    <ScorePageLayout showNavSection={true}>
      {premierLeagueIsLoading &&
      spanishLeagueIsLoading &&
      frenchLeagueIsLoading &&
      germanLeagueIsLoading &&
      italianLeagueIsLoading &&
      championsLeagueIsLoading &&
      europaLeagueIsLoading &&
      faCupIsLoading ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <div className={classes.container}>
          <LeagueMatchContainer
            leagueEvent={championsLeague}
            setLegueEvent={setChampionsLeague}
          />
          <LeagueMatchContainer
            leagueEvent={europaLeague}
            setLegueEvent={setEuropaLeague}
          />
          <LeagueMatchContainer
            leagueEvent={premierLeagueevents}
            setLegueEvent={setPremierLeagueEvents}
            leagueAbbv={"GB"}
          />

          <LeagueMatchContainer
            leagueEvent={spanishLeague}
            setLegueEvent={setSpanishLeague}
            leagueAbbv={"ES"}
          />
          <LeagueMatchContainer
            leagueEvent={frenchLeague}
            setLegueEvent={setFrenchLeague}
            leagueAbbv={"FR"}
          />
          <LeagueMatchContainer
            leagueEvent={germanLeague}
            setLegueEvent={setGermanLeague}
            leagueAbbv={"DE"}
          />
          <LeagueMatchContainer
            leagueEvent={italianLeague}
            setLegueEvent={setItalianLeague}
            leagueAbbv={"IT"}
          />

          <LeagueMatchContainer
            leagueEvent={faCup}
            setLegueEvent={setFaCup}
            leagueAbbv={"GB"}
          />
        </div>
      )}
    </ScorePageLayout>
  );
};

export default ScorePageMatches;
