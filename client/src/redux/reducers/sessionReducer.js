const initialState = {
  rooms: [],
  status: "idle",
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_SESSION": {
      return {
        ...state,
        rooms: [...state.rooms, action.data],
        status: "idle",
      };
    }
    case "UPDATE_SESSION_QUEUE": {
      const addedBy = action.user;
      const track = action.data;
      const item = { addedBy, track };
      const id = action.id;
      const items = state.rooms?.items;
      //finding corresponding id
      let updatedRoom = state.rooms.filter((room) => room.id === id);
      updatedRoom = { ...updatedRoom, items: [...items, item] };
      return {
        ...state,
        rooms: [...state.rooms, updatedRoom],
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
