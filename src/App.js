import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Channels from "./components/Channels";
import Header from "./components/Header";
import { auth, provider } from "./firebase";
import { logInUserRedux } from "./redux/actions/authActions";

function App({ ui, logInUser }) {
  const login = () => {
    auth.onAuthStateChanged(user => logInUser(user));
    auth.signInWithPopup(provider).then(user => logInUser(user)).catch(err => alert(err))
  }
   return (
    <div style={{backgroundColor: '#212121', height: '100vh', width: '100%'}}> 
    <Header/>
    <Channels />
    <Button style={{ position: 'absolute', top: '25%', left: '50%'}} onClick={login}> Log in</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
  logInUser: dispatch(logInUserRedux),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
