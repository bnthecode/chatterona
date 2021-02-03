import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { auth, provider } from "../firebase";
import { logInUserRedux } from "../redux/actions/authActions";
import GoogleLogo from '../images/google-logo.svg';

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
        
         Chatterona
         <FontAwesomeIcon icon={faCommentDots} style={{width: 60, height: 60, borderRadius: 8, transform: 'rotate(-8deg)',
          position: 'absolute', top: 100, right: 0, color: '#3d1059'}}></FontAwesomeIcon>
         </Typography>
         <Button
        style={{  width: 300, backgroundColor: '#3d1059',  color: 'white',height: 48, fontWeight: 600 }}
        onClick={login}
      >
    <img style={{ marginRight: 16, height: 24, width: 24}} src={GoogleLogo} alt="React Logo" />
        Log in
    
      </Button>
         </div>
  

  );
};

const mapDispatchToProps = (dispatch) => ({
    logInUser: dispatch(logInUserRedux),
  })
  
export default connect(null, mapDispatchToProps)( Login);
