const initialState = {
  item: [],
  playing: false,
  status: "idle",
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_QUEUE": {
      const item = action.data;
      const newItem = [...state.item, item];
      return {
        ...state,
        item: newItem,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
