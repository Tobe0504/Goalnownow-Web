import React from "react";
import { v4 } from "uuid";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchOdds.module.css";
import bet9jaLogo from "../../Assets/Images/bet9ja.svg";
import sportyBetLogo from "../../Assets/Images/sportybet.svg";
import { matches } from "../../Utilities/matches";
import { useParams } from "react-router-dom";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";

const ScorePageMatchOdds = () => {
  // params
  const { matchId } = useParams();

  const betRoutes = [
    { id: v4(), companyLogo: bet9jaLogo },
    { id: v4(), companyLogo: sportyBetLogo },
  ];

  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

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
                {betRoutes.map((bet) => {
                  return (
                    <div className={classes.outerContainer}>
                      <div className={classes.betRoute} key={bet.id}>
                        <div className={classes.clubLogo}>
                          <img src={bet.companyLogo} alt="Bet Company" />
                        </div>
                        <div className={classes.clubDetailCenter}>
                          <div>
                            <span>
                              <img
                                src={clubLogoHandler(datums.homeClub)}
                                alt="Club Logo"
                              />
                            </span>
                            <span>{datums.homeClub}</span>
                          </div>
                          <div>
                            <span>
                              <img
                                src={clubLogoHandler(datums.awayClub)}
                                alt="Club Logo"
                              />
                            </span>
                            <span>{datums.awayClub}</span>
                          </div>
                        </div>
                        <div className={classes.oddsCenter}>
                          <div>
                            <span>1</span>
                            <span>{datums.oneOdd}</span>
                          </div>
                          <div>
                            <span>x</span>
                            <span>{datums.xOdd}</span>
                          </div>
                          <div>
                            <span>2</span>
                            <span>{datums.twoOdd}</span>
                          </div>
                        </div>
                        <div className={classes.scoreCenter}>
                          <div>{datums.homeClubScore}</div>
                          <div>{datums.awayClubScore}</div>
                        </div>
                      </div>
                      <div className={classes.mobileOddSection}>
                        <div className={classes.oddsSectionMobile}>
                          <div>
                            <span>1</span>
                            <span>{datums.oneOdd}</span>
                          </div>
                          <div>
                            <span>x</span>
                            <span>{datums.xOdd}</span>
                          </div>
                          <div>
                            <span>2</span>
                            <span>{datums.twoOdd}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          });
      })}
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchOdds;
