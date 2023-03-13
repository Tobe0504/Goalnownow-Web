import React from "react";
import Layout from "./Components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import ScorePageMatches from "./Containers/ScorePageMatches/ScorePageMatches";
import ScorePageMatchByLeague from "./Containers/ScorePageMatchByLeague/ScorePageMatchByLeague";
import ScorePageTables from "./Containers/ScorePageTables/ScorePageTables";
import ScorePageMatchStatistics from "./Containers/ScorePageMatchStatistics/ScorePageMatchStatistics";
import ScorePageMatchOdds from "./Containers/ScorePageMatchOdds/ScorePageMatchOdds";
import ScorePageMatchLineUp from "./Containers/ScorePageMatchLineUp/ScorePageMatchLineUp";
import ScorePageMatchSummary from "./Containers/ScorePageMatchSummary/ScorePageMatchSummary";
import Favourites from "./Containers/Favourites/Favourites";
import ScorePageTablesByLeague from "./Containers/ScorePageTablesByLeague/ScorePageTablesByLeague";
import ScorePageMatchCommentary from "./Containers/ScorePageMatchCommentary/ScorePageMatchCommentary";
import ScorePageMatchHeadToHead from "./Containers/ScorePageMatchHeadToHead/ScorePageMatchHeadToHead";
import ScorePageMatchNews from "./Containers/ScorePageMatchNews/ScorePageMatchNews";
import TeamPageLayout from "./Components/TeamPageLayout/TeamPageLayout";
import TeamPagePlayers from "./Containers/TeamPagePlayers/TeamPagePlayers";
import TeamPageTournaments from "./Containers/TeamPageTournaments/TeamPageTournaments";
import TeamPageNews from "./Containers/TeamPageNews/TeamPageNews";
function App() {
  // const navigate = useNavigate();

  return (
    <Routes>
      {/* <Route
        path="/scores"
        element={<ScorePageLayout showNavSection={true} />}
      /> */}
      <Route path="/" element={<Navigate replace to="/scores" />} />

      <Route path="/scores/tables" element={<ScorePageTables />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/sport-news" element={<Layout />} />
      <Route path="/get-the-app" element={<Layout />} />
      <Route path="/scores" element={<ScorePageMatches />} />

      <Route
        path="/scores/:matchId/statistics"
        element={<ScorePageMatchStatistics />}
      />
      <Route path="/scores/:matchId/odds" element={<ScorePageMatchOdds />} />
      <Route
        path="/scores/:matchId/line-up"
        element={<ScorePageMatchLineUp />}
      />
      <Route
        path="/scores/:matchId/summary"
        element={<ScorePageMatchSummary />}
      />

      <Route
        path="/scores/:matchId/commentary"
        element={<ScorePageMatchCommentary />}
      />

      <Route
        path="/scores/:matchId/h2h"
        element={<ScorePageMatchHeadToHead />}
      />

      <Route
        path="/scores/:matchId/news/:team"
        element={<ScorePageMatchNews />}
      />

      <Route
        path="/scores/:leagueId/events"
        element={<ScorePageMatchByLeague />}
      />
      <Route
        path="/scores/:leagueId/events/standings"
        element={<ScorePageTablesByLeague />}
      />

      <Route path="/team/:teamId/players" element={<TeamPagePlayers />} />
      <Route
        path="/team/:teamId/tournaments"
        element={<TeamPageTournaments />}
      />

      <Route path="/team/:teamId/news/:newsTeam" element={<TeamPageNews />} />
    </Routes>
  );
}

export default App;
