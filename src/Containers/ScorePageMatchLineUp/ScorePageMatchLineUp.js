import React, { useContext } from "react";
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
  // context
  const { firstParticipantLineup, secondParticipantLineup, eventParticipants } =
    useContext(MatchesContext);

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

  return (
    <ScorePageMatchLayout>
      <div className={classes.outerCountainer} key={datums.id}>
        <div className={classes.container}>
          <div className={classes.formationSection}>
            <img src={formation} alt="Formation" />
          </div>
          <div className={classes.header}>Line up</div>
          <div className={classes.lineUpTable}>
            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler("Baercelona")} alt="Club Logo" />
                </span>
                <span>{`${eventParticipants[0]?.participant.name} Lineup`}</span>
              </div>
              {firstParticipantLineup
                ?.filter((data) => {
                  return data.participant.type !== "coach";
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
                ?.filter((data) => {
                  return data.participant.type !== "coach";
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
                <span>{`${datums.homeClub}`}</span>
              </div>
              {datums.homeSubs?.map((lineUp) => {
                return (
                  <div className={classes.playersSub} key={lineUp.id}>
                    <div className={classes.time}>45</div>
                    <div className={classes.leavingPlayer}>
                      <span>
                        <FontAwesomeIcon
                          icon={faCircleArrowLeft}
                          color="#F14B51"
                          fontSize="12px"
                        />
                      </span>
                      <span>45</span>
                      <span>{lineUp.playerIn}</span>
                    </div>
                    <div className={classes.enteringPlayer}>
                      <span>
                        <FontAwesomeIcon
                          icon={faCircleArrowRight}
                          color="#00F175"
                          fontSize="12px"
                        />
                      </span>
                      <span>45</span>
                      <span>{lineUp.playerOut}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span>
                  <img src={clubLogoHandler(datums.awayClub)} alt="Club Logo" />
                </span>
                <span>{`${datums.homeClub}`}</span>
              </div>
              {datums.awaySubs?.map((lineUp) => {
                return (
                  <div className={classes.playersSub} key={lineUp.id}>
                    <div className={classes.time}>45</div>
                    <div className={classes.leavingPlayer}>
                      <span>
                        <FontAwesomeIcon
                          icon={faCircleArrowLeft}
                          color="#F14B51"
                          fontSize="12px"
                        />
                      </span>
                      <span>45</span>
                      <span>{lineUp.playerIn}</span>
                    </div>
                    <div className={classes.enteringPlayer}>
                      <span>
                        <FontAwesomeIcon
                          icon={faCircleArrowRight}
                          color="#00F175"
                          fontSize="12px"
                        />
                      </span>
                      <span>45</span>
                      <span>{lineUp.playerOut}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className={classes.additionalInformation}>
          <div className={classes.header}>Additional Infomation</div>
          {datums.additionalInfo.map((info) => {
            return (
              <div className={classes.info}>
                <div>{info.title}</div>
                <div>{info.info}</div>
              </div>
            );
          })}
        </div> */}
      </div>
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchLineUp;
