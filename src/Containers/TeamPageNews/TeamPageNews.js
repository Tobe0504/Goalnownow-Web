import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import TeamPageLayout from "../../Components/TeamPageLayout/TeamPageLayout";
import { NewsContext } from "../../Context/NewsContext";
import { TeamContext } from "../../Context/TeamContext";
import classes from "./TeamPageNews.module.css";
import { CircularProgress } from "@mui/material";
import { Skeleton } from "@mui/material";

const TeamPageNews = () => {
  // Params
  const { newsTeam } = useParams();

  // context
  const {
    fetchTeamSpecificNews,
    isSendingRequest,
    teamSpecificNews,
    setOffsetValue,
  } = useContext(NewsContext);

  const { teamData } = useContext(TeamContext);

  useEffect(() => {
    fetchTeamSpecificNews(newsTeam);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TeamPageLayout>
      {teamData && (
        <div className={classes.container}>
          <div className={classes.newsContainer}>
            {isSendingRequest && teamSpecificNews.length < 1 ? (
              <div className={classes.loadingContainer}>
                <CircularProgress
                  color="inherit"
                  style={{ color: "#ffd91b" }}
                  size="1rem"
                />

                <div className={classes.adSection}>
                  <Skeleton variant="rectangular" width={"100%"} height={131} />
                </div>
              </div>
            ) : !isSendingRequest && teamSpecificNews.length < 1 ? (
              <div className={classes.loadingContainer}>
                No news content at this time
                <div className={classes.adSection}>
                  <Skeleton variant="rectangular" width={"100%"} height={131} />
                </div>
              </div>
            ) : (
              <div className={classes.container}>
                {teamSpecificNews?.map((datum) => {
                  let data = datum;
                  let betterArray;
                  if (typeof data?.associations === "string") {
                    betterArray = JSON.parse(data?.associations);
                  } else {
                    betterArray = data?.associations;
                  }
                  const headlineImage =
                    betterArray?.featureimage?.renditions["original"]?.href;

                  let betterSubjectArray;
                  if (typeof data?.subject === "string") {
                    betterSubjectArray = JSON.parse(data?.subject);
                  } else {
                    betterSubjectArray = data?.subject;
                  }

                  return (
                    <div className={classes.news} key={data?.uri}>
                      <div>
                        <img src={`${headlineImage}`} alt="" />
                      </div>
                      <div className={classes.newsTextCenter}>
                        <div>{betterSubjectArray[1]?.name}</div>
                        <div>{data?.headline}</div>
                        <div>{data?.description_text}</div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={classes.readMore}
                  onClick={() => {
                    setOffsetValue((prevState) => prevState + 10);
                  }}
                >
                  Read more
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </TeamPageLayout>
  );
};

export default TeamPageNews;
