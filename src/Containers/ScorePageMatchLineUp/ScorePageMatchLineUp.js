import React, { useContext, useEffect } from "react";
import classes from "./ScorePageMatchLineUp.module.css";
import { matches } from "../../Utilities/matches";
import formation from "../../Assets/Images/formation.svg";
import { useParams } from "react-router-dom";
import barcelona from "../../Assets/Images/barcelona.svg";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageMatchLineUp = () => {
  const { matchId } = useParams();

  // context
  const {
    firstParticipantLineup,
    secondParticipantLineup,
    eventParticipants,
    fetchEventDetails,
    eventsDetails,
    eventProperties,
  } = useContext(MatchesContext);

  //   utils
  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  let datums = [];

  useEffect(() => {
    fetchEventDetails(matchId);
  }, []);

  console.log(eventProperties, eventsDetails, "Lineuppp");

  const matchStartedState = eventProperties?.filter((data) => {
    return data.name === "LineupConfirmed";
  });

  return (
    <ScorePageMatchLayout>
      <div className={classes.outerCountainer} key={datums.id}>
        <div className={classes.container}>
          <div className={classes.formationSection}>
            <img src={formation} alt="Formation" />
          </div>
          <div className={classes.header}>
            Line up{" "}
            {matchStartedState[0]?.value === "no" && <span>(probable)</span>}
          </div>
          <div className={classes.lineUpTable}>
            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler("Baercelona")} alt="Club Logo" />
                </span>
                <span>{`${eventParticipants[0]?.participant.name} Lineup`}</span>
              </div>
              {firstParticipantLineup
                ?.sort((a, b) => {
                  return a.lineup_typeFK - b.lineup_typeFK;
                })
                ?.filter((data) => {
                  return Number(data.lineup_typeFK) <= 4;
                })
                .map((lineUp) => {
                  return (
                    <div className={classes.players} key={lineUp.id}>
                      <div className={classes.time}>{lineUp.shirt_number}</div>
                      <div className={classes.player}>
                        <span></span>
                        <span>{lineUp?.participant?.name}</span>
                      </div>
                      <div className={classes.details}></div>
                    </div>
                  );
                })}
            </div>

            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler("Baercelona")} alt="Club Logo" />
                </span>
                <span>{`${eventParticipants[1]?.participant.name} Lineup`}</span>
              </div>
              {secondParticipantLineup
                ?.sort((a, b) => {
                  return a.lineup_typeFK - b.lineup_typeFK;
                })
                ?.filter((data) => {
                  return Number(data.lineup_typeFK) <= 4;
                })
                .map((lineUp) => {
                  return (
                    <div className={classes.players} key={lineUp.id}>
                      <div className={classes.time}>{lineUp.shirt_number}</div>
                      <div className={classes.player}>
                        <span></span>
                        <span>{lineUp?.participant?.name}</span>
                      </div>
                      <div className={classes.details}></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={classes.substitutes}>
          <div className={classes.header}>Substitutes</div>
          <div className={classes.lineUpTable}>
            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler("Baercelona")} alt="Club Logo" />
                </span>
                <span>{`${eventParticipants[0]?.participant.name}`}</span>
              </div>
              {firstParticipantLineup
                ?.filter((data) => {
                  return Number(data.lineup_typeFK) === 5;
                })
                .map((lineUp) => {
                  return (
                    <div className={classes.players} key={lineUp.id}>
                      <div className={classes.time}>{lineUp.shirt_number}</div>
                      <div className={classes.player}>
                        <span></span>
                        <span>{lineUp?.participant?.name}</span>
                      </div>
                      <div className={classes.details}></div>
                    </div>
                  );
                })}
            </div>

            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler(datums.awayClub)} alt="Club Logo" />
                </span>
                <span>{`${eventParticipants[1]?.participant.name} `}</span>
              </div>
              {secondParticipantLineup
                ?.filter((data) => {
                  return Number(data.lineup_typeFK) === 5;
                })
                .map((lineUp) => {
                  return (
                    <div className={classes.players} key={lineUp.id}>
                      <div className={classes.time}>{lineUp.shirt_number}</div>
                      <div className={classes.player}>
                        <span></span>
                        <span>{lineUp?.participant?.name}</span>
                      </div>
                      <div className={classes.details}></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={classes.additionalInformation}>
          <div className={classes.header}>Additional Infomation</div>
          {/* {datums.additionalInfo.map((info) => {
            return (
              <div className={classes.info}>
                <div>{info.title}</div>
                <div>{info.info}</div>
              </div>
            );
          })} */}
        </div>
      </div>
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchLineUp;
