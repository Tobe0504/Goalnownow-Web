import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LeagueAndCategoryContextprovider from "./Context/LeagueAndCategoryContext";
import MatchesContextProvider from "./Context/MatchesContext";
import TablesContextProvider from "./Context/TablesContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TablesContextProvider>
      <LeagueAndCategoryContextprovider>
        <MatchesContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </MatchesContextProvider>
      </LeagueAndCategoryContextprovider>
    </TablesContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
