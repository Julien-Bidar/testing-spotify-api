import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";

const Player = () => {
  const item = useSelector((state) => state.queue.item);
  console.log(item);
  const accessToken = useSelector((state) => state.auth.token);
  if (!accessToken) {
    return null;
  }
  return (
    <SpotifyPlayer
      name="final project"
      token={accessToken}
      showSaveIcon={true}
      uri={item?.uri}
    />
  );
};

export default Player;
