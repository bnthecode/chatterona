import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Drawer from "./components/Drawer";
import Channels from './components/Channels'
import Servers from './components/Servers'
import Header from "./components/Header";
import db, { auth as firebaseAuth, provider } from "./firebase";
import Login from "./pages/Login";
import { logInUserRedux } from "./redux/actions/authActions";

function App({ auth, logInUser }) {

  const [isLoggedIn, setLoggedIn] = useState(firebaseAuth.currentUser);
  const [serverId, setServerId] = useState()
  const [channelId, setChannelId] = useState()

  const handleLogin = (user) => {
    logInUser(user);
    setLoggedIn(true);
  }

  const logout = () => {

    logInUser({});
    firebaseAuth.signOut().then(user => setLoggedIn(false));
  }

  const addCollection = () => {
    db.collection("server").add({
      name: "First Server",
      country: "USA",
    })
      .then(docRef => setServerId(docRef.id))
      console.log("server added")
  }

  const addChannel = () => {
    db.collection('channels').add({
      serverId: serverId,
      name: "channelNumber1",
    })
    .then(docRef => setChannelId(docRef.id))
    console.log("channel added")
  }

  const addMessages = () => {
    db.collection('messages').add({
      channelId: channelId,
      user: "Evan",
      message: "Hey this is the first message",
      //timeStamp: db.FieldValue.serverTimestamp()
    })
    console.log("message added")
  }

  return (
    <div style={{ backgroundColor: "#212121", height: "100vh", width: "100%" }}>
      {isLoggedIn ? (
        <>
          <Header />
          <Channels />
          <Servers />
          <Button
            style={{ position: "absolute", top: "25%", left: "50%" }}
            onClick={logout}
          >
            {" "}
            Log out
          </Button>
          <Button
            style={{ position: "absolute", top: "45%", left: "50%" }}
            onClick={addCollection}
          >
            Create a Server
          </Button>
          <Button
            style={{ position: "absolute", top: "65%", left: "50%" }}
            onClick={addChannel}
          >
            Create a Channel
          </Button>
          <Button
            style={{ position: "absolute", top: "85%", left: "50%" }}
            onClick={addMessages}
          >
            Create a Message
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