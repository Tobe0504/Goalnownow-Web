import React, { useState } from "react";
import classes from "../ScorePageMatches/ScorePageMatches.module.css";
import { MatchesContext } from "../../Context/MatchesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";
import { useNavigate } from "react-router-dom";

const FavoritedMatchContainer = (props) => {
  // Context
  const { showOdds } = useContext(MatchesContext);

  //   navigate
  const navigate = useNavigate();

  const [display, setDisplay] = useState(true);

  const getUserResults = (umbrellaArray) => {
    let firstParticipantResult = [];
    let secondParticipantResult = [];

    if (umbrellaArray && props.leagueEvent) {
      let eventParticipants = Object.values(umbrellaArray?.event_participants);

      //  results
      let firstParticipantResultKeys = Object.keys(
        eventParticipants[0]?.result
      );

      for (let i = 0; i < firstParticipantResultKeys.length; i++) {
        const currentResult =
          eventParticipants[0]?.result[firstParticipantResultKeys[i]];
        firstParticipantResult.push(currentResult);
      }
      let secondParticipantResultKeys = Object.keys(
        eventParticipants[1]?.result
      );

      for (let i = 0; i < secondParticipantResultKeys.length; i++) {
        const currentResult =
          eventParticipants[1]?.result[secondParticipantResultKeys[i]];
        secondParticipantResult.push(currentResult);
      }

      return { firstParticipantResult, secondParticipantResult };
    }
  };

  return (
    <>
      {props?.leagueEvent?.length > 0 ? (
        <div className={classes.leagueData}>
          <div
            className={classes.leagueHeader}
            onClick={() => {
              setDisplay(!display);
            }}
          >
            <div className={classes.leagueHeaderdata}>
              <div>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#ffd91b", cursor: "pointer" }}
                />
              </div>

              <div>
                <span>Favourited Matches</span>
                <span>Goalnownow</span>
              </div>
            </div>
            <div
              className={classes.leagueRouter}
              style={
                display
                  ? {
                      transform: "rotate(0deg)",
                      transition: "all .3s ease-in-out",
                    }
                  : {
                      transform: "rotate(90deg)",
                      transition: "all .3s ease-in-out",
                    }
              }
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
          <div
            className={classes.leagueGames}
            style={
              display
                ? {
                    maxHeight: "100vh",
                    overflowY: "hidden",
                    transition: "all .3s ease-in-out",
                  }
                : {
                    maxHeight: "0vh",
                    overflowY: "hidden",
                    transition: "all .3s ease-in-out",
                  }
            }
          >
            {props.leagueEvent?.map((datum, i) => {
              const results = getUserResults(datum);
              return (
                <div className={classes.leagueGamesOuter} key={datum.id}>
                  <div className={classes.leagueGame}>
                    <div
                      className={classes.time}
                      onClick={() => {
                        navigate(`/scores/${datum.id}/summary`);
                      }}
                    >
                      {datum.status_type === "finished" &&
                      Object.values(datum.elapsed)[0].elapsed === "90" ? (
                        "FT"
                      ) : datum.status_type === "inprogress" ? (
                        <div className={classes.timeLeft}>
                          {`${Object.values(datum.elapsed)[0].elapsed}'`}
                        </div>
                      ) : datum.status_type === "halftime" ? (
                        "HT"
                      ) : (
                        <div className={classes.matchTime}>
                          {datum.startdate.slice(11, 16)}
                        </div>
                      )}
                    </div>
                    <div
                      className={classes.clubNameSection}
                      onClick={() => {
                        navigate(`/scores/${datum.id}/summary`);
                      }}
                      style={{ width: "100%" }}
                    >
                      <div>
                        <span>
                          <TeamLogo
                            id={
                              Object.values(datum.event_participants)[0]
                                .participantFK
                            }
                          />
                        </span>
                        <span>{datum.name.split("-")[0]}</span>
                      </div>
                      <div>
                        <span>
                          <TeamLogo
                            id={
                              Object.values(datum.event_participants)[1]
                                .participantFK
                            }
                          />
                        </span>
                        <span>{datum.name.split("-")[1]}</span>
                      </div>
                    </div>
                    {showOdds && (
                      <div className={classes.oddsSection}>
                        <div>
                          <span>1</span>
                          <span>{0}</span>
                        </div>
                        <div>
                          <span>x</span>
                          <span>{0}</span>
                        </div>
                        <div>
                          <span>2</span>
                          <span>{0}</span>
                        </div>
                      </div>
                    )}
                    <div className={classes.scoresAndFavorites}>
                      {datum.status_type !== "notstarted" && (
                        <div>
                          <span>
                            {results?.firstParticipantResult[1].value}
                          </span>
                          <span>
                            {results?.secondParticipantResult[1].value}
                          </span>
                        </div>
                      )}

                      <div>
                        <FontAwesomeIcon
                          icon={faStar}
                          onClick={() => {
                            const newFeatured = props.leagueEvent.filter(
                              (data) => {
                                return data.id !== datum.id;
                              }
                            );
                            props.setLegueEvent(newFeatured);
                          }}
                          style={{ color: "#ffd91b", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.mobileOddSection}>
                    {showOdds && (
                      <div className={classes.oddsSectionMobile}>
                        <div>
                          <span>1</span>
                          <span>1.5</span>
                        </div>
                        <div>
                          <span>x</span>
                          <span>1.5</span>
                          <span>1.5</span>
                        </div>
                        <div>
                          <span>2</span>
                          <span>1.5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={classes.noMatches}>No favorited matches</div>
      )}
    </>
  );
};

export default FavoritedMatchContainer;
