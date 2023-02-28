import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { matches } from "../../Utilities/matches";
import classes from "./ScorePageMatchByLeague.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { MatchesContext } from "../../Context/MatchesContext";
import { FixturesContext } from "../../Context/FixturesContext";
import LeagueMatchContainer from "../ScorePageMatches/LeagueMatchContainer";
import { LinearProgress } from "@mui/material";
import moment from "moment/moment";

const ScorePageMatchByLeague = () => {
  // params
  const { leagueId } = useParams();

  // context
  const { showOdds, formattedDate, currentTime } = useContext(MatchesContext);
  const {
    fetchTournamentsEventsAndFixturesBasedOnLeague,
    isSendingRequest,
    leagueDetails,
    setLeagueDetails,
    setLeagueIdForFetch,
  } = useContext(FixturesContext);

  useEffect(() => {
    fetchTournamentsEventsAndFixturesBasedOnLeague(leagueId);
  }, [leagueId, formattedDate, currentTime]);

  useEffect(() => {
    setLeagueIdForFetch(leagueId);
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
          No matches available for {moment(formattedDate).calendar()}
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
