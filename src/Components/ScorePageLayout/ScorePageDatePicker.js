import React from "react";
import classes from "./ScorePageDatePicker.module.css";
import moment from "moment/moment";
import { useContext } from "react";
import { MatchesContext } from "../../Context/MatchesContext";

const ScorePageDatePicker = ({
  currentMonthDates,
  handleSetActiveDate,
  containerRef,
}) => {
  // context
  const { requiredDate, setRequiredDate } = useContext(MatchesContext);

  // reference to the container element

  return (
    <div className={classes.container} ref={containerRef}>
      {currentMonthDates?.map((data, i) => {
        return (
          <div
            key={data}
            className={`${classes.date} ${
              data === requiredDate && classes.activeDate
            }`}
            data-date={data}
            onClick={() => {
              setRequiredDate(moment(data).format(moment.HTML5_FMT.DATE));
              handleSetActiveDate(data);
            }}
          >
            <div>{moment(data, "YYYY-MM-DD HH:mm:ss").format("dddd")}</div>
            <div> {moment(data).format("MMM DD")}</div>

            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default ScorePageDatePicker;
