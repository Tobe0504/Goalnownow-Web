import React, { createContext, useContext, useState } from "react";
import moment from "moment/moment";
import { v4 } from "uuid";
import { MatchesContext } from "./MatchesContext";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";

export const MatchesContextAlt = createContext();

const MatchesContextAltProvider = (props) => {
  const {
    setEventIncidents,
    setSecondParticipantResults,
    setIsSendingRequest,
    setEventParticipants,
    setFirstParticipantResults,
    currentTime,
    setSpecificmatchData,
    setStadium,
    setMatchCommentary,
  } = useContext(MatchesContext);

  // Major leaguue events and fixtures
  const [premierLeagueevents, setPremierLeagueEvents] = useState([]);
  const [premierLeagueIsLoading, setPremierLeagueIsLoading] = useState(false);

  const [spanishLeague, setSpanishLeague] = useState([]);
  const [spanishLeagueIsLoading, setSpanishLeagueIsLoading] = useState(false);

  const [germanLeague, setGermanLeague] = useState([]);
  const [germanLeagueIsLoading, setGermanLeagueIsLoading] = useState(false);

  const [frenchLeague, setFrenchLeague] = useState([]);
  const [frenchLeagueIsLoading, setFrenchLeagueIsLoading] = useState(false);

  const [italianLeague, setItalianLeague] = useState([]);
  const [italianLeagueIsLoading, setItalianLeagueIsLoading] = useState(false);

  const [europaLeague, setEuropaLeague] = useState([]);
  const [europaLeagueIsLoading, setEuropaLeagueIsLoading] = useState(false);

  const [championsLeague, setChampionsLeague] = useState([]);
  const [championsLeagueIsLoading, setChampionsLeagueIsLoading] =
    useState(false);

  const [faCup, setFaCup] = useState([]);
  const [faCupIsLoading, setFaCupIsLoading] = useState(false);

  const [includeLive] = useState(false);
  const [requiredDate] = useState(moment().format(moment.HTML5_FMT.DATE));
  const formattedDate = moment(requiredDate).format(moment.HTML5_FMT.DATE);

  const fetchSpecificMatchEventsAlt = (id) => {
    let firstParticipantIncidents = [];
    let secondParticipantIncidents = [];
    // let firstParticipantScopeResult = [];
    // let secondParticipantScopeResult = [];

    axios
      .get(
        `https://eapi.enetpulse.com/event/details/?id=${id}&includeLineups=yes&includeEventProperties=yes&includeTeamProperties=yes&includeIncidents=yes&includeExtendedResults=yes&includeProperties=yes&includeLivestats=yes&includeVenue=yes&includeCountryCodes=yes&includeFirstLastName=no&includeReference=yes&includeObjectParticipants=yes&includeEventIncidentRelation=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setSpecificmatchData(res.data.event[id]);
        setEventParticipants(
          Object.values(res.data.event[id].event_participants)
        );

        // First participants results keys
        let firstParticipantResultKeys = [];
        let secondParticipantResultKeys = [];

        // Scope results (if its a two legged knockout staged match)
        // let firstParticipantScopeResultKey = [];
        // let secondParticipantScopeResultKey = [];

        // stadium
        setStadium(Object.values(res.data.event[id].venue)[0].name);

        //  results
        firstParticipantResultKeys = Object.keys(
          Object.values(res.data.event[id].event_participants)[0].result || []
        );

        for (let i = 0; i < firstParticipantResultKeys.length; i++) {
          const currentResult = Object.values(
            res.data.event[id].event_participants
          )[0]?.result[firstParticipantResultKeys[i]];
          setFirstParticipantResults((prevState) => [
            ...prevState,
            currentResult,
          ]);
        }

        firstParticipantIncidents = Object.values(
          Object.values(Object.values(res.data.event)[0].event_participants)[0]
            .incident || []
        ).map((data) => {
          return { ...data, tag: "home", newFrontendId: v4() };
        });
        secondParticipantIncidents = Object.values(
          Object.values(Object.values(res.data.event)[0].event_participants)[1]
            .incident
        ).map((data) => {
          return { ...data, tag: "away", newFrontendId: v4() };
        });

        setEventIncidents([
          ...firstParticipantIncidents,
          ...secondParticipantIncidents,
        ]);

        secondParticipantResultKeys = Object.keys(
          Object.values(res.data.event[id].event_participants)[1]?.result
        );

        for (let i = 0; i < secondParticipantResultKeys.length; i++) {
          const currentResult = Object.values(
            res.data.event[id].event_participants
          )[1]?.result[secondParticipantResultKeys[i]];
          setSecondParticipantResults((prevState) => [
            ...prevState,
            currentResult,
          ]);
        }

        // if (
        //   Object.values(res.data.event[id].event_participants)[0]?.scope_result
        // ) {
        //   // scope result
        //   firstParticipantScopeResultKey = Object.keys(
        //     Object.values(res.data.event[id].event_participants)[0]
        //       ?.scope_result
        //   );

        //   for (let i = 0; i < firstParticipantScopeResultKey?.length; i++) {
        //     firstParticipantScopeResult =
        //       eventParticipants[0]?.scope_result[
        //         firstParticipantScopeResultKey[i]
        //       ];
        //   }
        //   secondParticipantScopeResultKey = Object.keys(
        //     Object.values(res.data.event[id].event_participants)[1]
        //       ?.scope_result
        //   );
        //   for (let i = 0; i < secondParticipantScopeResultKey.length; i++) {
        //     secondParticipantScopeResult =
        //       eventParticipants[0]?.scope_result[
        //         secondParticipantScopeResultKey[i]
        //       ];
        //   }
        // }

        setIsSendingRequest(false);
      })
      .catch((err) => {
        console.log(err, "specific match data");
        setIsSendingRequest(false);
      });
  };

  const fetchMatchCommentaryAlt = (id) => {
    axios
      .get(
        `http://eapi.enetpulse.com/event/commentaries/?id=${id}&limit=100&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setMatchCommentary(Object.values(res.data.event)[0].event_incident);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch festured match for the day
  const fetchTournamentEvents = () => {
    setPremierLeagueIsLoading(true);
    setSpanishLeagueIsLoading(true);
    setFrenchLeagueIsLoading(true);
    setGermanLeagueIsLoading(true);
    setItalianLeagueIsLoading(true);
    setChampionsLeagueIsLoading(true);
    setEuropaLeagueIsLoading(true);
    setFaCupIsLoading(true);
    setPremierLeagueEvents([]);
    setSpanishLeague([]);
    setFrenchLeague([]);
    setGermanLeague([]);
    setItalianLeague([]);
    setChampionsLeague([]);
    setEuropaLeague([]);
    setFaCup([]);
    // Premier league

    const includeLiveQueryParam = includeLive ? "&status_type=inprogress" : "";

    const premierLeagueLink = `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tz=${currentTime}&tournament_templateFK=47&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`;

    axios
      .get(premierLeagueLink)
      .then((res) => {
        setPremierLeagueEvents(Object.values(res.data.events));

        setPremierLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from events");
        setPremierLeagueIsLoading(false);
      });

    // Spanish league
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=87&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setSpanishLeague(Object.values(res.data.events));
        setSpanishLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from events");
        setSpanishLeagueIsLoading(false);
      });

    // French Leagues
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=53&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setFrenchLeague(Object.values(res.data.events));
        setFrenchLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from events");
        setFrenchLeagueIsLoading(false);
      });

    // German Leagues
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=54&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setGermanLeague(Object.values(res.data.events));
        setGermanLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from events");
        setGermanLeagueIsLoading(false);
      });

    // italian league
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=55&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setItalianLeague(Object.values(res.data.events));
        setItalianLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "italian");
        setItalianLeagueIsLoading(false);
      });

    // champions league
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=42&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setChampionsLeague(Object.values(res.data.events));
        setChampionsLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "champions");
        setChampionsLeagueIsLoading(false);
      });

    // europa league
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=73&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setEuropaLeague(Object.values(res.data.events));
        setEuropaLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "italian");
        setEuropaLeagueIsLoading(false);
      });

    // fa cup
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}${includeLiveQueryParam}&live=yes&includeVenue=yes&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=132&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setFaCup(Object.values(res.data.events));
        setFaCupIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "italian");
        setFaCupIsLoading(false);
      });
  };

  return (
    <MatchesContextAlt.Provider
      value={{
        fetchSpecificMatchEventsAlt,
        fetchMatchCommentaryAlt,
        fetchTournamentEvents,
        premierLeagueevents,
        setPremierLeagueEvents,
        frenchLeague,
        setFrenchLeague,
        germanLeague,
        setGermanLeague,
        premierLeagueIsLoading,
        germanLeagueIsLoading,
        frenchLeagueIsLoading,
        italianLeagueIsLoading,
        italianLeague,
        setItalianLeague,
        spanishLeague,
        setSpanishLeague,
        spanishLeagueIsLoading,
        championsLeague,
        setChampionsLeague,
        championsLeagueIsLoading,
        europaLeague,
        setEuropaLeague,
        europaLeagueIsLoading,
        faCup,
        faCupIsLoading,
        setFaCup,
      }}
    >
      {props.children}
    </MatchesContextAlt.Provider>
  );
};

export default MatchesContextAltProvider;
