import React from "react";
import classes from "./ScorePageMatch.module.css";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useParams } from "react-router-dom";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";

const ScorePageMatch = () => {
  // params
  const { matchId } = useParams();

  //   utils
  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  return (
    <ScorePageLayout>
      {matches.map((data) => {
        return data.leagueMatches
          .filter((datum) => {
            return datum.id === matchId;
          })
          .map((datums) => {
            return (
              <div className={classes.container}>
                <div className={classes.firstSection}>
                  <div className={classes.titleContainer}>
                    {data.leagueTitle}
                  </div>
                  <div className={classes.logoAndScoreSection}>
                    <div>
                      <div>
                        <img src={clubLogoHandler(datums.homeClub)} />
                      </div>
                      <div>{datums.homeClub}</div>
                    </div>

                    <div className={classes.scoreSection}>
                      <div>{`${datums.homeClubScore} : ${datums.awayClubScore}`}</div>
                      <div>First Half</div>
                      <div>21’</div>
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
                        <img src={clubLogoHandler(datums.awayClub)} />
                      </div>
                      <div>{datums.awayClub}</div>
                    </div>
                  </div>
                  <div className={classes.audioCommentry}>
                    <div></div>
                    <div></div>
                    <div>Venue: Stadium luzhniki</div>
                  </div>
                  <div className={classes.matchEvents}>
                    {datums.events.map((event) => {
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
                  </div>
                </div>
              </div>
            );
          });
      })}
    </ScorePageLayout>
  );
};

export default ScorePageMatch;
