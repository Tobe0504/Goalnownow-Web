import React, { useContext, useState } from "react";
import classes from "./Header.module.css";
import goalNowNowLogo from "../../Assets/Images/goalNowNowLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { countries } from "../../Utilities/countries";
import { navItems } from "../../Utilities/navItems";
import { MatchesContext } from "../../Context/MatchesContext";
import { timezones } from "../../Utilities/timezones";

// Description
// This component basically houses the top section nav of the web app

const Header = () => {
  //   Utils

  // Context
  const { country, setCountry, currentTime, setCurrentTime } =
    useContext(MatchesContext);

  const { fetchTournaents } = useContext(MatchesContext);

  return (
    <div className={classes.container}>
      <div className={classes.responsivemenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={classes.logosection}>
        <img src={goalNowNowLogo} alt="GoalNowNow Logo" />
      </div>
      <div className={classes.navItemSection}>
        {navItems.map((data) => {
          return (
            <Link
              key={data.id}
              to={data.route}
              className={
                window.location.href.includes(data.route)
                  ? `${classes.activeNav}`
                  : undefined
              }
              onClick={() => {
                fetchTournaents();
              }}
            >
              {window.location.href.includes(data.route) && (
                <div className={classes.activeIndicator}></div>
              )}
              <div className={classes.navItem}>
                <div>{data.icon}</div>
                <div>{data.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={classes.dropdownSection}>
        <div>
          <Dropdown
            selected={country}
            setSelected={setCountry}
            options={countries.map((data) => {
              return (
                <div className={classes.countryDropdownContainer}>
                  <img
                    alt={data.name}
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.code}.svg`}
                    className={classes.hmm}
                  />
                  <span>{data.code}</span>
                </div>
              );
            })}
            title="Country"
          />
        </div>
        <div>
          <Dropdown
            selected={currentTime}
            setSelected={setCurrentTime}
            options={timezones.map((data) => {
              return data.name;
            })}
          />
        </div>
      </div>
      <div className={classes.searchSection}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Header;
