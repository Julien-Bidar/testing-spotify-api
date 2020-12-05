import { combineReducers } from "redux";
import auth from "./reducers/authReducer";
import users from "./reducers/usersReducer";
import search from "./reducers/searchReducer";
import queue from "./reducers/queueReducer";

export default combineReducers({ auth, users, search, queue });
