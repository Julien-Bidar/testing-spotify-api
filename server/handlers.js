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

let token = null;

const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:5678/callback",
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
      token = accessToken;
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
        token = accessToken;

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

sendAccessToken = (req, res) => {
  try {
    return res.status(200).json({ status: 200, accessToken: token });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const me = await spotifyApi.getMe();
    res.status(200).json({ status: 200, me: me });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 400, message: e });
  }
};

module.exports = { login, callback, getUserInfo, sendAccessToken };
