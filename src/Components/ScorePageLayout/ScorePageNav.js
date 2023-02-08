import React, { useContext, useState } from "react";
import classes from "./ScorePageNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { scorePageNavItems } from "../../Utilities/navItems";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useLocation } from "react-router-dom";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageNav = () => {
  // State
  const { showOdds, setShowOdds, setRequiredDate, requiredDate } =
    useContext(MatchesContext);
  const [date, setDate] = useState("2022-1-12");

  // navigation
  const location = useLocation();

  let dateArr = date?.split("-");
  let month = dateArr[1];
  let day = dateArr[2];

  let wordMonth;

  if (month === "1") {
    wordMonth = "Jan";
  }
  if (month === "2") {
    wordMonth = "Feb";
  }
  if (month === "3") {
    wordMonth = "Mar";
  }
  if (month === "4") {
    wordMonth = "Apr";
  }
  if (month === "5") {
    wordMonth = "May";
  }
  if (month === "6") {
    wordMonth = "Jun";
  }
  if (month === "7") {
    wordMonth = "Jul";
  }
  if (month === "8") {
    wordMonth = "Aug";
  }
  if (month === "9") {
    wordMonth = "Sep";
  }
  if (month === "10") {
    wordMonth = "Oct";
  }
  if (month === "11") {
    wordMonth = "Nov";
  }
  if (month === "12") {
    wordMonth = "Dec";
  }
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div>
          <i>
            <FontAwesomeIcon icon={faAngleLeft} />
          </i>
          <i>
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </div>
        <div>
          <label htmlFor="date" data-provide="datepicker">
            <input
              type="date"
              className={classes.date}
              id="date"
              // value={requiredDate}
              onChange={(e) => {
                // setDate(e.target.value);
                setRequiredDate(e.target.value);
              }}
            />
          </label>
          <div>
            <span>Today</span>
            <span>{`${day} ${wordMonth}`}</span>
          </div>
        </div>
        <div>
          <div>Live</div>
          {scorePageNavItems.map((data) => {
            return (
              <Link
                key={data.id}
                to={data.route}
                className={
                  location.pathname === data.route
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {location.pathname === data.route && (
                  <div className={classes.activeIndicator}></div>
                )}
                <div className={classes.navItem}>
                  <div>{data.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          <span>Show Odds</span>
          <span>
            <ToggleSwitch
              onChange={() => {
                setShowOdds(!showOdds);
              }}
              checked={showOdds}
            />
          </span>
        </div>
      </div>
      <div className={classes.mobileDiv}>
        <div>
          <div>Live</div>
          {scorePageNavItems.map((data) => {
            return (
              <Link
                key={data.id}
                to={data.route}
                className={
                  location.pathname === data.route
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {location.pathname === data.route && (
                  <div className={classes.activeIndicator}></div>
                )}
                <div className={classes.navItem}>
                  <div>{data.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          <span>Show Odds</span>
          <span>
            <ToggleSwitch
              onChange={() => {
                setShowOdds(!showOdds);
              }}
              checked={showOdds}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScorePageNav;
