const initialState = {
  item: [],
  playing: false,
  status: "idle",
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_QUEUE": {
      const addedBy = action.user;
      const track = action.data;
      const item = { track, addedBy };
      const newItem = [...state.item, item];
      return {
        ...state,
        item: newItem,
        status: "idle",
      };
    }
    case "UPDATE_QUEUE": {
      return {
        ...state,
        item: action.data,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
