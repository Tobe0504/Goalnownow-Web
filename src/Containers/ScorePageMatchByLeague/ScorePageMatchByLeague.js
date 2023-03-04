import React, { useContext, useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";

import classes from "./ScorePageMatchByLeague.module.css";

import { MatchesContext } from "../../Context/MatchesContext";
import { FixturesContext } from "../../Context/FixturesContext";
import LeagueMatchContainer from "../ScorePageMatches/LeagueMatchContainer";
import { LinearProgress } from "@mui/material";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const ScorePageMatchByLeague = () => {
  // params
  const { leagueId } = useParams();

  // context
  const { formattedDate, currentTime, includeLive } =
    useContext(MatchesContext);
  const {
    fetchTournamentsEventsAndFixturesBasedOnLeague,
    isSendingRequest,
    leagueDetails,
    setLeagueDetails,
    setLeagueIdForFetch,
  } = useContext(FixturesContext);

  useEffect(() => {
    fetchTournamentsEventsAndFixturesBasedOnLeague(leagueId);
    console.log("goinggg");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId, formattedDate, currentTime, includeLive]);

  useEffect(() => {
    setLeagueIdForFetch(leagueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return (
    <ScorePageLayout showNavSection={true} showLeagueBasedNav={true}>
      {isSendingRequest && leagueDetails.length < 1 ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : !isSendingRequest && leagueDetails.length < 1 ? (
        <div className={classes.noMatches}>
          No matches available for{" "}
          {moment(formattedDate)
            .calendar()
            .replace(/at 12:00 AM/g, "")}
        </div>
      ) : (
        <LeagueMatchContainer
          leagueEvent={leagueDetails}
          setLegueEvent={setLeagueDetails}
          leagueAbbv={"GB"}
        />
      )}
    </ScorePageLayout>
  );
};

export default ScorePageMatchByLeague;
