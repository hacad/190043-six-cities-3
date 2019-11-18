import {combineReducers} from "redux";
import {data} from "./data/reducer.js";
import {user} from "./user/reducer.js";

export default combineReducers({
  data,
  user
});
