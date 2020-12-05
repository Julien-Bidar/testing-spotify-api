import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
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
import Search from "../search/search";
import Devices from "../deviceControl";
import Player from "../player";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  const [gotToken, setGotToken] = useState(false);
  const [count, setCount] = useState(0);

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
        //todo be more defensive------------
        setGotToken(true);
        dispatch(receiveAccessToken(data));
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
      const request = await fetch("https://api.spotify.com/v1/me", options);
      const data = await request.json();
      dispatch(receiveMainUserProfile(data));
    } catch (err) {
      console.log(err);
      dispatch(receiveUserProfileError());
    }
  };

  useEffect(() => {
    if (token) {
      fetchMainUserData();
    }
  }, [setGotToken]);

  return (
    <div>
      <h1>Final Project</h1>
      <Player />
      {!code ? (
        <button onClick={authorize}>login</button>
      ) : (
        <button>log out</button>
      )}
      <button onClick={authorize}>login</button>
      <button onClick={fetchMainUserData}>get user info</button>
      <Devices />
      <Search />
    </div>
  );
}

export default App;
