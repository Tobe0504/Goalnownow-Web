import React, { useContext, useEffect } from "react";
import classes from "./ScorePageMatchNews.module.css";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NewsContext } from "../../Context/NewsContext";
import { MatchesContext } from "../../Context/MatchesContext";
import { CircularProgress, Skeleton } from "@mui/material";

const ScorePageMatchNews = () => {
  // context
  const {
    fetchTeamSpecificNews,
    isSendingRequest,
    teamSpecificNews,
    setOffsetValue,
    offsetValue,
  } = useContext(NewsContext);
  const { specificMatchData } = useContext(MatchesContext);

  //   State

  //   Params
  const { matchId, team } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //   effects
  useEffect(() => {
    fetchTeamSpecificNews(team);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, offsetValue]);

  return (
    <ScorePageMatchLayout>
      {specificMatchData && (
        <div className={classes.container}>
          <div className={classes.clubNameNav}>
            {Object.values(specificMatchData?.event_participants)?.map(
              (data, i) => {
                return (
                  <div
                    key={data?.id}
                    className={`${classes.clubNameNavOuter} ${
                      location.pathname.includes(
                        data?.participant?.name.replace(/\s/g, "-")
                      ) && classes.active
                    }`}
                    onClick={() => {
                      navigate(
                        `/scores/${matchId}/news/${data?.participant?.name.replace(
                          /\s/g,
                          "-"
                        )}`,
                        { replace: true }
                      );
                      setOffsetValue(0);
                    }}
                  >
                    {data?.participant?.name.replace(/\s/g, "-")}
                  </div>
                );
              }
            )}
          </div>
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
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchNews;
