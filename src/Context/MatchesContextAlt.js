import React, { createContext, useContext } from "react";
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
  } = useContext(MatchesContext);

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
        console.log(res, "specific match data");
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
  return (
    <MatchesContextAlt.Provider value={{ fetchSpecificMatchEventsAlt }}>
      {props.children}
    </MatchesContextAlt.Provider>
  );
};

export default MatchesContextAltProvider;
