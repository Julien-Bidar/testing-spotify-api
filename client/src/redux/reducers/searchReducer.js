const initialState = {
  items: null,
  state: "idle",
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_REQUEST": {
      return {
        ...state,
        state: "loading",
      };
    }

    case "RECEIVE_TRACKS": {
      return {
        ...state,
        state: "idle",
        items: action.data.items,
      };
    }

    case "CLEAR_SEARCH": {
      return {
        ...state,
        items: null,
        state: "idle",
      };
    }

    default: {
      return state;
    }
  }
}
