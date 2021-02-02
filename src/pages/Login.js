import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { auth, provider } from "../firebase";
import { logInUserRedux } from "../redux/actions/authActions";

const Login = ({ handleLogin }) => {

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => handleLogin(user))
      .catch(() => handleLogin(null));
  };

  return (
    <div style={{ display: "grid", alignItems: "center" }}>
      <Typography variant="h3"> You need to log in</Typography>
      <Button
        style={{ position: "absolute", top: "25%", left: "50%" }}
        onClick={login}
      >
        {" "}
        Log in
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
    logInUser: dispatch(logInUserRedux),
  })
  
export default connect(null, mapDispatchToProps)( Login);
