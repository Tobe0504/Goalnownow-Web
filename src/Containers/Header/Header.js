import React, { useContext } from "react";
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
import LeaguesAndCategories from "../LeaguesAndCategories/LeaguesAndCategories";

// Description
// This component basically houses the top section nav of the web app

const Header = () => {
  //   Utils

  // Context
  const { country, setCountry, currentTime, setCurrentTime } =
    useContext(MatchesContext);

  const { fetchTournaents } = useContext(MatchesContext);

  const openSideMenu = () => {
    document.getElementById("sideMenu").style.width = "100%";
  };

  const closeSideMenu = () => {
    document.getElementById("sideMenu").style.width = "0%";
  };

  return (
    <div className={classes.container}>
      <div className={classes.responsivemenu}>
        <FontAwesomeIcon icon={faBars} onClick={openSideMenu} />
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
                window.location.hash.includes(data.route)
                  ? `${classes.activeNav}`
                  : undefined
              }
              onClick={() => {
                fetchTournaents();
              }}
            >
              {window.location.hash.includes(data.route) && (
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
            options={timezones.sort()}
          />
        </div>
      </div>
      <div className={classes.searchSection}>
        <FontAwesomeIcon icon={faSearch} />
      </div>

      <div id="sideMenu" className={classes.sideNav}>
        <div className={classes.sideNavInner}>
          <button className={classes.btnClose} onClick={closeSideMenu}>
            &times;
          </button>
          <div className={classes.sideContainer}>
            <img src={goalNowNowLogo} alt="YSP Logo" />
          </div>
          {/* <div className={classes.scontainer}> */}
          <LeaguesAndCategories notDisplaySearch={true} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
