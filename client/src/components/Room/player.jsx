import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";

const Player = () => {
  const item = useSelector((state) => state.queue.item);

  const accessToken = useSelector((state) => state.auth.token);
  if (!accessToken) {
    return null;
  }
  return (
    <SpotifyPlayer
      name="Rooms"
      token={accessToken}
      showSaveIcon={true}
      uris={item?.uri}
    />
  );
};

export default Player;
