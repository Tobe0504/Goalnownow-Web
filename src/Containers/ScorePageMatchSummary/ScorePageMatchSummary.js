import React, { useRef, useState, useLayoutEffect } from "react";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchSummary.module.css";
import { matches } from "../../Utilities/matches";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";

const ScorePageMatchSummary = () => {
  // params
  const { matchId } = useParams();

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
