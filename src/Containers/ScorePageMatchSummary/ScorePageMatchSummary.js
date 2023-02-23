import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchSummary.module.css";
import { matches } from "../../Utilities/matches";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageMatchSummary = () => {
  // params
  const { matchId } = useParams();

  // context
  const { fetchEventDetails, eventsDetails, eventParticipants } =
    useContext(MatchesContext);

  // useEffect
  useEffect(() => {
    fetchEventDetails(matchId);
    console.log(eventsDetails);
  }, []);

  if (eventsDetails.length > 0) {
    const participants = Object.keys(eventsDetails[0]?.event_participants).map(
      (key) => {
        return eventsDetails[0]?.event_participants[key];
      }
    );

    console.log(participants, "burst my head");

    const firstParticipantLineUp = () => {
      for (let i = 0; i < participants?.length; i++) {
        const arr = [];
        Object.keys(participants[i].lineup).map((data) => {
          console.log(data);
          arr.push(participants[i].lineup[data]);
        });
        return arr;
      }
    };
    console.log(
      firstParticipantLineUp(),
      "lineups",
      participants,
      "participants"
    );
  }
  // lineups
  // const eventParticipant1Lineups = Object.values(eventsDetails[0]?.lineup);
  // const eventParticipant2Lineups = Object.values(eventsDetails[1]?.lineup);
  // console.log(Object.keys(eventsDetails[0]?.event_participants), "hmm");

  const iconHandler = (event) => {
    if (event === "Goal") {
      return (
        <i>
          <FontAwesomeIcon icon={faFutbol} />
        </i>
      );
    }
    if (event === "Red Card") {
      return <div className={classes.redCard}></div>;
    }
    if (event === "Yellow Card") {
      return <div className={classes.yellowCard}></div>;
    }
    if (event === "Own Goal") {
      return (
        <div className={classes.ownGoal}>
          <span className={classes.ownGoalIndicator}>0WN</span>
          <span>
            <FontAwesomeIcon icon={faFutbol} />
          </span>
        </div>
      );
    }
    if (event === "Penalty") {
      return (
        <div className={classes.ownGoal}>
          <span className={classes.penalty}>PEN</span>
          <span>
            <FontAwesomeIcon icon={faFutbol} />
          </span>
        </div>
      );
    }
  };

  const outerRef = useRef(null);
  const [height, setHeight] = useState("");

  useLayoutEffect(() => {
    setHeight(outerRef?.current?.clientHeight);
  }, []);

  return (
    <ScorePageMatchLayout>
      {matches.map((data) => {
        return data.leagueMatches
          .filter((datum) => {
            return datum.id === matchId;
          })
          .map((datums) => {
            return (
              <div className={classes.container}>
                <div className={classes.time}>0</div>
                <div className={classes.layeredContainer}>
                  <div
                    className={classes.divider}
                    style={{ minHeight: `${height}px` }}
                  >
                    <div></div>
                  </div>
                  <div className={classes.summaryContainerOuter} ref={outerRef}>
                    <div className={classes.summaryContainer}>
                      {datums.summary?.map((summary) => {
                        return (
                          <div
                            key={summary.id}
                            className={`${classes.summary} ${
                              summary.type === "Home"
                                ? `${classes.summaryHome}`
                                : `${classes.summaryAway}`
                            }`}
                          >
                            {summary.type === "Home" ? (
                              <>
                                <div className={classes.summarySecond}>
                                  <div>{summary.by}</div>
                                  <div>{summary.event}</div>
                                </div>
                                <div className={classes.summaryFirstOuter}>
                                  <div className={classes.summaryFirst}>
                                    {iconHandler(summary.event)}
                                    <div>{`${summary.time}"`}</div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={classes.summaryFirstOuter}>
                                  <div className={classes.summaryFirst}>
                                    {iconHandler(summary.event)}
                                    <div>{`${summary.time}"`}</div>
                                  </div>
                                </div>
                                <div className={classes.summarySecond}>
                                  <div>{summary.by}</div>
                                  <div>{summary.event}</div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={classes.time}>90</div>
              </div>
            );
          });
      })}
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchSummary;
