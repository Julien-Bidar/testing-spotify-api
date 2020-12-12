import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//import { playTrack } from "../../helpers/apiCalls";
import RoomFooter from "./roomFooter";
import { updatPlayer } from "../../redux/actions/playerAction";

const Player = () => {
  const dispatch = useDispatch();
  const [offsetState, setOffsetState] = useState(0);
  //const [uri, setUri] = useState(["spotify:track:4zCrOO8OAjpnmekfIxzTsl"]);
  //const queue = useSelector((state) => state.queue.items);
  const accessToken = useSelector((state) => state.auth.token);
  const [currentPlayingUri, setCurrentPlayingUri] = useState();
  const [position, setPosition] = useState();
  const uri = useSelector((state) =>
    state.queue.items.map((item) => item.track.uri)
  );

  const spotifyPlayerCallback = (spotifyState) => {
    console.log(spotifyState);
    dispatch(updatPlayer(spotifyState));
    const uriTrackPlaying = spotifyState.track.uri;
    const currentOffset = uri.indexOf(uriTrackPlaying);
    setPosition(spotifyState.position);
    if (currentOffset !== -1) {
      setOffsetState(currentOffset);
    }
    if (currentPlayingUri !== uriTrackPlaying) {
      setCurrentPlayingUri(uriTrackPlaying);
    }
  };

  if (!accessToken) {
    return null;
  }
  // if (uri.length <= 0) {
  //   return <p>the queue is empty add a track</p>;
  // }

  return (
    <Wrapper>
      <SpotifyPlayer
        name="rooms"
        token={accessToken}
        showSaveIcon={true}
        uris={uri}
        callback={spotifyPlayerCallback}
        offset={offsetState}
        position={position}
      />
      <RoomFooter />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default Player;
