import React, { useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./ScorePageTablesByLeague.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { activeTogglerNoFalse } from "../../HelperFunctions/ActiveToggler";
import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";
import { MatchesContext } from "../../Context/MatchesContext";
import { LinearProgress } from "@mui/material";
import { TablesContext } from "../../Context/TablesContext";
import ScorePageTablesContainer from "../ScorePageTables/ScorePageTablesContainer";
import { FixturesContext } from "../../Context/FixturesContext";
import { useParams } from "react-router-dom";

const ScorePageTablesByLeague = () => {
  // params
  const { leagueId } = useParams();

  const {
    fetchSinglyLeagueTable,
    setLeagueIdForFetch,
    leagueTable,
    isSendingRequest,
    leagueDetails,
  } = useContext(FixturesContext);

  useEffect(() => {
    fetchSinglyLeagueTable(leagueId);
    setLeagueIdForFetch(leagueId);
    console.log(leagueDetails);
  }, []);

  return (
    <ScorePageLayout showNavSection={true} showLeagueBasedNav={true}>
      {isSendingRequest ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <>
          <ScorePageTablesContainer
            league={leagueTable}
            name={leagueDetails[0]?.tournament_stage_name}
            country_name={leagueDetails[0]?.tournament_template_name}
          />
        </>
      )}
    </ScorePageLayout>
  );
};

export default ScorePageTablesByLeague;
