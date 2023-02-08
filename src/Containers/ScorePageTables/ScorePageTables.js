import React, { useEffect } from "react";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import classes from "./ScorePageTables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { activeTogglerNoFalse } from "../../HelperFunctions/ActiveToggler";
import { useContext } from "react";
import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";
import { MatchesContext } from "../../Context/MatchesContext";
import { LinearProgress } from "@mui/material";

const ScorePageTables = () => {
  // Context
  const { leagueTablesByLeague, setLeagueTablesByLeague } = useContext(
    LeagueAndcategoriesContext
  );

  const {
    leagueParticipant,
    setLeagueParticipant,
    activeLeague,
    countryAbbreviation,
    leagueTableLoading,
  } = useContext(MatchesContext);

  const qualifierIndicator = (index, initState) => {
    if (index < 4) {
      return { background: "#00f175", visibility: "visible" };
    } else if (index === 4) {
      return {
        background: "#ffd91b",
        visibility: "visible",
      };
    } else if (index >= initState.length - 4) {
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
    <ScorePageLayout showNavSection={true}>
      {leagueParticipant.length < 1 && leagueTableLoading ? (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      ) : (
        <div className={classes.container}>
          {activeLeague?.map((data, j) => {
            return (
              <div className={classes.leagueData} key={data.id}>
                <div
                  className={classes.leagueHeader}
                  // onClick={() => {
                  //   activeTogglerNoFalse(
                  //     j,
                  //     leagueTablesByLeague,
                  //     setLeagueTablesByLeague
                  //   );
                  // }}
                >
                  <div className={classes.leagueHeaderdata}>
                    <div>
                      <img
                        alt={data.name}
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryAbbreviation}.svg`}
                        className={classes.hmm}
                      />
                    </div>
                    <div>
                      <span>{data.name}</span>
                      <span>{data.country_name}</span>
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
                  // style={
                  //   data.isActive ? { maxHeight: "250vh" } : { maxHeight: "0vh" }
                  // }
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
                  {leagueParticipant?.map((datum, i) => {
                    return (
                      <div key={datum.id} className={classes.leagueTableData}>
                        <div className={classes.index}>
                          <span
                            style={qualifierIndicator(i, leagueParticipant)}
                          ></span>
                          <span> {`${i + 1}.`}</span>
                        </div>
                        <div className={classes.leagueNameData}>
                          <span
                            style={
                              i >= leagueParticipant.length - 4
                                ? { visibility: "visible" }
                                : { visibility: "hidden" }
                            }
                          >
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                          <span>{datum.participant?.name}</span>
                        </div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ScorePageLayout>
  );
};

export default ScorePageTables;
