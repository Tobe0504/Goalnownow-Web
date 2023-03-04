import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";
import { MatchesContext } from "./MatchesContext";

export const FixturesContext = createContext();

const FixturesContextProvider = (props) => {
  // State
  const [leagueDetails, setLeagueDetails] = useState([]);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [leagueIdforFetch, setLeagueIdForFetch] = useState();
  const [leagueTable, setLegueTable] = useState([]);

  // Utils
  const { formattedDate, currentTime, includeLive } =
    useContext(MatchesContext);

  // Fetch fixtures and events
  const fetchTournamentsEventsAndFixturesBasedOnLeague = (id) => {
    setIsSendingRequest(true);
    const includeLiveQueryParam = includeLive ? "&status_type=inprogress" : "";
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tz=${currentTime}&tournament_stageFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setIsSendingRequest(false);
        console.log(res, 202222);
        setLeagueDetails(Object.values(res.data.events));
      })
      .catch((err) => {
        setIsSendingRequest(false);
        console.log(err, 77777);
      });
  };

  const fetchSinglyLeagueTable = (id) => {
    setIsSendingRequest(true);
    setLegueTable([]);
    axios
      .get(
        `https://eapi.enetpulse.com//standing/liveleaguetable//?object=tournament_stage&objectFK=${id}&limit=20&offset=0&includeStandingParticipants=yes&includeStandingParticipantsProperties=yes&includeStandingData=yes&includeCountryCodes=no&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.log(res, 55555);
        setLegueTable(
          Object.values(
            Object.values(res.data.standings)[0].standing_participants
          )
        );
        setIsSendingRequest(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSendingRequest(false);
      });
  };

  return (
    <FixturesContext.Provider
      value={{
        fetchTournamentsEventsAndFixturesBasedOnLeague,
        leagueDetails,
        isSendingRequest,
        setLeagueDetails,
        leagueIdforFetch,
        setLeagueIdForFetch,
        fetchSinglyLeagueTable,
        leagueTable,
      }}
    >
      {props.children}
    </FixturesContext.Provider>
  );
};

export default FixturesContextProvider;
