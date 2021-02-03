import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import { auth as firebaseAuth } from "../firebase";
import history from "../redux/history";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = firebaseAuth.currentUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const AppRouter = () => {
  return (
    <Router history={history}>
        <PrivateRoute exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default AppRouter;
