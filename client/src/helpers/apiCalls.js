import { useSelector } from "react-redux";

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
