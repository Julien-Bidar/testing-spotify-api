const clientId = "1dffa72d5e604d3fa967c9e86743f608";
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/room";
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

export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
