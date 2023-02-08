import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";
import { countries } from "../Utilities/countries";
import moment from "moment/moment";

export const MatchesContext = createContext();

const MatchesContextProvider = (props) => {
  // state
  const [showOdds, setShowOdds] = useState(false);
  const [tournamentsTemplate, setTournamentsTemplate] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [leagueLoading, setLeagueLoading] = useState(false);
  const [countryNameFlag, setCountryNameFlag] = useState("");
  const [leagueParticipant, setLeagueParticipant] = useState([]);
  const [activeLeague, setActiveLeague] = useState([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(false);
  const [leagueMatches, setLeagueMatches] = useState([]);
  const [requiredDate, setRequiredDate] = useState(
    moment().format(moment.HTML5_FMT.DATE)
  );
  const [country, setCountry] = useState("");
  const [currentTime, setCurrentTime] = useState("Africa/Lagos");
  const [eventsDetails, setEventsDetails] = useState([]);

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

  //Get todays date
  const date = new Date();
  // console.log(date, "idk");

  // formatted with moment
  const formattedDate = moment(requiredDate).format(moment.HTML5_FMT.DATE);
  console.log(formattedDate);

  // Comments
  // fetch tournament template
  // Based on the heirachy, we are fetching the list of pssible tournaments on the API, which returns a list of tournaments based on their countries

  const fetchTournaents = () => {
    axios
      .get(
        `https://eapi.enetpulse.com/tournament_template/list/?sportFK=1&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        // converts response object to an array that makes it mapable then maps through it to give it an isActive state which is used to open each dropdown
        setTournamentsTemplate(
          Object.values(res.data.tournament_templates).map((data) => {
            return { ...data, isActive: false };
          })
        );
        console.log(res, "tournaments template");
      })
      // we catch any error
      .catch((err) => {
        console.log(err);
      });
  };

  // Comment
  // fetch tournament year. based on the api heirachy, after tournament templates, we are given a list of seasons (years),  ut because we are dealing with the present season, i passed in the id of each 22/23 season of each tournament template.
  // this is done so that we are automatically calling the present season of each tournament based on the scope of what the ui wants from us.
  const fetchTournamentYear = (id) => {
    // setTournaments([]);
    // at the start of the function, leagues is set to an empty array, this is for better user experience
    // setLeagues([]);
    // we fetch the 22/23 season by theur respective ids
    axios
      .get(
        `https://eapi.enetpulse.com/tournament/list/?tournament_templateFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        // we set tournaments to be an array which is filtered by current season. so for English 1 for instance, we are presenyed with the present premier league season.
        setTournaments(
          Object.values(res.data.tournaments).filter((present) => {
            return present.name === "2022/2023" || present.name === "2023";
          })
        );
        console.log(res, "tournaments");
      })
      .catch((err) => {
        console.log(err, "tournaments");
      });
  };

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
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=47&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.log(res.data.events, "EPL");
        setPremierLeagueEvents(
          Object.values(res.data.events).map((data) => {
            return { ...data, isFavourited: false };
          })
        );
        setPremierLeagueIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error from events");
        setPremierLeagueIsLoading(false);
      });

    // Spanish league
    axios
      .get(
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=87&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        // console.log(res);
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=53&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=54&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=55&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=42&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=73&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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
        `https://eapi.enetpulse.com/event/daily/?date=${formattedDate}&live=yes&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&tournament_templateFK=132&username=${enetPulseUsername}&token=${enetPulseTokenId}`
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

  useEffect(() => {
    fetchTournamentEvents();
  }, [formattedDate]);

  // get live events data
  const fetchEventDetails = (id) => {
    axios
      .get(
        `https://eapi.enetpulse.com/event/details/?id=${id}&includeLineups=yes&includeEventProperties=yes&includeTeamProperties=yes&includeIncidents=yes&includeExtendedResults=yes&includeProperties=yes&includeLivestats=yes&includeVenue=yes&includeCountryCodes=yes&includeDeleted=no&includeReference=yes&includeObjectParticipants=yes&includeEventIncidentRelation=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        // setEventsDetails(Object.values(res.data.events));
        console.log(res, "it workeddd broski");
      })
      .catch((err) => {
        console.log(err, "it didnt work broski");
      });
  };

  // Comment
  // because we are now grting to get the id of each current season (which should always be an array of one element based on the filter we did)
  let presentTournamentId = tournaments[0]?.id;

  const fetchTournamentStage = () => {
    // created a temporary loading state for leaguesloading
    setLeagueLoading(true);

    // leagues is set to an empty array at first then we are fetching based on the unique id's of each array
    setLeagues([]);

    console.log(tournaments[0]?.id);

    axios
      .get(
        `https://eapi.enetpulse.com/tournament_stage/list/?tournamentFK=${presentTournamentId}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
        // `https://eapi.enetpulse.com/tournament_stage/list/?tournamentFK=17664&includeVenue=yes&includeCountries=yes&includeProperties=yes&includeReference=yes&includeCountryCodes=no&tf=Y-m-dH:i:s&tz=${currentTime}&&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        // res.data is transformed to an array
        console.log(res);
        setLeagues(Object.values(res.data.tournament_stages));

        // the loading state is then set to false if we have a sucessful fetch
        setLeagueLoading(false);
      })
      .catch((err) => {
        console.log(err);

        // the loading state is then set to false if we have a failed fetch
        setLeagueLoading(false);
      });
  };

  useEffect(() => {
    fetchTournamentStage();
  }, [currentTime]);

  // get country flag
  // we are getting country flag based on a dummy array of countries and their abbreviations. this is used by the react-country-flags to get the flag of each country dynamically since the API doesnt necessarily provide for such
  let countryAbbreviation = countries?.filter((data) => {
    return data.name === countryNameFlag;
  })[0]?.code;

  // to run fetchtournamentstage everytime the present tournament id changes
  useEffect(() => {
    fetchTournamentStage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentTournamentId]);

  // fetch tournament events
  const fetchLeagueEvents = (id) => {
    setLeagueParticipant([]);
    setLeagueTableLoading(true);
    // console.log(leagues, id);
    let activeLeagueFilter = leagues?.filter((data) => {
      return data.id === id;
    });
    setActiveLeague(activeLeagueFilter);
    console.log(activeLeagueFilter, activeLeague, "roar");
    axios
      .get
      // `http://eapi.enetpulse.com/tournament_stage/participants/?id=${id}&includeProperties=yes&includeParticipantProperties=yes&includeCountries=yes&includeCountryCodes=yes&tz=Africa/Lagos&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      // `http://eapi.enetpulse.com/event/list/?includeEventProperties=yes&tournament_stageFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      ()
      .then((res) => {
        console.log(res.data, "Gra gra");
        setLeagueParticipant(
          Object.values(res.data.tournament_stages[id].participants)
        );
        setLeagueTableLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLeagueTableLoading(false);
      });
  };

  const fetchLeagueMatchesDataAndEvents = (id) => {
    axios
      .get(
        `http://eapi.enetpulse.com//event/list/?date=2023-01-19&live=no&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&includeFirstLastName=yes&includeDeleted=yes&tf=Y-m-dH:i:s&tz=Africa/Accra&tournament_stageFK=17664&username=${enetPulseUsername}&token=${enetPulseTokenId}
        
        // event/list/?includeEventProperties=yes&tournament_stageFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      )
      .then((res) => {
        console.log(res, 5000);

        setLeagueMatches(
          Object.values(res.data.events)
            .map((data) => {
              return { ...data, isFavorited: false };
            })
            .filter((data) => {
              return data.startdate.slice(0, 10) === formattedDate;
            })
        );
        console.log(leagueMatches, "1234");
      })
      .catch((err) => {
        console.log(err);
        // console.log(2345, id);
      });
  };

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
        fetchLeagueEvents,
        leagueParticipant,
        setLeagueParticipant,
        activeLeague,
        setActiveLeague,
        leagueTableLoading,
        fetchLeagueMatchesDataAndEvents,
        requiredDate,
        setRequiredDate,
        leagueMatches,
        setLeagueMatches,
        country,
        setCountry,
        currentTime,
        setCurrentTime,
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
        fetchEventDetails,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export default MatchesContextProvider;
