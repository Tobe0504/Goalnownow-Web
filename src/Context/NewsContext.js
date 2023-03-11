import React, { createContext, useState } from "react";
import axios from "axios";
export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  // States
  const [featuresNews, setFeaturedNews] = useState([]);
  const [isFetchingFeaturedNews, setIsFetchingFeaturedNews] = useState(false);

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

  return (
    <NewsContext.Provider
      value={{ fetchFeaturedNews, isFetchingFeaturedNews, featuresNews }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
