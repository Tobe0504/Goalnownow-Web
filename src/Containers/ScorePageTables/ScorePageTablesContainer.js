import React from "react";
import classes from "./ScorePageTables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { activeTogglerNoFalse } from "../../HelperFunctions/ActiveToggler";

const ScorePageTablesContainer = (props) => {
  // utils
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
    <>
      {!props?.league.length < 1 && (
        <div className={classes.container}>
          <div className={classes.leagueData}>
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
                    alt={"hmm"}
                    src={`http://eapi.enetpulse.com/image/team_logo/?teamFK=10260&username=alphaapiusr&token=791848b8897d12cfb5fa9e76895bf3ba`}
                    className={classes.hmm}
                  />
                </div>
                <div>
                  <span>{props.name}</span>
                  <span>{props.country_name}</span>
                </div>
              </div>
              {/* <div
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
          </div> */}
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
              {props.league
                ?.sort((a, b) => {
                  return a.rank - b.rank;
                })
                .map((datum, i) => {
                  return (
                    <div key={datum.id} className={classes.leagueTableData}>
                      <div className={classes.index}>
                        <span
                          style={qualifierIndicator(i, props.league)}
                        ></span>
                        <span> {`${i + 1}.`}</span>
                      </div>
                      <div className={classes.leagueNameData}>
                        <span
                          style={
                            i >= props.league.length - 4
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                        <span>{datum.participant?.name}</span>
                      </div>
                      <div>{datum.standing_data[4].value}</div>
                      <div>{datum.standing_data[5].value}</div>
                      <div>{datum.standing_data[6].value}</div>
                      <div>{datum.standing_data[3].value}</div>
                      <div>{datum.standing_data[0].value}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScorePageTablesContainer;
