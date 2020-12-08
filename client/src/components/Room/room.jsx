import React from "react";
import NowPlaying from "./nowPlaying";
import Player from "./player";
import QueueItem from "./queueItem";
import RoomHeader from "./roomHeader";
import RoomFooter from "./roomFooter";

const Room = () => {
  return (
    <div>
      <RoomHeader />
      <NowPlaying />
      <QueueItem />
      <RoomFooter />
    </div>
  );
};

export default Room;
