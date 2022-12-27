import React from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./ScorePageTables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { activeTogglerNoFalse } from "../../HelperFunctions/ActiveToggler";
import { useContext } from "react";
import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";

const ScorePageTables = () => {
  // Context
  const { leagueTablesByLeague, setLeagueTablesByLeague } = useContext(
    LeagueAndcategoriesContext
  );

  const qualifierIndicator = (index) => {
    if (index < 4) {
      return { background: "#00f175", visibility: "visible" };
    } else if (index === 4) {
      return {
        background: "#ffd91b",
        visibility: "visible",
      };
    } else if (index >= 16) {
      return {
        background: "#C91922",
        visibility: "visible",
      };
    } else
      return {
        visibility: "hidden",
      };
  };

  return (
    <ScorePageLayout>
      <div className={classes.container}>
        {leagueTablesByLeague.map((data, j) => {
          return (
            <div className={classes.leagueData} key={data.id}>
              <div
                className={classes.leagueHeader}
                onClick={() => {
                  activeTogglerNoFalse(
                    j,
                    leagueTablesByLeague,
                    setLeagueTablesByLeague
                  );
                }}
              >
                <div className={classes.leagueHeaderdata}>
                  <div>
                    <img
                      alt={data.leagueName}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.leagueAbbv}.svg`}
                      className={classes.hmm}
                    />
                  </div>
                  <div>
                    <span>{data.leagueName}</span>
                    <span>{data.country}</span>
                  </div>
                </div>
                <div
                  className={classes.leagueRouter}
                  style={
                    data.isActive
                      ? {
                          transform: "rotate(-90deg)",
                          transition: "all .3s ease-in-out",
                        }
                      : {
                          transform: "rotate(0deg)",
                          transition: "all .3s ease-in-out",
                        }
                  }
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </div>
              </div>
              <div
                className={classes.leagueTableOuter}
                id="leagueTableOuter"
                style={
                  data.isActive ? { maxHeight: "250vh" } : { maxHeight: "0vh" }
                }
              >
                <div className={classes.leagueTableHead}>
                  <div>#.</div>
                  <div>Teams</div>
                  <div>P</div>
                  <div>W</div>
                  <div>L</div>
                  <div>D</div>
                  <div>PTS</div>
                </div>
                {data.leagueTable.map((datum, i) => {
                  return (
                    <div key={datum.id} className={classes.leagueTableData}>
                      <div className={classes.index}>
                        <span style={qualifierIndicator(i)}></span>
                        <span> {`${i + 1}.`}</span>
                      </div>
                      <div className={classes.leagueNameData}>
                        <span
                          style={
                            i >= 16
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                        <span>{datum.clubName}</span>
                      </div>
                      <div>{datum.played}</div>
                      <div>{datum.wins}</div>
                      <div>{datum.losses}</div>
                      <div>{datum.draws}</div>
                      <div>{datum.points}</div>
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

export default ScorePageTables;
