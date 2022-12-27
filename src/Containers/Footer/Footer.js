import React from "react";
import classes from "./Footer.module.css";
import goalNowNowLogo from "../../Assets/Images/goalNowNowLogo.svg";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { navItems } from "../../Utilities/navItems";

const Footer = () => {
  const footerNav = [
    { id: v4(), title: "Careers", route: "/careers" },
    { id: v4(), title: "Mobile", route: "/mobile" },
    { id: v4(), title: "Advertise", route: "/advertise" },
    { id: v4(), title: "News", route: "/news" },
    { id: v4(), title: "Privacy Notice", route: "/privacy-notice" },
    { id: v4(), title: "Cookie Policy", route: "/cookie-policy" },
    { id: v4(), title: "Terms of use", route: "/terms-of-use" },
  ];
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.logosection}>
          <img src={goalNowNowLogo} alt="GoalNowNow Logo" />
        </div>
        <div className={classes.textSection}>
          <h6>
            Goalnownow - Latest World Cup Football Scores, Results, Fixtures and
            Tables
          </h6>
          <p>
            The number one destination for real time scores for Football,
            Cricket, Tennis, Basketball, Hockey and more. Goalnownow is the
            go-to destination for latest football scores and news from around
            the world.
          </p>
          <p>
            Up to date tables, fixtures and scores from all the major leagues
            and competitions throughout the world live as they happen including
            the Premier League, La Liga, Serie A, Bundesliga, Ligue 1 and
            Europe’s biggest competitions such as the Champions League and
            Europa League.
          </p>
          <p>
            That’s not all because domestic cup competitions including the world
            famous FA Cup and international tournaments such as the World Cup,
            Euros, AFCON, Copa America and Nations League are also at your
            fingertips. With match info and line-ups thrown into the mix, you
            need not look anywhere else for football statistics.
          </p>
          <p>&copy; 2022 Goalnownow</p>
        </div>
        <div className={classes.footerNav}>
          {footerNav.map((data) => {
            return (
              <Link to={data.route} key={data.id}>
                {data.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className={classes.mobileNav}>
        {navItems.slice(0, 3).map((data) => {
          return (
            <Link
              to={data.route}
              className={
                window.location.href.includes(data.route)
                  ? `${classes.activeNav}`
                  : undefined
              }
              key={data.id}
            >
              {data.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
