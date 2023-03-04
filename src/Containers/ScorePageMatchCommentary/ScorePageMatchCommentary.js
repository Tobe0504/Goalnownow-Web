import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScorePageMatchLayout from "../../Components/ScorePageMatchLayout/ScorePageMatchLayout";
import { MatchesContext } from "../../Context/MatchesContext";
import classes from "./ScorePageMatchCommentary.module.css";

const ScorePageMatchCommentary = () => {
  // params
  const { matchId } = useParams();

  // context
  const { fetchMatchCommentary, matchCommentary } = useContext(MatchesContext);

  //   Effects
  useEffect(() => {
    fetchMatchCommentary(matchId);
  }, []);
  return (
    <ScorePageMatchLayout>
      <div className={classes.container}>
        {matchCommentary?.map((data) => {
          return (
            <div className={classes.comment} key={data.id}>
              <div>
                {`${data.elapsed}${
                  data.elapsed_plus > 0 ? `+${data.elapsed_plus} ` : ""
                }'`}
              </div>
              <div>{data.event_incident_text[0]}</div>
            </div>
          );
        })}
      </div>
    </ScorePageMatchLayout>
  );
};

export default ScorePageMatchCommentary;
