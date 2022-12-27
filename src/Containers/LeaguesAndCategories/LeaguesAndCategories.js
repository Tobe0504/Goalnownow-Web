import React, { useContext } from "react";
import classes from "./LeaguesAndCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { LeagueAndcategoriesContext } from "../../Context/LeagueAndCategoryContext";
import { activeToggler } from "../../HelperFunctions/ActiveToggler";

const LeaguesAndCategories = () => {
  const { leagueAndCategories, setLeagueAndCategory } = useContext(
    LeagueAndcategoriesContext
  );

  return (
    <div className={classes.container}>
      <div className={classes.searchSection}>
        <input type="text" placeholder="Search" />
        <i>
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div>
      <div className={classes.categorySection}>
        {leagueAndCategories.map((data, i) => {
          return (
            <div key={data.id}>
              <div
                className={classes.category}
                onClick={() => {
                  activeToggler(i, leagueAndCategories, setLeagueAndCategory);
                }}
              >
                <span>{data.categoryTitle}</span>
                <span>
                  <span>{data.subCategories.length}</span>
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
                  data.isActive ? { maxHeight: "54vh" } : { maxHeight: "0px" }
                }
              >
                {data.subCategories.map((datum) => {
                  return (
                    <div
                      key={datum.id}
                      className={classes.categoryOption}
                      id="categoryOption"
                    >
                      <span>
                        <img
                          alt={datum.subCategoryTitle}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${datum.iconAbrv}.svg`}
                          className={classes.hmm}
                        />
                      </span>
                      <span>{datum.subCategoryTitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaguesAndCategories;
