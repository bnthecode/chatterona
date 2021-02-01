import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./styles/muiTheme";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import history from "./redux/history";
import { PersistGate } from "redux-persist/integration/react";



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
