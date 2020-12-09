export const ajouteToQueue = (data, user) => ({
  type: "ADD_TO_QUEUE",
  data,
  user,
});

export const updateQueueFromDB = (data) => ({
  type: "UPDATE_QUEUE",
  data,
});
