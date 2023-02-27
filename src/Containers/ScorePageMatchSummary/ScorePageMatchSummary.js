import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchSummary.module.css";
import { matches } from "../../Utilities/matches";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScorePageMatchSummary = () => {
  // params
  const { matchId } = useParams();

  // context
  const {
    fetchEventDetails,
    eventsDetails,
    eventParticipants,
    getSummaryStatisEventType,
    eventStaticDataType,
    fetchSpecificMatchEvents,
    eventIncidents,
    getEventDescriptionType,
    firstParticipantIncidents,
    secondParticipantIncidents,
  } = useContext(MatchesContext);

  // useEffect
  useEffect(() => {
    fetchEventDetails(matchId);
    getSummaryStatisEventType();
    console.log(eventStaticDataType, eventIncidents, "static data type");
    console.log(eventsDetails);
    fetchSpecificMatchEvents(matchId);
  }, []);

  useEffect(() => {
    console.log(eventStaticDataType, eventIncidents, "static data type");
  }, [eventStaticDataType]);

  const iconHandler = (event) => {
    if (event === "Regular Ggal") {
      return (
        <i>
          <FontAwesomeIcon icon={faFutbol} />
        </i>
      );
    }
    if (event === "Red card") {
      return <div className={classes.redCard}></div>;
    }
    if (event === "Yellow card" || event === "Yellow card 2") {
      return <div className={classes.yellowCard}></div>;
    }
    if (event === "Own goal") {
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
          <span className={classes.penalty}>NORM</span>
          <span>
            <FontAwesomeIcon icon={faFutbol} />
          </span>
        </div>
      );
    }
    if (event === "Penalty") {
      return (
        <div className={classes.ownGoal}>
          <span className={classes.penalty}>NORM</span>
          <span>
            <FontAwesomeIcon icon={faFutbol} />
          </span>
        </div>
      );
    }
    if (event === "Substitution in") {
      return (
        <div>
          <span>
            <FontAwesomeIcon icon={faArrowUp} color="#11d36f" />
          </span>
        </div>
      );
    }
    if (event === "Substitution out") {
      return (
        <div>
          <span>
            <FontAwesomeIcon icon={faArrowDown} color="#f50100" />
          </span>
        </div>
      );
    } else {
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
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(outerRef?.current?.clientHeight);
  }, [eventIncidents]);

  return (
    <ScorePageMatchLayout>
      <div className={classes.container}>
        <div className={classes.time}>0</div>
        <div className={classes.layeredContainer}>
          <div className={classes.divider} style={{ minHeight: `${height}px` }}>
            <div></div>
          </div>
          <div className={classes.summaryContainerOuter} ref={outerRef}>
            {eventIncidents.length > 0 && (
              <div className={classes.summaryContainer}>
                {eventIncidents
                  ?.sort((a, b) => a.elapsed - b.elapsed)
                  ?.map((summary) => {
                    return (
                      <div
                        key={summary?.newFrontendId}
                        className={`${classes.summary} ${
                          summary.tag === "home"
                            ? `${classes.summaryHome}`
                            : `${classes.summaryAway}`
                        }`}
                      >
                        {summary.tag === "home" ? (
                          <>
                            <div className={classes.summarySecond}>
                              <div>{summary?.participant?.name}</div>
                              <div>
                                {
                                  getEventDescriptionType(
                                    summary?.incident_typeFK
                                  ).name
                                }
                              </div>
                            </div>
                            <div className={classes.summaryFirstOuter}>
                              <div className={classes.summaryFirst}>
                                {iconHandler(
                                  getEventDescriptionType(
                                    summary?.incident_typeFK
                                  ).name
                                )}
                                <div>{`${summary.elapsed}"`}</div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={classes.summaryFirstOuter}>
                              <div className={classes.summaryFirst}>
                                {iconHandler(
                                  getEventDescriptionType(
                                    summary?.incident_typeFK
                                  ).name
                                )}
                                <div>{`${summary.elapsed}"`}</div>
                              </div>
                            </div>
                            <div className={classes.summarySecond}>
                              <div>{summary?.participant?.name}</div>
                              <div>
                                {
                                  getEventDescriptionType(
                                    summary?.incident_typeFK
                                  ).name
                                }
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className={classes.time}>90</div>
      </div>
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchSummary;
