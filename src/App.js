import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Drawer from "./components/Drawer";
import Channels from "./components/Channels";
import Servers from "./components/Servers";
import Header from "./components/Header";
import db, { auth as firebaseAuth, provider } from "./firebase";
import Login from "./pages/Login";
import { logInUserRedux } from "./redux/actions/authActions";
import Chat from "./components/Chat";

function App({ auth, logInUser }) {
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
      {isLoggedIn && auth.user ? (
        <>
          <Header />
          <Channels />
          <Servers />
          <Chat />
          <Button
           style={{ width: 120, backgroundColor: '#3d1059',  color: 'white', fontWeight: 600,
           position: "absolute", top: 48, right: 20 }}
            onClick={logout}
          >
            {" "}
            Log out
          </Button>
        </>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logInUser: dispatch(logInUserRedux),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// collections
// servers -->
// --> channels
// ---> message
