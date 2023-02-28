import React, { useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useContext } from "react";
import { LinearProgress } from "@mui/material";
import { TablesContext } from "../../Context/TablesContext";
import ScorePageTablesContainer from "./ScorePageTablesContainer";

const ScorePageTables = () => {
  // Context
  const {
    fetchAllLeagueTables,
    premierLeagueTable,
    spanishLeagueTable,
    frenchLeagueTable,
    germanLeagueTable,
    italianLeagueTable,
    premierLeagueTableIsLoading,
    spanishLeagueTableIsLoading,
    germanLeagueTableIsLoading,
    frenchLeagueTableIsLoading,
    italianLeagueTableIsLoading,
  } = useContext(TablesContext);

  useEffect(() => {
    fetchAllLeagueTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScorePageLayout showNavSection={true}>
      {premierLeagueTableIsLoading &&
      spanishLeagueTableIsLoading &&
      germanLeagueTableIsLoading &&
      frenchLeagueTableIsLoading &&
      italianLeagueTableIsLoading ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <>
          <ScorePageTablesContainer
            league={premierLeagueTable}
            name="Premier League"
            country_name="England"
          />
          <ScorePageTablesContainer
            league={spanishLeagueTable}
            name="La Liga"
            country_name="Spain"
          />
          <ScorePageTablesContainer
            league={frenchLeagueTable}
            name="Ligue 1"
            country_name="France"
          />
          <ScorePageTablesContainer
            league={germanLeagueTable}
            name="Bundesliga"
            country_name="Germany"
          />
          <ScorePageTablesContainer
            league={italianLeagueTable}
            name="Serie A"
            country_name="Italy"
          />
        </>
      )}
    </ScorePageLayout>
  );
};

export default ScorePageTables;
