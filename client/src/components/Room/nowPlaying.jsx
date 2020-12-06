import React from "react";

const NowPlaying = () => {
  //api call to player/me

  return (
    <div>
      <div>
        <img src="cover" alt="cover" />
      </div>
      <div>
        <p>title</p>
        <p>artist</p>
      </div>
      <div>
        <p>avatar from person who added the track</p>
      </div>
    </div>
  );
};

export default NowPlaying;
