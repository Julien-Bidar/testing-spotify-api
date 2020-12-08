const initialState = {
  currentUser: {},
  users: [],
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
        currentUser: {
          ...state.currentUser,
          isLoggedIn: true,
          country: action.data.country,
          fullName: action.data.display_name,
          email: action.data.email,
          imageSrc: action.data.images[0].url,
          product: action.data.product,
        },
        status: "idle",
      };
    }
    case "RECEIVE_USERS_PROFILE": {
      const newUsers = action.data;

      //we don't want the same user twice in users
      let arraywithoutduplicate = [];
      console.log(state.users);
      if (state.users) {
        let existingEmailArray = [];
        state.users.forEach((user) => {
          existingEmailArray.push(user.email);
        });
        console.log(existingEmailArray);

        newUsers.forEach((user) => {
          let userObj = user.data;
          if (!existingEmailArray.includes(userObj.email)) {
            userObj = { ...userObj, isLoggedIn: true };
            arraywithoutduplicate.push(userObj);
          }
        });
        console.log(arraywithoutduplicate);
      }

      //we don't want to add currentUser to users
      let newUsersArray = [];
      arraywithoutduplicate.forEach((user) => {
        if (user.email !== state.currentUser.email) {
          newUsersArray.push(user);
        }
      });

      const users = [...state.users, ...newUsersArray];

      return {
        ...state,
        users: users,
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
