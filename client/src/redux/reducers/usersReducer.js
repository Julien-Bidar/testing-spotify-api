const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  mainProfile: false,
  information: {},
  status: "idle",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_USER_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_MAIN_USER_PROFILE": {
      return {
        ...state,
        mainProfile: true,
        isLoggedIn: true,
        information: {
          ...state.information,
          country: action.data.country,
          fullName: action.data.display_name,
          email: action.data.email,
          imageSrc: action.data.images[0].url,
          product: action.data.product,
        },
        status: "idle",
      };
    }
    case "RECEIVE_USER_PROFILE_ERROR": {
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
