import React from "react";
import { useParams } from "react-router-dom";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchStatistics.module.css";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";

const ScorePageMatchStatistics = () => {
  // params
  const { matchId } = useParams();

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
                <div className={classes.statHeader}>
                  <div>
                    <img
                      src={clubLogoHandler(datums.homeClub)}
                      alt="Club Logo"
                    />
                  </div>
                  <div>Team Statistics</div>
                  <div>
                    <img
                      src={clubLogoHandler(datums.awayClub)}
                      alt="Club Logo"
                    />
                  </div>
                </div>

                <div className={classes.statBody}>
                  {datums.statistics?.map((statistic) => {
                    return (
                      <div key={statistic.id} className={classes.statistic}>
                        <div>{statistic.home}</div>
                        <div className={classes.nameAndBarSection}>
                          <p>{statistic.title}</p>
                          <div>
                            <div>
                              <div
                                style={{
                                  width: `${
                                    (statistic.home /
                                      (statistic.home + statistic.away)) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div>
                              <div
                                style={{
                                  width: `${
                                    (statistic.away /
                                      (statistic.home + statistic.away)) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div>{statistic.away}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          });
      })}
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchStatistics;
