import React, { useEffect } from "react";
import NowPlaying from "./nowPlaying";
import Player from "./player";
import QueueItem from "./queueItem";
import RoomHeader from "./roomHeader";
import RoomFooter from "./roomFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQueueFromDB,
  ajouteToQueue,
} from "../../redux/actions/queueActions";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5678");

const Room = () => {
  const items = useSelector((state) => state.queue.item);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("updateQueue", ({ item, user }) => {
      dispatch(ajouteToQueue(item, user));
    });
  }, []);

  //button manual update
  const updateQueue = async (currentUser) => {
    const updateRequest = await fetch("/queue");
    const response = await updateRequest.json();

    dispatch(updateQueueFromDB(response.data));
  };

  return (
    <div>
      <RoomHeader />
      {items.length > 0 &&
        items.map((item) => {
          return <QueueItem key={item.track.uri} item={item} />;
        })}
      <button onClick={() => updateQueue(currentUser)}>update queue</button>
      <RoomFooter />
    </div>
  );
};

export default Room;
