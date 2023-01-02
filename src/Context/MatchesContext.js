import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";
import { countries } from "../Utilities/countries";

export const MatchesContext = createContext();

const MatchesContextProvider = (props) => {
  // state
  const [showOdds, setShowOdds] = useState(false);
  const [tournamentsTemplate, setTournamentsTemplate] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [leagueLoading, setLeagueLoading] = useState(false);
  const [countryNameFlag, setCountryNameFlag] = useState("");

  // fetch
  const fetchTournaents = () => {
    console.time("Timer");
    axios
      .get(
        `http://eapi.enetpulse.com/tournament_template/list/?sportFK=1&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.timeEnd("Timer");
        setTournamentsTemplate(
          Object.values(res.data.tournament_templates).map((data) => {
            return { ...data, isActive: false };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTournamentYear = (id) => {
    // setTournaments([]);
    setLeagues([]);
    console.time("timer");
    axios
      .get(
        `http://eapi.enetpulse.com/tournament/list/?tournament_templateFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.timeEnd("timer");
        setTournaments(
          Object.values(res.data.tournaments).filter((present) => {
            return present.name === "2022/2023";
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let presentTournamentId = tournaments[0]?.id;

  const fetchTournamentStage = () => {
    setLeagueLoading(true);
    setLeagues([]);
    axios
      .get(
        `http://eapi.enetpulse.com/tournament_stage/list/?tournamentFK=${presentTournamentId}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        setLeagues(Object.values(res.data.tournament_stages));

        setLeagueLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // get country flag
  let countryAbbreviation = countries?.filter((data) => {
    return data.name === countryNameFlag;
  })[0]?.code;

  useEffect(() => {
    fetchTournamentStage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentTournamentId]);

  return (
    <MatchesContext.Provider
      value={{
        showOdds,
        setShowOdds,
        fetchTournaents,
        tournamentsTemplate,
        setTournamentsTemplate,
        fetchTournamentYear,
        tournaments,
        setTournaments,
        fetchTournamentStage,
        leagues,
        setLeagues,
        leagueLoading,
        setCountryNameFlag,
        countryAbbreviation,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export default MatchesContextProvider;
