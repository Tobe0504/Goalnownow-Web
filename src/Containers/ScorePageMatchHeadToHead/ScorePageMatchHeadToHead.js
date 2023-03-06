import React, { useContext } from "react";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchHeadToHead.module.css";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";
import { HeadToHeadContext } from "../../Context/HeadToHeadContext";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const ScorePageMatchHeadToHead = () => {
  // context
  const { headToHeadEvents } = useContext(HeadToHeadContext);

  // navigate
  const navigate = useNavigate();

  // utils

  const getUserResults = (umbrellaArray) => {
    let firstParticipantResult = [];
    let secondParticipantResult = [];

    if (umbrellaArray && headToHeadEvents) {
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

  // console.log(getAllDatesOfMonth("2023 - 04 - 06"));
  return (
    <ScorePageMatchLayout>
      <div className={classes.outerContainer}>
        {headToHeadEvents?.map((datum) => {
          const results = getUserResults(datum);

          return (
            <div className={classes.leagueData}>
              <div className={classes.leagueHeader}>
                <div className={classes.leagueHeaderdata}>
                  <div>
                    {/* <img
                      alt={data?.tournament_stage_name}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${props.leagueAbbv}.svg`}
                      className={classes.hmm}
                    /> */}
                  </div>

                  <div>
                    <span>{datum?.tournament_stage_name}</span>
                    <span>{datum?.tournament_template_name}</span>
                  </div>
                </div>
                <div className={classes.leagueRouter}>
                  {moment(datum.startdate)
                    .calendar()
                    .replace(/at 12:00 AM/g, "")}
                </div>
              </div>
              <div className={classes.leagueGames}>
                <div className={classes.leagueGamesOuter} key={datum.id}>
                  <div className={classes.leagueGame}>
                    <div
                      className={classes.time}
                      onClick={() => {
                        // navigate(`/scores/${datum.id}/summary`);
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchHeadToHead;
