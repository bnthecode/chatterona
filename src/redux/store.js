import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import history from './history';
import { routerMiddleware } from "connected-react-router";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
  key: "chatteroni",
  storage,
  whitelist: [],
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = createStore(
  persistedReducer,
  composeEnhancer(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);

export const persistor = persistStore(store);

export default store;
