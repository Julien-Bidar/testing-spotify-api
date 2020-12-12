const initialState = {
  items: [],
  playing: false,
  status: "idle",
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_QUEUE": {
      const addedBy = action.user;
      const track = action.data;
      const item = { track, addedBy };
      //const newItem = ;
      return {
        ...state,
        items: [...state.items, item],
        status: "idle",
      };
    }
    case "UPDATE_QUEUE": {
      return {
        ...state,
        items: action.data,
        status: "idle",
      };
    }
    case "CLEAR_QUEUE": {
      return {
        ...state,
        items: [],
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
