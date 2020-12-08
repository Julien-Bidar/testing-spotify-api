import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSpotify } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";
import {
  receiveMainUserProfile,
  receiveUserProfileError,
  receiveUsersProfile,
  requestUsersInfo,
} from "../../redux/actions/usersActions";
import {
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../redux/actions/authActions";

const LandingPage = () => {
  const dispatch = useDispatch();

  //fetching the main user data
  const fetchMainUserData = async () => {
    try {
      dispatch(requestUsersInfo());
      const fetchUser = await fetch("/me");
      const response = await fetchUser.json();
      const data = response.me.body;
      dispatch(receiveMainUserProfile(data));
      //add user to db
      const dbReq = await fetch("/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data }),
      });
      const dbRes = await dbReq.json();
      console.log(dbRes);
    } catch (err) {
      dispatch(receiveUserProfileError());
    }
  };

  //get all users
  const getAllUsers = async () => {
    const getUsers = await fetch("/getallusers");
    const users = await getUsers.json();
    dispatch(receiveUsersProfile(users.data));
  };

  //get token
  const getToken = async () => {
    try {
      const req = await fetch("/token");
      const token = await req.json();
      dispatch(receiveAccessToken(token.accessToken));
    } catch (err) {
      console.log(err);
      dispatch(receiveAccessTokenError());
    }
  };

  return (
    <Wrapper>
      <Title>rooms</Title>
      <LoginText>log in with your spotify premium account</LoginText>
      <a href="http://localhost:5678/login" target="_blank">
        <Button>
          <IconContext.Provider value={{ color: "#1DB954", size: "5em" }}>
            <FaSpotify />
          </IconContext.Provider>
        </Button>
      </a>
      <Link to="/home">Home</Link>
      <button onClick={getAllUsers}>get all users</button>
      <button onClick={fetchMainUserData}>get main user</button>
      <button onClick={getToken}>get token</button>
      <Link to="/room">Room</Link>
      <Link to="/search">Search</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: #20252a;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  margin-top: 120px;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: white;
  font-family: "Comfortaa" cursive;
  font-size: 40px;
  font-weight: bold;
  margin-top: 200px;
`;

const LoginText = styled(Title)`
  text-align: center;
  font-size: 16px;
  margin-top: 120px;
  font-weight: 400;
`;

export default LandingPage;
