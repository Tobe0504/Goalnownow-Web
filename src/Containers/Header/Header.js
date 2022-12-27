import React, { useState } from "react";
import classes from "./Header.module.css";
import goalNowNowLogo from "../../Assets/Images/goalNowNowLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { countries } from "../../Utilities/countries";
import { navItems } from "../../Utilities/navItems";

// Description
// This component basically houses the top section nav of the web app

const Header = () => {
  //   Utils
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const stringDate = date.toString().split(" ");
  const gmt = stringDate[stringDate.length - 5];

  // States

  const [country, setCountry] = useState("");
  const [currentTime, setCurrentTime] = useState(
    `${hour} : ${minute} (${gmt})`
  );

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
          <Dropdown selected={currentTime} setSelected={setCurrentTime} />
        </div>
      </div>
      <div className={classes.searchSection}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Header;
