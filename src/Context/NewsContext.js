import React, { createContext, useState } from "react";
import axios from "axios";
export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  // States
  const [featuresNews, setFeaturedNews] = useState([]);
  const [isFetchingFeaturedNews, setIsFetchingFeaturedNews] = useState(false);
  const [offsetValue, setOffsetValue] = useState(0);
  const [teamSpecificNews, setTeamSpecificNews] = useState([]);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  // Utilities
  if (offsetValue > 100) {
    setOffsetValue(0);
  }

  // API Calls
  const fetchFeaturedNews = () => {
    setIsFetchingFeaturedNews(true);
    axios
      .get(
        `${process.env.REACT_APP_PA_API_DOMAIN}/v1/service/paservice:sport:football/item?limit=3`,
        {
          headers: {
            apikey: process.env.REACT_APP_PA_API_KEY,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res, "News");
        setFeaturedNews(res.data.item);
        setIsFetchingFeaturedNews(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchingFeaturedNews(false);
      });
  };

  const fetchTeamSpecificNews = (team) => {
    setTeamSpecificNews([]);
    setIsSendingRequest(true);
    axios
      .get(
        `${process.env.REACT_APP_PA_API_DOMAIN}/v1/item?subject=tag:${team
          .toLowerCase()
          .replace(
            /\s/g,
            "-"
          )}&offset=${offsetValue}&fields=total,limit,offset,item(uri,headline,subject,associations,description_text,subject,body_text,byline,firstcreated)`,
        {
          headers: {
            apikey: process.env.REACT_APP_PA_API_KEY,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setIsSendingRequest(false);
        console.log(res, "News//");

        setTeamSpecificNews(res.data.item);
      })
      .catch((err) => {
        console.log(err);
        setIsSendingRequest(false);
      });
  };

  return (
    <NewsContext.Provider
      value={{
        fetchFeaturedNews,
        isFetchingFeaturedNews,
        featuresNews,
        fetchTeamSpecificNews,
        setOffsetValue,
        teamSpecificNews,
        isSendingRequest,
        setOffsetValue,
        offsetValue,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
