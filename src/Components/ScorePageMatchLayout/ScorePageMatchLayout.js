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
import TimerComponent from "../../Containers/TimerComponent/TimerComponent";
import { HeadToHeadContext } from "../../Context/HeadToHeadContext";

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

  const { fetchSpecificMatchEventsAlt, fetchMatchCommentaryAlt } =
    useContext(MatchesContextAlt);

  const { fetchHeadToHeadData } = useContext(HeadToHeadContext);

  // utils

  useEffect(() => {
    fetchSpecificMatchEventsAlt(matchId);

    const users = setInterval(() => {
      fetchSpecificMatchEventsAlt(matchId);
      fetchMatchCommentaryAlt(matchId);
      console.log("fetched!");
    }, 20000);

    return () => {
      clearInterval(users);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let firstParticipantId, secondParticipantId;

  if (specificMatchData) {
    firstParticipantId = Object.values(specificMatchData?.event_participants)[0]
      ?.participantFK;
    secondParticipantId = Object.values(
      specificMatchData?.event_participants
    )[1]?.participantFK;
  }

  useEffect(() => {
    if (specificMatchData) {
      fetchHeadToHeadData(
        Object.values(specificMatchData?.event_participants)[0]?.participantFK,
        Object.values(specificMatchData?.event_participants)[1]?.participantFK
      );
    }

    console.log("This is gotham");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstParticipantId, secondParticipantId]);

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
    {
      id: v4(),
      title: "Commentary",
      isActive: false,
      route: `/scores/${matchId}/commentary`,
    },
    {
      id: v4(),
      title: "Head to head",
      isActive: false,
      route: `/scores/${matchId}/h2h`,
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
              navigate(-1);
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
                  {/* {`${Object.values(specificMatchData?.elapsed)[0]?.elapsed}'`} */}

                  {`${Object.values(specificMatchData?.elapsed)[0]?.elapsed}${
                    Object.values(specificMatchData?.elapsed)[0]
                      ?.injury_time_elapsed > 0
                      ? `+${
                          Object.values(specificMatchData?.elapsed)[0]
                            ?.injury_time_elapsed
                        }`
                      : ""
                  }'`}
                </div>
              ) : (
                <div>
                  {/* {Object.values(specificMatchData?.elapsed)[0]?.elapsed} */}
                </div>
              )}

              {specificMatchData?.status_type === "notstarted" && (
                <div className={classes.timeCounter}>
                  <TimerComponent date={specificMatchData?.startdate} />
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
                return (
                  data.incident_typeFK === "7" || data.incident_typeFK === "8"
                );
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
                        fontSize="1.2rem"
                      />
                    </div>
                    <div>{`${event?.elapsed}' ${event?.participant?.name} ${
                      event.incident_typeFK === "8" ? "(Penalty)" : ""
                    }`}</div>
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
                replace
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
        <div className={classes.children}>{props.children}</div>
      </div>
    </ScorePageLayout>
  );
};

export default ScorePageMatchLayout;
