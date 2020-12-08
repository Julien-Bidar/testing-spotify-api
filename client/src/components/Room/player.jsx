import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import { playTrack } from "../../helpers/apiCalls";

const Player = () => {
  const queue = useSelector((state) => state.queue.item);
  const accessToken = useSelector((state) => state.auth.token);

  let uris = [];
  queue.forEach((item) => {
    uris.push(item.uri);
  });

  if (!accessToken) {
    return null;
  }

  if (uris.length <= 0) {
    return <p>the queue is empty add a track</p>;
  }

  return (
    <SpotifyPlayer
      name="rooms"
      token={accessToken}
      showSaveIcon={true}
      uris={uris}
    />
  );
};

//

export default Player;
