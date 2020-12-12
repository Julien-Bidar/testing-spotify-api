const initialState = {
  id: null,
  name: null,
  createdBy: null,
  users: [],
  queue: [],
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_SESSION": {
      return {
        ...state,
        id: action.data.id,
        name: action.data.name,
        createdBy: action.data.currentUser,
      };
    }
    default: {
      return state;
    }
  }
}
