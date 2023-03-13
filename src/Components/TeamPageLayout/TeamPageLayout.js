import React from "react";
import ScorePageLayout from "../ScorePageLayout/ScorePageLayout";
import classes from "./TeamPageLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { TeamContext } from "../../Context/TeamContext";
import TeamLogo from "../TeamLogo/TeamLogo";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

const TeamPageLayout = (props) => {
  // navigate
  const navigate = useNavigate();
  const { teamId } = useParams();
  const location = useLocation();

  //   context
  const { fetchTeamData, teamData } = useContext(TeamContext);

  //   effects
  useEffect(() => {
    fetchTeamData(teamId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scorePageMatchNavItems = [
    {
      id: v4(),
      title: "Players",
      isActive: false,
      route: `/team/${teamId}/players`,
    },

    {
      id: v4(),
      title: "Tournaments",
      isActive: false,
      route: `/team/${teamId}/tournaments`,
    },

    {
      id: v4(),
      title: "News",
      isActive: false,
      route: `/team/${teamId}/news/${teamData?.name?.replace(/\s/g, "-")}`,
    },
  ];

  return (
    <ScorePageLayout>
      <div className={classes.contauiner}>
        <div className={classes.firstSection}>
          <div
            className={classes.titleContainer}
            onClick={() => {
              navigate(-1);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faAngleLeft} color="#CCD1D9" />
            </span>
            <span>{teamData?.name}</span>
          </div>
          <div className={classes.logoAndName}>
            <div className={classes.logo}>
              <TeamLogo id={teamData?.id} />
            </div>
            <div className={classes.name}>
              <div>{teamData?.name}</div>
              <div>{teamData?.country_name}</div>
            </div>
          </div>
        </div>

        <div className={classes.navSection}>
          {scorePageMatchNavItems?.map((data, i) => {
            return (
              <Link
                key={data.id}
                to={data.route}
                replace
                className={
                  i !== 6
                    ? location.pathname.includes(data.route)
                      ? `${classes.activeNav}`
                      : undefined
                    : location.pathname.includes("news")
                    ? `${classes.activeNav}`
                    : undefined
                }
              >
                {i !== 6 ? (
                  location.pathname.includes(data.route) ? (
                    <div className={classes.activeIndicator}></div>
                  ) : undefined
                ) : location.pathname.includes("news") ? (
                  <div className={classes.activeIndicator}></div>
                ) : undefined}
                <div className={classes.navItem}>
                  <div>{data.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={classes.children}>{props.children}</div>
      </div>
    </ScorePageLayout>
  );
};

export default TeamPageLayout;
