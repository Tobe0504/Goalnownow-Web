import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { enetPulseUsername, enetPulseTokenId } from "../Utilities/global";
import { countries } from "../Utilities/countries";
import moment from "moment/moment";
import { v4 } from "uuid";
import { incidentTypes } from "../Utilities/incidentTypes";

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

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const [country, setCountry] = useState("");
  const [currentTime, setCurrentTime] = useState(timeZone);
  const [eventsDetails, setEventsDetails] = useState([]);
  const [eventProperties, setEventProperties] = useState([]);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [matchStatistics, setMatchStatistics] = useState([]);
  const [matchDataCombinedToFit, setMatchDataCombinedToFit] = useState([]);
  const [isloadingMatchStatistics, setIsLoadingMatchStatistics] =
    useState(false);
  const [specificMatchData, setSpecificmatchData] = useState();
  const [eventStaticDataType, setEventStaticDataType] = useState([]);
  const [matchCommentary, setMatchCommentary] = useState([]);

  const [eventIncidents, setEventIncidents] = useState([]);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [statusType, setStatusType] = useState(false);
  const [favouritedMatches, setFavouritedMatches] = useState([]);
  const [includeLive, setIncludeLive] = useState(false);

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

  // formatted with moment
  const formattedDate = moment(requiredDate).format(moment.HTML5_FMT.DATE);

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

  useEffect(() => {
    fetchTournamentEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedDate, statusType, includeLive]);

  //State

  const [firstParticipantLineup, setFirstParticipantLineup] = useState([]);
  const [secondParticipantLineup, setSecondParticipantLineup] = useState([]);
  // const [firstParticipantResult, setFirstParticipantResult] = useState([]);
  // const [secondParticipantResult, setSecondParticipantResult] = useState([]);
  // get live events data

  // let firstParticipantScopeResult;
  // let secondParticipantScopeResult;
  const fetchEventDetails = (id) => {
    axios
      .get(
        `https://eapi.enetpulse.com/event/details/?id=${id}&includeLineups=yes&includeEventProperties=yes&includeTeamProperties=yes&includeIncidents=yes&includeExtendedResults=yes&includeProperties=yes&includeLivestats=yes&includeVenue=yes&includeCountryCodes=yes&includeDeleted=no&includeReference=yes&includeObjectParticipants=yes&includeEventIncidentRelation=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setEventsDetails(Object.values(res.data.event));
        setEventParticipants(
          Object.values(res.data.event[id].event_participants)
        );

        setEventProperties(
          Object.values(Object.values(res.data.event[id].property))
        );
        // Operations

        setFirstParticipantLineup(
          Object.values(
            Object.values(res.data.event[id].event_participants)[0]?.lineup
          )
        );

        setSecondParticipantLineup(
          Object.values(
            Object.values(res.data.event[id].event_participants)[1]?.lineup
          )
        );

        // let firstParticipantResultKeys = [];
        // let secondParticipantResultKeys = [];

        // Results

        // Scope results (if its a two legged knockout staged match)
        // let firstParticipantScopeResultKey = [];
        // let secondParticipantScopeResultKey = [];

        //  results
        // firstParticipantResultKeys = Object.keys(
        //   res.data.event[id].event_participants[0]?.result
        // );

        // for (let i = 0; i < firstParticipantResultKeys.length; i++) {
        //   const currentResult =
        //     res.data.event[id].event_participants[0]?.result[
        //       firstParticipantResultKeys[i]
        //     ];
        //   setFirstParticipantResult(currentResult);
        // }
        // secondParticipantResultKeys = Object.keys(eventParticipants[1]?.result);

        // for (let i = 0; i < secondParticipantResultKeys.length; i++) {
        //   const currentResult =
        //     res.data.event[id].event_participants[1]?.result[
        //       secondParticipantResultKeys[i]
        //     ];
        //   setSecondParticipantResult(currentResult);
        // }

        // scope result
        // firstParticipantScopeResultKey = Object.keys(
        //   eventParticipants[0]?.scope_result
        // );

        // for (let i = 0; i < firstParticipantScopeResultKey.length; i++) {
        //   firstParticipantScopeResult =
        //     res.data.event[id].event_participants[0]?.scope_result[
        //       firstParticipantScopeResultKey[i]
        //     ];
        // }
        // secondParticipantScopeResultKey = Object.keys(
        //   res.data.event[id].event_participants[1]?.scope_result
        // );
        // for (let i = 0; i < secondParticipantScopeResultKey.length; i++) {
        //   secondParticipantScopeResult =
        //     res.data.event[id].event_participants[0]?.scope_result[
        //       secondParticipantScopeResultKey[i]
        //     ];
        // }
      })
      .catch((err) => {
        console.log(err, "it didnt work");
      });
  };

  useEffect(() => {
    fetchTournamentEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  // Match lineups

  // First participants results keys

  const [firstParticipantResults, setFirstParticipantResults] = useState([]);
  const [secondParticipantResults, setSecondParticipantResults] = useState([]);

  const [stadium, setStadium] = useState("");

  const getEventDescriptionType = (id) => {
    const eventDescription = incidentTypes?.find((data) => {
      return data.id === id;
    });
    return eventDescription;
  };

  const fetchSpecificMatchEvents = (id) => {
    setIsSendingRequest(true);
    setEventParticipants([]);
    setFirstParticipantResults([]);
    setSecondParticipantResults([]);
    setEventIncidents([]);

    let firstParticipantIncidents = [];
    let secondParticipantIncidents = [];

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
          Object.values(res.data.event[id].event_participants)[0].result
        );

        // incidents

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
          Object.values(
            Object.values(res?.data?.event)[0]?.event_participants
          )[0]?.incident || []
        ).map((data) => {
          return { ...data, tag: "home", newFrontendId: v4() };
        });
        secondParticipantIncidents = Object.values(
          Object.values(Object.values(res.data.event)[0]?.event_participants)[1]
            ?.incident || []
        )?.map((data) => {
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

  // fetch match statistics
  const fetchMatchStatistics = (id) => {
    setIsLoadingMatchStatistics(true);
    setMatchStatistics([]);
    setMatchDataCombinedToFit([]);
    axios
      .get(
        `https://eapi.enetpulse.com/standing/event_stats/?object=event&objectFK=${id}&includeStandingParticipants=yes&includeStandingConfig=yes&includeStandingData=yes&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setMatchStatistics([]);
        const standingsKey = Object.keys(res.data.standings);

        for (let i = 0; i < standingsKey.length; i++) {
          setMatchStatistics(
            Object.values(
              res.data.standings[standingsKey].standing_participants
            )
          );
        }
        setIsLoadingMatchStatistics(false);
      })
      .catch((err) => {
        console.log(err, "statistics");
        setIsLoadingMatchStatistics(false);
      });
  };

  useEffect(() => {
    const homeTeamIndex = 0;
    const awayTeamIndex = 1;

    const codesToInclude = [
      { code: "shoton", name: "Shots on target" },
      { code: "possession", name: "Possession (%)" },
      { code: "foulcommit", name: "Fouls" },
      { code: "corner", name: "Corners" },
      { code: "offside", name: "Offsides" },
      { code: "yellow_cards", name: "Yellow Cards" },
      { code: "red_cards", name: "Red Cards" },
      { code: "shotoff", name: "Shots off target" },
      { code: "saves", name: "Saves" },
      { code: "goal_attempt", name: "Attempts on goal" },
    ];

    const resultArray = codesToInclude.map((code) => {
      const homeTeamValue = matchStatistics[homeTeamIndex]?.standing_data?.find(
        (data) => data.code === code.code
      )?.value;
      const awayTeamValue = matchStatistics[awayTeamIndex]?.standing_data?.find(
        (data) => data.code === code.code
      )?.value;

      return {
        code: code.code,
        homeValue: homeTeamValue,
        awayValue: awayTeamValue,
        name: code.name,
      };
    });
    setMatchDataCombinedToFit(resultArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchStatistics]);

  // get match commetary
  const fetchMatchCommentary = (id) => {
    setMatchCommentary([]);
    axios
      .get(
        `http://eapi.enetpulse.com/event/commentaries/?id=${id}&limit=100&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        console.log(res, "commentary");
        setMatchCommentary(Object.values(res.data.event)[0].event_incident);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get static data type for events
  const getSummaryStatisEventType = () => {
    axios
      .get(
        `http://eapi.enetpulse.com/static/incident_type/?username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setEventStaticDataType(Object.values(res.data.incident_type));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTeamImageAndLogo = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://eapi.enetpulse.com/image/team_logo/?teamFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
        )
        .then((res) => {
          const imageCode = Object.values(res.data.images)[0].value;
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
          img.src = `data:image/png;base64,${imageCode}`;
        })
        .catch((err) => reject(err));
    });
  };

  // Comment
  // because we are now grting to get the id of each current season (which should always be an array of one element based on the filter we did)
  let presentTournamentId = tournaments[0]?.id;

  const fetchTournamentStage = () => {
    // created a temporary loading state for leaguesloading
    setLeagueLoading(true);

    // leagues is set to an empty array at first then we are fetching based on the unique id's of each array
    // setLeagues([]);

    axios
      .get(
        `https://eapi.enetpulse.com/tournament_stage/list/?tournamentFK=${presentTournamentId}&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        // res.data is transformed to an array
        setLeagues(Object.values(res.data.tournament_stages));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let activeLeagueFilter = leagues?.filter((data) => {
      return data.id === id;
    });
    setActiveLeague(activeLeagueFilter);
    axios
      .get
      // `http://eapi.enetpulse.com/tournament_stage/participants/?id=${id}&includeProperties=yes&includeParticipantProperties=yes&includeCountries=yes&includeCountryCodes=yes&tz=Africa/Lagos&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      // `http://eapi.enetpulse.com/event/list/?includeEventProperties=yes&tournament_stageFK=${id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
      ()
      .then((res) => {
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
        `http://eapi.enetpulse.com/event/list/?date=2023-01-19&live=no&includeVenue=yes&status_type=notstarted&includeEventProperties=yes&includeCountryCodes=no&includeFirstLastName=yes&includeDeleted=yes&tf=Y-m-dH:i:s&tz=Africa/Accra&tournament_stageFK=17664&username=${enetPulseUsername}&token=${enetPulseTokenId}&tz=${currentTime}`
      )
      .then((res) => {
        setLeagueMatches(
          Object.values(res.data.events)
            .map((data) => {
              return { ...data, isFavorited: false };
            })
            .filter((data) => {
              return data.startdate.slice(0, 10) === formattedDate;
            })
        );
      })
      .catch((err) => {
        console.log(err);
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
        eventsDetails,
        eventProperties,
        eventParticipants,
        firstParticipantLineup,
        secondParticipantLineup,
        fetchMatchStatistics,
        matchDataCombinedToFit,
        isloadingMatchStatistics,
        fetchSpecificMatchEvents,
        specificMatchData,
        isSendingRequest,
        firstParticipantResults,
        secondParticipantResults,
        eventIncidents,
        setEventIncidents,
        stadium,
        getSummaryStatisEventType,
        eventStaticDataType,
        getEventDescriptionType,
        getTeamImageAndLogo,
        formattedDate,
        setSpecificmatchData,
        setEventParticipants,
        setStadium,
        setFirstParticipantResults,
        setSecondParticipantResults,
        setIsSendingRequest,
        statusType,
        setStatusType,
        fetchMatchCommentary,
        matchCommentary,
        favouritedMatches,
        setFavouritedMatches,
        includeLive,
        setIncludeLive,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export default MatchesContextProvider;
