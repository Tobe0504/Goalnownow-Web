import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { matches } from "../../Utilities/matches";
import classes from "./ScorePageMatchByLeague.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageMatchByLeague = () => {
  // params
  const { league } = useParams();

  // context
  const { showOdds } = useContext(MatchesContext);

  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  //   navigate
  const navigate = useNavigate();

  return (
    <ScorePageLayout>
      <div className={classes.container}>
        {matches
          .filter((data) => {
            return data.leagueTitle === league;
          })
          .map((data) => {
            return (
              <div key={data.id} className={classes.leagueData}>
                <div className={classes.leagueHeader}>
                  <div
                    className={classes.nav}
                    onClick={() => {
                      navigate("/scores/matches");
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </div>
                  <div className={classes.leagueHeaderdata}>
                    <div>
                      <img
                        alt={data.leagueTitle}
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.leagueAbbv}.svg`}
                        className={classes.hmm}
                      />
                    </div>
                    <div>
                      <span>{data.leagueTitle}</span>
                      <span>{data.country}</span>
                    </div>
                  </div>
                  <div className={classes.leagueRouter}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
                <div className={classes.leagueGames}>
                  {data.leagueMatches.map((datum) => {
                    return (
                      <div className={classes.leagueGamesOuter} key={datum.id}>
                        <div className={classes.leagueGame}>
                          <div className={classes.time}>{datum.time}</div>
                          <div className={classes.clubNameSection}>
                            <div>
                              <span>
                                <img
                                  src={clubLogoHandler(datum.homeClub)}
                                  alt={datum.homeClub}
                                />
                              </span>
                              <span>{datum.homeClub}</span>
                            </div>
                            <div>
                              <span>
                                <img
                                  src={clubLogoHandler(datum.awayClub)}
                                  alt={datum.awayClub}
                                />
                              </span>
                              <span>{datum.awayClub}</span>
                            </div>
                          </div>
                          {showOdds && (
                            <div className={classes.oddsSection}>
                              <div>
                                <span>1</span>
                                <span>{datum.oneOdd}</span>
                              </div>
                              <div>
                                <span>x</span>
                                <span>{datum.xOdd}</span>
                              </div>
                              <div>
                                <span>2</span>
                                <span>{datum.twoOdd}</span>
                              </div>
                            </div>
                          )}
                          <div className={classes.scoresAndFavorites}>
                            <div>
                              <span>{datum.homeClubScore}</span>
                              <span>{datum.awayClubScore}</span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                          </div>
                        </div>
                        <div className={classes.mobileOddSection}>
                          {showOdds && (
                            <div className={classes.oddsSectionMobile}>
                              <div>
                                <span>1</span>
                                <span>{datum.oneOdd}</span>
                              </div>
                              <div>
                                <span>x</span>
                                <span>{datum.xOdd}</span>
                              </div>
                              <div>
                                <span>2</span>
                                <span>{datum.twoOdd}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </ScorePageLayout>
  );
};

export default ScorePageMatchByLeague;
