import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { logInUserRedux } from "../redux/actions/authActions";
import GoogleLogo from "../images/google-logo.svg";
import config from "../config";
import { userService } from "../services";

const Login = ({ logInUser, history }) => {

  const handleInitSignIn = () => {
   const environmentHandlers = {
      development: () => {
        logInUser({ user: config.devUser });
        history.push("/");
      },
      production: async () => {
        const user = await userService.signInGoogle();
        logInUser(user)
        history.push("/");
      },
    };
    const foundHandlers = environmentHandlers[process.env.NODE_ENV];
    return foundHandlers ? foundHandlers() : null;
  };

  return (
    <div
      style={{
        display: "flex",
        paddingTop: "25vh",
        alignItems: "center",
        justifyContent: "middle",
        flexDirection: "column",
      }}
    >
      <Typography
        style={{ color: "white", transform: "rotate(-8deg)", fontSize: 50 }}
      >
        Chatterona
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{
            transform: "rotate(-8deg)",
            color: "#3d1059",
            margin: "1vh",
          }}
        ></FontAwesomeIcon>
      </Typography>
      <Button
        style={{
          width: 300,
          marginTop: "10vh",
          backgroundColor: "#3d1059",
          color: "white",
          height: 48,
          fontWeight: 600,
        }}
        onClick={handleInitSignIn}
      >
        <img
          style={{ marginRight: 16, height: 24, width: 24 }}
          src={GoogleLogo}
          alt="React Logo"
        />
        Log in
      </Button>
      <span style={{ position: "absolute", color: 'white', bottom: 4, right: 0, fontSize: 12 }}>
        2/5/21 6:02AM
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logInUser: dispatch(logInUserRedux),
});

export default connect(null, mapDispatchToProps)(Login);
