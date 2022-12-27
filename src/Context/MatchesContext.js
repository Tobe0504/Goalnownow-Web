import React, { createContext, useState } from "react";

export const MatchesContext = createContext();

const MatchesContextProvider = (props) => {
  const [showOdds, setShowOdds] = useState(false);
  return (
    <MatchesContext.Provider value={{ showOdds, setShowOdds }}>
      {props.children}
    </MatchesContext.Provider>
  );
};

export default MatchesContextProvider;
