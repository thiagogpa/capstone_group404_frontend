import { combineReducers } from "redux";

import sideMenu from "./SideMenuReducer";
import user from "./UserReducer";

export default combineReducers({
  sideMenu,
  user,
});
