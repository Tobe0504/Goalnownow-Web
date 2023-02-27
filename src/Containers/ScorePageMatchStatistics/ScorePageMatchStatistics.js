import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import classes from "./ScorePageMatchStatistics.module.css";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { MatchesContext } from "../../Context/MatchesContext";
import { LinearProgress } from "@mui/material";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";

const ScorePageMatchStatistics = () => {
  // params
  const { matchId } = useParams();

  const {
    fetchMatchStatistics,
    matchDataCombinedToFit,
    isloadingMatchStatistics,
    specificMatchData,
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
              {specificMatchData && (
                <TeamLogo
                  id={
                    Object.values(specificMatchData?.event_participants)[0]
                      ?.participantFK
                  }
                  width="16px"
                  height="16px"
                />
              )}
            </div>
            <div>Team Statistics</div>
            <div>
              {specificMatchData && (
                <TeamLogo
                  id={
                    Object.values(specificMatchData?.event_participants)[1]
                      ?.participantFK
                  }
                  width="16px"
                  height="16px"
                />
              )}
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
