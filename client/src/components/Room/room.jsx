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
import styled from "styled-components";
import { getTokenFromUrl } from "../../helpers/spotifyConst";
import {
  receiveMainUserProfile,
  receiveUserProfileError,
  requestUsersInfo,
} from "../../redux/actions/usersActions";
import { fetchCurrentUserData } from "../../helpers/apiCalls";

const socket = io.connect("http://localhost:5678");

const Room = () => {
  const items = useSelector((state) => state.queue.items);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  // //--------------------token if method without server---//
  // useEffect(() => {
  //   const token = getTokenFromUrl();
  //   if (token) {
  //     dispatch(requestUsersInfo());
  //     const currentUserData = fetchCurrentUserData(token);
  //     if (currentUserData.err) {
  //       dispatch(receiveUserProfileError());
  //     } else {
  //       console.log(currentUserData);
  //       dispatch(receiveMainUserProfile(currentUserData));
  //     }
  //   }
  // });

  //---------------------socket
  useEffect(() => {
    socket.on("updateQueue", ({ item, user }) => {
      dispatch(ajouteToQueue(item, user));
    });
    return () => {
      socket.removeListener("updateQueue");
    };
  }, []);

  //button manual update from DB
  // const updateQueue = async () => {
  //   const updateRequest = await fetch("/queue");
  //   const response = await updateRequest.json();

  //   dispatch(updateQueueFromDB(response.data));
  // };

  return (
    <Wrapper>
      <RoomHeader />
      {items.length > 0 &&
        items.map((item) => {
          return <QueueItem key={item.track.uri} item={item} />;
        })}
      {/* <button onClick={() => updateQueue(currentUser)}>update queue</button> */}
      {/* <RoomFooter /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: overlay;
`;

export default Room;
