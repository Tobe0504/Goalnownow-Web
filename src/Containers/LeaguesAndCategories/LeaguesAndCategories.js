import React, { useContext, useEffect } from "react";
import classes from "./LeaguesAndCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";
import { activeToggler } from "../../HelperFunctions/ActiveToggler";
import { MatchesContext } from "../../Context/MatchesContext";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router";
import euFlag from "../../Assets/Images/eu.png";

const LeaguesAndCategories = (props) => {
  // Context
  const {
    fetchTournaents,
    tournamentsTemplate,
    setTournamentsTemplate,
    fetchTournamentYear,
    leagues,
    setLeagues,
    fetchTournamentStage,
    leagueLoading,
    setCountryNameFlag,
    countryAbbreviation,
  } = useContext(MatchesContext);

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      {!props.notDisplaySearch && (
        <div className={classes.searchSection}>
          <input type="text" placeholder="Search" />
          <i>
            <FontAwesomeIcon icon={faSearch} />
          </i>
        </div>
      )}
      {tournamentsTemplate.length > 0 ? (
        <div className={classes.categorySection}>
          {tournamentsTemplate.map((data, i) => {
            return (
              <div key={data.id}>
                <div
                  className={classes.category}
                  onClick={() => {
                    activeToggler(
                      i,
                      tournamentsTemplate,
                      setTournamentsTemplate
                    );
                    if (data.isActive === false) {
                      setLeagues([]);
                      fetchTournamentYear(data.id);
                      fetchTournamentStage(data.id);
                      setCountryNameFlag(data.name.split(" ")[0]);
                    }
                  }}
                >
                  <span>{data.name}</span>
                  <span>
                    {/* <span>{data.subCategories.length}</span> */}
                    <i
                      style={
                        data.isActive
                          ? {
                              transform: "rotate(-180deg)",
                              transition: "all 0.3s ease-in-out",
                            }
                          : {
                              transform: "rotate(-0deg)",
                              transition: "all 0.3s ease-in-out",
                            }
                      }
                    >
                      <FontAwesomeIcon icon={faAngleDown} />
                    </i>
                  </span>
                </div>
                <div
                  className={classes.categoryOptions}
                  style={
                    data?.isActive
                      ? { maxHeight: "54vh" }
                      : { maxHeight: "0vh" }
                  }
                  // { height: "4rem" } : { height: "0rem" }
                >
                  {!leagueLoading && leagues.length > 0 ? (
                    <>
                      {leagues?.map((datum) => {
                        return (
                          <div
                            key={datum.id}
                            className={classes.categoryOption}
                            id="categoryOption"
                            onClick={() => {
                              // fetchLeagueMatchesDataAndEvents(datum.id);
                              // fetchLeagueEvents(datum.tournament_templateFK);
                              navigate(`/scores/${datum.id}/events`);
                            }}
                          >
                            <span>
                              <img
                                alt={datum.subCategoryTitle}
                                src={
                                  countryAbbreviation
                                    ? `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryAbbreviation}.svg`
                                    : euFlag
                                }
                                className={classes.hmm}
                              />
                            </span>
                            <span>{datum.name}</span>
                          </div>
                        );
                      })}
                    </>
                  ) : leagues?.length < 1 && !leagueLoading ? (
                    <div className={classes.progress}>No league available</div>
                  ) : (
                    <div className={classes.progress}>
                      <CircularProgress
                        color="inherit"
                        size="1rem"
                        style={{ color: "#ffd91b" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <LinearProgress
          color="inherit"
          style={{ color: "#ffd91b", height: ".1rem" }}
        />
      )}
    </div>
  );
};

export default LeaguesAndCategories;
