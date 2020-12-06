const initialState = {
  item: [],
  playing: false,
  status: "idle",
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_QUEUE": {
      //const newItem = [...state.item, action.data];
      //console.log(typeof state.item);
      const item = [action.data];
      const newItem = [...state.item, item];
      console.log(newItem);
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
