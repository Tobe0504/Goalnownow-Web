import React, { useContext, useState } from "react";
import classes from "./LiveTables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { leaguesTable } from "../../Utilities/leagueTable";
import { SocialIcon } from "react-social-icons";
import { useEffect } from "react";
import { TablesContext } from "../../Context/TablesContext";

const LiveTables = () => {
  let [tableState, setTableState] = useState(0);

  const { premierLeagueTable, fetchAllLeagueTables } =
    useContext(TablesContext);

  useEffect(() => {
    fetchAllLeagueTables();
  }, []);

  const [table, setTable] = useState(premierLeagueTable?.slice(0, 4));

  useEffect(() => {
    console.log(premierLeagueTable);
  }, [premierLeagueTable]);

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
            // onClick={tableStateDecrease}
            style={
              tableState <= 0 ? { cursor: "disable" } : { cursor: "pointer" }
            }
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </i>
          <span>Premier League</span>
          <i
            // onClick={tableStateIncrease}
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
        {premierLeagueTable
          ?.sort((a, b) => {
            return a.rank - b.rank;
          })
          ?.slice(0, 4)
          ?.map((data) => {
            return (
              <div className={classes.liveTableBody} key={data.id}>
                <div>
                  {data.participant?.name.length > 12
                    ? `${data.participant?.name.slice(0, 10)}...`
                    : `${data.participant?.name}`}
                </div>

                <div>{data?.standing_data[4].value}</div>
                <div>{data?.standing_data[5].value}</div>
                <div>{data?.standing_data[6].value}</div>
                <div>{data?.standing_data[3].value}</div>
                <div>{data?.standing_data[0].value}</div>
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
