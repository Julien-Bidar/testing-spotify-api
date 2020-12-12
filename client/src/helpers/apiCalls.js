//-----------------------SDK player related-----------------------------//
export const playTrack = async (queue, token) => {
  const info = queue[0];
  const uri = info[0].uri;
  const deviceId = "ed48adfba9de53c3e5ed79657dbebe546e620bb4";

  const options = {
    method: "PUT",
    body: JSON.stringify({ uri: uri }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    options
  );
  const response = await request.json();
  console.log(response);
};

// export const fetchCurrentUserData = async () => {
//   dispatch(requestUsersInfo());
//   const options = {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   };
//   try {
//     const request = await fetch("https://api.spotify.com/v1/me", options);
//     const data = await request.json();
//     dispatch(receiveMainUserProfile(data));
//   } catch (err) {
//     dispatch(receiveUserProfileError());
//   }
// };

//---------------------------------db fetch------------------------//
// export const updateQueue = async (currentUser) => {
//   const updateRequest = await fetch("/queue");
//   const response = await updateRequest.json();
//   const data = response.data.filter((item) => {
//     return item.addedBy.email !== currentUser.email;
//   });
//   console.log(data);
// };
