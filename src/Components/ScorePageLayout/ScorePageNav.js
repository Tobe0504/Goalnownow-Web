import React from "react";
import classes from "./ScorePageNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { scorePageNavItems } from "../../Utilities/navItems";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageNav = () => {
  const { showOdds, setShowOdds } = useContext(MatchesContext);
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
          <i>
            <FontAwesomeIcon icon={faCalendarWeek} />
          </i>
          <div>
            <span>Today</span>
            <span>02 Dec</span>
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
                  window.location.href.includes(data.route)
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {window.location.href.includes(data.route) && (
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
                  window.location.href.includes(data.route)
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {window.location.href.includes(data.route) && (
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
