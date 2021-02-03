import { Button } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import Channels from "./components/Channels";
import Servers from "./components/Servers";
import Header from "./components/Header";
import  { auth as firebaseAuth } from "./firebase";
import Login from "./pages/Login";
import { logInUserRedux } from "./redux/actions/authActions";
import Chat from "./components/Chat";
import AppRouter from "./components/Router";

function App({ auth, logInUser, selectedChannel }) {
  const [isLoggedIn, setLoggedIn] = useState(firebaseAuth.currentUser);
  
  const handleLogin = (user) => {
    logInUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    logInUser({});
    firebaseAuth.signOut().then((user) => setLoggedIn(false));
  };

  return (
    <div style={{ backgroundColor: "#4f4f4f", height: "100vh", width: "100%" }}>
      <AppRouter />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  selectedChannel: state.app.selectedChannel,
});

const mapDispatchToProps = (dispatch) => ({
  logInUser: dispatch(logInUserRedux),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// collections
// servers -->
// --> channels
// ---> message
