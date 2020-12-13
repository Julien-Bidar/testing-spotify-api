export const addSession = (data) => ({
  type: "ADD_SESSION",
  data,
});

export const updateSessionQueue = (data, user, id) => ({
  type: "UPDATE_SESSION_QUEUE",
  data,
  user,
  id,
});
