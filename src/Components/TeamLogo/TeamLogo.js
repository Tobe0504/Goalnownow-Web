import React, { useState, useEffect } from "react";
import { enetPulseTokenId, enetPulseUsername } from "../../Utilities/global";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeamLogo = (props) => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    setLogo(null);
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://eapi.enetpulse.com/image/team_logo/?teamFK=${props.id}&username=${enetPulseUsername}&token=${enetPulseTokenId}`
        );
        const imageCode = Object.values(response.data.images)[0].value;
        setLogo(`data:image/png;base64,${imageCode}`);
      } catch (error) {}
    };
    fetchImage();
  }, [props.id]);

  const navigate = useNavigate();

  if (!logo) {
    return (
      <div>
        <CircularProgress
          size="1rem"
          color="inherit"
          style={{ color: "#ffd91b" }}
        />
      </div>
    );
  }

  return (
    <img
      width={"100%"}
      height={"100%"}
      src={logo}
      alt="Logo"
      onClick={() => {
        console.log(props.id);
        navigate(`/team/${props.id}/players`);
      }}
      style={{ cursor: "pointer" }}
    />
  );
};

export default TeamLogo;
