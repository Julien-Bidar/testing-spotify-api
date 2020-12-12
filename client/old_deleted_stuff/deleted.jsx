//----------------------------------landingpage
//----------------------------------user authorization process--------------------//
// const authorize = async () => {
//   window.location = `http://localhost:5678/login`;
//   await fetchMainUserData();
// };
// const parsed = queryString.parse(window.location.search);
// let code;
// if (parsed) {
//   code = parsed.code;
//}

//------------------------------getting the access token and setting it to the store----------------------//
// useEffect(() => {
//   dispatch(requestAccessToken());
//   fetch("/spotify_access_token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ code: code }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (!data.error) {
//         setGotToken(true);
//         dispatch(receiveAccessToken(data));
//       } else {
//         setGotToken(false);
//         dispatch(receiveAccessTokenError());
//       }
//     })
//     .catch((err) => {
//       dispatch(receiveAccessTokenError());
//     });
// }, []);

// const fetchMainUserData = async () => {
//   dispatch(requestUsersInfo());
//   const options = {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   };
//   try {
//     console.log("fetching user's data");
//     const request = await fetch("https://api.spotify.com/v1/me", options);
//     const data = await request.json();
//     console.log(data);
//     dispatch(receiveMainUserProfile(data));

//     //add user to db
//     const dbReq = await fetch("/adduser", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: data }),
//     });
//     const dbRes = await dbReq.json();
//     console.log(dbRes);
//   } catch (err) {
//     dispatch(receiveUserProfileError());
//   }
// };

//---------------------------------------------------------------handler/server--------------------------------------//

//------------get token without the library----------------------//
// const getTokenToFE = async (req, res, next) => {
//   const clientSecret = process.env.SPOTIFY_SECRET;
//   const clientId = process.env.SPOTIFY_CLIENT_ID;
//   const authorizationCode = req.body.code;
//   const authString = Buffer.from(clientId + ":" + clientSecret).toString(
//     "base64"
//   );
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${authString}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=http://localhost:3000`,
//   });
//   const json = await response.json();
//   return res.send(json);
// };

//-----------------------------------------------------usersReducer------------------------------------------
//we don't want the same user twice in users
// console.log(state.users);
// if (state.users) {
//   let existingEmailArray = [];
//   state.users.forEach((user) => {
//     existingEmailArray.push(user.email);
//   });
//   console.log(existingEmailArray);

//   newUsers.forEach((user) => {
//     let userObj = user.data;
//     if (!existingEmailArray.includes(userObj.email)) {
//       userObj = { ...userObj, isLoggedIn: true };
//       newUsersArray.push(userObj);
//     }
//   });
//   console.log(newUsersArray);
// }

//------------------------------addToQueueQuery-------------------------------//
// const options = {
//   method: "POST",
//   headers: { Authorization: `Bearer ${accessToken}` },
// };
// await fetch(
//   `https://api.spotify.com/v1/me/player/queue?uri=${item.uri}`,
//   options
// );

//button manual update from DB
// const updateQueue = async () => {
//   const updateRequest = await fetch("/queue");
//   const response = await updateRequest.json();

//   dispatch(updateQueueFromDB(response.data));
// };

// //--------------------token if method without server---//
// useEffect(() => {
//   const token = getTokenFromUrl();
//   if (token) {
//     dispatch(requestUsersInfo());
//     const currentUserData = fetchCurrentUserData(token);
//     if (currentUserData.err) {
//       dispatch(receiveUserProfileError());
//     } else {
//       console.log(currentUserData);
//       dispatch(receiveMainUserProfile(currentUserData));
//     }
//   }
// });
