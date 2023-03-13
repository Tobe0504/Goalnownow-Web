import React, { useContext, useEffect, useState } from "react";
import TeamPageLayout from "../../Components/TeamPageLayout/TeamPageLayout";
import classes from "./TeamPageTournaments.module.css";
import { TeamContext } from "../../Context/TeamContext";
import TeamLogo from "../../Components/TeamLogo/TeamLogo";

const TeamPageTournaments = () => {
  // Context
  const { teamData } = useContext(TeamContext);
  const [teamTournaments, setTeamTournaments] = useState([]);

  useEffect(() => {
    if (teamData) {
      setTeamTournaments(Object.values(teamData?.tournament_stages));
    }
  }, [teamData]);

  return (
    <TeamPageLayout>
      {teamData && (
        <div className={classes.container}>
          {teamTournaments?.map((tournament) => {
            return (
              <div key={tournament?.id} className={classes.clubNameSection}>
                <span>
                  <TeamLogo id={teamData?.id} />
                </span>
                {tournament?.tournament_stage && (
                  <span>
                    {Object.values(tournament?.tournament_stage)[0]?.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </TeamPageLayout>
  );
};

export default TeamPageTournaments;
