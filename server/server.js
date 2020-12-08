const express = require("express");
const bodyParser = require("body-parser");
require("../client/node_modules/dotenv").config();

const app = new express();
const port = 5678;

const { login, callback, getUserInfo, sendAccessToken } = require("./handlers");
const { addUser, getAllUsers } = require("./dbhandlers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//--------------library way----------------------//
app.get("/login", login);
app.get("/token", sendAccessToken);
app.get("/callback", callback);
app.get("/me", getUserInfo);

//app.post("/spotify_access_token", getTokenToFE);

//db routes
app.post("/adduser", addUser);
app.get("/getallusers", getAllUsers);

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info(`listening on port ${port}`);
  }
});
