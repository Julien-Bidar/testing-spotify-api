import React from "react";
import NowPlaying from "./nowPlaying";
import Player from "./player";
import QueueItem from "./queueItem";
import RoomHeader from "./roomHeader";
import RoomFooter from "./roomFooter";
import { useDispatch, useSelector } from "react-redux";
import { updateQueueFromDB } from "../../redux/actions/queueActions";

const Room = () => {
  const items = useSelector((state) => state.queue.item);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  console.log(items);

  const updateQueue = async (currentUser) => {
    const updateRequest = await fetch("/queue");
    const response = await updateRequest.json();
    // const data = response.data.filter((item) => {
    //   return item.addedBy.email !== currentUser.email;
    // });
    // console.log(data);
    dispatch(updateQueueFromDB(response.data));
  };

  return (
    <div>
      <RoomHeader />
      {items.length > 0 &&
        items.map((item) => {
          return <QueueItem item={item} />;
        })}
      <button onClick={() => updateQueue(currentUser)}>update queue</button>
      <RoomFooter />
    </div>
  );
};

export default Room;
