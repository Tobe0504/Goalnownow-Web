import axios from "axios";
import React, { createContext, useState } from "react";
import {
  apiAltKey,
  enetPulseTokenId,
  enetPulseUsername,
} from "../Utilities/global";

export const TablesContext = createContext();

const TablesContextProvider = (props) => {
  // states
  const [premierLeagueTable, setPremierLeagueTable] = useState([]);
  const [premierLeagueTableIsLoading, setpremierLeagueTableIsLoading] =
    useState(false);

  const [spanishLeagueTable, setSpanishLeagueTable] = useState([]);
  const [spanishLeagueTableIsLoading, setSpanishLeagueIsLoading] =
    useState(false);

  const [frenchLeagueTable, setFrenchLeagueTable] = useState([]);
  const [frenchLeagueTableIsLoading, setFrenchLeagueIsLoading] =
    useState(false);

  const [germanLeagueTable, setGermanLeagueTable] = useState([]);
  const [germanLeagueTableIsLoading, setGermanLeagueIsLoading] =
    useState(false);

  const [italianLeagueTable, setItalianLeagueTable] = useState([]);
  const [italianLeagueTableIsLoading, setItalianLeagueIsLoading] =
    useState(false);

  const fetchAllLeagueTables = () => {
    // premier league
    axios
      .get(
        `http://demo.eapi.enetpulse.com/standing/leaguetable/?object=tournament_stage&objectFK=879290&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&tf=Y-m-d H:i:s&&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TablesContext.Provider value={{ fetchAllLeagueTables }}>
      {props.children}
    </TablesContext.Provider>
  );
};

export default TablesContextProvider;
