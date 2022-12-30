import React, { createContext, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";

export const MatchesContext = createContext();

const MatchesContextProvider = (props) => {
  // state
  const [showOdds, setShowOdds] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  // fetch
  const fetchTournaents = () => {
    axios
      .get(
        `http://eapi.enetpulse.com/tournament_stage/list/?tournamentFK=48&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.log(res);
        setTournaments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MatchesContext.Provider
      value={{ showOdds, setShowOdds, fetchTournaents, tournaments }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export default MatchesContextProvider;
