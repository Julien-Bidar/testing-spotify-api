import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import { playTrack } from "../../helpers/apiCalls";

const Player = () => {
  const [offsetState, setOffsetState] = useState(0);
  //const [uri, setUri] = useState(["spotify:track:4zCrOO8OAjpnmekfIxzTsl"]);
  const queue = useSelector((state) => state.queue.item);
  const accessToken = useSelector((state) => state.auth.token);
  const [currentPlayingUri, setCurrentPlayingUri] = useState();
  const [position, setPosition] = useState();
  const uri = useSelector((state) =>
    state.queue.item.map((item) => item.track.uri)
  );

  const spotifyPlayerCallback = (spotifyState) => {
    console.log(spotifyState);
    const uriTrackPlaying = spotifyState.track.uri;
    const currentOffset = uri.indexOf(uriTrackPlaying);
    setPosition(spotifyState.position);
    if (currentOffset !== -1) {
      setOffsetState(currentOffset);
    }
    if (currentPlayingUri !== uriTrackPlaying) {
      setCurrentPlayingUri(uriTrackPlaying);
    }
    // if (offset !== offsetState && offset !== -1) {
    //   setOffsetState(offsetState + 1);
    // }
  };

  // useEffect(() => {
  //   // queue.forEach((item) => {
  //   //   if (uri.indexOf(item.track.uri) === -1) {
  //   //     setUri([...uri, item.track.uri]);
  //   //   }
  //     console.log(uri);
  //   });
  // }, [setOffsetState]);

  if (!accessToken) {
    return null;
  }
  if (uri.length <= 0) {
    //return <p>the queue is empty add a track</p>;
  }

  return (
    <>
      <SpotifyPlayer
        name="rooms"
        token={accessToken}
        showSaveIcon={true}
        uris={uri}
        callback={spotifyPlayerCallback}
        offset={offsetState}
        position={position}
      />
      {/* <button onClick={addTrack}></button> */}
    </>
  );
};

//

export default Player;
