import React, { useState, useEffect } from "react";
import { enetPulseTokenId, enetPulseUsername } from "../../Utilities/global";
import axios from "axios";

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [props.id]);

  if (!logo) {
    return <div>Loading...</div>;
  }

  return (
    <img width={props.width} height={props.height} src={logo} alt="Logo" />
  );
};

export default TeamLogo;
