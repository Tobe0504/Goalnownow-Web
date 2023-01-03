import React, { useContext, useEffect } from "react";
import classes from "./LeaguesAndCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";
import { activeToggler } from "../../HelperFunctions/ActiveToggler";
import { MatchesContext } from "../../Context/MatchesContext";
import { CircularProgress, LinearProgress } from "@mui/material";

const LeaguesAndCategories = () => {
  // Context
  const {
    fetchTournaents,
    tournamentsTemplate,
    setTournamentsTemplate,
    fetchTournamentYear,
    tournaments,
    leagues,
    setLeagues,
    fetchTournamentStage,
    leagueLoading,
    setCountryNameFlag,
    countryAbbreviation,
    fetchLeagueEvents,
  } = useContext(MatchesContext);

  // const { leagueAndCategories, setLeagueAndCategory } = useContext(
  //   LeagueAndcategoriesContext
  // );

  useEffect(() => {
    fetchTournaents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Test data
  // setLeagueAndCategory, leaguecategpry

  return (
    <div className={classes.container}>
      <div className={classes.searchSection}>
        <input type="text" placeholder="Search" />
        <i>
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div>
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
                    setLeagues();
                    if (data.isActive === false) {
                      fetchTournamentYear(data.id);
                      setCountryNameFlag(data.name.split(" ")[0]);
                    } else {
                      setLeagues([]);
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
                    data.isActive
                      ? { maxHeight: "154vh" }
                      : { maxHeight: "0px" }
                  }
                >
                  {!leagueLoading && tournaments.length > 0 ? (
                    <>
                      {leagues?.map((datum) => {
                        return (
                          <div
                            key={datum.id}
                            className={classes.categoryOption}
                            id="categoryOption"
                            onClick={() => {
                              fetchTournamentStage(datum.id);
                              console.log(datum.id);
                              fetchLeagueEvents(datum.id);
                            }}
                          >
                            <span>
                              <img
                                alt={datum.subCategoryTitle}
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryAbbreviation}.svg`}
                                className={classes.hmm}
                              />
                            </span>
                            <span>{datum.name}</span>
                          </div>
                        );
                      })}
                    </>
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
