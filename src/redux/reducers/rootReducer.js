import uiReducer from "./uiReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    auth: authReducer,
    ui: uiReducer,
    router: connectRouter(history),
  });

export default rootReducer;
