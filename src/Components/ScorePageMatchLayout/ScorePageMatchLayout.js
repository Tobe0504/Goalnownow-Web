import React, { useContext, useEffect } from "react";
import classes from "./ScorePageMatchLayout.module.css";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useParams } from "react-router-dom";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { MatchesContext } from "../../Context/MatchesContext";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

const ScorePageMatchLayout = (props) => {
  // params
  const { matchId } = useParams();

  // context
  const {
    fetchSpecificMatchEvents,
    specificMatchData,
    eventParticipants,
    isSendingRequest,
    firstParticipantResults,
    secondParticipantResults,
    stadium,
  } = useContext(MatchesContext);

  // states
  // const [eventParticipants, setEventParticipants] = useState([]);

  // effecfs
  useEffect(() => {
    fetchSpecificMatchEvents(matchId);
  }, []);

  // utils

  useEffect(() => {
    // console.log(specificMatchData, "specific match data in the layout");

    console.log(
      specificMatchData,
      firstParticipantResults,
      secondParticipantResults,
      "resultsss"
    );
  }, [specificMatchData]);

  //   utils
  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  const scorePageMatchNavItems = [
    {
      id: v4(),
      title: "Summary",
      isActive: false,
      route: `/scores/${matchId}/summary`,
    },

    {
      id: v4(),
      title: "Line Up",
      isActive: false,
      route: `/scores/${matchId}/line-up`,
    },

    {
      id: v4(),
      title: "Statistics",
      isActive: false,
      route: `/scores/${matchId}/statistics`,
    },

    {
      id: v4(),
      title: "Odds",
      isActive: false,
      route: `/scores/${matchId}/odds`,
    },
  ];

  return (
    <ScorePageLayout>
      {isSendingRequest ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.firstSection}>
              <div className={classes.titleContainer}>
                {specificMatchData?.tournament_stage_name}
              </div>
              <div className={classes.logoAndScoreSection}>
                <div>
                  <div>
                    <img src={clubLogoHandler(null)} alt="Club Logo" />
                  </div>
                  <div>{specificMatchData?.name?.split("-")[0]}</div>
                </div>

                <div className={classes.scoreSection}>
                  <div>{`${firstParticipantResults[1]?.value} : ${secondParticipantResults[1]?.value}`}</div>
                  <div>
                    {specificMatchData.status_type === "finished"
                      ? "FT"
                      : `First Half`}
                  </div>
                  {!specificMatchData.status_type === "finished" && (
                    <div>21’</div>
                  )}
                  <div className={classes.lineDecoration}>
                    <div>
                      <div></div>
                      <div></div>
                    </div>

                    <div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={clubLogoHandler(null)} alt="Club Logo" />
                  </div>
                  <div>{specificMatchData?.name?.split("-")[1]}</div>
                </div>
              </div>
              <div className={classes.audioCommentry}>
                <div></div>
                <div></div>
                {stadium && <div>Venue: {stadium}</div>}
              </div>
              {/* <div className={classes.matchEvents}>
                        {datums.events?.map((event) => {
                          return (
                            <div className={classes.matchEvent}>
                              <div>
                                <FontAwesomeIcon
                                  icon={faFutbol}
                                  color="#FFD91B"
                                  fontSize="1.5rem"
                                />
                              </div>
                              <div>{`${event.gialTime} ${event.goalsBy}`}</div>
                            </div>
                          );
                        })}
                      </div> */}
            </div>
            <div className={classes.navSection}>
              {scorePageMatchNavItems.map((data) => {
                return (
                  <Link
                    key={data.id}
                    to={data.route}
                    className={
                      window.location.href.includes(data.route)
                        ? `${classes.activeNav}`
                        : undefined
                    }
                  >
                    {window.location.href.includes(data.route) && (
                      <div className={classes.activeIndicator}></div>
                    )}
                    <div className={classes.navItem}>
                      <div>{data.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div>{props.children}</div>
          </div>
        </>
      )}
    </ScorePageLayout>
  );
};

export default ScorePageMatchLayout;
