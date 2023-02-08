import React from "react";
import classes from "./ScorePageMatchLayout.module.css";
import ScorePageLayout from "../../Components/ScorePageLayout/ScorePageLayout";
import { useParams } from "react-router-dom";
import { matches } from "../../Utilities/matches";
import barcelona from "../../Assets/Images/barcelona.svg";
import realMadrid from "../../Assets/Images/realmadrid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const ScorePageMatchLayout = (props) => {
  // params
  const { matchId } = useParams();

  //   utils
  const clubLogoHandler = (club) => {
    if (club === "Barcelona") {
      return barcelona;
    }
    if (club === "Real Madrid") {
      return realMadrid;
    }
  };

  const scorePageMatchNavItems = [
    {
      id: v4(),
      title: "Summary",
      isActive: false,
      route: `/scores/${matchId}/summary`,
    },

    {
      id: v4(),
      title: "Line Up",
      isActive: false,
      route: `/scores/${matchId}/line-up`,
    },

    {
      id: v4(),
      title: "Statistics",
      isActive: false,
      route: `/scores/${matchId}/statistics`,
    },

    {
      id: v4(),
      title: "Odds",
      isActive: false,
      route: `/scores/${matchId}/odds`,
    },
  ];

  return (
    <ScorePageLayout>
      {matches.map((data) => {
        return data.leagueMatches
          .filter((datum) => {
            return datum.id === matchId;
          })
          .map((datums) => {
            return (
              <div className={classes.container}>
                <div className={classes.firstSection}>
                  <div className={classes.titleContainer}>
                    {data.leagueTitle}
                  </div>
                  <div className={classes.logoAndScoreSection}>
                    <div>
                      <div>
                        <img
                          src={clubLogoHandler(datums.homeClub)}
                          alt="Club Logo"
                        />
                      </div>
                      <div>{datums.homeClub}</div>
                    </div>

                    <div className={classes.scoreSection}>
                      <div>{`${datums.homeClubScore} : ${datums.awayClubScore}`}</div>
                      <div>First Half</div>
                      <div>21’</div>
                      <div className={classes.lineDecoration}>
                        <div>
                          <div></div>
                          <div></div>
                        </div>

                        <div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img
                          src={clubLogoHandler(datums.awayClub)}
                          alt="Club Logo"
                        />
                      </div>
                      <div>{datums.awayClub}</div>
                    </div>
                  </div>
                  <div className={classes.audioCommentry}>
                    <div></div>
                    <div></div>
                    <div>Venue: Stadium luzhniki</div>
                  </div>
                  <div className={classes.matchEvents}>
                    {datums.events?.map((event) => {
                      return (
                        <div className={classes.matchEvent}>
                          <div>
                            <FontAwesomeIcon
                              icon={faFutbol}
                              color="#FFD91B"
                              fontSize="1.5rem"
                            />
                          </div>
                          <div>{`${event.gialTime} ${event.goalsBy}`}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={classes.navSection}>
                  {scorePageMatchNavItems.map((data) => {
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
                <div>{props.children}</div>
              </div>
            );
          });
      })}
    </ScorePageLayout>
  );
};

export default ScorePageMatchLayout;
