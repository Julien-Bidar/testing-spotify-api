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

  //authorization + fetching user.
  const login = () => {
    window.open("http://localhost:5678/login", "width=800,height=600");
  };

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
      const expires = token.expiresIn;
      dispatch(receiveAccessToken(token.accessToken));
      //refresh token before it expires
      setInterval(async () => {
        console.log("refresh ran on FE");
        const data = await fetch("/token");
        const token = await data.json();
        dispatch(receiveAccessToken(token.accessToken));
      }, (expires / 2) * 1000);
    } catch (err) {
      console.log(err);
      dispatch(receiveAccessTokenError());
    }
  };

  //clear playlist DB
  const resetDb = async () => {
    const clearRequest = await fetch("/clearplaylist");
    const response = await clearRequest.json();
    console.log(response);
  };

  const start = async () => {
    getToken();
    await fetchMainUserData();
    await getAllUsers();
    resetDb();
  };

  return (
    <Wrapper>
      <Title>rooms</Title>
      <LoginText>log in with your spotify premium account</LoginText>
      {/* <a href="http://localhost:5678/login" target="_blank"> */}
      <Button onClick={login}>
        <IconContext.Provider value={{ color: "#1DB954", size: "5em" }}>
          <FaSpotify />
        </IconContext.Provider>
      </Button>
      <StyledLink to="/room">
        <ButtonStart onClick={start}>Start</ButtonStart>
      </StyledLink>
      {/* <Link to="/search">Search</Link> */}
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 15px;
`;

const ButtonStart = styled.button`
  border: none;
  border-radius: 5px;
  margin-top: 45px;
`;

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
