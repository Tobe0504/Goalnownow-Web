import React, { useContext, useEffect } from "react";
import classes from "./FeaturedMatch.module.css";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";
import { MatchesContextAlt } from "../../Context/MatchesContextAlt";

const FeaturedMatch = () => {
  // Context
  const {
    premierLeagueevents,
    frenchLeague,
    germanLeague,
    italianLeague,
    spanishLeague,
    championsLeague,
    europaLeague,
    faCup,
    fetchTournamentEvents,
  } = useContext(MatchesContextAlt);

  // Effects
  useEffect(() => {
    fetchTournamentEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Featured match conditionals

  let featuredMatch = [];

  if (championsLeague.length > 0) {
    featuredMatch = championsLeague;
  } else if (championsLeague.length < 1 && europaLeague.length > 0) {
    featuredMatch = europaLeague;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length > 0
  ) {
    featuredMatch = faCup;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length < 1 &&
    premierLeagueevents.length > 0
  ) {
    featuredMatch = premierLeagueevents;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length < 1 &&
    premierLeagueevents.length < 1 &&
    spanishLeague.length > 0
  ) {
    featuredMatch = 0;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length < 1 &&
    premierLeagueevents.length < 1 &&
    spanishLeague.length < 1 &&
    frenchLeague.length > 0
  ) {
    featuredMatch = frenchLeague;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length < 1 &&
    premierLeagueevents.length < 1 &&
    spanishLeague.length < 1 &&
    frenchLeague.length < 0 &&
    germanLeague.length > 0
  ) {
    featuredMatch = germanLeague;
  } else if (
    championsLeague.length < 1 &&
    europaLeague.length < 1 &&
    faCup.length < 1 &&
    premierLeagueevents.length < 1 &&
    spanishLeague.length < 1 &&
    frenchLeague.length < 1 &&
    germanLeague.length < 1 &&
    italianLeague.length > 0
  ) {
    featuredMatch = italianLeague;
  } else {
    featuredMatch = [];
  }

  return (
    <>
      {featuredMatch.length > 0 && (
        <div className={classes.container}>
          <div className={classes.header}>Featured Match</div>
          <div className={classes.scoreSection}>
            <div>
              {featuredMatch.length > 0 && (
                <div>
                  <TeamLogo
                    id={
                      Object.values(featuredMatch[0]?.event_participants)[0]
                        ?.participantFK
                    }
                  />
                </div>
              )}

              <span>{featuredMatch[0]?.name?.split("-")[0]}</span>
            </div>
            <div>
              <div>{featuredMatch[0]?.tournament_stage_name}</div>
              <div>
                {featuredMatch.length > 0 && (
                  <div>{`${
                    Object.values(
                      Object.values(featuredMatch[0]?.event_participants)[0]
                        ?.result
                    )[1]?.value || "-"
                  } : ${
                    Object.values(
                      Object.values(featuredMatch[0]?.event_participants)[1]
                        ?.result
                    )[1]?.value || "-"
                  }`}</div>
                )}
              </div>
              <div>
                {featuredMatch[0]?.status_type === "inprogress" && (
                  <span className={classes.liveIcon}></span>
                )}
                {featuredMatch.length > 0 && (
                  <span className={classes.matchStatus}>
                    {featuredMatch[0]?.status_type && (
                      <div>
                        {featuredMatch[0]?.status_type === "finished" && "FT"}
                      </div>
                    )}
                    {featuredMatch[0]?.status_type === "inprogress" ? (
                      <div>
                        {/* {`${Object.values(specificMatchData?.elapsed)[0]?.elapsed}'`} */}

                        {`${
                          Object.values(featuredMatch[0]?.elapsed)[0]?.elapsed
                        }${
                          Object.values(featuredMatch[0]?.elapsed)[0]
                            ?.injury_time_elapsed > 0
                            ? `+${
                                Object.values(featuredMatch[0]?.elapsed)[0]
                                  ?.injury_time_elapsed
                              }`
                            : ""
                        }'`}
                      </div>
                    ) : (
                      <div className={classes.matchTime}>
                        {featuredMatch[0]?.startdate.slice(11, 16)}
                      </div>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div>
              {featuredMatch.length > 0 && (
                <div>
                  <TeamLogo
                    id={
                      Object.values(featuredMatch[0]?.event_participants)[1]
                        ?.participantFK
                    }
                  />
                </div>
              )}
              <span>{featuredMatch[0]?.name?.split("-")[1]}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedMatch;
