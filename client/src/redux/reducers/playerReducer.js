const initialState = {
  playerState: null,
  status: "idle",
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PLAYER": {
      console.log(action.spotifyState);
      return {
        ...state,
        playerState: action.spotifyState,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
