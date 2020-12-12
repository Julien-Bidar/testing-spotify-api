import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../home/header";
import { IoIosMusicalNotes } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link, useHistory } from "react-router-dom";
import { addSession } from "../../redux/actions/sessionActions";
import { v4 as uuidv4 } from "uuid";

const AddRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUserName = useSelector(
    (state) => state.users.currentUser.display_name
  );
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const id = uuidv4();
    console.log(id);
    const data = {
      sessionName: value,
      id: id,
      createdBy: currentUserName,
    };
    dispatch(addSession(data));
    history.push(`/room/${id}`);
    setValue("");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <InputWrap>
          <Text>1 - Enter the name of your collaborative playlist</Text>
          <Input
            type="text"
            name="playlist name"
            onChange={handleChange}
            value={value}
            required
          />
        </InputWrap>
        {/* <InputWrap>
          <Text>2 - Invite friends to join</Text>
          <Input type="email" name="invite friends" />
        </InputWrap> */}
        <SubmitWrap>
          <IconContext.Provider value={{ color: "#ffffff", size: "2em" }}>
            <Button onClick={handleSubmit}>
              <IoIosMusicalNotes />
            </Button>
          </IconContext.Provider>
        </SubmitWrap>
      </Wrapper>
    </>
  );
};

const SubmitWrap = styled.div`
  padding-top: 180px;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
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
