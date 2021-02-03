import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import history from "../redux/history";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const isLoggedIn = user && user.uid;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const AppRouter = ({ user }) => {
  return (
    <Router history={history}>
        <PrivateRoute exact path="/" user={user} component={Main} />
        <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default AppRouter;
