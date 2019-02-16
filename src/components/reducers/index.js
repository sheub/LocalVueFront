import { combineReducers } from "redux";
import {appReducer, defaultAppState} from "./appReducer";
import auth from "./auth";
import loading from "./loading";

const defaultState = {
  app: defaultAppState
};

export default combineReducers({
  auth,
  loading,
  appReducer
});

export {defaultState};
