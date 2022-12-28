import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faStar,
  faNewspaper,
  faArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons";
import { v4 } from "uuid";

export const navItems = [
  {
    id: v4(),
    title: "Scores",
    icon: <FontAwesomeIcon icon={faFutbol} />,
    isActive: false,
    route: "/scores",
  },
  {
    id: v4(),
    title: "Favourites",
    icon: <FontAwesomeIcon icon={faStar} />,
    isActive: false,
    route: "/favourites",
  },
  {
    id: v4(),
    title: "Sports News",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
    isActive: false,
    route: "/news",
  },
  {
    id: v4(),
    title: "Get the app",
    icon: <FontAwesomeIcon icon={faArrowAltCircleDown} />,
    isActive: false,
    route: "/get-the-app",
  },
];

export const scorePageNavItems = [
  {
    id: v4(),
    title: "Matches",
    isActive: false,
    route: "/scores/matches",
  },
  {
    id: v4(),
    title: "Tables",
    isActive: false,
    route: "/scores/tables",
  },
];
