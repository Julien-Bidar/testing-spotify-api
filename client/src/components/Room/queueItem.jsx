import React from "react";
import styled from "styled-components";

const QueueItem = (props) => {
  const { item } = props;
  console.log(item);
  console.log(item.track);
  const trackImgSrc = item.track.album.images[2];
  const addedByImgSrc = item.addedBy.imageSrc;
  return (
    <div>
      <Wrapper>
        <MusicWrap>
          <div>
            <img src={trackImgSrc.url} alt="album cover" />
          </div>
          <TextWrap>
            <TrackName>{item.track.name}</TrackName>
            <p>{item.track.album.artists[0].name}</p>
          </TextWrap>
          {/* <div>
          <p>heart icon</p>
        </div> */}
        </MusicWrap>
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
