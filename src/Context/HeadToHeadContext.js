import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { enetPulseTokenId, enetPulseUsername } from "../Utilities/global";
import { MatchesContext } from "./MatchesContext";

export const HeadToHeadContext = createContext();

const HeadToHeadContextProvider = (props) => {
  // Context
  const { currentTime } = useContext(MatchesContext);

  //   State
  const [headToHeadEvents, setHeadToHeadEvents] = useState([]);

  // fetch h2h details for each match
  const fetchHeadToHeadData = (team1Id, team2Id) => {
    axios
      .get(
        `https://eapi.enetpulse.com/event/h2h/?participant1FK=${team1Id}&participant2FK=${team2Id}&includeVenue=yes&includeFirstLastName=yes&includeEventProperties=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setHeadToHeadEvents(Object.values(res.data.events));
      })
      .catch((err) => console.log(err));
  };

  return (
    <HeadToHeadContext.Provider
      value={{ fetchHeadToHeadData, headToHeadEvents }}
    >
      {props.children}
    </HeadToHeadContext.Provider>
  );
};

export default HeadToHeadContextProvider;
