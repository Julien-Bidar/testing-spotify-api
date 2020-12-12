import React from "react";
import styled from "styled-components";
import { VscClearAll } from "react-icons/vsc";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

const RoomFooter = () => {
  //const clearCurrentQueue = () => {};
  const savePlaylist = async () => {
    try {
      const request = await fetch("/saveplaylist");
      const response = await request.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <IconContext.Provider value={{ color: "white", size: "1.1em" }}>
        {/* <SubWrap>
          <Button>
            <VscClearAll />
            <Text>clear playlist</Text>
          </Button>
        </SubWrap> */}
        <SubWrap>
          <Button onClick={savePlaylist}>
            <FaHeart />
            <Text>save playlist in Spotify</Text>
          </Button>
        </SubWrap>
      </IconContext.Provider>
    </Wrapper>
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: white;
  padding: 7px 0;
`;

const Wrapper = styled.div`
  background-color: #2e2f31;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
`;

export default RoomFooter;
