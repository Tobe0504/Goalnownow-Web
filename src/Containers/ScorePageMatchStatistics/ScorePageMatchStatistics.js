import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchStatistics.module.css";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { MatchesContext } from "../../Context/MatchesContext";
import { LinearProgress } from "@mui/material";

const ScorePageMatchStatistics = () => {
  // params
  const { matchId } = useParams();

  const {
    fetchMatchStatistics,
    matchDataCombinedToFit,
    isloadingMatchStatistics,
  } = useContext(MatchesContext);

  // utils
  useEffect(() => {
    fetchMatchStatistics(matchId);
  }, []);

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
      {isloadingMatchStatistics ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <div className={classes.container}>
          <div className={classes.statHeader}>
            <div>
              <img src={clubLogoHandler(null)} alt="Club Logo" />
            </div>
            <div>Team Statistics</div>
            <div>
              <img src={clubLogoHandler(null)} alt="Club Logo" />
            </div>
          </div>

          <div className={classes.statBody}>
            {matchDataCombinedToFit?.map((statistic) => {
              return (
                <div key={statistic.code} className={classes.statistic}>
                  <div>{statistic.homeValue}</div>
                  <div className={classes.nameAndBarSection}>
                    <p>{statistic.name}</p>
                    <div>
                      <div>
                        <div
                          style={{
                            width: `${(
                              (Number(statistic.homeValue) /
                                (Number(statistic.homeValue) +
                                  Number(statistic.awayValue)) || 0) * 100
                            ).toFixed(0)}%`,
                          }}
                        ></div>
                      </div>
                      <div>
                        <div
                          style={{
                            width: `${(
                              (Number(statistic.awayValue) /
                                (Number(statistic.homeValue) +
                                  Number(statistic.awayValue)) || 0) * 100
                            ).toFixed(0)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>{statistic.awayValue}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchStatistics;
