import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Channels from "./components/Channels";
import Header from "./components/Header";
import db, { auth as firebaseAuth, provider } from "./firebase";
import Login from "./pages/Login";
import { logInUserRedux } from "./redux/actions/authActions";

function App({ auth, logInUser }) {

  const [isLoggedIn, setLoggedIn] = useState(firebaseAuth.currentUser);

  const handleLogin = (user) => {
    logInUser(user);
    setLoggedIn(true);
  }

  const logout = () => {

    logInUser({});
    firebaseAuth.signOut().then(user => setLoggedIn(false));
  }

  return (
    <div style={{ backgroundColor: "#212121", height: "100vh", width: "100%" }}>
      {isLoggedIn ? (
        <>
          <Header />
          <Channels />
          <Button
            style={{ position: "absolute", top: "25%", left: "50%" }}
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