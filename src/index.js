import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LeagueAndCategoryContextprovider from "./Context/LeagueAndCategoryContext";
import MatchesContextProvider from "./Context/MatchesContext";
import TablesContextProvider from "./Context/TablesContext";
import FixturesContextProvider from "./Context/FixturesContext";
import MatchesContextAltProvider from "./Context/MatchesContextAlt";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MatchesContextProvider>
      <MatchesContextAltProvider>
        <TablesContextProvider>
          <LeagueAndCategoryContextprovider>
            <FixturesContextProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </FixturesContextProvider>
          </LeagueAndCategoryContextprovider>
        </TablesContextProvider>
      </MatchesContextAltProvider>
    </MatchesContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
