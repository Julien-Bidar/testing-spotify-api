import React from "react";
import { useSelector } from "react-redux";

const Devices = () => {
  const accessToken = useSelector((state) => state.auth.token);

  const getDevices = async () => {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const request = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      options
    );
    const data = await request.json();
  };

  return <button onClick={getDevices}>get device</button>;
};

export default Devices;
