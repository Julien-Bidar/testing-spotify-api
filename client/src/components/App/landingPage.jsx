import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { FaSpotify } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";
import {
  receiveAccessToken,
  receiveAccessTokenError,
  requestAccessToken,
} from "../../redux/actions/authActions";
import {
  receiveMainUserProfile,
  receiveUserProfileError,
  requestUsersInfo,
} from "../../redux/actions/usersActions";

const LandingPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const [gotToken, setGotToken] = useState(false);
  const token = useSelector((state) => state.auth.token);
  console.log(gotToken);

  //----------------------------------user authorization process--------------------//
  const authorize = () => {
    window.location = `http://localhost:5678/login`;
  };
  const parsed = queryString.parse(window.location.search);
  let code;
  if (parsed) {
    code = parsed.code;
  }

  //------------------------------getting the access token and setting it to the store----------------------//
  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setGotToken(true);
          dispatch(receiveAccessToken(data));
        } else {
          setGotToken(false);
          dispatch(receiveAccessTokenError());
        }
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError());
      });
  }, []);

  //fetching the main user data

  const fetchMainUserData = async () => {
    dispatch(requestUsersInfo());
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      console.log("fetching user's data");
      const request = await fetch("https://api.spotify.com/v1/me", options);
      const data = await request.json();
      dispatch(receiveMainUserProfile(data));
    } catch (err) {
      dispatch(receiveUserProfileError());
    }
  };

  // useEffect(() => {
  //   fetchMainUserData();
  // }, [gotToken, setGotToken]);

  return (
    <Wrapper>
      <Title>rooms</Title>
      <LoginText>log in with your spotify premium account</LoginText>
      <Button onClick={authorize}>
        <IconContext.Provider value={{ color: "#1DB954", size: "5em" }}>
          <FaSpotify />
        </IconContext.Provider>
      </Button>
      <button onClick={fetchMainUserData}>get user info</button>
      <Link to="/home">Home</Link>
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
  font-size: 14px;
  margin-top: 120px;
  font-weight: 400;
`;

export default LandingPage;
