import React from "react";
import Layout from "./Components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import ScorePageLayout from "./Components/ScorePageLayout/ScorePageLayout";
import ScorePageMatches from "./Containers/ScorePageMatches/ScorePageMatches";
import ScorePageMatchByLeague from "./Containers/ScorePageMatchByLeague/ScorePageMatchByLeague";
import ScorePageTables from "./Containers/ScorePageTables/ScorePageTables";
import ScorePageMatchStatistics from "./Containers/ScorePageMatchStatistics/ScorePageMatchStatistics";
import ScorePageMatchOdds from "./Containers/ScorePageMatchOdds/ScorePageMatchOdds";
import ScorePageMatchLineUp from "./Containers/ScorePageMatchLineUp/ScorePageMatchLineUp";
import ScorePageMatchSummary from "./Containers/ScorePageMatchSummary/ScorePageMatchSummary";
import Favourites from "./Containers/Favourites/Favourites";
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
      <Route path="/news" element={<Layout />} />
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

      <Route path="/scores/:league" element={<ScorePageMatchByLeague />} />
    </Routes>
  );
}

export default App;
