import React, { useContext, useEffect } from "react";
import classes from "./ScorePageMatchLayout.module.css";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { MatchesContext } from "../../Context/MatchesContext";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import TeamLogo from "../TeamLogo/TeamLogo";
import { MatchesContextAlt } from "../../Context/MatchesContextAlt";

const ScorePageMatchLayout = (props) => {
  // params
  const { matchId } = useParams();

  // context
  const {
    specificMatchData,
    firstParticipantResults,
    secondParticipantResults,
    stadium,
    eventIncidents,
  } = useContext(MatchesContext);

  const { fetchSpecificMatchEventsAlt } = useContext(MatchesContextAlt);

  // utils

  useEffect(() => {
    const users = setInterval(() => {
      fetchSpecificMatchEventsAlt(matchId);
      console.log("fetched!");
    }, 20000);

    return () => {
      clearInterval(users);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Navigate
  const navigate = useNavigate();

  return (
    <ScorePageLayout>
      <div className={classes.container}>
        <div className={classes.firstSection}>
          <div
            className={classes.titleContainer}
            onClick={() => {
              navigate("/scores");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faAngleLeft} color="#CCD1D9" />
            </span>
            <span>{specificMatchData?.tournament_stage_name}</span>
          </div>
          <div className={classes.logoAndScoreSection}>
            <div>
              {specificMatchData && (
                <TeamLogo
                  id={
                    Object.values(specificMatchData?.event_participants)[0]
                      ?.participantFK
                  }
                  width="80px"
                  height="80px"
                />
              )}

              <div>{specificMatchData?.name?.split("-")[0]}</div>
            </div>

            <div className={classes.scoreSection}>
              <div>{`${firstParticipantResults[1]?.value || "-"} : ${
                secondParticipantResults[1]?.value || "-"
              }`}</div>
              {specificMatchData?.status_type && (
                <div>
                  {specificMatchData?.status_type === "finished" && "FT"}
                </div>
              )}
              {specificMatchData?.status_type === "inprogress" ? (
                <div>
                  {`${Object.values(specificMatchData?.elapsed)[0]?.elapsed}'`}
                </div>
              ) : (
                <div>
                  {/* {Object.values(specificMatchData?.elapsed)[0]?.elapsed} */}
                </div>
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
              {specificMatchData && (
                <TeamLogo
                  id={
                    Object.values(specificMatchData?.event_participants)[1]
                      ?.participantFK
                  }
                  width="80px"
                  height="80px"
                />
              )}

              <div>{specificMatchData?.name?.split("-")[1] || ""}</div>
            </div>
          </div>
          <div className={classes.audioCommentry}>
            <div></div>
            <div></div>
            {stadium && <div>Venue: {stadium}</div>}
          </div>
          <div className={classes.matchEvents}>
            {eventIncidents
              ?.filter((data) => {
                return data.incident_typeFK === "7";
              })
              ?.map((event) => {
                return (
                  <div
                    className={
                      event.tag === "away"
                        ? classes.matchEventAway
                        : classes.matchEvent
                    }
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={faFutbol}
                        color="#FFD91B"
                        fontSize="1.5rem"
                      />
                    </div>
                    <div>{`${event?.elapsed} ${event.participant.name}`}</div>
                  </div>
                );
              })}
          </div>
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
    </ScorePageLayout>
  );
};

export default ScorePageMatchLayout;
