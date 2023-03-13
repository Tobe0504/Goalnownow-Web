import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";
import { MatchesContext } from "./MatchesContext";

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
  const { currentTime } = useContext(MatchesContext);
  const [teamData, setTeamData] = useState();

  const fetchTeamData = (teamID) => {
    setTeamData();
    axios
      .get(
        `http://demo.eapi.enetpulse.com/team/details/?id=${teamID}&includeTeamProperties=yes&includeSquad=yes&includeSquadProperties=yes&includeSquadDetails=yes&includeLeagues=yes&includeLeaguesProperties=yes&includeVenue=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        console.log(res, "team stuff");
        setTeamData(res.data.team[teamID]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TeamContext.Provider value={{ fetchTeamData, teamData }}>
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamContextProvider;
