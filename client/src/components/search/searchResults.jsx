import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../../redux/actions/searchActions";
import { ajouteToQueue } from "../../redux/actions/queueActions";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const socket = io.connect("http://localhost:5678");

const SearchResult = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.items);
  const currentUser = useSelector((state) => state.users.currentUser);
  const playerState = useSelector((state) => state.player.playerState);
  const queue = useSelector((state) => state.queue.items);
  const history = useHistory();

  const progressMS = playerState.progressMS;
  const durationMS = playerState.track.durationMS;

  useEffect(() => {
    socket.on("updateQueue", ({ item, user }) => {
      dispatch(ajouteToQueue(item, user));
    });
    return () => {
      socket.removeListener("updateQueue");
    };
  }, []);

  const addToQueue = async (item, user) => {
    //-------------add track to db---------------//
    try {
      const dbReq = await fetch("/addtoqueue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: item, addedBy: user }),
      });
      const dbRes = await dbReq.json();
    } catch (err) {
      console.log(err);
    }
    // if (queue.length > 0) {
    //   setTimeout(() => {
    //     socket.emit("updateQueue", { item, user });
    //   }, durationMS - progressMS);
    // } else {
    // }
    socket.emit("updateQueue", { item, user });
    //dispatch(ajouteToQueue(item, user));
    dispatch(clearSearch());
    history.goBack();
  };

  if (!searchResult || searchResult === null) {
    return null; // todo loading
  }

  return searchResult.map((result) => {
    return (
      <Wrapper key={uuidv4()}>
        <MusicWrap>
          <div>
            <img src={result.album.images[2].url} alt="album cover" />
          </div>
          <TextWrap>
            <TrackName>{result.name}</TrackName>
            <p>{result.artists[0].name}</p>
          </TextWrap>
        </MusicWrap>
        <IconWrap>
          <Button onClick={() => addToQueue(result, currentUser)}>
            <FaPlus />
          </Button>
        </IconWrap>
      </Wrapper>
    );
  });
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  margin: 5px;
`;

const MusicWrap = styled.div`
  width: 80%;
  display: flex;
`;

const TrackName = styled.p`
  font-weight: bold;
  padding: 5px 0;
`;

const TextWrap = styled.div`
  max-width: 45vw;
  margin-left: 35px;
`;

const IconWrap = styled.div`
  display: flex;
  position: absolute;
  right: 12px;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default SearchResult;
