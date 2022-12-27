import React from "react";
import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import ScorePageLayout from "./Components/ScorePageLayout/ScorePageLayout";
import ScorePageMatches from "./Containers/ScorePageMatches/ScorePageMatches";
import ScorePageMatchByLeague from "./Containers/ScorePageMatchByLeague/ScorePageMatchByLeague";
import ScorePageTables from "./Containers/ScorePageTables/ScorePageTables";

function App() {
  return (
    <Routes>
      <Route path="/scores" element={<ScorePageLayout />} />
      <Route path="/scores/tables" element={<ScorePageTables />} />
      <Route path="/favourites" element={<Layout />} />
      <Route path="/news" element={<Layout />} />
      <Route path="/get-the-app" element={<Layout />} />
      <Route path="/scores/matches" element={<ScorePageMatches />} />
      <Route
        path="/scores/matches/:league"
        element={<ScorePageMatchByLeague />}
      />
    </Routes>
  );
}

export default App;
