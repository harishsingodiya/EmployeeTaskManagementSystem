import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import taskReducer from "./tasks/taskReducer";

/***
 * Combining user and task reducer
 */
const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

export default rootReducer;
