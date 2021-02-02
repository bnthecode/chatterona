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

      <div style={{ width: '600px', marginLeft: 'calc(50% - 300px)',  paddingTop: '200px',textAlign: 'center',
       color: 'white'}}>
      <Typography style={{ fontFamily: 'monospace', transform: 'rotate(-8deg)', fontSize: 92, marginBottom: 100, height: '50%', }} >
        
         Chatteroni
         <div style={{width: 16, height: 16, borderRadius: 8, transform: 'rotate(-8deg)',
          position: 'absolute', top: 34, right: 62, backgroundColor: '#3d1059'}}></div>
         </Typography>
         <Button
        style={{ width: 300, backgroundColor: '#3d1059',  color: 'white', fontWeight: 600 }}
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
