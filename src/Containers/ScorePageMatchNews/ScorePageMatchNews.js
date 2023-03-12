import React, { useContext, useEffect, useState } from "react";
import classes from "./ScorePageMatchNews.module.css";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import { activeToggler } from "../../HelperFunctions/ActiveToggler";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NewsContext } from "../../Context/NewsContext";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageMatchNews = () => {
  // context
  const { fetchTeamSpecificNews } = useContext(NewsContext);
  const { specificMatchData } = useContext(MatchesContext);

  //   State

  //   Params
  const { matchId, team } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location, "location", window.location);

  //   effects
  useEffect(() => {
    fetchTeamSpecificNews(team);
  }, [team]);

  //   useEffect(() => {

  //   }, []);

  //   console.log(specificMatchData, "Hmm");
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
                    }}
                  >
                    {data?.participant?.name.replace(/\s/g, "-")}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchNews;
