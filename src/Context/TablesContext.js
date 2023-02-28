import axios from "axios";
import React, { createContext, useState } from "react";
import { enetPulseTokenId, enetPulseUsername } from "../Utilities/global";

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
    // Set states
    setPremierLeagueTable([]);
    setGermanLeagueTable([]);
    setFrenchLeagueTable([]);
    setItalianLeagueTable([]);
    setGermanLeagueTable([]);

    // Loading states
    setpremierLeagueTableIsLoading(true);
    setGermanLeagueIsLoading(true);
    setItalianLeagueIsLoading(true);
    setFrenchLeagueIsLoading(true);
    setSpanishLeagueIsLoading(true);

    // premier league
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable//?object=tournament_stage&objectFK=879290&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setPremierLeagueTable(
          Object.values(res.data.standings[391022].standing_participants)
        );
        setpremierLeagueTableIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // spanish league
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable//?object=tournament_stage&objectFK=880043&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setSpanishLeagueTable(
          Object.values(res.data.standings[393834].standing_participants)
        );
        setSpanishLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // french league
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable//?object=tournament_stage&objectFK=879865&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setFrenchLeagueTable(
          Object.values(res.data.standings[393198].standing_participants)
        );
        setFrenchLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // German League
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable/?object=tournament_stage&objectFK=879853&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setGermanLeagueTable(
          Object.values(res.data.standings[393092].standing_participants)
        );
        setGermanLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // Italian League
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable/?object=tournament_stage&objectFK=880067&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setItalianLeagueTable(
          Object.values(res.data.standings[394010].standing_participants)
        );
        setItalianLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // Champions League
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable/?object=tournament_stage&objectFK=880067&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setItalianLeagueTable(
          Object.values(res.data.standings[394010].standing_participants)
        );
        setItalianLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TablesContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </TablesContext.Provider>
  );
};

export default TablesContextProvider;
