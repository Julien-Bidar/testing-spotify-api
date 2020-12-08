const initialState = {
  token: null,
  status: "idle",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ACCESS_TOKEN": {
      if (action.data?.error === "invalid_grant") {
        return state;
      }
      return {
        ...state,
        token: action.data,
        status: "idle",
      };
    }
    case "RECEIVE_ACCESS_TOKEN_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
