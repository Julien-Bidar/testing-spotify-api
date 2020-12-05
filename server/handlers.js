require("../client/node_modules/dotenv").config();
const fetch = require("isomorphic-fetch");
const SpotifyWebApi = require("spotify-web-api-node");

//------------auth process--------------------------------------//
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-library-read",
  "user-library-modify",
  "app-remote-control",
  "streaming",
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000",
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

const login = (req, res) => {
  const state = "spotify_authorization";
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
};

const callback = (req, res) => {
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
      console.log("access token", accessToken);
      res.json({ token: accessToken });

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessToken = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", accessToken);
        console.log("access token expires in: ", expiresIn);
        spotifyApi.setAccessToken(accessToken);
      }, (expiresIn / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
};

//----------------login without the library----------------------//
const getAuthorization = async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
};

//------------get token without the library----------------------//
const getTokenToFE = async (req, res, next) => {
  const clientSecret = process.env.SPOTIFY_SECRET;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const authorizationCode = req.body.code;
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=http://localhost:3000`,
  });
  const json = await response.json();
  return res.send(json);
};

module.exports = { login, callback, getTokenToFE };
