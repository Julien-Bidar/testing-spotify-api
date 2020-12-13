import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IoIosMusicalNotes } from "react-icons/io";

const QueueItem = (props) => {
  const { item } = props;
  //sessionAttempt
  // const trackPlaying = useSelector((state) => {
  //   if (state.player.playerState.track.id) {
  //     return state.player.playerState.track.id;
  //   }
  // });
  const trackPlaying = useSelector(
    (state) => state.player.playerState.track.id
  );
  const trackImgSrc = item.track.album.images[2];
  const addedByImgSrc = item.addedBy.imageSrc;
  return (
    <div>
      <Wrapper
      // style={
      //   trackPlaying === item.track.id
      //     ? { backgroundColor: "rgba(46, 47, 49, 0.25)" }
      //     : { backgroundColor: "none" }
      // }
      >
        <MusicWrap>
          <div>
            <img src={trackImgSrc.url} alt="album cover" />
          </div>
          <TextWrap>
            <TrackName>{item.track.name}</TrackName>
            <p>{item.track.album.artists[0].name}</p>
          </TextWrap>
        </MusicWrap>
        <NoteWrap>
          {trackPlaying === item.track.id && <IoIosMusicalNotes />}
        </NoteWrap>
        <ImgWrap>
          <Avatar src={addedByImgSrc} alt="" />
        </ImgWrap>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  margin-left: 5px;
`;

const NoteWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const MusicWrap = styled.div`
  width: 80%;
  display: flex;
`;

const TrackName = styled.p`
  font-weight: bold;
  padding: 5px 0;
`;

const ImgWrap = styled.div`
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-right: 15px;
  overflow: hidden;
`;

const Avatar = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 100%;
  width: auto;
`;

const TextWrap = styled.div`
  max-width: 45vw;
  margin-left: 35px;
`;

export default QueueItem;
