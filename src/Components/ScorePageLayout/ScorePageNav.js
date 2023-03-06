import React, { useContext, useRef } from "react";
import classes from "./ScorePageNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  scorePageNavItems,
  scorePageNavItems2,
} from "../../Utilities/navItems";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useLocation, useParams } from "react-router-dom";
import { MatchesContext } from "../../Context/MatchesContext";
import moment from "moment";
import { FixturesContext } from "../../Context/FixturesContext";
import ScorePageDatePicker from "./ScorePageDatePicker";

const ScorePageNav = (props) => {
  // State
  const {
    showOdds,
    setShowOdds,
    setRequiredDate,
    requiredDate,
    includeLive,
    setIncludeLive,
  } = useContext(MatchesContext);

  const { leagueIdforFetch } = useContext(FixturesContext);

  // navigation
  const location = useLocation();
  const { leagueId } = useParams();

  // let dateArr = requiredDate?.split("-");
  // let month = dateArr[1];
  // let day = dateArr[2];

  // let wordMonth;

  // if (month === "01") {
  //   wordMonth = "Jan";
  // }
  // if (month === "02") {
  //   wordMonth = "Feb";
  // }
  // if (month === "03") {
  //   wordMonth = "Mar";
  // }
  // if (month === "04") {
  //   wordMonth = "Apr";
  // }
  // if (month === "05") {
  //   wordMonth = "May";
  // }
  // if (month === "06") {
  //   wordMonth = "Jun";
  // }
  // if (month === "07") {
  //   wordMonth = "Jul";
  // }
  // if (month === "08") {
  //   wordMonth = "Aug";
  // }
  // if (month === "09") {
  //   wordMonth = "Sep";
  // }
  // if (month === "10") {
  //   wordMonth = "Oct";
  // }
  // if (month === "11") {
  //   wordMonth = "Nov";
  // }
  // if (month === "12") {
  //   wordMonth = "Dec";
  // }

  // ref

  // utils
  function getAllDatesOfMonth(date) {
    const mDate = moment(date, "YYYY-MM");
    const daysCount = mDate.daysInMonth();
    return Array(daysCount)
      .fill(null)
      .map((v, index) => {
        const addDays = index === 0 ? 0 : 1;
        return mDate.add(addDays, "days").format("YYYY-MM-DD");
      });
  }

  const date = new Date();
  const currentMonthDates = getAllDatesOfMonth(date);

  const containerRef = useRef(null);

  const handleSetActiveDate = (date) => {
    // get the active date element
    const activeDateElement = containerRef?.current.querySelector(
      `[data-date="${date}"]`
    );

    // scroll the active date element into view and center it in the visible container
    activeDateElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div>
          <i
            onClick={() => {
              setRequiredDate(
                moment(requiredDate)
                  .subtract(1, "days")
                  .format(moment.HTML5_FMT.DATE),
                "formattt"
              );
              handleSetActiveDate(
                moment(requiredDate)
                  .subtract(1, "days")
                  .format(moment.HTML5_FMT.DATE)
              );
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </i>
          <i
            onClick={() => {
              setRequiredDate(
                moment(requiredDate)
                  .add(1, "days")
                  .format(moment.HTML5_FMT.DATE),
                "formattt"
              );
              handleSetActiveDate(
                moment(requiredDate)
                  .add(1, "days")
                  .format(moment.HTML5_FMT.DATE)
              );
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </div>
        <div>
          <label htmlFor="date" data-provide="datepicker">
            <input
              type="date"
              className={classes.date}
              id="date"
              value={requiredDate}
              onChange={(e) => {
                setRequiredDate(e.target.value);
                handleSetActiveDate(e.target.value);
              }}
            />
          </label>
          {/* <div>
            <span>
              {moment(requiredDate)
                .calendar()
                .replace(/at 12:00 AM/g, "")}
            </span>
            <span>{`${day} ${wordMonth}`}</span>
          </div> */}
        </div>
        <div className={classes.datePicker}>
          <ScorePageDatePicker
            currentMonthDates={currentMonthDates}
            handleSetActiveDate={handleSetActiveDate}
            containerRef={containerRef}
          />
        </div>
        <div className={classes.actionSection}>
          {includeLive === false ? (
            <div
              onClick={() => {
                setIncludeLive(true);
              }}
              className={classes.liveButton}
            >
              Live
            </div>
          ) : (
            <div
              onClick={() => {
                setIncludeLive(false);
              }}
              className={classes.altLiveButton}
            >
              Live
            </div>
          )}
          {!props.showLeagueBasedNav ? (
            scorePageNavItems.map((data) => {
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
            })
          ) : (
            <>
              <Link
                to={`/scores/${leagueId}/events`}
                className={
                  location.pathname === `/scores/${leagueId}/events`
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {location.pathname === `/scores/${leagueIdforFetch}/events` && (
                  <div className={classes.activeIndicator}></div>
                )}
                <div className={classes.navItem}>
                  <div>Matches</div>
                </div>
              </Link>

              <Link
                to={`/scores/${leagueIdforFetch}/events/standings`}
                className={
                  location.pathname ===
                  `/scores/${leagueIdforFetch}/events/standings`
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {location.pathname ===
                  `/scores/${leagueIdforFetch}/events/standings` && (
                  <div className={classes.activeIndicator}></div>
                )}
                <div className={classes.navItem}>
                  <div>Tables</div>
                </div>
              </Link>
            </>
          )}
        </div>
        <div className={classes.oddsSection}>
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
          {includeLive === false ? (
            <div
              onClick={() => {
                setIncludeLive(true);
              }}
              className={classes.liveButton}
            >
              Live
            </div>
          ) : (
            <div
              onClick={() => {
                setIncludeLive(false);
              }}
              className={classes.altLiveButton}
            >
              Live
            </div>
          )}
          {!props.showLeagueBasedNav && (
            <>
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
              })}{" "}
            </>
          )}
          {props.showLeagueBasedNav && (
            <>
              {scorePageNavItems2?.map((data) => {
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
            </>
          )}
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
