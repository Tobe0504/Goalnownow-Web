import React, { useState } from "react";
import classes from "./LiveTables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { leaguesTable } from "../../Utilities/leagueTable";
import { SocialIcon } from "react-social-icons";

const LiveTables = () => {
  let [tableState, setTableState] = useState(0);

  const [table, setTable] = useState(
    leaguesTable[tableState].leagueTable.slice(0, 4)
  );

  const tableStateIncrease = () => {
    setTableState(tableState + 1);
    console.log(tableState);
    setTable(leaguesTable[tableState].leagueTable.slice(0, 4));
    if (tableState === leaguesTable.length - 1) {
      setTableState(0);
    }
  };

  const tableStateDecrease = () => {
    setTableState(tableState - 1);
    console.log(tableState);
    setTable(leaguesTable[tableState].leagueTable.slice(0, 4));
    if (tableState === 0) {
      setTableState(0);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Live Table</div>
        <div>
          <i
            onClick={tableStateDecrease}
            style={
              tableState <= 0 ? { cursor: "disable" } : { cursor: "pointer" }
            }
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </i>
          <span>La Liga</span>
          <i
            onClick={tableStateIncrease}
            style={
              tableState >= leaguesTable.length
                ? { pointerEvents: "none" }
                : undefined
            }
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </div>
      </div>
      <div className={classes.liveTableHeader}>
        <div>Team</div>
        <div>D</div>
        <div>L</div>
        <div>Ga</div>
        <div>Gd</div>
        <div>Pts</div>
      </div>
      <div className={classes.liveTableContent}>
        {table.map((data) => {
          return (
            <div className={classes.liveTableBody} key={data.id}>
              <div>
                {data.clubName.length > 12
                  ? `${data.clubName.slice(0, 10)}...`
                  : `${data.clubName}`}
              </div>

              <div>{data.draws}</div>
              <div>{data.losses}</div>
              <div>{data.goalsAgainst}</div>
              <div>{data.goalsAgainst}</div>
              <div>{data.points}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.viewFull}>
        <div>
          <span>View full table</span>
          <span>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
        <div>
          <SocialIcon
            url="https://facebook.com/jaketrent"
            bgColor="#DADADA"
            style={{ width: "20px", height: "20px" }}
          />
          <SocialIcon
            url="https://whatsapp.com/jaketrent"
            bgColor="#DADADA"
            style={{ width: "20px", height: "20px" }}
          />
          <SocialIcon
            url="https://twitter.com/jaketrent"
            bgColor="#DADADA"
            style={{ width: "20px", height: "20px" }}
          />
          <SocialIcon
            url="https://instagram.com/jaketrent"
            bgColor="#DADADA"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveTables;
