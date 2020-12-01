const express = require("express");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = new express();
const port = 5678;
const scopes = ["user-read-email", "user-read-private"];

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  const authorizeUrl = spotifyApi.createAuthorizeURL(scopes);
  console.log("auth URL :", authorizeUrl);
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  console.log("state :", state);

  if (error) {
    console.error("Callback error", error);
    res.send(`Callback Error: ${error}`);
    return;
  }
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      console.log("access_token: ", accessToken);
      console.log("refresh_token:", refreshToken);

      console.log(
        `Sucessfully retreived access token. Expires in ${expiresIn} s.`
      );
      res.send("Success! You can now close the window.");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessToken = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", accessToken);
        spotifyApi.setAccessToken(accessToken);
      }, (expiresIn / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info(`listening on port ${port}`);
  }
});
