export const requestUsersInfo = () => ({
  type: "REQUEST_USER_INFO",
});

export const receiveMainUserProfile = (data) => ({
  type: "RECEIVE_MAIN_USER_PROFILE",
  data,
});

export const receiveUsersProfile = (data) => ({
  type: "RECEIVE_USERS_PROFILE",
  data,
});

export const receiveUserProfileError = () => ({
  type: "RECEIVE_USER_PROFILE_ERROR",
});
