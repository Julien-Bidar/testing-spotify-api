const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
require("../client/node_modules/dotenv").config();

const app = new express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = 5678;

const {
  login,
  callback,
  getUserInfo,
  savePlaylist,
  sendAccessToken,
} = require("./handlers");
const {
  addUser,
  getAllUsers,
  addQueueItem,
  getUpdatedQueue,
} = require("./dbhandlers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//--------------Spotify library endpoint----------------------//
app.get("/login", login);
app.get("/token", sendAccessToken);
app.get("/callback", callback);
app.get("/me", getUserInfo);

//app.post("/spotify_access_token", getTokenToFE);

//-------------socketio------------------------------------//
io.on("connection", (socket) => {
  console.log("connected!!!");
  socket.on("updateQueue", ({ item, user }) => {
    console.log("**********server");
    io.emit("updateQueue", { item, user });
  });
  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });
});

//db routes
//todo have restfull endpoints
app.post("/adduser", addUser);
app.get("/getallusers", getAllUsers);
app.post("/addtoqueue", addQueueItem);
app.get("/queue", getUpdatedQueue);
app.get("/saveplaylist", savePlaylist);

server.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info(`listening on port ${port}`);
  }
});
