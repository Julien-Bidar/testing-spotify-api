const express = require("express");
const bodyParser = require("body-parser");
require("../client/node_modules/dotenv").config();

const app = new express();
const port = 5678;

const { login, callback, getTokenToFE } = require("./handlers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//--------------library way----------------------//
app.get("/login", login);

app.get("/callback", callback);

app.post("/spotify_access_token", getTokenToFE);

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info(`listening on port ${port}`);
  }
});
