import appReducer from "./appReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    auth: authReducer,
    app: appReducer,
    router: connectRouter(history),
  });

export default rootReducer;
