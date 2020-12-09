import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import { playTrack } from "../../helpers/apiCalls";

const Player = () => {
  const [offsetState, setOffsetState] = useState(0);
  const [uri, setUri] = useState([
    "spotify:track:4Oun2ylbjFKMPTiaSbbCih",
    "spotify:track:4Oun2ylbjFKMPTiaSbbCih",
  ]);
  const queue = useSelector((state) => state.queue.item);
  const accessToken = useSelector((state) => state.auth.token);
  console.log(offsetState);

  // let uri = [
  //   "spotify:track:6b37xrsNCWYIUphFBazqD6",
  //   "spotify:track:5I3jKRlR8WS0xYYamnAhpG",
  // ];
  const spotifyPlayerCallback = (spotifyState) => {
    console.log(spotifyState);
    const uriTrackPlaying = spotifyState.track.uri;
    const offset = uri.indexOf(uriTrackPlaying);
    if (offset !== offsetState && offset !== -1) {
      setOffsetState(offsetState + 1);
    }
    console.log(offset);
  };

  useEffect(() => {
    queue.forEach((item) => {
      if (uri.indexOf(item.uri) === -1) {
        setUri([uri, item.uri]);
      }
      console.log(uri);
    });
  }, []);

  if (!accessToken) {
    return null;
  }
  if (uri.length <= 0) {
    //return <p>the queue is empty add a track</p>;
  }

  console.log(uri);

  return (
    <SpotifyPlayer
      name="rooms"
      token={accessToken}
      showSaveIcon={true}
      uris={uri}
      callback={spotifyPlayerCallback}
      offset={offsetState}
    />
  );
};

//

export default Player;
