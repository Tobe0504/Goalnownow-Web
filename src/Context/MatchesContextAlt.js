import axios from "axios";
import React, { createContext, useState } from "react";
import { apiAltKey } from "../Utilities/global";

export const MatchesContextAlt = createContext();

const MatchesContextAltProvider = (props) => {
  const [competitions, setCompetitions] = useState([]);
  const [competitionsLoading, setCompetitionLoading] = useState(false);

  const fetchCompetitions = () => {
    console.log(apiAltKey);
    axios
      .get(
        // `http://football.api.press.net/v1.5/competitions/competitions/${apiAltKey}`
        `http://football.api.press.net/v1.5/competitions/competitions/7zWYv38S`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MatchesContextAlt.Provider value={{ fetchCompetitions }}>
      {props.children}
    </MatchesContextAlt.Provider>
  );
};

export default MatchesContextAltProvider;
