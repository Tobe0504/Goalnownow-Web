import React, { useContext, useState } from "react";
import TeamPageLayout from "../../Components/TeamPageLayout/TeamPageLayout";
import classes from "./TeamPagePlayers.module.css";
import { TeamContext } from "../../Context/TeamContext";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { activeTogglerNoFalse } from "../../HelperFunctions/ActiveToggler";

const TeamPagePlayers = () => {
  // context
  const { teamData } = useContext(TeamContext);
  const [teamPlayers, setTeamPlayers] = useState([]);

  useEffect(() => {
    if (teamData) {
      setTeamPlayers(
        Object.values(teamData?.participants)?.map((data) => {
          return { ...data, isActive: false };
        })
      );
    }
  }, [teamData]);

  return (
    <TeamPageLayout>
      <div className={classes.container}>
        {teamData && (
          <div className={classes.lineUpTable}>
            <div className={classes.homeLineup}>
              <div className={classes.tableHeader}>
                <span style={{ width: "16px", height: "16px" }}>
                  {teamData && (
                    <TeamLogo id={teamData?.id} width="16px" height="16px" />
                  )}
                </span>
                {teamData && <span>{`${teamData?.name} Team`}</span>}
              </div>

              {teamPlayers?.map((player, i) => {
                return (
                  <div
                    className={classes.playerOuter}
                    onClick={() => {
                      activeTogglerNoFalse(i, teamPlayers, setTeamPlayers);
                    }}
                    key={player.id}
                  >
                    <div className={classes.players} key={player?.id}>
                      {player?.properties ? (
                        <div className={classes.time}>
                          {Object.values(player?.properties)[0]?.name ===
                            "ShirtNumber" &&
                            Object.values(player?.properties)[0]?.value}
                        </div>
                      ) : (
                        <div className={classes.time}></div>
                      )}
                      {teamPlayers.length > 0 && (
                        <div className={classes.player}>
                          <span>
                            {Object.values(player?.participant)[0]?.name}
                          </span>

                          {Object.values(player.participant)[0].type ===
                            "coach" && "(Coach)"}

                          {player?.properties ? (
                            Object.values(player?.properties).find((data) => {
                              return data.name === "OnLoan";
                            }) && <span>(On loan)</span>
                          ) : (
                            <div className={classes.time}></div>
                          )}
                        </div>
                      )}

                      <div
                        className={classes.detailsIcon}
                        style={
                          player?.isActive
                            ? { transform: "rotate(-90deg)" }
                            : { maxHeight: "rotate(0deg)" }
                        }
                      >
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </div>
                    {player &&
                      Object.values(player?.participant)[0]?.property && (
                        <div
                          className={`${classes.playerInformation}`}
                          style={
                            player?.isActive
                              ? { maxHeight: "200px" }
                              : { maxHeight: "0px" }
                          }
                        >
                          <div className={classes.playerInfo}>
                            <span>Position: </span>
                            {player && (
                              <span>
                                {Object.values(player?.participant)[0]
                                  ?.property &&
                                  Object.values(
                                    Object.values(player?.participant)[0]
                                      ?.property
                                  )
                                    ?.find((property) => {
                                      return property?.name === "position";
                                    })
                                    ?.value.toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className={classes.playerInfo}>
                            <span>Status:</span>
                            {player && (
                              <span>
                                {Object.values(player?.participant)[0]
                                  ?.property &&
                                  Object.values(
                                    Object.values(player?.participant)[0]
                                      ?.property
                                  )
                                    ?.find((property) => {
                                      return property?.name === "status";
                                    })
                                    ?.value.toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className={classes.playerInfo}>
                            <span>Age: </span>
                            {player && (
                              <span>
                                {Object.values(player?.participant)[0]
                                  ?.property &&
                                  moment().diff(
                                    Object.values(
                                      Object.values(player?.participant)[0]
                                        ?.property
                                    )?.find((property) => {
                                      return property?.name === "date_of_birth";
                                    })?.value,
                                    "years"
                                  )}{" "}
                                years
                              </span>
                            )}
                          </div>

                          <div className={classes.playerInfo}>
                            <span>Height: </span>
                            {player && (
                              <span>
                                {Object.values(player?.participant)[0]
                                  ?.property &&
                                  Object.values(
                                    Object.values(player?.participant)[0]
                                      ?.property
                                  )?.find((property) => {
                                    return property?.name === "height";
                                  })?.value}
                                cm
                              </span>
                            )}
                          </div>

                          <div className={classes.playerInfo}>
                            <span>Weight: </span>
                            {player && (
                              <span>
                                {Object.values(player?.participant)[0]
                                  ?.property &&
                                  Object.values(
                                    Object.values(player?.participant)[0]
                                      ?.property
                                  )?.find((property) => {
                                    return property?.name === "weight";
                                  })?.value}
                                kg
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </TeamPageLayout>
  );
};

export default TeamPagePlayers;
