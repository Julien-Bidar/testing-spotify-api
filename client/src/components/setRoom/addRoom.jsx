import React from "react";
import styled from "styled-components";
import Header from "../home/header";
import { IoIosMusicalNotes } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const AddRoom = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <InputWrap>
          <Text>1 - Enter the name of your collaborative playlist</Text>
          <Input type="text" name="playlist name" />
        </InputWrap>
        <InputWrap>
          <Text>2 - Invite friends to join</Text>
          <Input type="email" name="invite friends" />
        </InputWrap>
        <SubmitWrap>
          <IconContext.Provider value={{ color: "#ffffff", size: "2em" }}>
            <Link to="/room">
              <IoIosMusicalNotes />
            </Link>
          </IconContext.Provider>
        </SubmitWrap>
      </Wrapper>
    </>
  );
};

const SubmitWrap = styled.div`
  padding-top: 180px;
`;

const Input = styled.input`
  width: 200px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  background-color: #20252a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
`;

const Text = styled.p`
  color: white;
  font-family: "Comfortaa" cursive;
  font-size: 18px;
  font-weight: 400;
  padding: 20px;
  margin-top: 30px;
  text-align: center;
`;

export default AddRoom;
