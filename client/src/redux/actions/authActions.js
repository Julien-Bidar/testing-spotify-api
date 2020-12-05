export const requestAccessToken = () => ({ type: "REQUEST_ACCESS_TOKEN" });

export const receiveAccessToken = (data) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  data,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});
