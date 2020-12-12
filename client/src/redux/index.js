import { combineReducers } from "redux";
import auth from "./reducers/authReducer";
import users from "./reducers/usersReducer";
import search from "./reducers/searchReducer";
import queue from "./reducers/queueReducer";
import session from "./reducers/sessionReducer";
import player from "./reducers/playerReducer";

export default combineReducers({ auth, users, search, queue, session, player });
