import React, { useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useContext } from "react";
import { LinearProgress } from "@mui/material";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
